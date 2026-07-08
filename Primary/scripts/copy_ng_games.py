#!/usr/bin/env python3
"""将 Jump Pup 的 game4-9 复制到其余三本书，替换书名/API/配色/音频路径"""
import os
import re
import shutil

ROOT = os.path.join(os.path.dirname(__file__), "..")

BOOKS = {
    "Play Kitty/play-kitty-review-games": {
        "from_title": "Jump, Pup!",
        "title": "Play, Kitty!",
        "emoji_old": "🐶",
        "emoji": "🐱",
        "words_api": "PlayKittyWords",
        "tts_api": "PlayKittyTTS",
        "accent": "#c62828",
        "audio_manifest": "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Play%20Kitty/play-kitty-review-games/audio/audio-manifest.js",
        "audio_local": "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Play%20Kitty/play-kitty-review-games/audio/local-audio.js",
        "stroke": "#c62828",
    },
    "Peek Otter/peek-otter-review-games": {
        "from_title": "Jump, Pup!",
        "title": "Peek, Otter!",
        "emoji_old": "🐶",
        "emoji": "🦦",
        "words_api": "PeekOtterWords",
        "tts_api": "PeekOtterTTS",
        "accent": "#0277bd",
        "audio_manifest": "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Peek%20Otter/peek-otter-review-games/audio/audio-manifest.js",
        "audio_local": "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Peek%20Otter/peek-otter-review-games/audio/local-audio.js",
        "stroke": "#0277bd",
    },
    "Helpers in your neighborhood/helpers-neighborhood-review-games": {
        "from_title": "Jump, Pup!",
        "title": "Helpers in Your Neighborhood",
        "emoji_old": "🐶",
        "emoji": "🏘️",
        "words_api": "HelpersNeighborhoodWords",
        "tts_api": "HelpersNeighborhoodTTS",
        "accent": "#6a1b9a",
        "audio_manifest": "../audio/audio-manifest.js",
        "audio_local": "../audio/local-audio.js",
        "stroke": "#6a1b9a",
    },
}

SRC_DIR = os.path.join(ROOT, "Jump Pup", "jump-pup-review-games")
GAMES = [
    "game4-word-maze.html",
    "game5-zh-pick-word.html",
    "game6-picture-connect.html",
    "game7-word-pick-zh.html",
    "game8-bubble-catch.html",
    "game9-spin-quiz.html",
]

JUMP_AUDIO_MANIFEST = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Jump%20Pup/jump-pup-review-games/audio/audio-manifest.js"
JUMP_AUDIO_LOCAL = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Jump%20Pup/jump-pup-review-games/audio/local-audio.js"


def patch(content: str, cfg: dict) -> str:
    content = content.replace("Jump, Pup!", cfg["title"])
    content = content.replace("JumpPupWords", cfg["words_api"])
    content = content.replace("JumpPupTTS", cfg["tts_api"])
    content = content.replace(cfg["emoji_old"], cfg["emoji"])
    content = content.replace("#2e7d32", cfg["accent"])
    content = content.replace(JUMP_AUDIO_MANIFEST, cfg["audio_manifest"])
    content = content.replace(JUMP_AUDIO_LOCAL, cfg["audio_local"])
    content = content.replace('stroke="#2e7d32"', f'stroke="{cfg["stroke"]}"')
    return content


def main():
    for rel, cfg in BOOKS.items():
        dest = os.path.join(ROOT, rel.replace("/", os.sep))
        for g in GAMES:
            src = os.path.join(SRC_DIR, g)
            out = os.path.join(dest, g)
            with open(src, encoding="utf-8") as f:
                text = patch(f.read(), cfg)
            with open(out, "w", encoding="utf-8") as f:
                f.write(text)
            print("Wrote", out)


if __name__ == "__main__":
    main()
