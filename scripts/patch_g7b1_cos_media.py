#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""将 junior_vocab/G7_B1 词汇页媒体链接指向腾讯云 COS。"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
G7 = ROOT / "junior_vocab" / "G7_B1"
COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/junior_vocab/G7_B1/"

OLD = re.compile(
    r'const MEDIA_BASE = \(typeof window !== "undefined" && window\.MEDIA_BASE\) \? window\.MEDIA_BASE : "";\n'
    r"function mediaUrl\(path\) \{[^\n]+\}"
)


def unit_block(n: int) -> str:
    base = f"{COS}Unit{n}/"
    return (
        f'const MEDIA_BASE = "{base}";\n'
        f'function mediaUrl(path) {{ if (!path) return ""; var p = path.replace(/^Unit{n}\\/?/, ""); '
        f'return path.startsWith("http") ? path : (MEDIA_BASE + (p ? p.replace(/^\\//, "") : "")); }}'
    )


PEP = (
    f'const COS_VOCAB_ROOT = "{COS}";\n'
    'function mediaBaseForUnit(n) { return COS_VOCAB_ROOT + "Unit" + n + "/"; }\n'
    "function mediaUrl(path) {\n"
    '  if (!path) return "";\n'
    '  if (path.startsWith("http")) return path;\n'
    '  const n = typeof currentUnit !== "undefined" ? currentUnit : 1;\n'
    '  return mediaBaseForUnit(n) + path.replace(/^\\//, "");\n'
    "}"
)


def main() -> None:
    patched = 0
    for n in range(1, 8):
        fp = G7 / f"Unit{n}" / f"Unit{n}.html"
        if not fp.exists():
            continue
        text = fp.read_text(encoding="utf-8")
        if "cos.ap-chengdu.myqcloud.com/s-class/junior_vocab/G7_B1" in text:
            print("skip (already patched):", fp.relative_to(ROOT))
            continue
        new_text, count = OLD.subn(unit_block(n), text, count=1)
        if not count:
            print("pattern not found:", fp.relative_to(ROOT))
            continue
        fp.write_text(new_text, encoding="utf-8", newline="\n")
        patched += 1
        print("patched:", fp.relative_to(ROOT))

    pep = G7 / "pep_vocab_learn.html"
    if pep.exists():
        text = pep.read_text(encoding="utf-8")
        if "COS_VOCAB_ROOT" in text:
            print("skip (already patched): pep_vocab_learn.html")
        elif OLD.search(text):
            pep.write_text(OLD.sub(PEP, text, count=1), encoding="utf-8", newline="\n")
            patched += 1
            print("patched: junior_vocab/G7_B1/pep_vocab_learn.html")
        else:
            print("pattern not found: pep_vocab_learn.html")

    print(f"Done. {patched} file(s) updated.")


if __name__ == "__main__":
    main()
