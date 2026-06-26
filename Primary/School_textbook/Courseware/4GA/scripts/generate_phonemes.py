# -*- coding: utf-8 -*-
"""调用 Deepseek 按自然拼读规则生成音素拆分（字素 + IPA）— 四年级上册"""
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
from word_units_config import UNITS_4SHANG

PHONICS_RULES = """
## 自然拼读音素拆分规则（必须严格遵守）

1. 将单词拆分为**字素（grapheme）**单元，即对应一个音素的最小字母组合
2. 每个字素对应一个 IPA 国际音标（用斜杠包裹，如 /f/、/aɪ/、/ə/）
3. 优先识别常见字母组合（按长度从长到短）：
   - 辅音丛：tion→/ʃən/, ture→/tʃə/, tch→/tʃ/, dge→/dʒ/, ck→/k/, ng→/ŋ/, ph→/f/, wh→/w/, ch→/tʃ/, sh→/ʃ/, th→/θ/或/ð/
   - R控制元音：ire→/aɪə/, ere→/ɪə/, ore→/ɔː/, air→/eə/, ear→/ɪə/, er→/ə/, ir→/ɜː/, ur→/ɜː/, ar→/ɑː/, or→/ɔː/
   - 元音组合：igh→/aɪ/, oo→/uː/或/ʊ/, ea→/iː/或/e/, ee→/iː/, ai→/eɪ/, ay→/eɪ/, oa→/əʊ/, ow→/əʊ/或/aʊ/, oi→/ɔɪ/, oy→/ɔɪ/, ou→/aʊ/, ue→/juː/, ie→/iː/
4. 复合词按音节/词根拆分
5. 短语词（含空格）按单词分别拆分
6. 所有字素的 letter 拼接必须能还原单词拼写
7. 使用英式英语（RP）发音
"""


def call_deepseek(prompt: str) -> str:
    body = json.dumps({
        "model": "deepseek-chat",
        "messages": [
            {
                "role": "system",
                "content": "你是英语自然拼读（Phonics）专家，精通 IPA 国际音标和字素拆分。"
                "只输出合法 JSON 对象，不要 markdown 代码块，不要解释。",
            },
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.2,
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {API_KEY}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = json.loads(resp.read().decode())
    return data["choices"][0]["message"]["content"]


def all_words():
    words = []
    for ws in UNITS_4SHANG.values():
        words.extend(ws)
    return words


def validate(word: str, items: list) -> bool:
    if not items:
        return False
    joined = "".join(p["letter"] for p in items).replace(" ", "")
    target = word.replace(" ", "").replace("-", "").replace("'", "'").lower()
    return joined.lower() == target.replace("'", "'")


def normalize(items: list) -> list:
    return [{"symbol": p["ipa"], "letter": p["letter"]} for p in items]


def main():
    existing = {}
    if os.path.exists(OUT):
        with open(OUT, encoding="utf-8") as f:
            existing = json.load(f)

    words = [w for w in all_words() if w not in existing]
    print(f"已有 {len(existing)}，待生成 {len(words)}")

    batch_size = 10
    for i in range(0, len(words), batch_size):
        batch = words[i : i + batch_size]
        word_list = "\n".join(f"- {w}" for w in batch)
        prompt = f"""{PHONICS_RULES}

请为以下单词逐一给出音素拆分。输出 JSON 对象：
key = 单词原文（与下列完全一致）
value = [{{"letter":"字素","ipa":"/音标/"}}, ...]

单词列表：
{word_list}"""

        raw = call_deepseek(prompt)
        raw = re.sub(r"^```json\s*|\s*```$", "", raw.strip())
        try:
            parsed = json.loads(raw)
            for w, items in parsed.items():
                if validate(w, items):
                    existing[w] = normalize(items)
                    print(f"  OK {w}")
                else:
                    print(f"  WARN {w}")
                    existing[w] = normalize(items)
            with open(OUT, "w", encoding="utf-8") as f:
                json.dump(existing, f, ensure_ascii=False, indent=2)
        except json.JSONDecodeError as e:
            print("JSON error:", e, raw[:300])
        time.sleep(1)

    print(f"Saved {len(existing)} words to {OUT}")


if __name__ == "__main__":
    main()
