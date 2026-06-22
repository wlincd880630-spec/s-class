"""Resize story illustrations to 1536x1024 and copy to images/story/."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SPEC = ROOT / "story-spec.json"
OUT = ROOT / "images" / "story"
ASSETS = Path(r"C:\Users\wl88i\.cursor\projects\d-s-class\assets")
TARGET = (1536, 1024)


def fit_canvas(im: Image.Image, size: tuple[int, int]) -> Image.Image:
    tw, th = size
    canvas = Image.new("RGB", size, (255, 255, 255))
    im = im.convert("RGB")
    im.thumbnail((tw, th), Image.Resampling.LANCZOS)
    x = (tw - im.width) // 2
    y = (th - im.height) // 2
    canvas.paste(im, (x, y))
    return canvas


def main() -> None:
    spec = json.loads(SPEC.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    missing = []
    for i, item in enumerate(spec["scenes"], start=1):
        name = item["file"]
        src = ASSETS / f"story-{i:02d}.png"
        if not src.is_file():
            src = ASSETS / name
        if not src.is_file():
            missing.append(name)
            continue
        im = fit_canvas(Image.open(src), TARGET)
        dest = OUT / name
        im.save(dest, "PNG", optimize=True)
        print(f"OK {name} <- {src}")
    if missing:
        raise SystemExit(f"Missing: {', '.join(missing)}")


if __name__ == "__main__":
    main()
