# -*- coding: utf-8 -*-
"""调用 Deepseek 生成音素拆分 — 三年级下册"""
import json
import os
import re
import sys
import time
import urllib.request

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CW = os.path.dirname(SCRIPT_DIR)
PROJECT = os.path.dirname(os.path.dirname(CW))
OUT = os.path.join(CW, "assets", "data", "phonemes.json")
API_KEY = "sk-daa16008e81843deba6fefe9dce51465"
API_URL = "https://api.deepseek.com/chat/completions"

sys.path.insert(0, PROJECT)
from word_units_config import UNITS_3XIA


def call_deepseek(prompt: str) -> str:
    body = json.dumps({
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "你是英语自然拼读专家。只输出合法 JSON 对象，不要 markdown。"},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.2,
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL, data=body,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {API_KEY}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())["choices"][0]["message"]["content"]


def all_words():
    return [w for ws in UNITS_3XIA.values() for w in ws]


def normalize(items: list) -> list:
    return [{"symbol": p["ipa"], "letter": p["letter"]} for p in items]


def main():
    existing = json.load(open(OUT, encoding="utf-8")) if os.path.exists(OUT) else {}
    words = [w for w in all_words() if w not in existing]
    print(f"已有 {len(existing)}，待生成 {len(words)}")
    for i in range(0, len(words), 10):
        batch = words[i : i + 10]
        prompt = f"""为以下三年级英语单词给出音素拆分（字素+IPA，英式）。
输出 JSON：key=单词原文，value=[{{"letter":"字素","ipa":"/音标/"}}]

{chr(10).join('- '+w for w in batch)}"""
        raw = re.sub(r"^```json\s*|\s*```$", "", call_deepseek(prompt).strip())
        try:
            for w, items in json.loads(raw).items():
                existing[w] = normalize(items)
                print(f"  OK {w}")
            with open(OUT, "w", encoding="utf-8") as f:
                json.dump(existing, f, ensure_ascii=False, indent=2)
        except json.JSONDecodeError as e:
            print("JSON error:", e)
        time.sleep(1)
    print(f"Saved {len(existing)} words to {OUT}")


if __name__ == "__main__":
    main()
