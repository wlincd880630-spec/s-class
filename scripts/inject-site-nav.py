#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Insert scripts/site-nav.js into full HTML pages that lack it."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path("/workspace")
SKIP_DIR_NAMES = {"node_modules", ".git"}
SKIP_NAME_RE = re.compile(r"(insert\.html|emailjs-template)", re.I)


def should_skip(path: Path) -> bool:
    if path.name.lower() == "index.html" and path.parent == ROOT:
        return True
    if SKIP_NAME_RE.search(path.name):
        return True
    if "assets" in path.parts and "insert" in path.name.lower():
        return True
    return False


def rel_to_site_nav(path: Path) -> str:
    depth = len(path.parent.relative_to(ROOT).parts)
    if depth == 0:
        return "scripts/site-nav.js"
    return "../" * depth + "scripts/site-nav.js"


def inject(path: Path) -> bool:
    text = path.read_text(encoding="utf-8", errors="ignore")
    if "site-nav.js" in text:
        return False
    if not re.search(r"<html[\s>]", text, re.I):
        return False
    if not re.search(r"<body[\s>]", text, re.I):
        return False
    src = rel_to_site_nav(path)
    tag = f'<script src="{src}" defer></script>'
    new_text, n = re.subn(r"</head>", tag + "\n</head>", text, count=1, flags=re.I)
    if n == 0:
        new_text, n = re.subn(
            r"(<body[^>]*>)",
            r"\1\n" + tag,
            text,
            count=1,
            flags=re.I,
        )
    if n == 0:
        return False
    path.write_text(new_text, encoding="utf-8")
    return True


def main() -> None:
    changed = 0
    skipped = 0
    for path in ROOT.rglob("*.html"):
        if any(part in SKIP_DIR_NAMES for part in path.parts):
            continue
        if should_skip(path):
            skipped += 1
            continue
        if inject(path):
            changed += 1
    print(f"injected={changed} skipped={skipped}")


if __name__ == "__main__":
    main()
