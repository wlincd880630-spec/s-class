# -*- coding: utf-8 -*-
import json, os, sys
PROJECT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.insert(0, PROJECT)
from word_units_config import UNITS_5XIA
CW = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dd = os.path.join(CW, "assets", "data")
words = [w for ws in UNITS_5XIA.values() for w in ws]
ctx = json.load(open(os.path.join(dd, "context_sentences.json"), encoding="utf-8"))
ph = json.load(open(os.path.join(dd, "phonemes.json"), encoding="utf-8"))
tb = json.load(open(os.path.join(dd, "textbook_sentences.json"), encoding="utf-8"))
def norm(w): return w.replace("\ufb01","fi")
out = os.path.join(dd, "_missing_report.txt")
lines = [
    "missing context: " + repr([w for w in words if w not in ctx]),
    "missing phoneme: " + repr([w for w in words if w not in ph and norm(w) not in ph]),
    "missing textbook: " + repr([w for w in words if w not in tb and norm(w) not in tb]),
]
open(out, "w", encoding="utf-8").write("\n".join(lines))
