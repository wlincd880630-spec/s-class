#!/usr/bin/env python3
"""Copy a Composer-generated image into Dive Dolphin courseware at a fixed size.

Usage:
  python3 install_dolphin_gen_image.py SRC DEST WIDTH HEIGHT
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def fit(im: Image.Image, size: tuple[int, int], bg: tuple[int, int, int]) -> Image.Image:
    tw, th = size
    canvas = Image.new("RGB", size, bg)
    im = im.convert("RGB")
    im.thumbnail((tw, th), Image.Resampling.LANCZOS)
    x = (tw - im.width) // 2
    y = (th - im.height) // 2
    canvas.paste(im, (x, y))
    return canvas


def main() -> int:
    if len(sys.argv) != 5:
        print("usage: install_dolphin_gen_image.py SRC DEST WIDTH HEIGHT", file=sys.stderr)
        return 2
    src = Path(sys.argv[1])
    dest = Path(sys.argv[2])
    size = (int(sys.argv[3]), int(sys.argv[4]))
    if not src.is_file():
        print(f"missing src {src}", file=sys.stderr)
        return 1
    dest.parent.mkdir(parents=True, exist_ok=True)
    bg = (8, 40, 70) if "story" in str(dest) or "sentences" in str(dest) else (255, 255, 255)
    if "words-meaning" in str(dest):
        bg = (8, 40, 70)
    im = fit(Image.open(src), size, bg)
    dest.write_bytes(b"")  # ensure path exists even if save fails mid-way
    im.save(dest, "PNG", optimize=True)
    print(f"OK {dest} {im.size} {dest.stat().st_size // 1024}KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
