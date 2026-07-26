#!/usr/bin/env python3
"""Compress junior vocab PNGs (*_1.png / *_2.png) to JPEG and patch JSON img1/img2."""
import json, re, sys
from pathlib import Path
from PIL import Image

ROOT = Path("/workspace/junior_vocab")
BOOKS = sys.argv[1:] or ["G7_B1", "G7_B2", "G8_B1", "G8_B2", "G9"]


def slug(word):
    name = re.sub(r"\(.*?\)", "", word)
    name = re.sub(r'[<>:"/\\|?*.]', "", name)
    name = name.replace(" ", "_").replace("/", "-")
    name = re.sub(r"['\u2018\u2019`´]", "", name)
    name = re.sub(r"_+", "_", name).strip("_")
    return (name or "word")[:80]


converted = 0
bytes_in = bytes_out = 0
for book in BOOKS:
    bdir = ROOT / book
    if not bdir.exists():
        continue
    for unit_dir in sorted(bdir.glob("Unit[0-9]*")):
        if not unit_dir.is_dir():
            continue
        img_dir = unit_dir / "images"
        if not img_dir.exists():
            continue
        for png in list(img_dir.glob("*_1.png")) + list(img_dir.glob("*_2.png")):
            jpg = png.with_suffix(".jpg")
            try:
                im = Image.open(png).convert("RGB")
                w, h = im.size
                if w > 960:
                    im = im.resize((960, int(h * 960 / w)), Image.Resampling.LANCZOS)
                im.save(jpg, "JPEG", quality=82, optimize=True)
                bytes_in += png.stat().st_size
                bytes_out += jpg.stat().st_size
                png.unlink()
                converted += 1
            except Exception as e:
                print("FAIL", png, e)

        jf = unit_dir / f"{unit_dir.name}.json"
        if not jf.exists():
            continue
        data = json.load(open(jf))
        changed = False
        for w in data.get('words', []):
            s = slug(w['word'])
            local = None
            for p in img_dir.glob('*_1.jpg'):
                if p.stem.lower() == f'{s}_1'.lower():
                    local = p
                    break
            if local:
                rel = f'images/{local.name}'
                if w.get('img1') != rel:
                    w['img1'] = rel
                    changed = True
            local2 = None
            for p2 in img_dir.glob('*_2.jpg'):
                if p2.stem.lower() == f'{s}_2'.lower():
                    local2 = p2
                    break
            if local2:
                rel2 = f'images/{local2.name}'
                if w.get('img2') != rel2:
                    w['img2'] = rel2
                    changed = True
        if changed:
            json.dump(data, open(jf, "w"), ensure_ascii=False, indent=2)

print(f"converted {converted} png→jpg  {bytes_in/1e6:.1f}MB → {bytes_out/1e6:.1f}MB")

for book in BOOKS:
    total = have1 = have2 = 0
    bdir = ROOT / book
    if not bdir.exists():
        continue
    for unit_dir in sorted(bdir.glob("Unit[0-9]*")):
        if not unit_dir.is_dir():
            continue
        jf = unit_dir / f"{unit_dir.name}.json"
        if not jf.exists():
            continue
        img_dir = unit_dir / "images"
        for w in json.load(open(jf)).get("words", []):
            total += 1
            s = slug(w["word"])
            if img_dir.exists():
                if any(p.stem.lower() == f"{s}_1".lower() for p in img_dir.glob("*_1.jpg")):
                    have1 += 1
                if any(p.stem.lower() == f"{s}_2".lower() for p in img_dir.glob("*_2.jpg")):
                    have2 += 1
    print(f"{book}: img1 {have1}/{total}  img2 {have2}/{total}")
