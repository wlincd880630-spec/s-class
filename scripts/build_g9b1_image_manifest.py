#!/usr/bin/env python3
"""Build G9_B1 cartoon-3D image generation manifest from wordlist + scenes."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Path(__file__).parent))

from g9b1_cartoon3d_scenes import SCENES, STYLE  # noqa: E402
from g9b1_wordlist import UNITS  # noqa: E402


def safe_slug(word: str) -> str:
    name = re.sub(r"\(.*?\)", "", word)
    name = re.sub(r'[<>:"/\\|?*.]', "", name)
    name = name.replace(" ", "_").replace("/", "-")
    name = re.sub(r"['\u2018\u2019`´]", "", name)
    name = re.sub(r"_+", "_", name).strip("_")
    return (name or "word")[:80]


def wrap(scene: str, word: str, cn: str) -> str:
    return (
        f"{scene}. Meaning: the English word \"{word}\" ({cn}). {STYLE}"
    )


def main() -> None:
    missing = []
    items = []
    for unit, rows in UNITS.items():
        for word, ipa, usage, cn in rows:
            if word not in SCENES:
                missing.append(word)
                continue
            s1, s2 = SCENES[word]
            slug = safe_slug(word)
            items.append({
                "unit": unit,
                "word": word,
                "cn": cn,
                "usage": usage,
                "slug": slug,
                "filename1": f"{slug}_1.png",
                "filename2": f"{slug}_2.png",
                "out1": f"junior_vocab/G9_B1/Unit{unit}/images/{slug}_1.jpg",
                "out2": f"junior_vocab/G9_B1/Unit{unit}/images/{slug}_2.jpg",
                "prompt1": wrap(s1, word, cn),
                "prompt2": wrap(s2, word, cn),
            })
    if missing:
        raise SystemExit(f"Missing scenes ({len(missing)}): {missing}")

    out = ROOT / "junior_vocab/G9_B1/.image_gen_manifest.json"
    out.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {out}  words={len(items)} images={len(items)*2}")
    for u, rows in UNITS.items():
        print(f"  Unit{u}: {len(rows)}")


if __name__ == "__main__":
    main()
