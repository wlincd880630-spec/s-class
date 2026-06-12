#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""人教版英语八年级上册 · 词汇学习页构建（DeepSeek enrich + Azure TTS）"""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

import requests

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parent
VOCABLAB = Path(r"D:\Python自动化\VocabLab")
sys.path.insert(0, str(VOCABLAB))

from pep_vocab_pipeline import (  # noqa: E402
    SCHEMA,
    EXAMPLES_REQUIREMENTS,
    USAGE_REQUIREMENTS,
    IMAGE_PROMPT_REQUIREMENTS,
    SOCRATIC_REQUIREMENTS,
    FILL_BLANK_REQUIREMENTS,
    _save_unit_json,
    _word_str,
    build_html,
    extract_units_from_pdf,
    tts_to_mp3,
)

BOOK_DIR = Path(r"D:\2026\初中\人教版英语八年级上单词表")
PDF_PATH = BOOK_DIR / "人教版英语八年级上单词表.pdf"
DEEPSEEK_KEY = os.environ.get("DEEPSEEK_API_KEY", "sk-daa16008e81843deba6fefe9dce51465")
BATCH_SIZE = 4


def deepseek_json(prompt: str, retries: int = 4) -> list | dict | None:
    for attempt in range(retries):
        try:
            r = requests.post(
                "https://api.deepseek.com/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {DEEPSEEK_KEY}",
                },
                json={
                    "model": "deepseek-chat",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.2,
                },
                timeout=120,
            )
            r.raise_for_status()
            text = (r.json()["choices"][0]["message"]["content"] or "").strip()
            for x in ("```json", "```"):
                text = text.replace(x, "").strip()
            text = re.sub(r",\s*([}\]])", r"\1", text)
            return json.loads(text)
        except Exception as e:
            wait = 8 * (attempt + 1)
            print(f"      DeepSeek 失败 ({attempt + 1}/{retries}): {e}，{wait}s 后重试")
            time.sleep(wait)
    return None


def enrich_batch(words: list[str], unit_num: int) -> list[dict]:
    prompt = f"""初中英语教学专家。人教版英语八年级上册 Unit {unit_num}。面向中考学生。
{EXAMPLES_REQUIREMENTS}
{USAGE_REQUIREMENTS}
{IMAGE_PROMPT_REQUIREMENTS}
{SOCRATIC_REQUIREMENTS}
{FILL_BLANK_REQUIREMENTS}
单词：{json.dumps(words, ensure_ascii=False)}
{SCHEMA}
必须返回 JSON 数组（直接是 [...]），每词一对象，顺序与输入一致。仅输出 JSON。"""
    data = deepseek_json(prompt)
    arr = data if isinstance(data, list) else (data.get("words") if isinstance(data, dict) else [])
    if not isinstance(arr, list):
        arr = []
    out = []
    for i, w in enumerate(words):
        item = arr[i] if i < len(arr) and isinstance(arr[i], dict) else {}
        item["word"] = item.get("word") or w
        out.append(item)
    return out


def enrich_unit(words: list[str], unit_num: int, unit_dir: Path, source: str) -> list[dict]:
    unit_dir.mkdir(parents=True, exist_ok=True)
    jp = unit_dir / f"Unit{unit_num}.json"
    existing = []
    if jp.exists():
        try:
            existing = json.loads(jp.read_text(encoding="utf-8")).get("words") or []
        except Exception:
            existing = []
    enriched: list[dict] = []
    total = len(words)
    i = 0
    while i < total:
        w_str = words[i]
        if i < len(existing) and isinstance(existing[i], dict) and existing[i].get("meaning_cn") and _word_str(existing[i]) == w_str:
            enriched.append(existing[i])
            i += 1
            continue
        batch = words[i : i + BATCH_SIZE]
        print(f"      enrich [{i + 1}-{min(i + len(batch), total)}/{total}] {batch[0]}...")
        batch_out = enrich_batch(batch, unit_num)
        enriched.extend(batch_out)
        _save_unit_json(unit_dir, unit_num, {"unit": unit_num, "source": source, "words": enriched})
        i += len(batch)
        time.sleep(0.5)
    return enriched


def edge_tts_mp3(text: str, out_path: Path) -> bool:
    try:
        out_path.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(
            ["edge-tts", "--voice", "en-US-JennyNeural", "--text", text, "--write-media", str(out_path)],
            check=True,
            capture_output=True,
            timeout=90,
        )
        return out_path.exists() and out_path.stat().st_size > 0
    except Exception as e:
        print(f"      edge-tts 失败: {e}")
        return False


def synth_mp3(text: str, out_path: Path) -> bool:
    if out_path.exists() and out_path.stat().st_size > 0:
        return True
    if edge_tts_mp3(text, out_path):
        return True
    return tts_to_mp3(text, str(out_path))


def add_tts(unit_num: int, words: list[dict], unit_dir: Path) -> None:
    rel = f"Unit{unit_num}"
    audio_dir = unit_dir / "audio"
    audio_dir.mkdir(parents=True, exist_ok=True)
    for wi, w in enumerate(words):
        word = (w.get("word") or "").strip()
        safe = re.sub(r"[^\w\s-]", "", word).strip().replace(" ", "_")[:30] or "word"
        mp3 = audio_dir / f"{safe}.mp3"
        if synth_mp3(word, mp3):
            w["audio"] = f"{rel}/audio/{safe}.mp3"
        for ei, ex in enumerate(w.get("examples") or []):
            en = (ex.get("en") if isinstance(ex, dict) else "") or ""
            key = f"audio_ex{ei}"
            ex_mp3 = audio_dir / f"{safe}_ex{ei}.mp3"
            if en and synth_mp3(en, ex_mp3):
                w[key] = f"{rel}/audio/{safe}_ex{ei}.mp3"
        if (wi + 1) % 10 == 0:
            print(f"      TTS {wi + 1}/{len(words)}")
    _save_unit_json(unit_dir, unit_num, {"unit": unit_num, "source": str(PDF_PATH), "words": words})


def parse_units(argv: list[str]) -> list[int] | None:
    for i, a in enumerate(argv):
        if a in ("--units", "-u") and i + 1 < len(argv):
            return [int(x) for x in argv[i + 1].split(",") if x.strip().isdigit()]
    return None


def main():
    selected = parse_units(sys.argv[1:])
    units = selected or list(range(1, 9))
    all_data = []
    source = str(PDF_PATH)
    for unit_num in units:
        unit_pdf = BOOK_DIR / f"Unit{unit_num}.pdf"
        if not unit_pdf.exists():
            print(f"跳过 Unit{unit_num}：无 {unit_pdf.name}")
            continue
        words = extract_units_from_pdf(unit_pdf, force_unit=unit_num).get(unit_num, [])
        raw_path = BOOK_DIR / f"Unit{unit_num}" / f"Unit{unit_num}_words_raw.json"
        raw_path.parent.mkdir(parents=True, exist_ok=True)
        raw_path.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Unit {unit_num}: {len(words)} 词")
        unit_dir = BOOK_DIR / f"Unit{unit_num}"
        enriched = enrich_unit(words, unit_num, unit_dir, source)
        print(f"  TTS Unit {unit_num}...")
        add_tts(unit_num, enriched, unit_dir)
        db = json.loads((unit_dir / f"Unit{unit_num}.json").read_text(encoding="utf-8"))
        all_data.append(db)
    if not all_data:
        print("无数据")
        sys.exit(1)
    if selected:
        for jf in sorted(BOOK_DIR.glob("Unit*/Unit*.json")):
            if "_raw" in jf.name:
                continue
            n = int(re.search(r"\d+", jf.stem).group())
            if n not in {d["unit"] for d in all_data}:
                all_data.append(json.loads(jf.read_text(encoding="utf-8")))
        all_data.sort(key=lambda x: x.get("unit", 0))
    build_html(BOOK_DIR, all_data)
    pep = BOOK_DIR / "pep_vocab_learn.html"
    if pep.exists():
        s = pep.read_text(encoding="utf-8")
        s = s.replace("八年级下册", "八年级上册")
        pep.write_text(s, encoding="utf-8")
        for ud in all_data:
            n = ud["unit"]
            uh = BOOK_DIR / f"Unit{n}" / f"Unit{n}.html"
            if uh.exists():
                t = uh.read_text(encoding="utf-8").replace("八年级下册", "八年级上册")
                uh.write_text(t, encoding="utf-8")
    print("完成。运行 node scripts/sync-g8b1-vocab.mjs 同步到 junior_vocab/G8_B1")


if __name__ == "__main__":
    main()
