# -*- coding: utf-8 -*-
"""为 Courseware 全部 HTML 插入 logo"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GRADES = ['3GA', '3GB', '4GA', '4GB']

MARKER = 'class="course-logo"'


def logo_block(href: str) -> str:
    return (
        f'      <a class="course-logo" href="{href}" title="Steven\'s Class English Studio">\n'
        f'        <img src="assets/images/logo.png" alt="Steven\'s Class English Studio">\n'
        f'      </a>\n'
    )


def patch_grade_html(path: Path, is_index: bool) -> str:
    text = path.read_text(encoding='utf-8')
    if MARKER in text:
        return 'skip'

    href = '../index.html' if is_index else 'index.html'
    logo = logo_block(href)
    m = re.search(r'(<div class="top-bar[^"]*">\s*\n)(\s*<a class="back-link")', text)
    if not m:
        return 'no-top-bar'
    new_text = text[: m.start(2)] + logo + text[m.start(2) :]
    path.write_text(new_text, encoding='utf-8')
    return 'ok'


def main():
    hub = ROOT / 'index.html'
    print('hub index:', 'skip' if MARKER in hub.read_text(encoding='utf-8') else 'check')

    ok = skip = fail = 0
    for g in GRADES:
        for html in sorted((ROOT / g).glob('*.html')):
            status = patch_grade_html(html, html.name == 'index.html')
            print(f'{g}/{html.name}: {status}')
            if status == 'ok':
                ok += 1
            elif status == 'skip':
                skip += 1
            else:
                fail += 1
    print(f'done: ok={ok} skip={skip} fail={fail}')


if __name__ == '__main__':
    main()
