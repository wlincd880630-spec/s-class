# -*- coding: utf-8 -*-
"""修补分册 index.html 的 logo（支持 style 属性）"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GRADES = ['3GA', '3GB', '4GA', '4GB']

OLD = """    <div class="top-bar" style="margin-bottom:0;">
      <a class="back-link" href="../index.html"><i class="fa-solid fa-table-cells"></i> 全部教材</a>
    </div>
    <header class="hero">"""

NEW = """    <div class="top-bar" style="margin-bottom:0;">
      <a class="course-logo" href="../index.html" title="Steven's Class English Studio">
        <img src="assets/images/logo.png" alt="Steven's Class English Studio">
      </a>
      <a class="back-link" href="../index.html"><i class="fa-solid fa-table-cells"></i> 全部教材</a>
    </div>
    <header class="hero">
      <a class="course-logo course-logo--hero" href="../index.html" title="Steven's Class English Studio">
        <img src="assets/images/logo.png" alt="Steven's Class English Studio">
      </a>"""


def main():
    for g in GRADES:
        p = ROOT / g / 'index.html'
        text = p.read_text(encoding='utf-8')
        if 'course-logo' in text:
            print(f'{g}: skip')
            continue
        if OLD not in text:
            print(f'{g}: no-match')
            continue
        p.write_text(text.replace(OLD, NEW), encoding='utf-8')
        print(f'{g}: ok')


if __name__ == '__main__':
    main()
