# -*- coding: utf-8 -*-
"""调用 Deepseek 生成拓展例句 — 三年级下册"""
import json
import os
import re
import sys
import time
import urllib.request

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CW = os.path.dirname(SCRIPT_DIR)
PROJECT = os.path.dirname(os.path.dirname(CW))
OUT = os.path.join(CW, "assets", "data", "context_sentences.json")
TB = os.path.join(CW, "assets", "data", "textbook_sentences.json")
VOCAB = os.path.join(PROJECT, "3-6年级英语单词表.json")
API_KEY = "sk-daa16008e81843deba6fefe9dce51465"
API_URL = "https://api.deepseek.com/chat/completions"
GRADE = "3下"

sys.path.insert(0, PROJECT)
from word_units_config import UNITS_3XIA


def call_deepseek(prompt: str) -> str:
    body = json.dumps({
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "你是小学英语教师，为三年级学生编写例句。只输出合法 JSON。"},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.7,
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL, data=body,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {API_KEY}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())["choices"][0]["message"]["content"]


def main():
    textbook = json.load(open(TB, encoding="utf-8"))
    meanings = {x["word"]: x["meaning"] for x in json.load(open(VOCAB, encoding="utf-8"))["grades"][GRADE]["words"]}
    existing = json.load(open(OUT, encoding="utf-8")) if os.path.exists(OUT) else {}
    all_words = [w for ws in UNITS_3XIA.values() for w in ws if w not in existing]
    print(f"待生成 {len(all_words)}，已有 {len(existing)}")
    for i in range(0, len(all_words), 12):
        batch = all_words[i : i + 12]
        word_list = "\n".join(
            f'- "{w}" 中文：{meanings.get(w,"")}；教材原句：{textbook.get(w,{}).get("en","")}'
            for w in batch
        )
        prompt = f"""为以下三年级单词各写1条例句（5-10词，生活化，含目标词，附中文）。
{word_list}
输出 JSON，key=单词，value={{"en":"...","zh":"..."}}"""
        raw = re.sub(r"^```json\s*|\s*```$", "", call_deepseek(prompt).strip())
        try:
            existing.update(json.loads(raw))
            print(f"  +{len(batch)}")
        except json.JSONDecodeError as e:
            print("JSON error:", e)
        time.sleep(1)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(existing)} to {OUT}")


if __name__ == "__main__":
    main()
