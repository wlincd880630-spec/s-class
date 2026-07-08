# -*- coding: utf-8 -*-
"""为各册 generate_textbook_sentences.py 添加结果过滤"""
import os, re

CW = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT = os.path.dirname(CW)

FILTER_BLOCK = '''
    # 过滤不合格例句（不含目标词、碎片句、劣质中文）
    _scripts = os.path.join(PROJECT, "Courseware", "scripts")
    if _scripts not in sys.path:
        sys.path.insert(0, _scripts)
    from textbook_sentence_utils import filter_textbook_results
    _all = [w for ws in {units_var}.values() for w in ws]
    result = filter_textbook_results(result, _all)
'''

MAKE_ZH_OLD = '''def make_zh(meaning: str, en: str) -> str:
    short = re.sub(r"注：.*", "", meaning).split("；")[0].split("，")[0].strip()
    return f"教材原句：{short}。" if len(en.split()) <= 8 else f"教材中的句子，与「{short}」相关。"'''

MAKE_ZH_NEW = '''def make_zh(meaning: str, en: str) -> str:
    return ""  # 中文由 fix_textbook_sentences.py 统一生成'''

for folder in ["3GA", "3GB", "4GA", "4GB"]:
    path = os.path.join(CW, folder, "scripts", "generate_textbook_sentences.py")
    if not os.path.isfile(path):
        continue
    text = open(path, encoding="utf-8").read()
    units_var = {
        "3GA": "UNITS_3SHANG", "3GB": "UNITS_3XIA",
        "4GA": "UNITS_4SHANG", "4GB": "UNITS_4XIA",
    }[folder]
    if MAKE_ZH_OLD in text:
        text = text.replace(MAKE_ZH_OLD, MAKE_ZH_NEW)
    if "filter_textbook_results" not in text:
        text = text.replace(
            "    if os.path.isfile(SUPPLEMENT):",
            FILTER_BLOCK.replace("{units_var}", units_var) + "\n    if os.path.isfile(SUPPLEMENT):",
        )
    open(path, "w", encoding="utf-8").write(text)
    print("patched", folder)
