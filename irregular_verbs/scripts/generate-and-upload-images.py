#!/usr/bin/env python3
"""
批量生成不规则动词配图（Pollinations flux）并上传腾讯云 COS。

用法:
  python3 irregular_verbs/scripts/generate-and-upload-images.py generate
  python3 irregular_verbs/scripts/generate-and-upload-images.py upload
  python3 irregular_verbs/scripts/generate-and-upload-images.py all
  python3 irregular_verbs/scripts/generate-and-upload-images.py status

需要 COS 凭证（其一）:
  - 项目根目录 .cos-config.json
  - 环境变量 COS_SECRET_ID / COS_SECRET_KEY
"""
from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
IMG_DIR = ROOT / "irregular_verbs" / "images"
DATA_JS = ROOT / "irregular_verbs" / "verbs-data.js"
PROGRESS_FILE = ROOT / "irregular_verbs" / ".image-progress.json"
COS_PREFIX = "s-class/irregular_verbs/images/"
COS_BUCKET = "s-class-1403296481"
COS_REGION = "ap-chengdu"

STYLE = (
    "Premium 3D cartoon illustration, Pixar Disney style, soft cinematic lighting, "
    "vibrant warm colors, educational scene for Chinese junior high school English textbook, "
    "cute stylized characters, highly detailed, positive mood. "
    "No text, no letters, no words, no captions, no watermarks, no logos. "
)

WORKERS = 4
MIN_BYTES = 8000
RETRIES = 3


def load_verbs() -> list[dict]:
    raw = DATA_JS.read_text(encoding="utf-8")
    m = re.search(r"window\.IRREGULAR_VERBS_DATA\s*=\s*(\{.*\})\s*;", raw, re.S)
    if not m:
        raise SystemExit("无法解析 verbs-data.js")
    data = json.loads(m.group(1))
    return data["verbs"]


def load_progress() -> dict:
    if PROGRESS_FILE.exists():
        return json.loads(PROGRESS_FILE.read_text(encoding="utf-8"))
    return {"generated": [], "uploaded": [], "failed": []}


def save_progress(p: dict) -> None:
    PROGRESS_FILE.write_text(json.dumps(p, indent=2, ensure_ascii=False), encoding="utf-8")


def build_tasks(verbs: list[dict]) -> list[dict]:
    tasks = []
    for v in verbs:
        vid = v["id"]
        tasks.append({
            "file": f"{vid}.png",
            "prompt": f"{STYLE} Scene illustrating the English verb '{v['base']}' meaning '{v['cn']}'. Clear visual metaphor, school-life context.",
            "seed": hash(vid) % 10_000_000,
        })
        for key, label in [("present", "present simple daily life"), ("past", "past simple yesterday memory"), ("perfect", "present perfect experience result")]:
            ex = v["examples"][key]
            tasks.append({
                "file": f"{vid}_{key}.png",
                "prompt": f"{STYLE} Scene for English sentence meaning: {ex['en']}. Context: {ex['cn']}. Tense mood: {label}.",
                "seed": hash(f"{vid}-{key}") % 10_000_000,
            })
    return tasks


def pollinations_url(prompt: str, seed: int) -> str:
    q = urllib.parse.urlencode({
        "width": "800",
        "height": "450",
        "model": "flux",
        "nologo": "true",
        "seed": str(seed),
    })
    return f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?{q}"


def download_one(task: dict) -> tuple[str, bool, str]:
    dest = IMG_DIR / task["file"]
    if dest.exists() and dest.stat().st_size >= MIN_BYTES:
        return task["file"], True, "exists"

    url = pollinations_url(task["prompt"], task["seed"])
    for attempt in range(1, RETRIES + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "s-class-irregular-verbs/1.0"})
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = resp.read()
            if len(data) < MIN_BYTES:
                raise ValueError(f"too small ({len(data)} bytes)")
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return task["file"], True, f"ok ({len(data)//1024}KB)"
        except Exception as e:
            if attempt == RETRIES:
                return task["file"], False, str(e)
            time.sleep(2 * attempt)
    return task["file"], False, "unknown"


def cmd_generate() -> None:
    verbs = load_verbs()
    tasks = build_tasks(verbs)
    progress = load_progress()
    done = set(progress.get("generated", []))
    pending = [t for t in tasks if t["file"] not in done]
    print(f"总计 {len(tasks)} 张，已完成 {len(done)}，待生成 {len(pending)}")

    if not pending:
        print("全部图片已生成。")
        return

    ok = 0
    fail = 0
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
                if fname not in progress["failed"]:
                    progress["failed"].append({"file": fname, "error": msg})
            print(f"[{i}/{len(pending)}] {'OK' if success else 'FAIL'} {fname}: {msg}")
            if i % 10 == 0:
                save_progress(progress)

    save_progress(progress)
    print(f"\n生成完成: 成功 {ok}, 失败 {fail}, 累计 {len(progress['generated'])}/{len(tasks)}")


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

    client = CosS3Client(CosConfig(Region=region, SecretId=secret_id, SecretKey=secret_key))
    return client, bucket


def cmd_upload() -> None:
    result = get_cos_client()
    if not result:
        raise SystemExit(
            "缺少 COS 凭证。请在项目根目录创建 .cos-config.json，或设置 COS_SECRET_ID / COS_SECRET_KEY。"
        )
    client, bucket = result
    progress = load_progress()
    uploaded = set(progress.get("uploaded", []))

    files = sorted(IMG_DIR.glob("*.png"))
    pending = [f for f in files if f.name not in uploaded]
    print(f"本地图片 {len(files)} 张，待上传 {len(pending)} 张")

    ok = fail = 0
    for i, fp in enumerate(pending, 1):
        key = COS_PREFIX + fp.name
        try:
            with open(fp, "rb") as f:
                client.put_object(Bucket=bucket, Body=f, Key=key, ContentType="image/png")
            uploaded.add(fp.name)
            progress["uploaded"] = sorted(uploaded)
            ok += 1
            print(f"[{i}/{len(pending)}] OK {key}")
        except Exception as e:
            fail += 1
            print(f"[{i}/{len(pending)}] FAIL {fp.name}: {e}")
        if i % 20 == 0:
            save_progress(progress)

    save_progress(progress)
    print(f"\n上传完成: 成功 {ok}, 失败 {fail}, 累计 {len(uploaded)} 张")


def cmd_status() -> None:
    verbs = load_verbs()
    tasks = build_tasks(verbs)
    progress = load_progress()
    local = list(IMG_DIR.glob("*.png")) if IMG_DIR.exists() else []
    print(json.dumps({
        "total_expected": len(tasks),
        "local_files": len(local),
        "generated_tracked": len(progress.get("generated", [])),
        "uploaded_tracked": len(progress.get("uploaded", [])),
        "failed": len(progress.get("failed", [])),
    }, indent=2, ensure_ascii=False))


def main() -> None:
    cmd = sys.argv[1] if len(sys.argv) > 1 else "status"
    if cmd == "generate":
        cmd_generate()
    elif cmd == "upload":
        cmd_upload()
    elif cmd == "all":
        cmd_generate()
        cmd_upload()
    elif cmd == "status":
        cmd_status()
    else:
        print(__doc__)


if __name__ == "__main__":
    main()
