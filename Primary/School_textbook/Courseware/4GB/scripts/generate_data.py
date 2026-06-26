# -*- coding: utf-8 -*-
"""从教材数据生成 Courseware/4GB/assets/data/data.js（四年级下册）"""
import json
import os
import re
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CW = os.path.dirname(SCRIPT_DIR)
PROJECT = os.path.dirname(os.path.dirname(CW))
OUT = os.path.join(CW, "assets", "data", "data.js")
GRADE = "4下"

sys.path.insert(0, PROJECT)
from word_units_config import UNITS_4XIA

UNIT_META = {
    "Unit 1": {"id": "unit1", "title": "职业与家人", "en": "Jobs & Family"},
    "Unit 2": {"id": "unit2", "title": "情感与生活", "en": "Feelings & Life"},
    "Unit 3": {"id": "unit3", "title": "才能与表演", "en": "Talents & Performance"},
    "Unit 4": {"id": "unit4", "title": "植物生长", "en": "Plant Growth"},
    "Unit 5": {"id": "unit5", "title": "文化博览与家乡", "en": "Culture Fair & Hometown"},
    "Unit 6": {"id": "unit6", "title": "服装打扮", "en": "Clothes"},
}


def slug(word: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", word.lower()).strip("_")


def load_phonemes(phoneme_db: dict, word: str) -> list:
    items = phoneme_db.get(word)
    if items:
        return [{"symbol": p["symbol"], "letter": p["letter"]} for p in items if p.get("symbol") is not None]
    return [{"symbol": "/?/", "letter": word}]


def make_sentences(word: str, textbook: dict, context: dict) -> list:
    tb = textbook.get(word, {})
    ctx = context.get(word, {})
    sents = []
    if tb.get("en"):
        sents.append({"en": tb["en"], "zh": tb.get("zh", ""), "source": "textbook", "image": ""})
    if ctx.get("en"):
        sents.append({"en": ctx["en"], "zh": ctx.get("zh", ""), "source": "context", "image": ""})
    if len(sents) < 2:
        chinese = tb.get("zh") or ctx.get("zh") or word
        short = chinese.split("；")[0].split("，")[0]
        sents.append({
            "en": f"We use the word \"{word}\" in our English class.",
            "zh": f"我们在英语课上学习「{word}」（{short}）。",
            "source": "fallback",
            "image": "",
        })
    return sents[:2]


sys.path.insert(0, os.path.join(os.path.dirname(CW), "scripts"))
from courseware_image_utils import sentence_image_path as _sentence_image_path
from courseware_image_utils import word_image_path as _word_image_path


def sentence_image_path(unit_key: str, word: str, source: str) -> str:
    return _sentence_image_path(CW, PROJECT, GRADE, unit_key, word, source)


def image_path(word: str, progress: dict) -> str:
    return _word_image_path(CW, PROJECT, GRADE, word, progress)



def main():
    vocab = {x["word"]: x["meaning"] for x in json.load(open(os.path.join(PROJECT, "3-6年级英语单词表.json"), encoding="utf-8"))["grades"][GRADE]["words"]}
    progress = json.load(open(os.path.join(PROJECT, "word_image_progress.json"), encoding="utf-8"))
    data_dir = os.path.join(CW, "assets", "data")
    textbook = json.load(open(os.path.join(data_dir, "textbook_sentences.json"), encoding="utf-8"))
    context = json.load(open(os.path.join(data_dir, "context_sentences.json"), encoding="utf-8"))
    phoneme_db = json.load(open(os.path.join(data_dir, "phonemes.json"), encoding="utf-8"))

    units, wid = [], 0
    for unit_name, words in UNITS_4XIA.items():
        meta = UNIT_META[unit_name]
        unit_words = []
        for word in words:
            wid += 1
            sents = make_sentences(word, textbook, context)
            for s in sents:
                s["image"] = sentence_image_path(unit_name, word, s.get("source", "context"))
            unit_words.append({
                "id": f"w{wid}",
                "word": word,
                "chinese": vocab.get(word, word),
                "phonemes": load_phonemes(phoneme_db, word),
                "image": image_path(word, progress),
                "sentences": sents,
            })
        units.append({"id": meta["id"], "name": f"{unit_name} · {meta['en']}", "title": meta["title"], "words": unit_words})

    data = {"book": {"id": "fltrp-g4x", "name": "外研版四年级下册", "grade": 4, "semester": "下"}, "units": units}
    js = "/**\n * 外研版小学英语四年级下册单词数据\n * 自动生成，请勿手动编辑\n */\nconst TEXTBOOK_DATA = "
    js += json.dumps(data, ensure_ascii=False, indent=2)
    js += ";\n\nif (typeof module !== 'undefined') module.exports = TEXTBOOK_DATA;\n"
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, "w", encoding="utf-8").write(js)
    print(f"Generated {OUT} with {wid} words in {len(units)} units")


if __name__ == "__main__":
    main()
