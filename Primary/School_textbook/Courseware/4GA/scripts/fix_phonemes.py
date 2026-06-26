# -*- coding: utf-8 -*-
"""按固定字母组合规则合并 phonemes.json 中被拆开的字素"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PHONEMES_PATH = os.path.join(ROOT, "Courseware", "assets", "data", "phonemes.json")
sys.path.insert(0, ROOT)
from word_units_config import UNITS_4XIA


def merge(items, start, count, letter, symbol):
    """将 items[start:start+count] 合并为一格"""
    seg = items[start : start + count]
    return items[:start] + [{"letter": letter, "symbol": symbol}] + items[start + count :]


def apply_fixes(data: dict) -> list[str]:
    changes = []

    # brush: b+r → br
    if data["brush"][0]["letter"] == "b":
        data["brush"] = [
            {"symbol": "/br/", "letter": "br"},
            {"symbol": "/ʌ/", "letter": "u"},
            {"symbol": "/ʃ/", "letter": "sh"},
        ]
        changes.append("brush → br/u/sh")

    # postman: s+t → st
    if data["postman"][2]["letter"] == "s":
        data["postman"] = [
            {"symbol": "/p/", "letter": "p"},
            {"symbol": "/əʊ/", "letter": "o"},
            {"symbol": "/st/", "letter": "st"},
            {"symbol": "/m/", "letter": "m"},
            {"symbol": "/æ/", "letter": "a"},
            {"symbol": "/n/", "letter": "n"},
        ]
        changes.append("postman → p/o/st/m/a/n")

    # scared: s+c → sc
    if data["scared"][0]["letter"] == "s" and data["scared"][1]["letter"] == "c":
        data["scared"] = [
            {"symbol": "/sk/", "letter": "sc"},
            {"symbol": "/eə/", "letter": "a"},
            {"symbol": "/r/", "letter": "r"},
            {"symbol": "—", "letter": "e"},
            {"symbol": "/d/", "letter": "d"},
        ]
        changes.append("scared → sc/a/r/e/d")

    # street: s+t+r → str
    if data["street"][0]["letter"] == "s":
        data["street"] = [
            {"symbol": "/str/", "letter": "str"},
            {"symbol": "/iː/", "letter": "ee"},
            {"symbol": "/t/", "letter": "t"},
        ]
        changes.append("street → str/ee/t")

    # just: s+t → st
    if data["just"][2]["letter"] == "s":
        data["just"] = [
            {"symbol": "/dʒ/", "letter": "j"},
            {"symbol": "/ʌ/", "letter": "u"},
            {"symbol": "/st/", "letter": "st"},
        ]
        changes.append("just → j/u/st")

    # slowly: s+l → sl
    if data["slowly"][0]["letter"] == "s":
        data["slowly"] = [
            {"symbol": "/sl/", "letter": "sl"},
            {"symbol": "/əʊ/", "letter": "ow"},
            {"symbol": "/l/", "letter": "l"},
            {"symbol": "/i/", "letter": "y"},
        ]
        changes.append("slowly → sl/ow/l/y")

    # stem: s+t → st
    if data["stem"][0]["letter"] == "s":
        data["stem"] = [
            {"symbol": "/st/", "letter": "st"},
            {"symbol": "/e/", "letter": "e"},
            {"symbol": "/m/", "letter": "m"},
        ]
        changes.append("stem → st/e/m")

    # sunflower: f+l → fl
    if data["sunflower"][3]["letter"] == "f":
        data["sunflower"] = [
            {"symbol": "/s/", "letter": "s"},
            {"symbol": "/ʌ/", "letter": "u"},
            {"symbol": "/n/", "letter": "n"},
            {"symbol": "/fl/", "letter": "fl"},
            {"symbol": "/əʊ/", "letter": "ow"},
            {"symbol": "/ə/", "letter": "er"},
        ]
        changes.append("sunflower → s/u/n/fl/ow/er")

    # plant: p+l → pl
    if data["plant"][0]["letter"] == "p":
        data["plant"] = [
            {"symbol": "/pl/", "letter": "pl"},
            {"symbol": "/ɑː/", "letter": "a"},
            {"symbol": "/n/", "letter": "n"},
            {"symbol": "/t/", "letter": "t"},
        ]
        changes.append("plant → pl/a/n/t")

    # dream: d+r → dr
    if data["dream"][0]["letter"] == "d":
        data["dream"] = [
            {"symbol": "/dr/", "letter": "dr"},
            {"symbol": "/iː/", "letter": "ea"},
            {"symbol": "/m/", "letter": "m"},
        ]
        changes.append("dream → dr/ea/m")

    # sleep: s+l → sl
    if data["sleep"][0]["letter"] == "s":
        data["sleep"] = [
            {"symbol": "/sl/", "letter": "sl"},
            {"symbol": "/iː/", "letter": "ee"},
            {"symbol": "/p/", "letter": "p"},
        ]
        changes.append("sleep → sl/ee/p")

    # come true: t+r → tr (true 部分)
    ct = data["come true"]
    if len(ct) >= 6 and ct[4]["letter"] == "t":
        data["come true"] = [
            {"symbol": "/k/", "letter": "c"},
            {"symbol": "/ʌ/", "letter": "o"},
            {"symbol": "/m/", "letter": "m"},
            {"symbol": "—", "letter": "e"},
            {"symbol": "/tr/", "letter": "tr"},
            {"symbol": "/uː/", "letter": "ue"},
        ]
        changes.append("come true → c/o/m/e/tr/ue")

    # festival: s+t → st
    if data["festival"][2]["letter"] == "s":
        data["festival"] = [
            {"symbol": "/f/", "letter": "f"},
            {"symbol": "/e/", "letter": "e"},
            {"symbol": "/st/", "letter": "st"},
            {"symbol": "/ɪ/", "letter": "i"},
            {"symbol": "/v/", "letter": "v"},
            {"symbol": "/ə/", "letter": "a"},
            {"symbol": "/l/", "letter": "l"},
        ]
        changes.append("festival → f/e/st/i/v/a/l")

    # raindrop: d+r → dr
    rd = data["raindrop"]
    if rd[3]["letter"] == "d":
        data["raindrop"] = [
            {"symbol": "/r/", "letter": "r"},
            {"symbol": "/eɪ/", "letter": "ai"},
            {"symbol": "/n/", "letter": "n"},
            {"symbol": "/dr/", "letter": "dr"},
            {"symbol": "/ɒ/", "letter": "o"},
            {"symbol": "/p/", "letter": "p"},
        ]
        changes.append("raindrop → r/ai/n/dr/o/p")

    # special: s+p → sp
    if data["special"][0]["letter"] == "s":
        data["special"] = [
            {"symbol": "/sp/", "letter": "sp"},
            {"symbol": "/e/", "letter": "e"},
            {"symbol": "/ʃ/", "letter": "ci"},
            {"symbol": "/ə/", "letter": "a"},
            {"symbol": "/l/", "letter": "l"},
        ]
        changes.append("special → sp/e/ci/a/l")

    # student: s+t → st
    if data["student"][0]["letter"] == "s":
        data["student"] = [
            {"symbol": "/st/", "letter": "st"},
            {"symbol": "/juː/", "letter": "u"},
            {"symbol": "/d/", "letter": "d"},
            {"symbol": "/ə/", "letter": "en"},
            {"symbol": "/t/", "letter": "t"},
        ]
        changes.append("student → st/u/d/en/t")

    # drama: d+r → dr
    if data["drama"][0]["letter"] == "d":
        data["drama"] = [
            {"symbol": "/dr/", "letter": "dr"},
            {"symbol": "/ɑː/", "letter": "a"},
            {"symbol": "/m/", "letter": "m"},
            {"symbol": "/ə/", "letter": "a"},
        ]
        changes.append("drama → dr/a/m/a")

    # trip: t+r → tr
    if data["trip"][0]["letter"] == "t":
        data["trip"] = [
            {"symbol": "/tr/", "letter": "tr"},
            {"symbol": "/ɪ/", "letter": "i"},
            {"symbol": "/p/", "letter": "p"},
        ]
        changes.append("trip → tr/i/p")

    # skirt: s+k → sk
    if data["skirt"][0]["letter"] == "s":
        data["skirt"] = [
            {"symbol": "/sk/", "letter": "sk"},
            {"symbol": "/ɜː/", "letter": "ir"},
            {"symbol": "/t/", "letter": "t"},
        ]
        changes.append("skirt → sk/ir/t")

    # trousers: t+r → tr
    if data["trousers"][0]["letter"] == "t":
        data["trousers"] = [
            {"symbol": "/tr/", "letter": "tr"},
            {"symbol": "/aʊ/", "letter": "ou"},
            {"symbol": "/z/", "letter": "s"},
            {"symbol": "/ə/", "letter": "er"},
            {"symbol": "/z/", "letter": "s"},
        ]
        changes.append("trousers → tr/ou/s/er/s")

    # scarf: s+c → sc
    if data["scarf"][0]["letter"] == "s":
        data["scarf"] = [
            {"symbol": "/sk/", "letter": "sc"},
            {"symbol": "/ɑː/", "letter": "ar"},
            {"symbol": "/f/", "letter": "f"},
        ]
        changes.append("scarf → sc/ar/f")

    # sweater: s+w → sw
    if data["sweater"][0]["letter"] == "s":
        data["sweater"] = [
            {"symbol": "/sw/", "letter": "sw"},
            {"symbol": "/e/", "letter": "ea"},
            {"symbol": "/t/", "letter": "t"},
            {"symbol": "/ə/", "letter": "er"},
        ]
        changes.append("sweater → sw/ea/t/er")

    # dress: d+r → dr
    if data["dress"][0]["letter"] == "d":
        data["dress"] = [
            {"symbol": "/dr/", "letter": "dr"},
            {"symbol": "/e/", "letter": "e"},
            {"symbol": "/s/", "letter": "ss"},
        ]
        changes.append("dress → dr/e/ss")

    # dressmaker: d+r → dr
    if data["dressmaker"][0]["letter"] == "d":
        data["dressmaker"] = [
            {"symbol": "/dr/", "letter": "dr"},
            {"symbol": "/e/", "letter": "e"},
            {"symbol": "/s/", "letter": "ss"},
            {"symbol": "/m/", "letter": "m"},
            {"symbol": "/eɪ/", "letter": "a"},
            {"symbol": "/k/", "letter": "k"},
            {"symbol": "/ə/", "letter": "er"},
        ]
        changes.append("dressmaker → dr/e/ss/m/a/k/er")

    # clever: c+l → cl
    if data["clever"][0]["letter"] == "c":
        data["clever"] = [
            {"symbol": "/kl/", "letter": "cl"},
            {"symbol": "/e/", "letter": "e"},
            {"symbol": "/v/", "letter": "v"},
            {"symbol": "/ə/", "letter": "er"},
        ]
        changes.append("clever → cl/e/v/er")

    return changes


def validate_word(word, items):
    joined = "".join(p["letter"] for p in items)
    target = word.replace(" ", "").replace("-", "")
    return joined.lower() == target.lower() or joined.lower() == word.replace(" ", "").lower()


def main():
    with open(PHONEMES_PATH, encoding="utf-8") as f:
        data = json.load(f)

    changes = apply_fixes(data)
    words = []
    for u in UNITS_4XIA.values():
        words.extend(u)

    errors = []
    for w in words:
        if w not in data:
            errors.append(f"missing: {w}")
        elif not validate_word(w, data[w]):
            errors.append(f"spell: {w} -> {''.join(p['letter'] for p in data[w])}")

    if errors:
        print("ERRORS:")
        for e in errors:
            print(" ", e)
        return 1

    ordered = {w: data[w] for w in words if w in data}
    with open(PHONEMES_PATH, "w", encoding="utf-8") as f:
        json.dump(ordered, f, ensure_ascii=False, indent=2)

    print(f"Fixed {len(changes)} words:")
    for c in changes:
        print(f"  {c}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
