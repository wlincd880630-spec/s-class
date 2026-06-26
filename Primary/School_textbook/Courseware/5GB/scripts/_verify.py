# -*- coding: utf-8 -*-
import json
import os
import re
import sys

PROJECT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.insert(0, PROJECT)
from word_units_config import UNITS_5XIA

CW = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(CW, "assets", "data")
words = [w for ws in UNITS_5XIA.values() for w in ws]
progress = json.load(open(os.path.join(PROJECT, "word_image_progress.json"), encoding="utf-8"))
ctx = json.load(open(os.path.join(data_dir, "context_sentences.json"), encoding="utf-8"))
ph = json.load(open(os.path.join(data_dir, "phonemes.json"), encoding="utf-8"))
tb = json.load(open(os.path.join(data_dir, "textbook_sentences.json"), encoding="utf-8"))

def norm(w):
    return w.replace("\ufb01", "fi").replace("\ufb02", "fl")

local_img = 0
for w in words:
    for key, paths in progress.get("completed", {}).items():
        if key.startswith("5下|") and key.split("|", 2)[-1] in (w, norm(w)) and paths:
            local_img += 1
            break

print(f"words: {len(words)}")
print(f"context (5下): {sum(1 for w in words if w in ctx)} / extra entries: {len(ctx) - sum(1 for w in words if w in ctx)}")
print(f"phonemes (5下): {sum(1 for w in words if w in ph or norm(w) in ph)}")
print(f"textbook: {sum(1 for w in words if w in tb or norm(w) in tb)}")
print(f"local images: {local_img}/{len(words)}")

m = re.search(r'"semester": "(\S)"', open(os.path.join(data_dir, "data.js"), encoding="utf-8").read())
print(f"data.js semester: {m.group(1) if m else '?'}")
