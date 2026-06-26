# -*- coding: utf-8 -*-
"""教材例句校验与生成工具（各册共用）"""
import json
import os
import re
import sys
import time
import urllib.request

API_KEY = "sk-daa16008e81843deba6fefe9dce51465"
API_URL = "https://api.deepseek.com/chat/completions"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CW = os.path.dirname(SCRIPT_DIR)
PROJECT = os.path.dirname(CW)
sys.path.insert(0, PROJECT)

from word_units_config import (
    UNITS_3SHANG, UNITS_3XIA, UNITS_4SHANG, UNITS_4XIA,
    UNITS_5SHANG, UNITS_5XIA, UNITS_6SHANG, UNITS_6XIA,
)

BOOKS = [
    {"folder": "3GA", "grade": "3上", "units": UNITS_3SHANG, "level": 3},
    {"folder": "3GB", "grade": "3下", "units": UNITS_3XIA, "level": 3},
    {"folder": "4GA", "grade": "4上", "units": UNITS_4SHANG, "level": 4},
    {"folder": "4GB", "grade": "4下", "units": UNITS_4XIA, "level": 4},
    {"folder": "5GA", "grade": "5上", "units": UNITS_5SHANG, "level": 5},
    {"folder": "5GB", "grade": "5下", "units": UNITS_5XIA, "level": 5},
    {"folder": "6GA", "grade": "6上", "units": UNITS_6SHANG, "level": 6},
    {"folder": "6GB", "grade": "6下", "units": UNITS_6XIA, "level": 6},
]

BAD_ZH = re.compile(r"^(教材原句：|教材中的句子)")
SPEAKER = re.compile(r"^[A-Za-z][\w\s.'-]*:\s*")
CONTROL = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f]")


def normalize(w: str) -> str:
    w = w.replace("\ufb01", "fi").replace("\ufb02", "fl")
    w = w.replace("\u2019", "'").replace("\u2018", "'")
    return w


def clean_sentence(s: str) -> str:
    s = CONTROL.sub("", s)
    s = SPEAKER.sub("", s.strip())
    s = re.sub(r"\s+", " ", s).strip()
    return s


def word_pattern(word: str) -> re.Pattern:
    w = normalize(word).replace("...", "")
    parts = [re.escape(p) for p in w.split()]
    body = r"\s+".join(parts)
    return re.compile(rf"(?<![A-Za-z]){body}(?![A-Za-z])", re.I)


def inflection_pattern(word: str) -> re.Pattern:
    """单词或常见变形（不含 cloud→cloudy 这类派生）"""
    w = normalize(word)
    if " " in w or "(" in w or "..." in w:
        return word_pattern(word)
    if w.endswith("e"):
        base = re.escape(w[:-1])
        forms = f"{base}(?:e|es|ed|ing|er|est)?"
    else:
        base = re.escape(w)
        forms = f"{base}(?:s|es|ed|ing|er|est)?"
    # 缩写形式
    if "'" in w:
        return word_pattern(word)
    return re.compile(rf"(?<![A-Za-z]){forms}(?![A-Za-z])", re.I)


def lookup_word_forms(word: str) -> list[str]:
    forms = [word, normalize(word)]
    if " = " in word:
        a, b = word.split(" = ", 1)
        forms.extend([a.strip(), b.strip()])
    if "(" in word:
        forms.append(word.split("(", 1)[0].strip())
        m = re.search(r"\(([^)]+)\)", word)
        if m:
            for p in re.split(r"[,/]", m.group(1)):
                p = p.strip()
                if p:
                    forms.append(p)
    if "sb / sth" in word:
        forms.append(word.replace("sb / sth", "").strip())
    if "..." in word:
        forms.append(word.split("...")[0].strip())
    # 去重保持顺序
    seen, out = set(), []
    for f in forms:
        if f and f not in seen:
            seen.add(f)
            out.append(f)
    return out


def contains_word(sentence: str, word: str) -> bool:
    s = normalize(clean_sentence(sentence))
    for form in lookup_word_forms(word):
        if word_pattern(form).search(s):
            return True
        if inflection_pattern(form).search(s):
            return True
    # look like ↔ looks like
    if normalize(word) == "look like" and re.search(r"looks\s+like", s, re.I):
        return True
    # half past one / two... ↔ half past N
    if "half past" in normalize(word) and re.search(r"half\s+past\s+\w+", s, re.I):
        return True
    # on one's own ↔ on your own
    if normalize(word) == "on one's own" and re.search(r"on\s+(your|one's)\s+own", s, re.I):
        return True
    return False


def is_bad_zh(zh: str, en: str = "") -> bool:
    if not zh or len(zh.strip()) < 2:
        return True
    if BAD_ZH.search(zh.strip()):
        return True
    if zh.strip().endswith("。") and len(zh) < 12 and "：" in zh:
        return True
    # 中文里几乎没有汉字 → 其实是英文
    if en and sum(1 for c in zh if "\u4e00" <= c <= "\u9fff") < 2:
        return True
    return False


def is_bad_en(en: str, word: str) -> bool:
    en = clean_sentence(en)
    if not en or len(en) < 4:
        return True
    if not en[0].isupper() and not en.startswith('"'):
        return True
    if len(en.split()) < 3:
        return True
    if not contains_word(en, word):
        return True
    if en.endswith((",", " and", " or", " the", " a", " an")):
        return True
    return False


def validate_entry(word: str, entry: dict) -> list[str]:
    issues = []
    en = entry.get("en", "")
    zh = entry.get("zh", "")
    if is_bad_en(en, word):
        issues.append("en")
    if is_bad_zh(zh, en):
        issues.append("zh")
    return issues


def call_deepseek(prompt: str) -> str:
    body = json.dumps({
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "你是小学英语教材编写专家。只输出合法 JSON。"},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.4,
    }).encode("utf-8")
    req = urllib.request.Request(API_URL, data=body, headers={
        "Content-Type": "application/json", "Authorization": f"Bearer {API_KEY}",
    }, method="POST")
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())["choices"][0]["message"]["content"]


def generate_sentences_batch(items: list[dict], level: int) -> dict:
    """items: [{word, meaning, old_en}]"""
    lines = []
    for it in items:
        lines.append(f'- "{it["word"]}" 中文释义：{it["meaning"]}')
    prompt = f"""为以下小学英语{level}年级单词各写1条例句，要求：
1. 英文句子必须完整、语法正确，且必须包含目标词（或其合理变形，如 play/playing）
2. 不要匹配派生词（如 cloud 不能写成 cloudy）
3. 句子长度 5-14 词，贴近教材对话风格
4. 中文翻译准确自然，不要写「教材原句」等套话
5. 不要加说话人标签（如 Tom:）

单词列表：
{chr(10).join(lines)}

输出 JSON，key=单词原文，value={{"en":"...","zh":"..."}}"""
    raw = re.sub(r"^```json\s*|\s*```$", "", call_deepseek(prompt).strip())
    return json.loads(raw)


def translate_zh_batch(items: list[dict]) -> dict:
    """items: [{word, en}]"""
    lines = [f'- "{it["word"]}": {it["en"]}' for it in items]
    prompt = f"""将以下英文教材例句翻译成适合小学生的自然中文，准确流畅，不要加「教材原句」等前缀：

{chr(10).join(lines)}

输出 JSON，key=单词原文，value={{"zh":"..."}}"""
    raw = re.sub(r"^```json\s*|\s*```$", "", call_deepseek(prompt).strip())
    return json.loads(raw)


def load_vocab(grade: str) -> dict:
    path = os.path.join(PROJECT, "3-6年级英语单词表.json")
    words = json.load(open(path, encoding="utf-8"))["grades"][grade]["words"]
    vocab = {}
    for x in words:
        m = re.sub(r"注：.*", "", x["meaning"]).strip()
        vocab[x["word"]] = m
        vocab.setdefault(normalize(x["word"]), m)
    return vocab


def all_courseware_words(units: dict) -> list[str]:
    return [w for ws in units.values() for w in ws]


def lookup_keys(word: str) -> list:
    keys = [word, normalize(word)]
    if " = " in word:
        keys.append(word.split(" = ", 1)[0].strip())
    return keys


def get_entry(data: dict, word: str) -> dict | None:
    for k in lookup_keys(word):
        if k in data:
            return data[k]
    return None


def set_entry(data: dict, word: str, entry: dict):
    data[word] = entry


def filter_textbook_results(result: dict, words: list[str]) -> dict:
    """移除不含目标词、碎片句，以及劣质中文翻译的条目"""
    filtered = {}
    for word in words:
        entry = get_entry(result, word)
        if not entry:
            continue
        en = clean_sentence(entry.get("en", ""))
        zh = entry.get("zh", "").strip()
        if is_bad_en(en, word):
            continue
        if is_bad_zh(zh, en):
            zh = ""
        filtered[word] = {"en": en, "zh": zh}
    return filtered
