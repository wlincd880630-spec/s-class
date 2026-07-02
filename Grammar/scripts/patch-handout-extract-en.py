"""Inject extract-english-tts.js into all handout HTML pages."""
from __future__ import annotations

import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNIPPET = '  <script src="../shared/extract-english-tts.js"></script>\n'
MARKER = "extract-english-tts.js"


def patch(path: str) -> bool:
    rel = os.path.relpath(path, ROOT).replace("\\", "/")
    depth = rel.count("/")
    prefix = "../" * depth if depth else "./"
    snippet = f'  <script src="{prefix}shared/extract-english-tts.js"></script>\n'

    text = open(path, encoding="utf-8").read()
    if MARKER in text:
        return False
    if "grammar-handout-page" not in text and "handout-tts.js" not in text:
        return False
    if "grammar-handout-lookup.js" not in text and "handout-tts.js" not in text:
        return False

    for anchor in (
        "lesson-local-audio.js",
        "handout-tts.js",
        "grammar-handout-lookup.js",
        "play-local-mp3.js",
    ):
        pat = rf'(<script[^>]+{re.escape(anchor)}[^>]*></script>\s*)'
        if re.search(pat, text):
            updated = re.sub(pat, snippet + r"\1", text, count=1)
            if updated != text:
                open(path, "w", encoding="utf-8").write(updated)
                return True
    if re.search(r"<head[^>]*>", text, re.I):
        updated = re.sub(r"(<head[^>]*>\s*)", r"\1" + snippet, text, count=1, flags=re.I)
        if updated != text:
            open(path, "w", encoding="utf-8").write(updated)
            return True
    return False


def main() -> None:
    n = 0
    for dirpath, _, files in os.walk(ROOT):
        if "node_modules" in dirpath:
            continue
        for fn in files:
            if not fn.endswith(".html"):
                continue
            path = os.path.join(dirpath, fn)
            if patch(path):
                n += 1
                print("patched:", os.path.relpath(path, ROOT))
    print("done:", n)


if __name__ == "__main__":
    main()
