# -*- coding: utf-8 -*-
"""Build tts-map-consonant-le.json and tts-map-r-controlled.json (djb2 hex filenames)."""
import json
from pathlib import Path

VOICE = "en-GB-RyanNeural"


def djb_hex(key: str) -> str:
    h = 5381
    for c in key:
        h = ((h << 5) + h) + ord(c) & 0xFFFFFFFF
    return format(h & 0xFFFFFFFF, "x")


def map_key(text: str) -> str:
    return VOICE + "\t" + text.strip().lower()


def build_le():
    texts = [
        "What are they doing?",
        "What is this action called?",
        "They are blowing bubbles.",
        "What is this shape?",
        "This is a triangle.",
        "What is the turtle doing?",
        "A turtle is sunbathing on a log.",
        "What is she doing?",
        "She is drinking a bottle of water.",
        "bubble",
        "triangle",
        "turtle",
        "bottle",
        "uncle",
        "circle",
        "candle",
        "middle",
        "noodle",
        "riddle",
        "rifle",
        "waffle",
        "sniffle",
        "single",
        "angle",
        "jungle",
        "simple",
        "apple",
        "people",
        "little",
        "cattle",
        "kettle",
        "puzzle",
        "drizzle",
        "sizzle",
        "Look at each word. Does it end with a consonant plus L E syllable? Tap a card to check.",
        "mile",
        "male",
        "pile",
        "role",
        "hole",
        "buck",
        "le",
        "hus",
        "tle",
        "buckle",
        "hustle",
        "tremble",
        "flammable",
        "pickle",
        "castle",
        "whistle",
    ]
    out = {}
    for t in texts:
        k = map_key(t)
        out[k] = "cle_" + djb_hex(k) + ".mp3"
    return out


def build_rc():
    """与 The-Magic-of-R-Controlled.html 中 speak() 实际用到的英文一致（含 JS 拼出的卡片与 morph）。"""
    texts = [
        # CHALLENGE
        "park",
        "fork",
        "bird",
        "nurse",
        "term",
        "bat",
        "sit",
        "cup",
        "bed",
        "pot",
        # PRACTICE（朗读全词为 spec.word，Azure 键为小写）
        "corporate",
        "Arctic",
        "servant",
        "describe",
        # SLIDE_DEFS 复习与演示
        "reptile",
        "refuse",
        "complete",
        "fern",
        "corn",
        "girl",
        "Antarctic",
        "surrender",
        "advertise",
        "desperate",
        # bossRMorph（data-speak 由 esc 拼入 DOM）
        "cat",
        "cart",
        "bun",
        "burn",
    ]
    out = {}
    for t in texts:
        k = map_key(t)
        out[k] = "rc_" + djb_hex(k) + ".mp3"
    return out


def main():
    base = Path(r"D:\s-class\P\语音课\asset\mp3")
    le = build_le()
    rc = build_rc()
    (base / "tts-map-consonant-le.json").write_text(
        json.dumps(le, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (base / "tts-map-r-controlled.json").write_text(
        json.dumps(rc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("LE entries", len(le))
    print("RC entries", len(rc))


if __name__ == "__main__":
    main()
