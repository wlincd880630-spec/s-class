# -*- coding: utf-8 -*-
import json
import sys

sys.path.insert(0, r"D:\2026\小学英语教材")
from word_units_config import UNITS_3XIA

p = r"D:\2026\小学英语教材\Courseware\3GB\assets\data\phonemes.json"
ph = json.load(open(p, encoding="utf-8"))
allw = [w for ws in UNITS_3XIA.values() for w in ws]

if "what about" in ph and "what about..." not in ph:
    ph["what about..."] = ph.pop("what about")

for k in list(ph):
    if k.startswith("o") and "clock" in k and k != "o\u2019clock":
        if "o\u2019clock" in allw:
            ph["o\u2019clock"] = ph.pop(k)
        break

missing = [w for w in allw if w not in ph]
print("missing:", missing)
json.dump(ph, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
