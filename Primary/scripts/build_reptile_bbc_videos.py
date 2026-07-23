#!/usr/bin/env python3
"""
下载 BBC Bitesize 配图 + 用官方文稿 + Azure 英音合成视频，并上传到腾讯 COS。

说明：BBC iPlayer 视频在英国境外受地理限制，无法直接抓取原片。
本脚本使用 BBC 页面嵌入的官方 transcript 与 holding images 生成课程视频（内容与 BBC 一致）。

用法：
  python3 Primary/scripts/build_reptile_bbc_videos.py
  python3 Primary/scripts/build_reptile_bbc_videos.py --upload-only
  python3 Primary/scripts/build_reptile_bbc_videos.py --skip-upload

需配置（任选其一）：
  - 项目根目录 .cos-config.json
  - 环境变量 COS_SECRET_ID / COS_SECRET_KEY
"""
from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COURSE = ROOT / "Primary" / "What are reptiles" / "what-are-reptiles-courseware"
VIDEO_DIR = COURSE / "videos"
BUILD_DIR = VIDEO_DIR / "_build"
COS_BASE = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/What%20are%20reptiles/what-are-reptiles-courseware/videos"

AZURE_KEY = os.environ.get(
    "AZURE_SPEECH_KEY",
    "3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc",
)
AZURE_REGION = os.environ.get("AZURE_SPEECH_REGION", "eastasia")
AZURE_VOICE = "en-GB-RyanNeural"

# BBC 页面官方 transcript（p0k5jtcx）
TRANSCRIPT_01 = (
    "Hi I'm Tyler and this is Marion, a Sulcata tortoise. "
    "She has dry, scaly skin making her a reptile just like crocodiles, lizards, turtles and snakes. "
    "The grass snake is the UK's longest snake and having scaly skin protects it when moving across rough ground. "
    "The adder has brown zigzags running along its skin. They're also shy and hard to find. "
    "Some reptiles like snakes haven't got any legs whilst other reptiles like sand lizards have four. "
    "The common lizard, smooth snake and slow worm can also be found living in the UK and reptiles are found living all over the world. "
    "The Komodo dragon is the heaviest lizard on earth. It lives on land. "
    "Reptiles can also live in the water like turtles. "
    "And sometimes both like the green anaconda. "
    "Nearly all reptiles lay eggs. "
    "They also breathe air like we do, so those who live in water must come up for air. "
    "As reptiles are cold-blooded they need to bask in the sun to warm themselves up and be ready for action. "
    "And if you think reptiles look a bit like dinosaurs that's because dinosaurs were reptiles! "
    "So because Marion is a reptile, that means that she lays eggs, has dry scaly skin, is cold blooded and breathes air. "
    "Oh and there she goes starting to walk off to have a sunbathe and keep warm."
)

# 第二段：BBC 课文 + Reptiles around the world 章节
TRANSCRIPT_02 = (
    "Reptiles are found on all the continents of the world except Antarctica. "
    "There are four main types of reptiles: lizards and snakes, crocodiles and alligators, turtles and tortoises, and tuatara, which are only found in New Zealand. "
    "Each reptile has its own distinct features. "
    "Snakes are reptiles which do not have limbs. "
    "The shell of a tortoise is part of its skeleton on the outside of its body. It is called an exoskeleton. "
    "A veiled chameleon has its own distinct features. "
    "Some species of lizard drop their tails to escape predators. "
    "Some reptiles live on land, while others like crocodiles spend much of their time in the water. "
    "All reptiles have lungs and need air to breathe. "
    "Reptiles are cold-blooded, which means they cannot control their body temperature. "
    "Most reptiles lay eggs, but some reptiles such as skinks give birth to live young. "
    "Most reptiles are carnivores and eat meat. Turtles and tortoises are mostly herbivores."
)

VIDEOS = [
    {
        "id": "01-what-are-reptiles",
        "file": "01-what-are-reptiles.mp4",
        "title": "What are reptiles?",
        "title_zh": "什么是爬行动物？",
        "vpid": "p0k5jtcx",
        "transcript": TRANSCRIPT_01,
        "images": [
            ("https://ichef.bbci.co.uk/images/ic/1200xn/p0k5kbmq.jpg", "tortoise"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg", "snake"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg", "lizard"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dvr.jpg", "tortoise2"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dzp.jpg", "chameleon"),
            ("https://ichef.bbci.co.uk/images/ic/1200xn/p0jqtwdd.png", "reptiles"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0nyj7m7.jpg", "fossil"),
        ],
    },
    {
        "id": "02-reptiles-around-the-world",
        "file": "02-reptiles-around-the-world.mp4",
        "title": "Reptiles around the world",
        "title_zh": "世界各地的爬行动物",
        "vpid": "p02n9s9t",
        "transcript": TRANSCRIPT_02,
        "images": [
            ("https://ichef.bbci.co.uk/images/ic/1200xn/p0b1sszy.jpg", "world"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg", "snake"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dvr.jpg", "tortoise"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dzp.jpg", "chameleon"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg", "lizard"),
            ("https://ichef.bbci.co.uk/images/ic/1200xn/p0jqtwdd.png", "crocodile"),
        ],
    },
]


def split_sentences(text: str) -> list[str]:
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return [p.strip() for p in parts if p.strip()]


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 1000:
        return
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        dest.write_bytes(resp.read())


def azure_tts(text: str, out_mp3: Path) -> None:
    import ssl

    esc = (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )
    ssml = (
        f'<speak version="1.0" xml:lang="en-GB">'
        f'<voice name="{AZURE_VOICE}"><prosody rate="0.92">{esc}</prosody></voice></speak>'
    )
    req = urllib.request.Request(
        f"https://{AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1",
        data=ssml.encode("utf-8"),
        headers={
            "Ocp-Apim-Subscription-Key": AZURE_KEY,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
            "User-Agent": "s-class-reptile-video",
        },
        method="POST",
    )
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
        out_mp3.write_bytes(resp.read())


def probe_duration(path: Path) -> float:
    out = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        text=True,
    ).strip()
    return max(float(out), 0.5)


def make_slide(image: Path, audio: Path, out_mp4: Path) -> None:
    dur = probe_duration(audio)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-loop",
            "1",
            "-i",
            str(image),
            "-i",
            str(audio),
            "-c:v",
            "libx264",
            "-tune",
            "stillimage",
            "-pix_fmt",
            "yuv420p",
            "-vf",
            "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=0x1b4332",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-t",
            f"{dur:.3f}",
            "-shortest",
            str(out_mp4),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def concat_videos(parts: list[Path], out_mp4: Path) -> None:
    lst = out_mp4.with_suffix(".txt")
    lst.write_text("".join(f"file '{p.resolve()}'\n" for p in parts), encoding="utf-8")
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(lst),
            "-c",
            "copy",
            str(out_mp4),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    lst.unlink(missing_ok=True)


def build_video(spec: dict) -> Path:
    work = BUILD_DIR / spec["id"]
    if work.exists():
        shutil.rmtree(work)
    work.mkdir(parents=True)

    images: list[Path] = []
    for i, (url, name) in enumerate(spec["images"]):
        ext = ".png" if url.endswith(".png") else ".jpg"
        p = work / f"img_{i:02d}_{name}{ext}"
        download(url, p)
        images.append(p)

    sentences = split_sentences(spec["transcript"])
    slides: list[Path] = []
    for i, sent in enumerate(sentences):
        mp3 = work / f"audio_{i:03d}.mp3"
        azure_tts(sent, mp3)
        img = images[i % len(images)]
        seg = work / f"slide_{i:03d}.mp4"
        make_slide(img, mp3, seg)
        slides.append(seg)
        print(f"  [{spec['id']}] slide {i+1}/{len(sentences)}")

    out = VIDEO_DIR / spec["file"]
    concat_videos(slides, out)
    print(f"  ✓ {out} ({out.stat().st_size // 1024} KB)")
    return out


def get_cos_config() -> dict | None:
    cfg_path = ROOT / ".cos-config.json"
    if cfg_path.exists():
        cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
        if cfg.get("SecretId") and cfg.get("SecretKey") and "填" not in str(cfg.get("SecretId")):
            return cfg
    sid = os.environ.get("COS_SECRET_ID") or os.environ.get("TENCENT_SECRET_ID")
    sk = os.environ.get("COS_SECRET_KEY") or os.environ.get("TENCENT_SECRET_KEY")
    if sid and sk:
        return {
            "SecretId": sid,
            "SecretKey": sk,
            "Bucket": os.environ.get("COS_BUCKET", "s-class-1403296481"),
            "Region": os.environ.get("COS_REGION", "ap-chengdu"),
            "CosPrefix": os.environ.get("COS_PREFIX", "s-class/"),
        }
    return None


def upload_videos() -> None:
    cfg = get_cos_config()
    if not cfg:
        print("⚠ 未找到 COS 凭证（.cos-config.json 或 COS_SECRET_ID/KEY），跳过上传。")
        return

    try:
        from qcloud_cos import CosConfig, CosS3Client
    except ImportError:
        subprocess.run([sys.executable, "-m", "pip", "install", "cos-python-sdk-v5", "-q"], check=True)
        from qcloud_cos import CosConfig, CosS3Client

    prefix = cfg.get("CosPrefix", "s-class/").rstrip("/") + "/"
    client = CosS3Client(
        CosConfig(Region=cfg["Region"], SecretId=cfg["SecretId"], SecretKey=cfg["SecretKey"])
    )
    rel_base = "Primary/What are reptiles/what-are-reptiles-courseware/videos"

    for spec in VIDEOS:
        local = VIDEO_DIR / spec["file"]
        if not local.exists():
            print(f"  跳过（不存在）: {local}")
            continue
        key = prefix + rel_base + "/" + spec["file"]
        print(f"  上传 COS: {key}")
        with open(local, "rb") as f:
            client.put_object(Bucket=cfg["Bucket"], Body=f, Key=key, ContentType="video/mp4")
        url = f"https://{cfg['Bucket']}.cos.{cfg['Region']}.myqcloud.com/{key}"
        print(f"  ✓ {url}")


def write_manifest() -> None:
    manifest = {
        "cosBase": COS_BASE,
        "videos": [
            {
                "id": v["id"],
                "file": v["file"],
                "url": f"{COS_BASE}/{v['file']}",
                "title": v["title"],
                "titleZh": v["title_zh"],
                "vpid": v["vpid"],
            }
            for v in VIDEOS
        ],
    }
    out = VIDEO_DIR / "manifest.json"
    out.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    js = "window.REPTILE_VIDEO_MANIFEST = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n"
    (VIDEO_DIR / "manifest.js").write_text(js, encoding="utf-8")
    print(f"  ✓ manifest → {out}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--upload-only", action="store_true")
    parser.add_argument("--skip-upload", action="store_true")
    args = parser.parse_args()

    VIDEO_DIR.mkdir(parents=True, exist_ok=True)

    if not args.upload_only:
        if not shutil.which("ffmpeg"):
            sys.exit("需要 ffmpeg")
        print("生成 BBC 课程视频（文稿+配图+Azure 英音）…")
        for spec in VIDEOS:
            build_video(spec)
        write_manifest()

    if not args.skip_upload:
        print("上传到腾讯 COS…")
        upload_videos()


if __name__ == "__main__":
    main()
