# -*- coding: utf-8 -*-
import re
from pathlib import Path

def from_html(path):
    t = Path(path).read_text(encoding="utf-8")
    out = set()
    for m in re.finditer(r'data-speak="([^"]*)"', t):
        s = m.group(1).strip()
        if s:
            out.add(s.lower())
    for m in re.finditer(r"speak\(\s*['\"]([^'\"]+)['\"]", t):
        s = m.group(1).strip()
        if s:
            out.add(s.lower())
    return out

base = Path(r"D:\s-class\P\语音课")
le = from_html(base / "The-Magic-of-Consonant-LE.html")
rc = from_html(base / "The-Magic-of-R-Controlled.html")
tr = Path(base / "The-Magic-of-R-Controlled.html").read_text(encoding="utf-8")
for m in re.finditer(r'speakKey\s*=\s*["\']([^"\']+)["\']', tr):
    le.add(m.group(1).strip().lower())
for m in re.finditer(r'"speak"\s*:\s*["\']([^"\']+)["\']', tr):
    le.add(m.group(1).strip().lower())

all_rc = rc | le
print("combined", len(all_rc))
for s in sorted(all_rc):
    if len(s) > 120:
        print("LONG", s[:120], "...")
    else:
        print(repr(s))
