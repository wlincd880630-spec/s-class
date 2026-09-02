#!/usr/bin/env python3
"""Copy generated cartoons + fix science photos into Hello Penguins folders."""
from __future__ import annotations

import os
import shutil
import subprocess

ROOT = os.path.join(os.path.dirname(__file__), "..")
DEST = os.path.join(ROOT, "Hello Penguins")
CW = os.path.join(DEST, "hello-penguins-courseware", "images")
SCI = os.path.join(CW, "science")
WORDS = os.path.join(CW, "words")
MEAN = os.path.join(CW, "words-meaning")
STORY = os.path.join(CW, "story")
COLOR = os.path.join(DEST, "hello-penguins-coloring", "images")
ASSETS = os.path.join(ROOT, "assets")
GEN = "/opt/cursor/artifacts/assets"

WORD_FILES = [
    "penguin", "on-the-ice", "on-the-beach", "in-the-forest", "huddle", "shuffle",
    "slide", "swim", "big", "small", "fancy", "plain", "cold", "keep-warm", "kind",
    "many-kinds-of", "make", "nest", "dirt", "sand", "waddle", "tree-root", "can",
    "cant", "use", "wing", "splash", "go-fishing", "go-back-on-land",
]


def ff(src, dest, w=1280, h=960):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    subprocess.check_call(
        [
            "ffmpeg", "-y", "-i", src,
            "-vf", f"scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h}",
            dest,
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def copy_if(src, dest):
    if os.path.isfile(src):
        ff(src, dest)
        return True
    return False


def main():
    for d in (WORDS, MEAN, STORY, COLOR, SCI):
        os.makedirs(d, exist_ok=True)

    # cartoons
    missing = []
    for slug in WORD_FILES:
        src = os.path.join(GEN, f"word-{slug}.png")
        if not copy_if(src, os.path.join(WORDS, f"{slug}.png")):
            missing.append(slug)
        # coloring
        wdest = os.path.join(WORDS, f"{slug}.png")
        if os.path.isfile(wdest):
            shutil.copy2(wdest, os.path.join(COLOR, f"{slug}.png"))

    # replace bad science photos
    replacements = {
        "snares-forest.jpg": "real-snares-forest.jpg",
        "snares-roots.jpg": "real-snares-roots.jpg",
        "penguin-slide.jpg": "real-penguin-slide.jpg",
        "penguin-splash.jpg": "real-penguin-splash.jpg",
        "penguin-fish.jpg": "real-penguin-fish.jpg",
        "penguin-waddle.jpg": "real-penguin-waddle.jpg",
        "gentoo-jump.jpg": "real-gentoo-land.jpg",
        "chinstrap-close.jpg": None,  # copy from shuffle
    }
    for dest_name, gen_name in replacements.items():
        dest = os.path.join(SCI, dest_name)
        if gen_name:
            src = os.path.join(GEN, gen_name)
            if os.path.isfile(src):
                ff(src, dest)
        elif dest_name == "chinstrap-close.jpg":
            src = os.path.join(SCI, "chinstrap-shuffle.jpg")
            if os.path.isfile(src):
                shutil.copy2(src, dest)

    # keep studio snares as extra crest if generated forest exists
    studio = os.path.join(SCI, "snares-crest.jpg")
    # already downloaded

    # meaning photos (science / cartoon)
    meaning_from_sci = {
        "penguin": "emperor-ice.jpg",
        "on-the-ice": "emperor-ice.jpg",
        "on-the-beach": "magellanic-beach.jpg",
        "in-the-forest": "snares-forest.jpg",
        "huddle": "emperor-huddle.jpg",
        "shuffle": "chinstrap-shuffle.jpg",
        "slide": "penguin-slide.jpg",
        "swim": "penguin-swim.jpg",
        "big": "emperor-big.jpg",
        "small": "fairy-small.jpg",
        "fancy": "rockhopper-fancy.jpg",
        "plain": "adelie-plain.jpg",
        "kind": "rockhopper-crest.jpg",
        "many-kinds-of": "adelie-group.jpg",
        "nest": "magellanic-nest.jpg",
        "dirt": "magellanic-nest.jpg",
        "sand": "magellanic-beach.jpg",
        "waddle": "penguin-waddle.jpg",
        "tree-root": "snares-roots.jpg",
        "wing": "penguin-swim.jpg",
        "splash": "penguin-splash.jpg",
        "go-fishing": "penguin-fish.jpg",
        "go-back-on-land": "gentoo-land.jpg",
        "keep-warm": "emperor-huddle.jpg",
        "make": "magellanic-nest.jpg",
        "cold": "emperor-ice.jpg",
    }
    for slug, sci in meaning_from_sci.items():
        s = os.path.join(SCI, sci)
        if os.path.isfile(s):
            ff(s, os.path.join(MEAN, f"{slug}.png"))
    # abstract cartoons as meaning
    for slug in ("can", "cant", "use"):
        w = os.path.join(WORDS, f"{slug}.png")
        if os.path.isfile(w):
            shutil.copy2(w, os.path.join(MEAN, f"{slug}.png"))

    # story slides 01-21
    story_map = {
        1: ("cartoon", os.path.join(GEN, "story-hello.png")),
        2: ("sci", "emperor-ice.jpg"),
        3: ("sci", "emperor-huddle.jpg"),
        4: ("cartoon", os.path.join(WORDS, "many-kinds-of.png")),
        5: ("sci", "magellanic-beach.jpg"),
        6: ("sci", "magellanic-nest.jpg"),
        7: ("sci", "snares-forest.jpg"),
        8: ("sci", "snares-roots.jpg"),
        9: ("sci", "emperor-big.jpg"),
        10: ("sci", "fairy-small.jpg"),
        11: ("sci", "rockhopper-fancy.jpg"),
        12: ("sci", "adelie-plain.jpg"),
        13: ("cartoon", os.path.join(GEN, "story-cant-fly.png")),
        14: ("sci", "chinstrap-shuffle.jpg"),
        15: ("sci", "penguin-slide.jpg"),
        16: ("sci", "penguin-swim.jpg"),
        17: ("sci", "penguin-splash.jpg"),
        18: ("sci", "humboldt-fish.jpg"),
        19: ("sci", "penguin-fish.jpg"),
        20: ("sci", "gentoo-jump.jpg"),
        21: ("cartoon", os.path.join(GEN, "story-hello.png")),
    }
    for n, (kind, ref) in story_map.items():
        dest = os.path.join(STORY, f"{n:02d}.png")
        src = ref if kind == "cartoon" else os.path.join(SCI, ref)
        if os.path.isfile(src):
            ff(src, dest)
        else:
            print("missing story", n, src)

    icon = os.path.join(GEN, "icon-penguin.png")
    if os.path.isfile(icon):
        ff(icon, os.path.join(ASSETS, "icon-penguin.png"), 256, 256)

    print("missing word cartoons:", missing)
    print("words", len(os.listdir(WORDS)), "meaning", len(os.listdir(MEAN)), "story", len(os.listdir(STORY)))


if __name__ == "__main__":
    main()
