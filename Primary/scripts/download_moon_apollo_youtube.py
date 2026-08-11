#!/usr/bin/env python3
"""
下载 Learn Bright 阿波罗科普原片（YouTube: fObYUyyE4Ak）到登月课件 videos/ 目录。

注意：YouTube 常拦截云主机 IP。请在可正常打开 YouTube 的本机/住宅网络运行：

  python3 Primary/scripts/download_moon_apollo_youtube.py

若已有本地 MP4：

  python3 Primary/scripts/download_moon_apollo_youtube.py --import /path/to/video.mp4

成功后文件：
  Primary/How many people have been to the Moon/how-many-people-have-been-to-the-moon-courseware/videos/youtube-apollo-space-missions.mp4
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VIDEO_DIR = (
    ROOT
    / "Primary"
    / "How many people have been to the Moon"
    / "how-many-people-have-been-to-the-moon-courseware"
    / "videos"
)
URL = "https://www.youtube.com/watch?v=fObYUyyE4Ak"
OUT_NAME = "youtube-apollo-space-missions.mp4"


def ensure_yt_dlp() -> str:
    exe = shutil.which("yt-dlp")
    if exe:
        return exe
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "yt-dlp"], check=True)
    return shutil.which("yt-dlp") or "yt-dlp"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--import", dest="import_path", help="复制已有本地 MP4")
    ap.add_argument("--proxy", help="可选代理，如 socks5://127.0.0.1:1080")
    args = ap.parse_args()
    VIDEO_DIR.mkdir(parents=True, exist_ok=True)
    dest = VIDEO_DIR / OUT_NAME

    if args.import_path:
        src = Path(args.import_path)
        if not src.exists():
            sys.exit(f"找不到文件: {src}")
        shutil.copy2(src, dest)
        print(f"✓ 已导入 {dest} ({dest.stat().st_size // 1024} KB)")
        return

    ytdlp = ensure_yt_dlp()
    work = VIDEO_DIR / "_yt_download"
    work.mkdir(exist_ok=True)
    out_tpl = str(work / "apollo.%(ext)s")
    cmd = [
        ytdlp,
        "-f",
        "bv*[height<=720]+ba/b[height<=720]",
        "--merge-output-format",
        "mp4",
        "--write-subs",
        "--write-auto-subs",
        "--sub-langs",
        "en.*,zh.*,en,zh-Hans,zh-Hant",
        "--convert-subs",
        "vtt",
        "-o",
        out_tpl,
        URL,
    ]
    if args.proxy:
        cmd[1:1] = ["--proxy", args.proxy]
    print("正在从 YouTube 下载 Learn Bright 原片…")
    proc = subprocess.run(cmd)
    if proc.returncode != 0:
        sys.exit(
            "下载失败。云主机 IP 常被 YouTube 拦截，请换本机网络或加 --proxy / --import。\n"
            "课程已附带 S-Class 中英字幕教学片：01-apollo-space-missions.mp4"
        )
    mp4s = list(work.glob("apollo*.mp4"))
    if not mp4s:
        sys.exit("未找到下载的 mp4")
    shutil.copy2(mp4s[0], dest)
    for sub in work.glob("apollo*.vtt"):
        shutil.copy2(sub, VIDEO_DIR / sub.name.replace("apollo", "youtube-apollo-space-missions", 1))
    print(f"✓ {dest} ({dest.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
