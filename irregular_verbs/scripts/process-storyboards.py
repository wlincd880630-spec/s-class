#!/usr/bin/env python3
"""将 2×2 Verb Atlas 故事板切成四张 WebP，并可上传腾讯云 COS。

用法：
  python3 irregular_verbs/scripts/process-storyboards.py crop /opt/cursor/artifacts/assets
  python3 irregular_verbs/scripts/process-storyboards.py upload
  python3 irregular_verbs/scripts/process-storyboards.py all /opt/cursor/artifacts/assets
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = ROOT / "irregular_verbs" / "images-v2"
CONFIG_PATH = ROOT / ".cos-config.json"
PREFIX = "s-class/irregular_verbs/images-v2/"
VERB_IDS = [
    "be", "beat", "become", "begin", "break", "bring", "build", "buy", "can", "catch",
    "choose", "come", "cost", "cut", "do", "draw", "drink", "drive", "eat", "fall",
    "feel", "fight", "find", "fly", "forget", "get", "give", "go", "grow", "hang",
    "have", "hear", "hit", "hurt", "hold", "keep", "know", "lead", "leave", "lend",
    "let", "lie", "light", "lose", "make", "mean", "meet", "pay", "put", "read",
    "ride", "ring", "rise", "run", "say", "see", "sell", "send", "set", "shoot",
    "show", "sing", "sit", "sleep", "speak", "spend", "stand", "steal", "strike",
    "swim", "take", "teach", "tell", "think", "throw", "understand", "wake", "wear",
    "win", "write",
]
PANELS = (
    ("", 0, 0),
    ("_present", 1, 0),
    ("_past", 0, 1),
    ("_perfect", 1, 1),
)


def source_for(source_dir: Path, verb_id: str) -> Path:
    return source_dir / f"verbverse_{verb_id}_storyboard.png"


def crop_panel(image: Image.Image, col: int, row: int) -> Image.Image:
    width, height = image.size
    half_w, half_h = width // 2, height // 2
    gutter = max(4, round(min(width, height) * 0.006))
    left = 0 if col == 0 else half_w + gutter
    top = 0 if row == 0 else half_h + gutter
    right = half_w - gutter if col == 0 else width
    bottom = half_h - gutter if row == 0 else height
    panel = image.crop((left, top, right, bottom))
    return panel.resize((960, 640), Image.Resampling.LANCZOS)


def crop_all(source_dir: Path) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    missing: list[str] = []
    created = 0
    for verb_id in VERB_IDS:
        source = source_for(source_dir, verb_id)
        if not source.exists():
            missing.append(source.name)
            continue
        with Image.open(source) as image:
            rgb = image.convert("RGB")
            for suffix, col, row in PANELS:
                output = OUTPUT_DIR / f"{verb_id}{suffix}.webp"
                crop_panel(rgb, col, row).save(
                    output,
                    "WEBP",
                    quality=90,
                    method=6,
                )
                created += 1
    if missing:
        raise SystemExit("缺少故事板：\n" + "\n".join(missing))
    print(f"已生成 {created} 张 WebP → {OUTPUT_DIR}")


def load_config() -> dict:
    config: dict = {}
    if CONFIG_PATH.exists():
        config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    secret_id = os.getenv("COS_SECRET_ID") or config.get("SecretId")
    secret_key = os.getenv("COS_SECRET_KEY") or config.get("SecretKey")
    if not secret_id or not secret_key:
        raise SystemExit("缺少 COS_SECRET_ID/COS_SECRET_KEY 或 .cos-config.json")
    return {
        "SecretId": secret_id,
        "SecretKey": secret_key,
        "Bucket": config.get("Bucket", "s-class-1403296481"),
        "Region": config.get("Region", "ap-chengdu"),
    }


def upload_all() -> None:
    try:
        from qcloud_cos import CosConfig, CosS3Client
    except ImportError as exc:
        raise SystemExit("请先安装 cos-python-sdk-v5") from exc

    files = sorted(OUTPUT_DIR.glob("*.webp"))
    expected = len(VERB_IDS) * len(PANELS)
    if len(files) != expected:
        raise SystemExit(f"图片数量不完整：{len(files)}/{expected}")

    config = load_config()
    client = CosS3Client(
        CosConfig(
            Region=config["Region"],
            SecretId=config["SecretId"],
            SecretKey=config["SecretKey"],
        )
    )
    failures: list[str] = []
    for index, file in enumerate(files, 1):
        key = PREFIX + file.name
        try:
            with file.open("rb") as stream:
                client.put_object(
                    Bucket=config["Bucket"],
                    Key=key,
                    Body=stream,
                    ContentType="image/webp",
                    CacheControl="public, max-age=31536000, immutable",
                )
            print(f"[{index}/{expected}] OK {key}")
        except Exception as exc:  # noqa: BLE001 - report every COS failure
            failures.append(f"{file.name}: {exc}")
            print(f"[{index}/{expected}] FAIL {file.name}: {exc}")
    if failures:
        raise SystemExit(f"上传失败 {len(failures)} 张")
    print(f"上传完成：{expected}/{expected}")


def main() -> None:
    command = sys.argv[1] if len(sys.argv) > 1 else "status"
    source_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("/opt/cursor/artifacts/assets")
    if command in {"crop", "all"}:
        crop_all(source_dir)
    if command in {"upload", "all"}:
        upload_all()
    if command == "status":
        print(f"故事板：{sum(source_for(source_dir, verb).exists() for verb in VERB_IDS)}/{len(VERB_IDS)}")
        print(f"WebP：{len(list(OUTPUT_DIR.glob('*.webp')))}/{len(VERB_IDS) * len(PANELS)}")
    elif command not in {"crop", "upload", "all"}:
        raise SystemExit(__doc__)


if __name__ == "__main__":
    main()
