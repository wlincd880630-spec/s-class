#!/usr/bin/env python3
"""
尝试下载 BBC Bitesize 爬行动物课程原片（p0k5jtcx / p02n9s9t）。

重要：BBC 在英国境外会返回 geolocation，普通翻墙/VPN 经常被识别。
本脚本用 yt-dlp；仅当你的网络出口在英国（或提供可用的英国住宅代理）时才能成功。

用法：
  # 自动尝试（读取环境变量 BBC_PROXY，如 socks5://127.0.0.1:9050）
  python3 Primary/scripts/download_bbc_reptile_videos.py

  # 指定代理
  BBC_PROXY=http://user:pass@uk-proxy:8080 python3 Primary/scripts/download_bbc_reptile_videos.py

  # 若你已有本地 MP4，直接复制到课程目录并上传 COS
  python3 Primary/scripts/download_bbc_reptile_videos.py --import /path/to/01.mp4 --import /path/to/02.mp4

成功后会写入：
  Primary/What are reptiles/what-are-reptiles-courseware/videos/01-what-are-reptiles.mp4
  Primary/What are reptiles/what-are-reptiles-courseware/videos/02-reptiles-around-the-world.mp4

然后运行：
  python3 Primary/scripts/build_reptile_bbc_videos.py --upload-only
  （或本脚本 --upload 一并上传）
"""
from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VIDEO_DIR = ROOT / "Primary" / "What are reptiles" / "what-are-reptiles-courseware" / "videos"

CLIPS = [
    {
        "programme": "https://www.bbc.co.uk/programmes/p0k5jtcn",
        "vpid": "p0k5jtcx",
        "out": "01-what-are-reptiles.mp4",
        "title": "What are reptiles?",
    },
    {
        "programme": "https://www.bbc.co.uk/programmes/p02n9s9q",
        "vpid": "p02n9s9t",
        "out": "02-reptiles-around-the-world.mp4",
        "title": "Reptiles around the world",
    },
]


def ensure_yt_dlp() -> str:
    exe = shutil.which("yt-dlp")
    if exe:
        return exe
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "yt-dlp"], check=True)
    return shutil.which("yt-dlp") or "yt-dlp"


def download_one(ytdlp: str, clip: dict, proxy: str | None, work: Path) -> Path | None:
    out_tpl = str(work / f"{clip['vpid']}.%(ext)s")
    cmd = [
        ytdlp,
        "-f",
        "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "--merge-output-format",
        "mp4",
        "-o",
        out_tpl,
        clip["programme"],
    ]
    if proxy:
        cmd[1:1] = ["--proxy", proxy]
    print(f"下载 BBC 原片: {clip['title']} ({clip['vpid']}) …")
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        err = (proc.stderr or proc.stdout or "").strip()
        if "geolocation" in err.lower():
            print("  ✗ BBC 返回 geolocation（当前 IP 不在英国或未通过住宅代理）")
        else:
            print(f"  ✗ 失败: {err[-500:]}")
        return None
    for p in work.glob(f"{clip['vpid']}.*"):
        if p.suffix.lower() in {".mp4", ".mkv", ".webm"}:
            dest = VIDEO_DIR / clip["out"]
            VIDEO_DIR.mkdir(parents=True, exist_ok=True)
            if p.suffix.lower() != ".mp4":
                dest_tmp = work / f"{clip['vpid']}.mp4"
                subprocess.run(
                    ["ffmpeg", "-y", "-i", str(p), "-c", "copy", str(dest_tmp)],
                    check=True,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                )
                shutil.copy2(dest_tmp, dest)
            else:
                shutil.copy2(p, dest)
            print(f"  ✓ {dest} ({dest.stat().st_size // 1024} KB)")
            return dest
    print("  ✗ 未找到输出文件")
    return None


def upload_cos() -> None:
    script = ROOT / "Primary" / "scripts" / "build_reptile_bbc_videos.py"
    subprocess.run([sys.executable, str(script), "--upload-only"], check=False)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--proxy", default=os.environ.get("BBC_PROXY", ""), help="英国代理，如 socks5://127.0.0.1:9050")
    parser.add_argument("--import", dest="imports", action="append", default=[], metavar="MP4", help="导入已有 MP4")
    parser.add_argument("--upload", action="store_true", help="成功后上传 COS")
    args = parser.parse_args()

    proxy = args.proxy.strip() or None
    if args.imports:
        VIDEO_DIR.mkdir(parents=True, exist_ok=True)
        outs = [c["out"] for c in CLIPS]
        if len(args.imports) != len(outs):
            print(f"需要 {len(outs)} 个文件，顺序对应: {', '.join(outs)}")
            return 1
        for src, name in zip(args.imports, outs):
            src_p = Path(src)
            if not src_p.is_file():
                print(f"文件不存在: {src_p}")
                return 1
            dest = VIDEO_DIR / name
            shutil.copy2(src_p, dest)
            print(f"✓ 已导入 {dest}")
        if args.upload:
            upload_cos()
        return 0

    ytdlp = ensure_yt_dlp()
    work = VIDEO_DIR / "_bbc_download"
    work.mkdir(parents=True, exist_ok=True)
    ok = 0
    for clip in CLIPS:
        if download_one(ytdlp, clip, proxy, work):
            ok += 1
    if ok == 0:
        print(
            "\n未能下载 BBC 原片。境外环境这是正常现象。\n"
            "可选方案：\n"
            "  1) 请在英国的朋友运行本脚本，把生成的 MP4 发给你，再用 --import 导入\n"
            "  2) 使用英国住宅代理设置 BBC_PROXY 后重试\n"
            "  3) 继续使用 build_reptile_bbc_videos.py 生成文稿版视频（已含完整字幕）\n"
        )
        return 1
    if args.upload:
        upload_cos()
    return 0 if ok == len(CLIPS) else 2


if __name__ == "__main__":
    raise SystemExit(main())
