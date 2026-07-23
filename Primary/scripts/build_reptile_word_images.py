#!/usr/bin/env python3
"""生成爬行动物课程 46 词配图并上传腾讯 COS。"""
from __future__ import annotations

import json
import os
import re
import sys
import urllib.request
from io import BytesIO
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COURSE = ROOT / "Primary" / "What are reptiles" / "what-are-reptiles-courseware"
WORD_DIR = COURSE / "images" / "words"
IMG_DIR = COURSE / "images"
COS_REL = "Primary/What are reptiles/what-are-reptiles-courseware/images"

# BBC + Wikimedia（教育用途配图）
WORD_SOURCES: dict[str, str] = {
    "reptile": "https://ichef.bbci.co.uk/images/ic/1200xn/p0jqtwdd.png",
    "scale": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg",
    "skin": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/330px-Nile_crocodile_head.jpg",
    "vertebrate": "https://ichef.bbci.co.uk/images/ic/800xn/p0nyj7m7.jpg",
    "backbone": "https://ichef.bbci.co.uk/images/ic/800xn/p0nyj7m7.jpg",
    "cold-blooded": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dvr.jpg",
    "species": "https://ichef.bbci.co.uk/images/ic/1200xn/p0jqtwdd.png",
    "snake": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg",
    "lizard": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg",
    "tortoise": "https://ichef.bbci.co.uk/images/ic/1200xn/p0k5kbmq.jpg",
    "turtle": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dvr.jpg",
    "crocodile": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/330px-Nile_crocodile_head.jpg",
    "alligator": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/330px-Nile_crocodile_head.jpg",
    "chameleon": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dzp.jpg",
    "tuatara": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg",
    "fossil": "https://ichef.bbci.co.uk/images/ic/800xn/p0nyj7m7.jpg",
    "dinosaur": "https://ichef.bbci.co.uk/images/ic/800xn/p0nyj7m7.jpg",
    "egg": "https://ichef.bbci.co.uk/images/ic/1200xn/p0k5kbmq.jpg",
    "lung": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg",
    "limb": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg",
    "exoskeleton": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dvr.jpg",
    "shell": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dvr.jpg",
    "carnivore": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/330px-Nile_crocodile_head.jpg",
    "herbivore": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dvr.jpg",
    "predator": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/330px-Nile_crocodile_head.jpg",
    "prey": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg",
    "hunt": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/330px-Nile_crocodile_head.jpg",
    "breathe": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg",
    "water": "https://ichef.bbci.co.uk/images/ic/1200xn/p0b1sszy.jpg",
    "land": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg",
    "continent": "https://ichef.bbci.co.uk/images/ic/1200xn/p0b1sszy.jpg",
    "antarctica": "https://ichef.bbci.co.uk/images/ic/1200xn/p0b1sszy.jpg",
    "rare": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg",
    "shy": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg",
    "tail": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg",
    "meat": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/330px-Nile_crocodile_head.jpg",
    "plant": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dvr.jpg",
    "evolve": "https://ichef.bbci.co.uk/images/ic/800xn/p0nyj7m7.jpg",
    "discover": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg",
    "heathland": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg",
    "moor": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg",
    "adder": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg",
    "iguana": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74dzp.jpg",
    "skink": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg",
    "amphibian": "https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg",
    "mammal": "https://ichef.bbci.co.uk/images/ic/1200xn/p0k5kbmq.jpg",
}

FALLBACK = "https://ichef.bbci.co.uk/images/ic/1200xn/p0jqtwdd.png"


def slug(word: str) -> str:
    return word.lower().replace(" ", "-")


def download(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (s-class)"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()


def make_card(word: str, photo_bytes: bytes, out: Path) -> None:
    from PIL import Image, ImageDraw, ImageFont

    W, H = 600, 600
    canvas = Image.new("RGB", (W, H), (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((8, 8, W - 8, H - 8), radius=24, outline=(46, 125, 50), width=4)

    try:
        photo = Image.open(BytesIO(photo_bytes)).convert("RGBA")
    except Exception:
        photo = Image.new("RGBA", (400, 400), (232, 245, 233, 255))

    area_w, area_h = W - 48, H - 100
    photo.thumbnail((area_w, area_h), Image.Resampling.LANCZOS)
    px = (W - photo.width) // 2
    py = 36 + (area_h - photo.height) // 2
    if photo.mode == "RGBA":
        canvas.paste(photo, (px, py), photo)
    else:
        canvas.paste(photo, (px, py))

    label = word.capitalize() if word != "cold-blooded" else "Cold-blooded"
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 36)
    except OSError:
        font = ImageFont.load_default()
    tw = draw.textlength(label, font=font)
    draw.text(((W - tw) / 2, H - 56), label, fill=(27, 94, 32), font=font)
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out, "PNG", optimize=True)


def make_icon(text: str, bg: tuple, out: Path) -> None:
    from PIL import Image, ImageDraw, ImageFont

    img = Image.new("RGB", (128, 128), bg)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((4, 4, 124, 124), radius=20, outline=(255, 255, 255), width=3)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 52)
    except OSError:
        font = ImageFont.load_default()
    tw = draw.textlength(text, font=font)
    draw.text(((128 - tw) / 2, 32), text, fill=(255, 255, 255), font=font)
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "PNG")


def get_cos_config() -> dict | None:
    cfg_path = ROOT / ".cos-config.json"
    if cfg_path.exists():
        cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
        if cfg.get("SecretId") and cfg.get("SecretKey"):
            return cfg
    sid = os.environ.get("COS_SECRET_ID")
    sk = os.environ.get("COS_SECRET_KEY")
    if sid and sk:
        return {"SecretId": sid, "SecretKey": sk, "Bucket": "s-class-1403296481", "Region": "ap-chengdu", "CosPrefix": "s-class/"}
    return None


def upload_file(local: Path, rel_key: str, cfg: dict) -> str:
    from qcloud_cos import CosConfig, CosS3Client

    prefix = cfg.get("CosPrefix", "s-class/").rstrip("/") + "/"
    key = prefix + rel_key
    client = CosS3Client(CosConfig(Region=cfg["Region"], SecretId=cfg["SecretId"], SecretKey=cfg["SecretKey"]))
    ct = "image/png" if local.suffix.lower() == ".png" else "image/jpeg"
    with open(local, "rb") as f:
        client.put_object(Bucket=cfg["Bucket"], Body=f, Key=key, ContentType=ct)
    return f"https://{cfg['Bucket']}.cos.{cfg['Region']}.myqcloud.com/{key}"


def build_words(force: bool = False) -> list[Path]:
    # 清除旧的海豚课程配图
    if WORD_DIR.exists():
        for p in WORD_DIR.glob("*.png"):
            if p.stem not in WORD_SOURCES and p.stem not in {"snake", "tortoise", "cold-blooded"}:
                p.unlink()
            elif p.stem in {"dolphin", "fin", "flipper", "blowhole", "seaweed", "ocean"}:
                p.unlink()

    made: list[Path] = []
    for word, url in WORD_SOURCES.items():
        out = WORD_DIR / f"{word}.png"
        if out.exists() and out.stat().st_size > 5000 and not force:
            made.append(out)
            continue
        try:
            raw = download(url)
        except Exception as e:
            print(f"  ⚠ {word}: 下载失败 ({e})，使用备用图")
            raw = download(FALLBACK)
        make_card(word, raw, out)
        print(f"  ✓ {out.name} ({out.stat().st_size // 1024} KB)")
        made.append(out)
    return made


def build_assets() -> list[Path]:
    assets: list[Path] = []
    hero_raw = download("https://ichef.bbci.co.uk/images/ic/1200xn/p0jqtwdd.png")
    hero = IMG_DIR / "course-hero.png"
    make_card("Reptiles", hero_raw, hero)
    assets.append(hero)
    make_icon("📖", (46, 125, 50), IMG_DIR / "icon-learn.png")
    make_icon("🎮", (27, 94, 32), IMG_DIR / "icon-activities.png")
    assets.extend([IMG_DIR / "icon-learn.png", IMG_DIR / "icon-activities.png"])
    print("  ✓ course-hero.png, icon-learn.png, icon-activities.png")
    return assets


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--upload-only", action="store_true")
    parser.add_argument("--skip-upload", action="store_true")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    if not args.upload_only:
        print("生成 46 词配图…")
        files = build_words(force=args.force)
        files.extend(build_assets())
    else:
        files = list(WORD_DIR.glob("*.png")) + list(IMG_DIR.glob("*.png"))

    if args.skip_upload:
        return

    cfg = get_cos_config()
    if not cfg:
        print("⚠ 未配置 COS，跳过上传")
        return

    print("上传到腾讯 COS…")
    for local in sorted(set(files)):
        if not local.is_file():
            continue
        rel = f"{COS_REL}/{local.parent.name}/{local.name}"
        if local.parent.name == "images" and local.name.startswith(("course-", "icon-")):
            rel = f"{COS_REL}/{local.name}"
        url = upload_file(local, rel, cfg)
        print(f"  ✓ {rel}")


if __name__ == "__main__":
    main()
