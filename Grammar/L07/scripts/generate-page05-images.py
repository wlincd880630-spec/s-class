#!/usr/bin/env python3
"""
L07 Page 05 · more + 形容词 — 卡通 3D 左右对比配图。

推荐：用 Cursor GenerateImage（Composer）按 SCENES 提示词逐张生成，
保存到 Grammar/L07/assets/page05-more-comp/，再执行 upload。

备用批量生成（Pollinations turbo，质量较低）:
  python3 Grammar/L07/scripts/generate-page05-images.py generate

上传 COS:
  node Grammar/L07/scripts/upload-page05-images.mjs
  # 或 python3 ... generate-page05-images.py upload
"""
from __future__ import annotations

import json
import os
import random
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
L07 = Path(__file__).resolve().parents[1]
IMG_DIR = L07 / "assets" / "page05-more-comp"
PROGRESS_FILE = L07 / ".page05-image-progress.json"
COS_PREFIX = "s-class/Grammar/L07/assets/page05-more-comp/"
COS_BUCKET = "s-class-1403296481"
COS_REGION = "ap-chengdu"

STYLE = (
    "3D cartoon Pixar style, sharp focus, high detail, cinematic lighting, 16:9 widescreen. "
    "Split-screen: clear LEFT half and RIGHT half separated by white line. "
    "No text, no letters, no words, no watermark. "
)

SCENES = [
    {
        "file": "l07-p05-ex01-beautiful.png",
        "prompt": STYLE
        + "LEFT: colorful blooming garden with flowers and butterflies. RIGHT: plain dry brown yard with one wilted plant.",
    },
    {
        "file": "l07-p05-ex02-expensive.png",
        "prompt": STYLE
        + "LEFT: old basic gray feature phone scratched plastic. RIGHT: shiny premium smartphone gleaming glass gold accents luxury.",
    },
    {
        "file": "l07-p05-ex03-important.png",
        "prompt": STYLE
        + "LEFT: glowing healthy heart fresh fruits running shoes sunshine wellness. RIGHT: small pile of coins cash less emphasized.",
    },
    {
        "file": "l07-p05-ex04-interesting.png",
        "prompt": STYLE
        + "LEFT: exciting adventure storybook with dragons treasure map magical sparkles. RIGHT: boring plain gray magazine dull pages.",
    },
    {
        "file": "l07-p05-ex05-popular.png",
        "prompt": STYLE
        + "LEFT: energetic teenagers playing basketball outdoor court dynamic action. RIGHT: quiet chess board two calm players.",
    },
    {
        "file": "l07-p05-ex06-careful.png",
        "prompt": STYLE
        + "LEFT: professional taxi driver seatbelt calmly checking mirrors smooth driving. RIGHT: nervous beginner gripping wheel wide worried eyes.",
    },
    {
        "file": "l07-p05-ex07-helpful.png",
        "prompt": STYLE
        + "LEFT: modern friendly smartphone app bright helpful icons checklist smile glow. RIGHT: old clunky phone app gray confusing buttons.",
    },
    {
        "file": "l07-p05-ex08-difficult.png",
        "prompt": STYLE
        + "LEFT: complex math chalkboard equations geometric shapes puzzled student. RIGHT: simple cheerful art easel colorful paint palette easy flower painting.",
    },
    {
        "file": "l07-p05-ex09-delicious.png",
        "prompt": STYLE
        + "LEFT: steaming homemade soup bowl cozy kitchen warm lighting. RIGHT: greasy fast food takeout box unappetizing.",
    },
    {
        "file": "l07-p05-ex10-famous.png",
        "prompt": STYLE
        + "LEFT: Chengdu city adorable giant pandas bamboo traditional roofs festive lights. RIGHT: tiny quiet countryside town few houses.",
    },
    {
        "file": "l07-p05-ex11-comfortable.png",
        "prompt": STYLE
        + "LEFT: plush cozy sofa soft cushions throw blanket inviting relaxation. RIGHT: hard plain wooden stool uncomfortable.",
    },
    {
        "file": "l07-p05-ex12-dangerous.png",
        "prompt": STYLE
        + "LEFT: dark rainy night highway wet road glare limited visibility tense mood. RIGHT: bright sunny daytime road clear blue sky safe driving.",
    },
    {
        "file": "l07-p05-ex13-colorful.png",
        "prompt": STYLE
        + "LEFT: vibrant autumn forest red orange yellow leaves rainbow foliage. RIGHT: gray winter trees bare branches snow.",
    },
    {
        "file": "l07-p05-ex14-peaceful.png",
        "prompt": STYLE
        + "LEFT: serene countryside meadow farmhouse gentle hills birds calm sunset. RIGHT: busy downtown tall buildings traffic neon crowded.",
    },
    {
        "file": "l07-p05-ex15-powerful.png",
        "prompt": STYLE
        + "LEFT: large impressive rocket launching powerful flames smoke mighty energy. RIGHT: smaller toy-like rocket on pad modest size.",
    },
    {
        "file": "l07-p05-mugshots.png",
        "prompt": STYLE
        + "Humorous cartoon police lineup wall: LEFT taller slim friendly cartoon man, RIGHT shorter stockier cartoon man, height chart behind playful not scary.",
    },
    {
        "file": "l07-p05-phones.png",
        "prompt": STYLE
        + "Two smartphones on table: LEFT older budget phone plain case, RIGHT premium flagship shiny camera bump luxury finish.",
    },
    {
        "file": "l07-p05-rooms.png",
        "prompt": STYLE
        + "Two bedroom interiors: LEFT beautifully decorated plants warm lights tidy art. RIGHT plain messy room dull walls clutter.",
    },
]

WORKERS = 2
MIN_BYTES = 12000
RETRIES = 5
REQUEST_DELAY = 2.5


def load_progress() -> dict:
    if PROGRESS_FILE.exists():
        return json.loads(PROGRESS_FILE.read_text(encoding="utf-8"))
    return {"generated": [], "uploaded": [], "failed": []}


def save_progress(p: dict) -> None:
    PROGRESS_FILE.write_text(json.dumps(p, indent=2, ensure_ascii=False), encoding="utf-8")


def pollinations_url(prompt: str, seed: int) -> str:
    q = urllib.parse.urlencode(
        {
            "width": "1280",
            "height": "720",
            "model": "turbo",
            "nologo": "true",
            "seed": str(seed),
        }
    )
    return f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?{q}"


def download_one(task: dict) -> tuple[str, bool, str]:
    dest = IMG_DIR / task["file"]
    if dest.exists() and dest.stat().st_size >= MIN_BYTES:
        return task["file"], True, "exists"

    url = pollinations_url(task["prompt"], task["seed"])
    for attempt in range(1, RETRIES + 1):
        try:
            time.sleep(REQUEST_DELAY + random.uniform(0, 1.5))
            req = urllib.request.Request(url, headers={"User-Agent": "s-class-l07-page05/1.0"})
            with urllib.request.urlopen(req, timeout=180) as resp:
                data = resp.read()
            if len(data) < MIN_BYTES:
                raise ValueError(f"too small ({len(data)} bytes)")
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return task["file"], True, f"ok ({len(data) // 1024}KB)"
        except urllib.error.HTTPError as e:
            if e.code in (429, 502, 503) and attempt < RETRIES:
                time.sleep(6 * attempt)
                continue
            if attempt == RETRIES:
                return task["file"], False, str(e)
        except Exception as e:
            if attempt == RETRIES:
                return task["file"], False, str(e)
            time.sleep(3 * attempt)
    return task["file"], False, "unknown"


def build_tasks() -> list[dict]:
    tasks = []
    for i, item in enumerate(SCENES):
        tasks.append(
            {
                "file": item["file"],
                "prompt": item["prompt"],
                "seed": (hash(item["file"]) % 9_000_000) + 100_000,
            }
        )
    return tasks


def cmd_generate() -> None:
    tasks = build_tasks()
    progress = load_progress()
    done = set(progress.get("generated", []))
    pending = [t for t in tasks if t["file"] not in done]
    print(f"总计 {len(tasks)} 张，已完成 {len(done)}，待生成 {len(pending)}")

    if not pending:
        print("全部图片已生成。")
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

    files = sorted(IMG_DIR.glob("l07-p05-*.png"))
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
        if i % 10 == 0:
            save_progress(progress)

    save_progress(progress)
    print(f"\n上传完成: 成功 {ok}, 失败 {fail}, 累计 {len(uploaded)} 张")


def cmd_status() -> None:
    tasks = build_tasks()
    progress = load_progress()
    local = list(IMG_DIR.glob("l07-p05-*.png")) if IMG_DIR.exists() else []
    print(
        json.dumps(
            {
                "total_expected": len(tasks),
                "local_files": len(local),
                "generated_tracked": len(progress.get("generated", [])),
                "uploaded_tracked": len(progress.get("uploaded", [])),
                "failed": progress.get("failed", []),
            },
            indent=2,
            ensure_ascii=False,
        )
    )


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
