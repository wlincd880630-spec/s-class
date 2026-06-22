"""Post-process Helpers coloring PNGs: resize to 1536x1024, boost line-art contrast."""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SPEC = ROOT / "coloring-spec.json"
OUT = ROOT / "images"
ASSETS = Path(__file__).resolve().parents[3] / "assets"
# Cursor GenerateImage output may also sit in workspace assets
WORKSPACE_ASSETS = Path(r"C:\Users\wl88i\.cursor\projects\d-s-class\assets")

TARGET = (1536, 1024)


def find_source(name: str) -> Path | None:
    for base in (ASSETS, WORKSPACE_ASSETS, ROOT / "images"):
        p = base / name
        if p.is_file():
            return p
    return None


def to_line_art(im: Image.Image) -> Image.Image:
    im = im.convert("RGB")
    im = ImageOps.autocontrast(im, cutoff=1)
    gray = ImageOps.grayscale(im)
    gray = ImageEnhance.Contrast(gray).enhance(1.8)
    # Keep soft antialias for print; threshold optional
    return gray.convert("RGB")


def fit_canvas(im: Image.Image, size: tuple[int, int]) -> Image.Image:
    tw, th = size
    canvas = Image.new("RGB", size, (255, 255, 255))
    im = im.copy()
    im.thumbnail((tw, th), Image.Resampling.LANCZOS)
    x = (tw - im.width) // 2
    y = (th - im.height) // 2
    canvas.paste(im, (x, y))
    return canvas


def main() -> None:
    spec = json.loads(SPEC.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    missing = []
    for item in spec["words"]:
        name = item["file"]
        src = find_source(name)
        if not src:
            missing.append(name)
            continue
        im = Image.open(src)
        im = to_line_art(im)
        im = fit_canvas(im, TARGET)
        dest = OUT / name
        im.save(dest, "PNG", optimize=True)
        print(f"OK {name} <- {src} -> {dest} ({im.size})")
    if missing:
        raise SystemExit(f"Missing sources: {', '.join(missing)}")


if __name__ == "__main__":
    main()
