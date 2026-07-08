# -*- coding: utf-8 -*-
"""校验并修复各册教材例句（缺词、碎片句、劣质中文翻译）"""
import json
import os
import subprocess
import sys
import time

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CW = os.path.dirname(SCRIPT_DIR)
PROJECT = os.path.dirname(CW)
sys.path.insert(0, SCRIPT_DIR)
sys.path.insert(0, PROJECT)

from textbook_sentence_utils import (
    BOOKS, clean_sentence, contains_word, generate_sentences_batch,
    get_entry, is_bad_en, is_bad_zh, load_vocab, set_entry, validate_entry,
    translate_zh_batch, all_courseware_words,
)


def audit_book(book: dict) -> list[dict]:
    path = os.path.join(CW, book["folder"], "assets", "data", "textbook_sentences.json")
    if not os.path.isfile(path):
        return []
    data = json.load(open(path, encoding="utf-8"))
    bad = []
    for word in all_courseware_words(book["units"]):
        entry = get_entry(data, word) or {}
        issues = validate_entry(word, entry) if entry else ["missing"]
        if issues:
            bad.append({"word": word, "issues": issues})
    return bad


def fix_book(book: dict) -> tuple[int, int]:
    path = os.path.join(CW, book["folder"], "assets", "data", "textbook_sentences.json")
    data = json.load(open(path, encoding="utf-8")) if os.path.isfile(path) else {}
    vocab = load_vocab(book["grade"])

    need_en, need_zh = [], []
    for word in all_courseware_words(book["units"]):
        entry = get_entry(data, word) or {}
        issues = validate_entry(word, entry) if entry else ["missing"]
        if not issues:
            continue
        meaning = vocab.get(word, vocab.get(word.replace("\ufb01", "fi"), word))
        if "en" in issues or "missing" in issues:
            need_en.append({"word": word, "meaning": meaning, "old_en": entry.get("en", "")})
        elif "zh" in issues:
            en = clean_sentence(entry.get("en", ""))
            need_zh.append({"word": word, "en": en})

    if not need_en and not need_zh:
        print(f"  {book['folder']}: OK")
        return 0, 0

    print(f"  {book['folder']}: en={len(need_en)} zh={len(need_zh)}")
    fixed_en = fixed_zh = 0

    for i in range(0, len(need_en), 10):
        batch = need_en[i : i + 10]
        try:
            result = generate_sentences_batch(batch, book["level"])
            for item in batch:
                word = item["word"]
                for key in (word, word.replace("\ufb01", "fi")):
                    if key not in result:
                        continue
                    entry = result[key]
                    en = clean_sentence(entry.get("en", ""))
                    zh = entry.get("zh", "").strip()
                    if contains_word(en, word) and zh and not is_bad_zh(zh, en):
                        set_entry(data, word, {"en": en, "zh": zh})
                        fixed_en += 1
                        break
            json.dump(data, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"    en batch error: {e}")
        time.sleep(1)

    for i in range(0, len(need_zh), 15):
        batch = need_zh[i : i + 15]
        try:
            result = translate_zh_batch(batch)
            for item in batch:
                word = item["word"]
                for key in (word, word.replace("\ufb01", "fi")):
                    if key not in result:
                        continue
                    zh = result[key].get("zh", "").strip() if isinstance(result[key], dict) else str(result[key]).strip()
                    if zh and not is_bad_zh(zh, item["en"]):
                        old = get_entry(data, word) or {}
                        set_entry(data, word, {"en": old.get("en", item["en"]), "zh": zh})
                        fixed_zh += 1
                        break
            json.dump(data, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"    zh batch error: {e}")
        time.sleep(1)

    print(f"    done en={fixed_en}/{len(need_en)} zh={fixed_zh}/{len(need_zh)}")
    return fixed_en, fixed_zh


def regenerate_data(book: dict):
    script = os.path.join(CW, book["folder"], "scripts", "generate_data.py")
    if os.path.isfile(script):
        subprocess.run([sys.executable, script], cwd=PROJECT, check=False)


def main():
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--audit", action="store_true")
    p.add_argument("--book", help="only one folder e.g. 4GB")
    p.add_argument("--no-data", action="store_true")
    args = p.parse_args()

    books = [b for b in BOOKS if not args.book or b["folder"] == args.book]
    if args.audit:
        total = sum(len(audit_book(b)) for b in books)
        for book in books:
            n = len(audit_book(book))
            print(f"{book['folder']}: {n} issues")
        print(f"Total issues: {total}")
        return

    for book in books:
        fix_book(book)
        if not args.no_data:
            regenerate_data(book)


if __name__ == "__main__":
    main()
