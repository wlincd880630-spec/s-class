#!/usr/bin/env python3
"""
小升初 KP 课件批量配图（Pollinations flux）· 12 岁学生风格

用法:
  python3 Grammar/kp-shared/scripts/generate-kp-images.py audit
  python3 Grammar/kp-shared/scripts/generate-kp-images.py generate [--wave 5] [--limit 20]
  python3 Grammar/kp-shared/scripts/generate-kp-images.py upload
  python3 Grammar/kp-shared/scripts/generate-kp-images.py all

图片保存至各课件 assets/img/；本地 http.server 预览自动走本地图（kp-engine localhost 优先）。
COS 上传需项目根 .cos-config.json 或 COS_SECRET_ID / COS_SECRET_KEY。
"""
from __future__ import annotations

import argparse
import json
import os
import random
import re
import shutil
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
REGISTRY = ROOT / "Psle" / "knowledge-registry"
PROGRESS_FILE = ROOT / "Grammar" / "kp-shared" / ".kp-image-progress.json"

EXCLUDE_FOLDERS = {
    "Grammar/KP-三单小升初",
    "Grammar/KP-现在进行时小升初",
    "Grammar/KP-不规则过去式",
}

STYLE = (
    "Premium children's educational illustration, polished Pixar-inspired 3D cartoon style, "
    "soft cinematic lighting, rich color palette, adorable expressive characters aged 11-12, "
    "clean composition with clear focal point, warm inviting mood, highly detailed but uncluttered, "
    "professional storybook quality, NO text, NO letters, NO words, NO captions, NO watermarks. Scene: "
)

WRITING_PROMPT = (
    "Motivated 12-year-old student writing English in a colourful notebook at a tidy desk, "
    "pencils and highlighters, warm window light, cheerful study mood"
)

# 文件名 → 额外画面描述（补充自动推断）
PROMPT_HINTS: dict[str, str] = {
    "writing.jpg": WRITING_PROMPT,
    "w5-plr-hero.jpg": "Two modern school libraries in a bright campus, students browsing books, wide friendly illustration",
    "w5-plr-s.jpg": "Single cute cat next to many cats in a row, showing plural with letter s, playful educational",
    "w5-plr-es.jpg": "Boxes watches and buses in a colourful row, showing plural es ending, playful educational",
    "w5-tag-hero.jpg": "Two 12-year-old friends about to play basketball on outdoor court, energetic inviting gesture",
    "w5-rel-hero.jpg": "Friendly boy waving from house next door, suburban neighbourhood, warm afternoon",
    "w5-both-hero.jpg": "Two proud parents in doctor coats smiling together, hospital corridor background soft",
    "w5-refl-hero.jpg": "Kids laughing and enjoying themselves at a colourful birthday party, balloons and cake",
    "w5-sosuch-hero.jpg": "Hot summer day, kids staying cool inside with fans and cold drinks, bright windows",
    "w5-wn-hero.jpg": "Student excitedly looking at art club poster, wants to join, school hallway colourful",
    "w4-prep-hero.jpg": "Monday morning English class schedule on classroom board, students entering class",
    "w4-qw-hero.jpg": "Student at library front desk asking how often, librarian smiling, bookshelves",
    "w4-conj-hero.jpg": "Rainy day outside window, child cozy inside with hot drink, cause and effect mood",
    "w4-poss-hero.jpg": "Two students comparing books mine and yours on school desk, friendly",
    "w4-asas-hero.jpg": "Two brothers same height back to back smiling, equal comparison fun pose",
    "w4-freq-hero.jpg": "Student always getting up early with alarm clock, morning routine montage feel",
    "w4-stop-hero.jpg": "Runner stopping on track to tie shoelaces, then resting on bench, clear action",
    "w3-pc-hero.jpg": "Boy playing football in sunny park, action motion look now present continuous",
    "w3-pp-hero.jpg": "Office worker ten year career timeline, professional grown up achievement",
    "w3-pass-hero.jpg": "Globe with speech bubbles many languages, English spoken worldwide concept",
    "w3-oc-hero.jpg": "Students group discussion solving problem on whiteboard, thinking together",
    "w3-fam-hero.jpg": "Happy extended family reunion, cousin highlighted among relatives garden party",
    "w3-ant-hero.jpg": "Tall boy and short boy standing together friendly comparison, playground",
    "w3-mlh-hero.jpg": "Mother gently asking child to clean tidy bedroom, weekend morning light",
}

WORKERS = 2
MIN_BYTES = 8000
RETRIES = 5
REQUEST_DELAY = 2.5


def load_lessons(waves: list[int] | None) -> list[dict]:
    lessons = []
    wave_dirs = waves or [1, 2, 3, 4, 5]
    for w in wave_dirs:
        d = REGISTRY / f"wave{w}" / "lessons"
        if not d.exists():
            continue
        for fp in sorted(d.glob("*.json")):
            data = json.loads(fp.read_text(encoding="utf-8"))
            data["_source"] = str(fp)
            lessons.append(data)
    return lessons


def sentence_for_image(lesson: dict, filename: str) -> str:
    pages = lesson.get("pages") or []
    for p in pages:
        if p.get("image") == filename:
            return p.get("sentence") or p.get("audio") or p.get("lead") or ""
        if p.get("leftImage") == filename:
            return p.get("leftSentence") or p.get("leftLabel") or ""
        if p.get("rightImage") == filename:
            return p.get("rightSentence") or p.get("rightLabel") or ""
        if p.get("classifyImg") == filename or p.get("spellImg") == filename:
            return lesson.get("intro") or ""
    sm = lesson.get("sceneMap") or {}
    for sent, img in sm.items():
        if img == filename:
            return sent
    for ex in (lesson.get("corpus") or {}).get("examples") or []:
        if ex.get("image") == filename:
            return ex.get("en") or ""
    intro = lesson.get("intro") or lesson.get("title") or ""
    sample = lesson.get("pages") and lesson["pages"][0]
    if sample and filename.endswith("hero.jpg"):
        return sample.get("sentence") or intro
    return intro


def slug_to_words(name: str) -> str:
    base = re.sub(r"\.(jpg|png)$", "", name, flags=re.I)
    return re.sub(r"[-_]+", " ", base)


def build_prompt(lesson: dict, filename: str) -> str:
    if filename in PROMPT_HINTS:
        hint = PROMPT_HINTS[filename]
    else:
        sent = sentence_for_image(lesson, filename)
        hint = sent if sent else slug_to_words(filename)
    return STYLE + hint


def collect_tasks(waves: list[int] | None, grammar_only: bool = False) -> list[dict]:
    tasks: dict[tuple[str, str], dict] = {}
    for lesson in load_lessons(waves):
        folder = lesson.get("folder", "").rstrip("/")
        if not folder:
            continue
        if folder in EXCLUDE_FOLDERS:
            continue
        if grammar_only and not folder.startswith("Grammar/KP-"):
            continue
        imgs: set[str] = set()

        def walk(o):
            if isinstance(o, str) and re.search(r"\.(jpg|png)$", o, re.I) and not o.startswith("http"):
                imgs.add(o)
            elif isinstance(o, list):
                for x in o:
                    walk(x)
            elif isinstance(o, dict):
                for x in o.values():
                    walk(x)

        walk(lesson)
        for fn in imgs:
            key = (folder, fn)
            if key not in tasks:
                tasks[key] = {
                    "folder": folder,
                    "filename": fn,
                    "prompt": build_prompt(lesson, fn),
                    "seed": abs(hash(f"{folder}/{fn}")) % 10_000_000,
                    "lesson_id": lesson.get("id", ""),
                }
    return sorted(tasks.values(), key=lambda t: (t["folder"], t["filename"]))


def img_path(task: dict) -> Path:
    return ROOT / task["folder"] / "assets" / "img" / task["filename"]


def load_progress() -> dict:
    if PROGRESS_FILE.exists():
        return json.loads(PROGRESS_FILE.read_text(encoding="utf-8"))
    return {"generated": [], "uploaded": [], "failed": []}


def save_progress(p: dict) -> None:
    PROGRESS_FILE.write_text(json.dumps(p, indent=2, ensure_ascii=False), encoding="utf-8")


def progress_key(task: dict) -> str:
    return f"{task['folder']}/{task['filename']}"


def pollinations_url(prompt: str, seed: int) -> str:
    q = urllib.parse.urlencode(
        {"width": "800", "height": "450", "model": "flux", "nologo": "true", "seed": str(seed)}
    )
    return f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?{q}"


def download_one(task: dict) -> tuple[str, bool, str]:
    dest = img_path(task)
    if dest.exists() and dest.stat().st_size >= MIN_BYTES:
        return progress_key(task), True, "exists"

    url = pollinations_url(task["prompt"], task["seed"])
    for attempt in range(1, RETRIES + 1):
        try:
            time.sleep(REQUEST_DELAY + random.uniform(0, 1.5))
            req = urllib.request.Request(url, headers={"User-Agent": "s-class-kp-images/1.0"})
            with urllib.request.urlopen(req, timeout=180) as resp:
                data = resp.read()
            if len(data) < MIN_BYTES:
                raise ValueError(f"too small ({len(data)} bytes)")
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return progress_key(task), True, f"ok ({len(data) // 1024}KB)"
        except urllib.error.HTTPError as e:
            if e.code in (429, 502, 503) and attempt < RETRIES:
                time.sleep(8 * attempt)
                continue
            if attempt == RETRIES:
                return progress_key(task), False, str(e)
        except Exception as e:
            if attempt == RETRIES:
                return progress_key(task), False, str(e)
            time.sleep(3 * attempt)
    return progress_key(task), False, "unknown"


def copy_shared_writing(tasks: list[dict]) -> None:
    """writing.jpg 各课共用，生成一份后复制到其余目录。"""
    writers = [t for t in tasks if t["filename"] == "writing.jpg"]
    if not writers:
        return
    master = None
    for t in writers:
        p = img_path(t)
        if p.exists() and p.stat().st_size >= MIN_BYTES:
            master = p
            break
    if not master:
        return
    for t in writers:
        dest = img_path(t)
        if not dest.exists() or dest.stat().st_size < MIN_BYTES:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(master, dest)


def cmd_audit(waves: list[int] | None) -> None:
    tasks = collect_tasks(waves)
    missing = []
    have = 0
    for t in tasks:
        p = img_path(t)
        if p.exists() and p.stat().st_size >= MIN_BYTES:
            have += 1
        else:
            missing.append(progress_key(t))
    print(
        json.dumps(
            {
                "total": len(tasks),
                "local_ok": have,
                "missing": len(missing),
                "missing_sample": missing[:15],
            },
            indent=2,
            ensure_ascii=False,
        )
    )


def cmd_generate(waves: list[int] | None, limit: int | None) -> None:
    tasks = collect_tasks(waves)
    progress = load_progress()
    done = set(progress.get("generated", []))
    pending = [t for t in tasks if progress_key(t) not in done and not (img_path(t).exists() and img_path(t).stat().st_size >= MIN_BYTES)]
    if limit:
        pending = pending[:limit]
    print(f"待生成 {len(pending)} 张（共 {len(tasks)} 引用）")

    if not pending:
        print("全部已生成。")
        copy_shared_writing(tasks)
        return

    ok = fail = 0
    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futures = {pool.submit(download_one, t): t for t in pending}
        for i, fut in enumerate(as_completed(futures), 1):
            key, success, msg = fut.result()
            if success:
                ok += 1
                if key not in progress["generated"]:
                    progress["generated"].append(key)
            else:
                fail += 1
                progress.setdefault("failed", [])
                progress["failed"] = [x for x in progress["failed"] if x.get("key") != key]
                progress["failed"].append({"key": key, "error": msg})
            print(f"[{i}/{len(pending)}] {'OK' if success else 'FAIL'} {key}: {msg}")
            if i % 5 == 0:
                save_progress(progress)

    save_progress(progress)
    copy_shared_writing(tasks)
    print(f"\n完成: 成功 {ok}, 失败 {fail}, 累计 {len(progress['generated'])}")


def cos_prefix_for_folder(folder: str) -> str:
    return f"s-class/{folder}/assets/img/"


def get_cos_client():
    config_path = ROOT / ".cos-config.json"
    secret_id = os.environ.get("COS_SECRET_ID") or os.environ.get("TENCENT_SECRET_ID")
    secret_key = os.environ.get("COS_SECRET_KEY") or os.environ.get("TENCENT_SECRET_KEY")
    bucket = "s-class-1403296481"
    region = "ap-chengdu"
    if config_path.exists():
        cfg = json.loads(config_path.read_text(encoding="utf-8"))
        secret_id = secret_id or cfg.get("SecretId")
        secret_key = secret_key or cfg.get("SecretKey")
        bucket = cfg.get("Bucket", bucket)
        region = cfg.get("Region", region)
    if not secret_id or not secret_key:
        return None
    try:
        from qcloud_cos import CosConfig, CosS3Client
    except ImportError:
        import subprocess

        subprocess.check_call([sys.executable, "-m", "pip", "install", "cos-python-sdk-v5", "-q"])
        from qcloud_cos import CosConfig, CosS3Client
    return CosS3Client(CosConfig(Region=region, SecretId=secret_id, SecretKey=secret_key)), bucket


def cmd_upload(waves: list[int] | None) -> None:
    result = get_cos_client()
    if not result:
        print("WARN: 无 COS 凭证，跳过上传（本地 assets/img/ 已可用于 localhost 预览）")
        return
    client, bucket = result
    progress = load_progress()
    uploaded = set(progress.get("uploaded", []))
    tasks = collect_tasks(waves)
    pending = []
    for t in tasks:
        fp = img_path(t)
        key = progress_key(t)
        if fp.exists() and key not in uploaded:
            pending.append((t, fp))
    print(f"待上传 {len(pending)} 张")
    ok = fail = 0
    for i, (t, fp) in enumerate(pending, 1):
        cos_key = cos_prefix_for_folder(t["folder"]) + fp.name
        try:
            with open(fp, "rb") as f:
                client.put_object(Bucket=bucket, Body=f, Key=cos_key, ContentType="image/jpeg")
            uploaded.add(progress_key(t))
            progress["uploaded"] = sorted(uploaded)
            ok += 1
            print(f"[{i}/{len(pending)}] OK {cos_key}")
        except Exception as e:
            fail += 1
            print(f"[{i}/{len(pending)}] FAIL {fp.name}: {e}")
        if i % 10 == 0:
            save_progress(progress)
    save_progress(progress)
    print(f"上传完成: 成功 {ok}, 失败 {fail}")


def main() -> None:
    parser = argparse.ArgumentParser(description="KP 课件批量配图")
    parser.add_argument("command", choices=["audit", "generate", "upload", "all"], nargs="?", default="audit")
    parser.add_argument("--wave", type=int, action="append", help="仅处理指定 wave，可重复")
    parser.add_argument("--limit", type=int, help="最多生成张数")
    args = parser.parse_args()
    waves = args.wave or None
    if args.command == "audit":
        cmd_audit(waves)
    elif args.command == "generate":
        cmd_generate(waves, args.limit)
    elif args.command == "upload":
        cmd_upload(waves)
    elif args.command == "all":
        cmd_generate(waves, args.limit)
        cmd_upload(waves)


if __name__ == "__main__":
    main()
