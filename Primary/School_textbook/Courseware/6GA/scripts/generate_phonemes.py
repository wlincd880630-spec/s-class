# -*- coding: utf-8 -*-
"""调用 Deepseek 按自然拼读规则生成音素拆分 — 六年级上册"""
import json
import os
import re
import sys
import time
import urllib.request

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CW = os.path.dirname(SCRIPT_DIR)
PROJECT = os.path.dirname(os.path.dirname(CW))
OUT = os.path.join(CW, "assets", "data", "phonemes.json")
API_KEY = "sk-daa16008e81843deba6fefe9dce51465"
API_URL = "https://api.deepseek.com/chat/completions"

sys.path.insert(0, PROJECT)
from word_units_config import UNITS_6SHANG

PHONICS_RULES = """
## 自然拼读音素拆分规则
1. 字素 + IPA（英式 RP）
2. 识别常见字母组合
3. 短语按单词分别拆分
4. letter 拼接必须能还原单词拼写
"""


def normalize_word(w: str) -> str:
    return w.replace("\ufb01", "fi").replace("\ufb02", "fl")


def call_deepseek(prompt: str) -> str:
    body = json.dumps({
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "你是英语自然拼读专家。只输出合法 JSON 对象，不要 markdown。"},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.2,
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL, data=body,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {API_KEY}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())["choices"][0]["message"]["content"]


def all_words():
    return [w for ws in UNITS_6SHANG.values() for w in ws]


def normalize_items(items: list) -> list:
    return [{"symbol": p["ipa"], "letter": p["letter"]} for p in items]


def main():
    existing = json.load(open(OUT, encoding="utf-8")) if os.path.exists(OUT) else {}
    words = [w for w in all_words() if w not in existing and normalize_word(w) not in existing]
    print(f"已有 {len(existing)}，待生成 {len(words)}")

    for i in range(0, len(words), 10):
        batch = words[i : i + 10]
        word_list = "\n".join(f"- {w}" for w in batch)
        prompt = f"""{PHONICS_RULES}

为以下六年级英语单词给出音素拆分。输出 JSON：key=单词原文（与下列完全一致），value=[{{"letter":"字素","ipa":"/音标/"}}]

{word_list}"""
        raw = re.sub(r"^```json\s*|\s*```$", "", call_deepseek(prompt).strip())
        try:
            parsed = json.loads(raw)
            for w, items in parsed.items():
                if isinstance(items, list) and items and isinstance(items[0], dict):
                    existing[w] = normalize_items(items)
                    print("  OK", normalize_word(w))
            json.dump(existing, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        except (json.JSONDecodeError, KeyError, TypeError) as e:
            print("Parse error:", e)
        time.sleep(1)

    # 连字 fi 别名 + 常见 key 别名
    for w in all_words():
        nw = normalize_word(w)
        if w not in existing and nw in existing:
            existing[w] = existing[nw]
        if w in existing and nw not in existing:
            existing[nw] = existing[w]
    for src, dst in [("Thanksgiving", "Thanksgiving (Thanksgiving Day)"), ("fly", "ﬂy"), ("difficult", "difﬁcult")]:
        if src in existing and dst not in existing:
            existing[dst] = existing[src]
        if dst in existing and src not in existing:
            existing[src] = existing[dst]
    json.dump(existing, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"Saved {len(existing)} words to {OUT}")


if __name__ == "__main__":
    main()
