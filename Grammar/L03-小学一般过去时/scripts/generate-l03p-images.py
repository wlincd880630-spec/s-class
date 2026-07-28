#!/usr/bin/env python3
"""
L03 小学一般过去时 · 批量生成配图（Pollinations flux）并上传腾讯云 COS。

用法:
  python3 Grammar/L03-小学一般过去时/scripts/generate-l03p-images.py audit
  python3 Grammar/L03-小学一般过去时/scripts/generate-l03p-images.py generate
  python3 Grammar/L03-小学一般过去时/scripts/generate-l03p-images.py upload
  python3 Grammar/L03-小学一般过去时/scripts/generate-l03p-images.py all

凭证: 项目根 .cos-config.json 或 COS_SECRET_ID / COS_SECRET_KEY
"""
from __future__ import annotations

import json
import os
import random
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
L03 = Path(__file__).resolve().parents[1]
ASSETS = L03 / "assets"
IMG_DIR = ASSETS / "img"
CORPUS_JSON = ASSETS / "_deepseek-corpus.json"
PROGRESS_FILE = L03 / ".image-progress.json"
COS_PREFIX = "s-class/Grammar/L03-小学一般过去时/assets/img/"
COS_BUCKET = "s-class-1403296481"
COS_REGION = "ap-chengdu"

STYLE = (
    "Children's educational crayon illustration, warm paper texture, soft colors, "
    "clear focal subject, no text, no letters, no words, no captions, no watermarks, "
    "no logos, friendly elementary-school textbook style. Scene: "
)

EXTRA = [
    {
        "filename": "l03p-scene-lily-did-not-go-to-school-yesterday.jpg",
        "sentence": "Lily did not go to school yesterday.",
        "prompt": "A girl staying home by the window while other children walk to school with backpacks outside, cozy home interior, gentle crayon illustration",
    },
    {
        "filename": "l03p-scene-lily-did-not-play-football-in-the-park-yester.jpg",
        "sentence": "Lily didn't play football in the park yesterday.",
        "prompt": "A girl sitting on a park bench reading a book while other children play football in the background, sunny park, crayon children's book style",
    },
    {
        "filename": "l03p-scene-tom-finished-his-homework-last-night.jpg",
        "sentence": "Tom finished his homework last night.",
        "prompt": "A boy smiling at a desk with closed homework notebook and pencil, desk lamp on, evening window, proud satisfied expression, crayon illustration",
    },
]

WORKERS = 3
MIN_BYTES = 8000
RETRIES = 5
REQUEST_DELAY = 2.0


def slugify(en: str) -> str:
    return re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", str(en or "").lower()))[:48]


def img_name(prefix: str, en: str, i: int = 1) -> str:
    return prefix + (slugify(en) or f"scene-{i}") + ".jpg"


def load_corpus() -> dict:
    return json.loads(CORPUS_JSON.read_text(encoding="utf-8"))


def collect_refs() -> set[str]:
    refs: set[str] = set()
    scenes = (ASSETS / "l03p-scenes.js").read_text(encoding="utf-8")
    refs.update(re.findall(r"l03p-[a-z0-9-]+\.jpg", scenes))
    for name in ("l03p-data.js", "l03p-corpus.js"):
        refs.update(re.findall(r"l03p-[a-z0-9-]+\.jpg", (ASSETS / name).read_text(encoding="utf-8")))
    return refs


def build_manifest() -> list[dict]:
    corpus = load_corpus()
    hints: dict[str, str] = {}
    sentences: dict[str, str] = {}

    for i, s in enumerate(corpus.get("sceneSentences", [])):
        fn = img_name("l03p-scene-", s["en"], i + 1)
        hints[fn] = s.get("imageHint") or s["en"]
        sentences[fn] = s["en"]

    for kind, key in [
        ("reg", "vocabRegular"),
        ("irr", "vocabIrregular"),
        ("time", "vocabTime"),
        ("be", "vocabBePast"),
    ]:
        for i, v in enumerate(corpus.get(key, [])):
            ex = v.get("example") or v.get("word", "")
            fn = img_name(f"l03p-{kind}-", ex, i + 1)
            hints[fn] = v.get("imageHint") or ex
            sentences[fn] = ex

    for item in EXTRA:
        hints[item["filename"]] = item["prompt"]
        sentences[item["filename"]] = item["sentence"]

    local = {p.name for p in IMG_DIR.iterdir()} if IMG_DIR.exists() else set()
    refs = collect_refs()
    tasks = []
    for fn in sorted(refs):
        if fn in local:
            continue
        hint = hints.get(fn, fn)
        tasks.append(
            {
                "filename": fn,
                "sentence": sentences.get(fn, ""),
                "prompt": STYLE + hint,
                "seed": abs(hash(fn)) % 10_000_000,
            }
        )
    return tasks


def load_progress() -> dict:
    if PROGRESS_FILE.exists():
        return json.loads(PROGRESS_FILE.read_text(encoding="utf-8"))
    return {"generated": [], "uploaded": [], "failed": []}


def save_progress(p: dict) -> None:
    PROGRESS_FILE.write_text(json.dumps(p, indent=2, ensure_ascii=False), encoding="utf-8")


def pollinations_url(prompt: str, seed: int) -> str:
    q = urllib.parse.urlencode(
        {
            "width": "800",
            "height": "450",
            "model": "flux",
            "nologo": "true",
            "seed": str(seed),
        }
    )
    return f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?{q}"


def download_one(task: dict) -> tuple[str, bool, str]:
    dest = IMG_DIR / task["filename"]
    if dest.exists() and dest.stat().st_size >= MIN_BYTES:
        return task["filename"], True, "exists"

    url = pollinations_url(task["prompt"], task["seed"])
    for attempt in range(1, RETRIES + 1):
        try:
            time.sleep(REQUEST_DELAY + random.uniform(0, 1.0))
            req = urllib.request.Request(url, headers={"User-Agent": "s-class-l03p/1.0"})
            with urllib.request.urlopen(req, timeout=180) as resp:
                data = resp.read()
            if len(data) < MIN_BYTES:
                raise ValueError(f"too small ({len(data)} bytes)")
            IMG_DIR.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return task["filename"], True, f"ok ({len(data) // 1024}KB)"
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < RETRIES:
                time.sleep(6 * attempt)
                continue
            if attempt == RETRIES:
                return task["filename"], False, str(e)
        except Exception as e:
            if attempt == RETRIES:
                return task["filename"], False, str(e)
            time.sleep(2 * attempt)
    return task["filename"], False, "unknown"


def cmd_audit() -> None:
    local = {p.name for p in IMG_DIR.iterdir()} if IMG_DIR.exists() else set()
    refs = collect_refs()
    missing = sorted(f for f in refs if f not in local)
    tasks = build_manifest()
    print(json.dumps({
        "local": len(local),
        "referenced": len(refs),
        "missing": len(missing),
        "to_generate": len(tasks),
        "missing_files": missing,
    }, indent=2, ensure_ascii=False))


def cmd_generate() -> None:
    tasks = build_manifest()
    progress = load_progress()
    done = set(progress.get("generated", []))
    pending = [t for t in tasks if t["filename"] not in done]
    print(f"待生成 {len(pending)} / {len(tasks)} 张")

    if not pending:
        print("全部已生成。")
        return

    ok = fail = 0
    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futures = {pool.submit(download_one, t): t for t in pending}
        for i, fut in enumerate(as_completed(futures), 1):
            fname, success, msg = fut.result()
            if success:
                ok += 1
                if fname not in progress["generated"]:
                    progress["generated"].append(fname)
            else:
                fail += 1
                progress.setdefault("failed", [])
                progress["failed"] = [x for x in progress["failed"] if x.get("file") != fname]
                progress["failed"].append({"file": fname, "error": msg})
            print(f"[{i}/{len(pending)}] {'OK' if success else 'FAIL'} {fname}: {msg}")
            if i % 5 == 0:
                save_progress(progress)

    save_progress(progress)
    print(f"\n完成: 成功 {ok}, 失败 {fail}, 累计 {len(progress['generated'])}/{len(tasks)}")


def get_cos_client():
    config_path = ROOT / ".cos-config.json"
    secret_id = os.environ.get("COS_SECRET_ID") or os.environ.get("TENCENT_SECRET_ID")
    secret_key = os.environ.get("COS_SECRET_KEY") or os.environ.get("TENCENT_SECRET_KEY")
    bucket = COS_BUCKET
    region = COS_REGION

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


def cmd_upload() -> None:
    result = get_cos_client()
    if not result:
        print("WARN: 无 COS 凭证，跳过上传（图片已保存本地，站点会走 onerror 回退）")
        return
    client, bucket = result
    progress = load_progress()
    uploaded = set(progress.get("uploaded", []))
    files = sorted(IMG_DIR.glob("l03p-*.jpg"))
    pending = [f for f in files if f.name not in uploaded]
    print(f"待上传 {len(pending)} / {len(files)} 张")

    ok = fail = 0
    for i, fp in enumerate(pending, 1):
        key = COS_PREFIX + fp.name
        try:
            with open(fp, "rb") as f:
                client.put_object(Bucket=bucket, Body=f, Key=key, ContentType="image/jpeg")
            uploaded.add(fp.name)
            progress["uploaded"] = sorted(uploaded)
            ok += 1
            print(f"[{i}/{len(pending)}] OK {fp.name}")
        except Exception as e:
            fail += 1
            print(f"[{i}/{len(pending)}] FAIL {fp.name}: {e}")
        if i % 10 == 0:
            save_progress(progress)

    save_progress(progress)
    print(f"\n上传完成: 成功 {ok}, 失败 {fail}")


def main() -> None:
    cmd = sys.argv[1] if len(sys.argv) > 1 else "audit"
    if cmd == "audit":
        cmd_audit()
    elif cmd == "generate":
        cmd_generate()
    elif cmd == "upload":
        cmd_upload()
    elif cmd == "all":
        cmd_generate()
        cmd_upload()
    else:
        print(__doc__)


if __name__ == "__main__":
    main()
