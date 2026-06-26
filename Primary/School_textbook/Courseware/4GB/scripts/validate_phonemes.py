# -*- coding: utf-8 -*-
"""批量校验并修正 phonemes.json（自然拼读 + IPA 一一对应）"""
import json
import os
import re
import time
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IN_PATH = os.path.join(ROOT, "Courseware", "assets", "data", "phonemes.json")
OUT_PATH = IN_PATH
API_KEY = "sk-daa16008e81843deba6fefe9dce51465"
API_URL = "https://api.deepseek.com/chat/completions"

import sys
sys.path.insert(0, ROOT)
from word_units_config import UNITS_4XIA

RULES = """
## 自然拼读音素拆分规则（必须严格遵守）

1. 每个字素(grapheme)对应**一个** IPA 音素，写在 ipa 字段，格式如 /f/、/aɪ/、/ə/
2. 字素拼接（忽略空格、连字符）必须能还原单词拼写
3. 英式英语(RP)发音
4. 常见字素组合优先识别（**固定组合视为一个音素，不得拆成单字母**）：
   - 辅音混合：bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, sc, sk, sl, sm, sn, sp, st, str, sw, tr, tw 等
   - 静音组合：wr→/r/（w不发音）, kn→/n/, gn→/n/, mb→/m/（b不发音）
   - 二合/三合字母：sh→/ʃ/, ch→/tʃ/, th→/θ/或/ð/, ph→/f/, wh→/w/, ck→/k/, ng→/ŋ/, tion→/ʃən/, ture→/tʃə/
   - 元音组合：igh→/aɪ/, oo→/uː/或/ʊ/, ee→/iː/, ea→/iː/或/e/, ai→/eɪ/, ay→/eɪ/, oa→/əʊ/, ou→/aʊ/, ow→/əʊ/或/aʊ/
   - r 控元音：ar→/ɑː/, er→/ə/, ir→/ɜː/, or→/ɔː/, ur→/ɜː/, air→/eə/, ear→/ɪə/或/ɜː/
   - 其他：ci→/ʃ/（special）或 /aɪ/（scientist）, en→/ən/（student）, oul→/ʊ/（should）
5. Magic-e（元音+辅音+e）：元音读长音；**静音 e 必须与它前面最后一个辅音字符合并为同一格**（如 same→s/a/me，bake→b/a/ke，nurse→n/ur/se），该格 ipa 写辅音音标（e 不单独成格）
6. 完全静音字母（如 hour 的 h、连字符 -）ipa 用 "—"
7. 复合词按音节拆分：fireman→f/i/re/m/a/n, raindrop→r/ai/n/dr/o/p
8. 短语词连续拆分：night owl→n/igh/t + ow/l；come true→c/o/me + tr/ue
9. 跨音节处不强行合并（如 uncle 的 c+l、worried 的 i+e 保持分开）
10. 正确示例：
    - same: [{"letter":"s","ipa":"/s/"},{"letter":"a","ipa":"/eɪ/"},{"letter":"me","ipa":"/m/"}]
    - bake: [{"letter":"b","ipa":"/b/"},{"letter":"a","ipa":"/eɪ/"},{"letter":"ke","ipa":"/k/"}]
    - brush: [{"letter":"br","ipa":"/br/"},{"letter":"u","ipa":"/ʌ/"},{"letter":"sh","ipa":"/ʃ/"}]
    - street: [{"letter":"str","ipa":"/str/"},{"letter":"ee","ipa":"/iː/"},{"letter":"t","ipa":"/t/"}]
    - writer: [{"letter":"wr","ipa":"/r/"},{"letter":"i","ipa":"/aɪ/"},{"letter":"t","ipa":"/t/"},{"letter":"er","ipa":"/ə/"}]
    - special: [{"letter":"sp","ipa":"/sp/"},{"letter":"e","ipa":"/e/"},{"letter":"ci","ipa":"/ʃ/"},{"letter":"a","ipa":"/ə/"},{"letter":"l","ipa":"/l/"}]
    - scientist: [{"letter":"sc","ipa":"/s/"},{"letter":"i","ipa":"/aɪ/"},{"letter":"e","ipa":"/ə/"},{"letter":"n","ipa":"/n/"},{"letter":"t","ipa":"/t/"},{"letter":"i","ipa":"/ɪ/"},{"letter":"st","ipa":"/st/"}]
"""


def all_words():
    ws = []
    for u in UNITS_4XIA.values():
        ws.extend(u)
    return ws


def call_deepseek(prompt: str) -> str:
    body = json.dumps({
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "你是英语自然拼读专家。只输出合法 JSON，不要 markdown。"},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.1,
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL, data=body,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {API_KEY}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        return json.loads(resp.read().decode())["choices"][0]["message"]["content"]


def validate(word: str, items: list) -> tuple[bool, str]:
    if not items:
        return False, "empty"
    joined = "".join(p["letter"] for p in items).replace(" ", "")
    target = word.replace(" ", "").replace("-", "").lower()
    norm = joined.lower()
    # T-shirt: letters Tshirt vs T-shirt
    if norm != target and norm != word.replace(" ", "").lower():
        return False, f"letters '{joined}' != '{word}'"
    for p in items:
        ipa = p.get("ipa", "")
        if not ipa:
            return False, "missing ipa"
    return True, "ok"


def to_symbol(ipa: str) -> str:
    if ipa == "—":
        return "—"
    return ipa if ipa.startswith("/") else f"/{ipa}/"


def normalize(items: list) -> list:
    return [{"symbol": to_symbol(p["ipa"]), "letter": p["letter"]} for p in items]


def main():
    with open(IN_PATH, encoding="utf-8") as f:
        current = json.load(f)

    words = all_words()
    result = {}
    batch_size = 12

    for i in range(0, len(words), batch_size):
        batch = words[i : i + batch_size]
        lines = []
        for w in batch:
            old = current.get(w, [])
            old_str = json.dumps([{"letter": p["letter"], "ipa": p["symbol"]} for p in old], ensure_ascii=False)
            lines.append(f'- "{w}" 当前拆分：{old_str}')
        prompt = f"""{RULES}

请检查并修正以下单词的音素拆分。若当前拆分正确则原样返回，若有误则给出修正版。
输出 JSON 对象：key=单词，value=[{{"letter":"字素","ipa":"/音标/"或"—"}}]

单词列表：
{chr(10).join(lines)}"""

        raw = call_deepseek(prompt)
        raw = re.sub(r"^```json\s*|\s*```$", "", raw.strip())
        try:
            parsed = json.loads(raw)
            for w, items in parsed.items():
                ok, msg = validate(w, items)
                if ok:
                    result[w] = normalize(items)
                    print(f"  OK {w}: {'-'.join(p['letter'] for p in items)}")
                else:
                    print(f"  WARN {w}: {msg}, keeping corrected attempt")
                    result[w] = normalize(items)
        except json.JSONDecodeError as e:
            print(f"  JSON error batch {i}: {e}")
            for w in batch:
                if w in current:
                    result[w] = current[w]
        time.sleep(1)

    # 确保全部 108 词
    for w in words:
        if w not in result and w in current:
            result[w] = current[w]

    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump({w: result[w] for w in words if w in result}, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(result)} words")


if __name__ == "__main__":
    main()
