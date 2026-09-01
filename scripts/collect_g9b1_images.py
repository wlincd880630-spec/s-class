#!/usr/bin/env python3
"""Collect Composer-generated PNGs into G9_B1 JPEG slots."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path("/workspace")
MANIFEST = ROOT / "junior_vocab/G9_B1/.image_gen_manifest.json"
ASSET_DIRS = [
    Path("/opt/cursor/artifacts/assets"),
    Path("/home/ubuntu/.cursor/projects/workspace/assets"),
    Path("/tmp/cursor/artifacts/assets"),
]


def convert(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGB")
    w, h = im.size
    if w > 960:
        im = im.resize((960, int(h * 960 / w)), Image.Resampling.LANCZOS)
    elif h > 960:
        im = im.resize((int(w * 960 / h), 960), Image.Resampling.LANCZOS)
    im.save(dest, "JPEG", quality=82, optimize=True)


def find_source(filename: str) -> Path | None:
    name = Path(filename).name
    stems = {name, Path(name).with_suffix(".png").name, Path(name).with_suffix(".jpg").name}
    # also accept slug without path
    for d in ASSET_DIRS:
        if not d.exists():
            continue
        for p in d.rglob("*"):
            if p.is_file() and p.name in stems:
                return p
    return None


def main() -> None:
    items = json.loads(MANIFEST.read_text())
    have = miss = 0
    newly = 0
    for it in items:
        for key_f, key_o in (("filename1", "out1"), ("filename2", "out2")):
            dest = ROOT / it[key_o]
            if dest.exists() and dest.stat().st_size > 2000:
                have += 1
                continue
            src = find_source(it[key_f])
            if not src:
                # try dest png sibling
                png = dest.with_suffix(".png")
                src = png if png.exists() else None
            if not src:
                miss += 1
                continue
            convert(src, dest)
            newly += 1
            have += 1
    print(f"have={have} newly={newly} missing={miss} total={len(items)*2}")


if __name__ == "__main__":
    main()
