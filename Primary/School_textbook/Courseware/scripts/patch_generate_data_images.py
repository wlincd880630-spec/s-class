# -*- coding: utf-8 -*-
"""更新各册 generate_data.py 使用 Courseware 内图片路径"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GRADES = ["3GA", "3GB", "4GA", "4GB", "5GA", "5GB", "6GA", "6GB"]

OLD_BLOCK = re.compile(
    r"def sentence_image_path\(unit_key: str, word: str, source: str\) -> str:.*?"
    r"def image_path\(word: str, progress: dict\) -> str:.*?"
    r"return f\"https://picsum\.photos/seed/\{slug\(word\)\}/400/300\"\n",
    re.S,
)

NEW_BLOCK = '''sys.path.insert(0, os.path.join(os.path.dirname(CW), "scripts"))
from courseware_image_utils import sentence_image_path as _sentence_image_path
from courseware_image_utils import word_image_path as _word_image_path


def sentence_image_path(unit_key: str, word: str, source: str) -> str:
    return _sentence_image_path(CW, PROJECT, GRADE, unit_key, word, source)


def image_path(word: str, progress: dict) -> str:
    return _word_image_path(CW, PROJECT, GRADE, word, progress)

'''


def main():
    for g in GRADES:
        p = ROOT / g / "scripts" / "generate_data.py"
        text = p.read_text(encoding="utf-8")
        if "courseware_image_utils" in text:
            print(f"{g}: skip")
            continue
        new_text, n = OLD_BLOCK.subn(NEW_BLOCK, text)
        if not n:
            print(f"{g}: no match")
            continue
        p.write_text(new_text, encoding="utf-8")
        print(f"{g}: ok")


if __name__ == "__main__":
    main()
