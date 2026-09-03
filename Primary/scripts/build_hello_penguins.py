#!/usr/bin/env python3
"""从 Dive Dolphin 模板生成 Hello, penguins! 全套国家地理分级阅读课程。"""
from __future__ import annotations

import json
import os
import re
import shutil
import sys

sys.path.insert(0, os.path.dirname(__file__))
from hello_penguins_content import (  # noqa: E402
    ACCENT,
    ACCENT_DARK,
    ACCENT_LIGHT,
    BG_LIGHT,
    SAY,
    SOUND_BOXES,
    STORY,
    WILD,
    WORDS,
)

ROOT = os.path.join(os.path.dirname(__file__), "..")
SRC = os.path.join(ROOT, "Dive Dolphin")
DEST = os.path.join(ROOT, "Hello Penguins")
COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Hello%20Penguins"


def slug(key: str) -> str:
    return key.lower().replace("'", "").replace(" ", "-")


def words_js() -> str:
    lines = ["    var WORDS = ["]
    for key, zh, ex, emoji in WORDS:
        sb = SOUND_BOXES.get(key) or []
        sb_parts = []
        for b in sb:
            if b.get("combo"):
                friends = json.dumps(b["friends"], ensure_ascii=False)
                sb_parts.append(
                    f'{{ text: "{b["text"]}", hint: "{b["hint"]}", combo: true, friends: {friends} }}'
                )
            else:
                hint = b["hint"].replace('"', '\\"')
                text = b["text"]
                sb_parts.append(f'{{ text: "{text}", hint: "{hint}", combo: false }}')
        lines.append(
            f'      {{ key: "{key}", zh: "{zh}", ex: "{ex.replace(chr(34), chr(92)+chr(34))}", emoji: "{emoji}",\n'
            f"        soundBoxes: [\n          "
            + ",\n          ".join(sb_parts)
            + ",\n        ] },"
        )
    lines.append("    ];")
    return "\n".join(lines)


def story_js() -> str:
    lines = ["    var STORY = ["]
    for en, zh in STORY:
        en_esc = en.replace("\\", "\\\\").replace('"', '\\"')
        zh_esc = zh.replace("\\", "\\\\").replace('"', '\\"')
        lines.append(f'      {{ en: "{en_esc}", zh: "{zh_esc}" }},')
    lines.append("    ];")
    return "\n".join(lines)


def words_data_js() -> str:
    entries = []
    for key, zh, _ex, emoji in WORDS:
        entries.append(
            f'    {{ word: "{key.lower()}", zh: "{zh}", emoji: "{emoji}" }},'
        )
    body = "\n".join(entries)
    return f'''/**
 * Hello, penguins! 复习游戏 · 词表 + 选词设置（localStorage）
 */
(function (global) {{
  "use strict";

  var STORAGE_KEY = "helloPenguinsReview.selectedWords";

  var HELLO_PENGUINS_ALL_WORDS = [
{body}
  ];

  var ALL_KEYS = HELLO_PENGUINS_ALL_WORDS.map(function (w) {{
    return w.word;
  }});

  function mapByWord() {{
    var m = {{}};
    HELLO_PENGUINS_ALL_WORDS.forEach(function (w) {{
      m[w.word] = w;
    }});
    return m;
  }}

  var WMAP = mapByWord();

  function wordImgFile(w) {{
    var key = (typeof w === "string") ? w : (w && w.word) || "";
    return String(key).toLowerCase().replace(/'/g, "").replace(/\\s+/g, "-");
  }}

  function normalizeKeys(keys) {{
    if (!keys || !keys.length) return [];
    var out = [];
    keys.forEach(function (k) {{
      var key = String(k).toLowerCase().trim();
      if (WMAP[key] && out.indexOf(key) < 0) out.push(key);
    }});
    return out;
  }}

  function getStoredKeys() {{
    try {{
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return normalizeKeys(JSON.parse(raw));
    }} catch (e) {{
      return null;
    }}
  }}

  function saveKeys(keys) {{
    var normalized = normalizeKeys(keys);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }}

  function getDefaultKeys() {{
    return ALL_KEYS.slice();
  }}

  function getSelectedKeys() {{
    var stored = getStoredKeys();
    if (stored && stored.length) return stored;
    return getDefaultKeys();
  }}

  function getSelected() {{
    return getSelectedKeys()
      .map(function (k) {{
        return WMAP[k];
      }})
      .filter(Boolean);
  }}

  function chunkForMemory(size) {{
    size = size || 3;
    var list = getSelected();
    var chunks = [];
    for (var i = 0; i < list.length; i += size) {{
      chunks.push(list.slice(i, i + size));
    }}
    if (chunks.length > 1 && chunks[0].length > 0) {{
      var first = chunks[0];
      for (var c = 1; c < chunks.length; c++) {{
        var chunk = chunks[c];
        var used = {{}};
        chunk.forEach(function (w) {{
          used[w.word] = true;
        }});
        var fi = 0;
        var guard = 0;
        while (chunk.length < size && guard < size * first.length * 2) {{
          guard++;
          var candidate = first[fi % first.length];
          fi++;
          if (!used[candidate.word]) {{
            chunk.push(candidate);
            used[candidate.word] = true;
          }} else if (first.length === 1) {{
            chunk.push(candidate);
          }}
        }}
      }}
    }}
    return chunks;
  }}

  function shuffle(arr) {{
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {{
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }}
    return a;
  }}

  global.HelloPenguinsWords = {{
    ALL: HELLO_PENGUINS_ALL_WORDS,
    ALL_KEYS: ALL_KEYS,
    WMAP: WMAP,
    STORAGE_KEY: STORAGE_KEY,
    IMG_BASE: "../hello-penguins-courseware/images/words/",
    wordImgFile: wordImgFile,
    getSelected: getSelected,
    getSelectedKeys: getSelectedKeys,
    getDefaultKeys: getDefaultKeys,
    saveKeys: saveKeys,
    normalizeKeys: normalizeKeys,
    chunkForMemory: chunkForMemory,
    shuffle: shuffle,
    MIN_WORDS_GAME1: 2,
    MIN_WORDS_GAME2: 2,
    MIN_WORDS_GAME3: 1,
    MIN_WORDS_GAME4: 4,
    MIN_WORDS_GAME5: 3,
    MIN_WORDS_GAME6: 3,
    MIN_WORDS_GAME7: 3,
    MIN_WORDS_GAME8: 4,
    MIN_WORDS_GAME9: 4,
  }};
}})(typeof window !== "undefined" ? window : this);
'''


def empty_audio_manifest() -> str:
    return 'window.__LOCAL_AUDIO_MANIFEST = {"voice": "en-GB-RyanNeural", "lookup": {}};'


def empty_manifest_json() -> str:
    return json.dumps({"voice": "en-GB-RyanNeural", "lookup": {}}, indent=2) + "\n"


def replace_all(text: str) -> str:
    pairs = [
        ("Dive Dolphin", "Hello Penguins"),
        ("Dive%20Dolphin", "Hello%20Penguins"),
        ("dive-dolphin", "hello-penguins"),
        ("Dive, dolphin!", "Hello, penguins!"),
        ("DiveDolphin", "HelloPenguins"),
        ("diveDolphin", "helloPenguins"),
        ("DIVE_DOLPHIN", "HELLO_PENGUINS"),
        ("潜水吧，海豚", "你好，企鹅"),
        ("海豚", "企鹅"),
        ("🐬", "🐧"),
        ("#01579B", ACCENT_DARK),
        ("#01579b", ACCENT_DARK),
        ("#0277bd", ACCENT),
        ("#0277BD", ACCENT),
        ("#4FC3F7", ACCENT_LIGHT),
        ("#4fc3f7", ACCENT_LIGHT),
        ("#E1F5FE", BG_LIGHT),
        ("#e1f5fe", BG_LIGHT),
        ("#1e3a5f", WILD),
        ("#1E3A5F", WILD),
        (
            "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Dive%20Dolphin/",
            f"{COS}/",
        ),
    ]
    for old, new in pairs:
        text = text.replace(old, new)
    return text


def rename_subfolders(dest: str):
    for name in os.listdir(dest):
        if name.startswith("dive-dolphin-"):
            os.rename(
                os.path.join(dest, name),
                os.path.join(dest, name.replace("dive-dolphin", "hello-penguins")),
            )


def rename_homework_files(dest: str):
    mapping = {
        "Dive Dolphin听写练习01.html": "Hello Penguins听写练习01.html",
        "Dive Dolphin听写练习02.html": "Hello Penguins听写练习02.html",
        "Dive Dolphin抄写作业 01.html": "Hello Penguins抄写作业 01.html",
        "Dive Dolphin抄写作业 02.html": "Hello Penguins抄写作业 02.html",
        "Dive Dolphin抄写作业 03.html": "Hello Penguins抄写作业 03.html",
        "Dive Dolphin抄写作业 04.html": "Hello Penguins抄写作业 04.html",
    }
    hw = os.path.join(dest, "hello-penguins-homework")
    for old, new in mapping.items():
        src = os.path.join(hw, old)
        dst = os.path.join(hw, new)
        if os.path.isfile(src) and src != dst:
            if os.path.exists(dst):
                os.remove(dst)
            os.rename(src, dst)


def patch_courseware(path: str):
    with open(path, encoding="utf-8") as f:
        text = f.read()

    text = re.sub(
        r"var MEDIA_COS = \(function \(\) \{\s*var cos = \"[^\"]+\";",
        'var MEDIA_COS = (function () {\n      var cos = "'
        + COS
        + '/hello-penguins-courseware/";',
        text,
        count=1,
    )
    text = re.sub(r"var WORDS = \[[\s\S]*?\];", words_js(), text, count=1)
    text = re.sub(r"var STORY = \[[\s\S]*?\];", story_js(), text, count=1)
    text = text.replace(
        'var SAY = (window.NG_WORD_SAY && window.NG_WORD_SAY["hello-penguins"]) || {};',
        'var SAY = (window.NG_WORD_SAY && window.NG_WORD_SAY["hello-penguins"]) || {};',
    )
    text = text.replace(
        'var SAY = (window.NG_WORD_SAY && window.NG_WORD_SAY["dive-dolphin"]) || {};',
        'var SAY = (window.NG_WORD_SAY && window.NG_WORD_SAY["hello-penguins"]) || {};',
    )
    text = text.replace("--wild-green: #33691e;", f"--wild-green: {WILD};")
    text = text.replace("--edge-blue: #33691e;", f"--edge-blue: {WILD};")
    text = text.replace("--wild-green: #1e3a5f;", f"--wild-green: {WILD};")
    text = text.replace("--edge-blue: #1e3a5f;", f"--edge-blue: {WILD};")
    js_slug = "String(w && w.key).toLowerCase().replace(/'/g, '').replace(/\\s+/g, '-')"
    extra = (
        "\n    if (window.NGWordExtras) {\n"
        "      NGWordExtras.sceneSrc = function (w) {\n"
        "        return MEDIA_COS + \"images/words/\" + " + js_slug + " + \".png\";\n"
        "      };\n"
        "      NGWordExtras.sentenceSrc = function (w) {\n"
        "        return NGWordExtras.sceneSrc(w);\n"
        "      };\n"
        "    }\n"
    )
    if "NGWordExtras.sceneSrc" not in text:
        text = text.replace(
            'var Distract = "XYZQKVBFGHM".split("");',
            extra + '\n    var Distract = "XYZQKVBFGHM".split("");',
        )
    slug_js = "String(w.key).toLowerCase().replace(/'/g, '').replace(/ /g, '-')"
    text = re.sub(
        r"function wordImg\(w\) \{ return MEDIA_COS \+ \"images/words/\" \+ [^;]+;",
        "function wordImg(w) { return MEDIA_COS + \"images/words/\" + "
        + slug_js
        + " + \".png?v=p1\";",
        text,
        count=1,
    )
    text = re.sub(
        r"function wordMeaningImg\(w\) \{ return MEDIA_COS \+ \"images/words-meaning/\" \+ [^;]+;",
        "function wordMeaningImg(w) { return MEDIA_COS + \"images/words-meaning/\" + "
        + slug_js
        + " + \".png?v=p1\";",
        text,
        count=1,
    )
    text = inject_games(text)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


GAMES_VIEW = """
        <div id="view-games" class="view">
          <div class="view-body view-body--games">
            <div id="lcRoot"></div>
          </div>
        </div>
"""


def inject_games(text: str) -> str:
    if "penguin-science-games.css" not in text:
        text = text.replace(
            '<link rel="stylesheet" href="../../assets/primary-responsive.css?v=6" />',
            '<link rel="stylesheet" href="../../assets/primary-responsive.css?v=6" />\n'
            '  <link rel="stylesheet" href="penguin-science-games.css" />',
        )
    text = text.replace(
        '<button type="button" class="btn" data-goto="story">学课文</button>',
        '<button type="button" class="btn" data-goto="story">学课文</button>\n'
        '                <button type="button" class="btn" data-goto="games">科普竞赛</button>',
    )
    anchor = (
        '            <a class="btn" href="print-story.html" title="导出带配图与中英对照的课文 PDF" '
        'style="text-decoration:none">📄 课文 PDF</a>\n'
        "          </div>\n"
        "          </div>\n"
        "        </div>\n"
    )
    if "view-games" not in text and anchor in text:
        text = text.replace(anchor, anchor + GAMES_VIEW, 1)
    text = text.replace(
        'var t = (name === "words" || name === "review" || name === "story") ? name : "words";',
        'var t = (name === "words" || name === "review" || name === "story" || name === "games") ? name : "words";',
    )
    text = text.replace(
        'n = (name === "words" || name === "review" || name === "story") ? name : "words";',
        'n = (name === "words" || name === "review" || name === "story" || name === "games") ? name : "words";',
    )
    text = text.replace(
        'if (n === "story") { loadStoryNarration(function () { renderStorySlide(); }); }',
        'if (n === "story") { loadStoryNarration(function () { renderStorySlide(); }); }\n'
        "      if (n === \"games\" && window.PenguinScienceGames) PenguinScienceGames.mount();",
    )
    if "penguin-science-games.js" not in text:
        text = text.replace(
            '<script src="../../assets/primary-responsive.js?v=3" defer></script>',
            '<script src="penguin-science-games.js"></script>\n'
            '  <script src="../../assets/primary-responsive.js?v=3" defer></script>',
        )
    return text


def patch_homework_dictation(path: str, words: list[str]):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    words_json = json.dumps(words, ensure_ascii=False)
    text = re.sub(r"words: \[[^\]]+\]", f"words: {words_json}", text, count=1)
    text = re.sub(
        r"var IMG_BASE = \"[^\"]+\";",
        'var IMG_BASE = "../hello-penguins-courseware/images/words/";',
        text,
    )
    text = re.sub(
        r"const IMG_BASE = '[^']+';",
        "const IMG_BASE = '../hello-penguins-courseware/images/words/';",
        text,
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_copy_words(path: str, words: list[str]):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    words_repr = json.dumps(words, ensure_ascii=False).replace('"', "'")
    text = re.sub(r"words: \[[^\]]+\]", f"words: {words_repr}", text, count=1)
    text = re.sub(
        r"const IMG_BASE = '[^']+';",
        "const IMG_BASE = '../hello-penguins-courseware/images/words/';",
        text,
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_copy_sentences(path: str, items: list[dict], label: str):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    items_js = ",\n    ".join(
        "{ word: '%s', sentence: '%s'%s }"
        % (
            it["word"],
            it["sentence"].replace("'", "\\'"),
            (
                ", longLine: true"
                if it.get("long")
                else (", fontScale: %.2f" % it["scale"] if it.get("scale") else "")
            ),
        )
        for it in items
    )
    lesson = f"""const LESSON = {{
  label: '{label}',
  color: '{ACCENT_DARK}',
  bg   : '{BG_LIGHT}',
  items: [
    {items_js}
  ]
}};"""
    text = re.sub(r"const LESSON = \{[\s\S]*?\};", lesson, text, count=1)
    text = re.sub(
        r"const IMG_BASE = '[^']+';",
        "const IMG_BASE = '../hello-penguins-courseware/images/words/';",
        text,
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def word_size_class(word: str) -> str:
    w = word.lower()
    if " " in w or len(w) > 10:
        return " xlong"
    if len(w) > 7:
        return " long"
    return ""


def patch_coloring(path: str):
    sections = []
    for key, zh, _ex, _emoji in WORDS:
        s = slug(key)
        wl = key.lower()
        sz = word_size_class(wl)
        sections.append(
            f"""  <section class="sheet">
    <div class="sheet-hdr"><span>姓名: ___________________</span><span class="badge">{wl} · {zh}</span><span>日期: ____ / ____</span></div>
    <p class="sheet-word{sz}" aria-label="涂色单词 {wl}">{wl}</p>
    <div class="sheet-img"><img src="images/{s}.png" alt="{wl} 涂色" /></div>
    <p class="sheet-ftr">Hello, penguins! · 涂色记单词 · {wl}</p>
  </section>"""
        )
    word_list = " · ".join(k.lower() for k, *_ in WORDS[:10]) + " … 共 " + str(len(WORDS)) + " 词"
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Hello, penguins! · 单词涂色卡 · {len(WORDS)} 词</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Patrick+Hand&display=swap" rel="stylesheet" />
  <style>
    :root {{ --ng-gold: #f5c400; --ink: #1a1a1a; --accent: {ACCENT_DARK}; --stroke: #263238; }}
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: "Fredoka", sans-serif;
      background: linear-gradient(165deg, #37474f 0%, #263238 100%);
      display: flex; flex-direction: column; align-items: center;
      padding-bottom: max(48px, env(safe-area-inset-bottom));
      min-height: 100dvh;
      overflow-x: clip;
      -webkit-tap-highlight-color: rgba(230, 81, 0, 0.12);
    }}
    .back-hub {{
      align-self: flex-start;
      margin: 12px 0 0 max(16px, env(safe-area-inset-left));
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-height: 44px;
      padding: 6px 14px 6px 10px;
      border-radius: 999px;
      border: 2px solid {ACCENT_LIGHT};
      background: rgba(255, 255, 255, 0.95);
      color: {ACCENT_DARK};
      font-size: 0.9rem;
      font-weight: 700;
      text-decoration: none;
      touch-action: manipulation;
    }}
    .back-hub:active {{ background: {BG_LIGHT}; }}
    #app {{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 max(8px, env(safe-area-inset-right)) 0 max(8px, env(safe-area-inset-left));
    }}
    .toolbar {{
      width: 100%; padding: 14px 22px;
      padding-top: max(14px, env(safe-area-inset-top));
      padding-left: max(16px, env(safe-area-inset-left));
      padding-right: max(16px, env(safe-area-inset-right));
      background: #fffef8;
      border-bottom: 3px solid var(--ng-gold);
      display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;
      position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 20px rgba(0,0,0,.2);
    }}
    .toolbar h1 {{ font-size: 1.1rem; color: var(--ink); }}
    .toolbar p {{ font-size: 0.8rem; color: #546e7a; max-width: 36rem; line-height: 1.4; }}
    .btn {{
      font-family: inherit; font-weight: 700; border: none; border-radius: 999px;
      padding: 10px 22px; min-height: 44px; cursor: pointer;
      background: linear-gradient(180deg, #ff9800, var(--accent));
      color: #fff; box-shadow: 0 4px 12px rgba(191,54,12,.4);
      touch-action: manipulation;
      flex-shrink: 0;
    }}
    .page-viewport {{
      width: min(210mm, calc(100vw - 24px));
      margin: 24px auto;
      overflow: hidden;
    }}
    .sheet {{
      width: 210mm; min-height: 297mm; margin: 24px 0; padding: 12mm 14mm;
      background: #fff; box-shadow: 0 0 40px rgba(0,0,0,.5);
      page-break-after: always; display: flex; flex-direction: column; align-items: center;
    }}
    .page-viewport .sheet {{ margin: 0; }}
    .sheet-hdr {{
      width: 100%; display: flex; justify-content: space-between; align-items: center;
      font-size: 0.82rem; color: #78909c; border-bottom: 2px solid #eceff1;
      padding-bottom: 4mm; margin-bottom: 4mm; gap: 4px; flex-wrap: wrap;
    }}
    .sheet-hdr .badge {{
      font-weight: 700; padding: 4px 14px; border-radius: 8px;
      background: {BG_LIGHT}; border: 2px solid var(--ng-gold); color: var(--accent);
    }}
    .sheet-word {{
      width: 100%;
      text-align: center;
      margin: 2mm 0 5mm;
      font-family: "Patrick Hand", "Fredoka", cursive;
      font-weight: 700;
      font-size: clamp(3rem, 11vw, 4.8rem);
      line-height: 1.05;
      letter-spacing: 0.03em;
      color: #ffffff;
      -webkit-text-stroke: 3.5px #1a1a1a;
      paint-order: stroke fill;
      text-transform: lowercase;
      word-break: keep-all;
      text-shadow:
        2px 0 0 #1a1a1a, -2px 0 0 #1a1a1a,
        0 2px 0 #1a1a1a, 0 -2px 0 #1a1a1a,
        1.5px 1.5px 0 #1a1a1a, -1.5px 1.5px 0 #1a1a1a,
        1.5px -1.5px 0 #1a1a1a, -1.5px -1.5px 0 #1a1a1a;
    }}
    .sheet-word.long {{
      font-size: clamp(2.4rem, 8.5vw, 3.6rem);
      -webkit-text-stroke-width: 3px;
    }}
    .sheet-word.xlong {{
      font-size: clamp(1.9rem, 7vw, 2.9rem);
      -webkit-text-stroke-width: 2.6px;
      letter-spacing: 0.01em;
    }}
    .sheet-img {{
      flex: 1; width: 100%; max-width: 170mm;
      display: flex; align-items: center; justify-content: center;
    }}
    .sheet-img img {{
      width: 100%; height: auto; max-height: 210mm; object-fit: contain;
    }}
    .sheet-ftr {{ margin-top: 4mm; font-size: 0.75rem; color: #b0bec5; text-align: center; }}
    @media print {{
      body {{ background: #fff; padding: 0; }}
      .back-hub {{ display: none !important; }}
      .toolbar {{ display: none !important; }}
      .page-viewport {{ width: auto; height: auto; overflow: visible; margin: 0; }}
      .page-viewport .sheet {{ transform: none !important; margin: 0; box-shadow: none; }}
      * {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
    }}
  </style>
  <link rel="stylesheet" href="../../assets/primary-responsive.css?v=2" />
</head>
<body>
  <a class="back-hub" href="../index.html">← Hello, penguins! 首页</a>
  <div class="toolbar">
    <div>
      <h1>🐧 Hello, penguins! · 单词涂色卡（一年级）</h1>
      <p>每页一词：顶部<strong>大号空心小写英文</strong> + 线稿图。{word_list}。打印选「另存为 PDF」。</p>
    </div>
    <button type="button" class="btn" onclick="window.print()">🖨️ 打印 / 导出 PDF</button>
  </div>
  <div id="app">
{chr(10).join(sections)}
  </div>
  <script>
    (function () {{
      var IMG_COS = "{COS}/hello-penguins-coloring/images/";
      document.querySelectorAll(".sheet-img img").forEach(function (img) {{
        var src = img.getAttribute("src") || "";
        var file = src.replace(/^images\\//, "");
        if (!file) return;
        img.addEventListener("error", function onErr() {{
          img.removeEventListener("error", onErr);
          if (img.dataset.cosfb) return;
          img.dataset.cosfb = "1";
          img.src = IMG_COS + file;
        }}, {{ once: true }});
      }});
      var app = document.getElementById("app");
      var sheets = Array.prototype.slice.call(app.querySelectorAll(".sheet"));
      sheets.forEach(function (sheet) {{
        var vp = document.createElement("div");
        vp.className = "page-viewport";
        sheet.parentNode.insertBefore(vp, sheet);
        vp.appendChild(sheet);
      }});
      function fitPageViewports() {{
        if (window.matchMedia("print").matches) return;
        document.querySelectorAll(".page-viewport").forEach(function (vp) {{
          var sheet = vp.querySelector(".sheet");
          if (!sheet) return;
          sheet.style.transform = "none";
          sheet.style.transformOrigin = "top left";
          var naturalW = sheet.offsetWidth;
          var targetW = vp.clientWidth;
          if (!naturalW || !targetW) return;
          var scale = Math.min(1, targetW / naturalW);
          sheet.style.transform = scale < 1 ? "scale(" + scale + ")" : "none";
          vp.style.height = scale < 1 ? sheet.offsetHeight * scale + "px" : "auto";
        }});
      }}
      window.addEventListener("resize", fitPageViewports);
      window.addEventListener("load", fitPageViewports);
    }})();
  </script>
  <script src="../../assets/primary-responsive.js?v=3" defer></script>
</body>
</html>
"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)


def patch_index_primary():
    path = os.path.join(ROOT, "index.html")
    with open(path, encoding="utf-8") as f:
        text = f.read()
    if "Hello Penguins/index.html" in text:
        return
    card = f"""
      <a class="card" href="Hello Penguins/index.html" style="--accent: {ACCENT};">
        <div class="card-top">
          <div class="card-icon">🐧</div>
          <span class="card-arrow" aria-hidden="true">→</span>
        </div>
        <div class="card-tag">Hello, penguins!</div>
        <div class="card-title">你好，企鹅</div>
        <div class="card-tags">
          <span class="tag">互动课件</span>
          <span class="tag">科普竞赛</span>
          <span class="tag">复习游戏</span>
          <span class="tag">涂色卡</span>
          <span class="tag">听写抄写</span>
        </div>
      </a>"""
    text = text.replace(
        '      <a class="card" href="Helpers in your neighborhood/index.html"',
        card + '\n      <a class="card" href="Helpers in your neighborhood/index.html"',
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_print_story(courseware_path: str, print_path: str):
    with open(courseware_path, encoding="utf-8") as f:
        src = f.read()
    m_cos = re.search(r'var cos = "([^"]+)"', src)
    media_cos = m_cos.group(1) if m_cos else f"{COS}/hello-penguins-courseware/"
    story = [{"en": en, "zh": zh} for en, zh in STORY]
    story_json = json.dumps(story, ensure_ascii=False, indent=2)
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>课文 PDF · Hello, penguins!</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,600;0,8..60,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../assets/ng-story-print.css?v=ps8" />
  <style>:root {{ --accent: {ACCENT}; --wild: {WILD}; }}</style>
</head>
<body class="ng-story-print-body">
  <div class="ng-story-toolbar no-print">
    <h1>🐧 Hello, penguins! · 课文 PDF</h1>
    <p>导出带<strong>配图</strong>、<strong>英文</strong>与<strong>中文翻译</strong>的精美课文册。</p>
    <div class="row">
      <label><input type="checkbox" id="optShowZh" checked /> 显示中文翻译</label>
    </div>
    <div class="row" style="margin-top:0.75rem;">
      <button type="button" class="ng-story-btn accent" id="btnStoryPdf">📄 导出 PDF</button>
      <button type="button" class="ng-story-btn primary" id="btnStoryPrint">🖨️ 打印 / 另存 PDF</button>
      <button type="button" class="ng-story-btn" id="btnStoryGen">🔄 刷新预览</button>
      <a class="ng-story-btn" href="index.html">← 返回课件</a>
    </div>
  </div>
  <div id="storyPrintArea"></div>
  <script src="../../assets/ng-story-print.js?v=ps8"></script>
  <script>
  NgStoryPrint.init({{
    title: "Hello, penguins!",
    subtitle: "国家地理分级阅读 · 互动练习 · 学单词 & 学课文",
    mediaCos: {json.dumps(media_cos, ensure_ascii=False)},
    story: {story_json},
    emoji: "🐧",
    accent: {json.dumps(ACCENT)},
    wild: {json.dumps(WILD)},
    filename: "Hello-Penguins-Story.pdf"
  }});
  </script>
</body>
</html>
"""
    with open(print_path, "w", encoding="utf-8") as f:
        f.write(html)


def walk_replace_files(dest: str):
    skip_ext = {".png", ".jpg", ".mp3", ".jpeg", ".webp"}
    for dirpath, _dirnames, filenames in os.walk(dest):
        for name in filenames:
            ext = os.path.splitext(name)[1].lower()
            if ext in skip_ext:
                continue
            path = os.path.join(dirpath, name)
            try:
                with open(path, encoding="utf-8") as f:
                    text = f.read()
            except UnicodeDecodeError:
                continue
            new = replace_all(text)
            if new != text:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new)


def patch_review_game_images(dest: str):
    games = os.path.join(dest, "hello-penguins-review-games")
    for name in os.listdir(games):
        if not name.endswith(".html"):
            continue
        path = os.path.join(games, name)
        with open(path, encoding="utf-8") as f:
            text = f.read()
        text = text.replace(
            "W.IMG_BASE+w.word+'.png'",
            "W.IMG_BASE+W.wordImgFile(w)+'.png'",
        )
        text = text.replace(
            'IMG_BASE + w.word + ".png"',
            'IMG_BASE + HelloPenguinsWords.wordImgFile(w) + ".png"',
        )
        text = text.replace(
            'IMG_BASE + item.label + ".png"',
            'IMG_BASE + HelloPenguinsWords.wordImgFile(item.label) + ".png"',
        )
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)


def patch_say_data():
    path = os.path.join(ROOT, "assets", "ng-word-say-data.js")
    with open(path, encoding="utf-8") as f:
        text = f.read()
    if '"hello-penguins"' in text:
        return
    block = json.dumps(SAY, ensure_ascii=False, indent=4)
    block = block.replace("\n", "\n  ")
    insert = f'  "hello-penguins": {block}\n}};\n'
    text = text.rstrip()
    if text.endswith("};"):
        text = text[:-2].rstrip()
        if not text.endswith(","):
            text += ","
        text += "\n" + insert
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_readme():
    path = os.path.join(ROOT, "README.md")
    with open(path, encoding="utf-8") as f:
        text = f.read()
    if "Hello, penguins!" in text:
        return
    text = text.replace(
        "Play, Kitty! · Jump, Pup! · Peek, Otter! · Dive, dolphin! · Helpers in Your Neighborhood",
        "Play, Kitty! · Jump, Pup! · Peek, Otter! · Dive, dolphin! · Hello, penguins! · Helpers in Your Neighborhood",
    )
    text = text.replace(
        "| Dive, dolphin! | [Dive Dolphin/index.html](Dive%20Dolphin/index.html) |\n| Helpers in Your Neighborhood |",
        "| Dive, dolphin! | [Dive Dolphin/index.html](Dive%20Dolphin/index.html) |\n"
        "| Hello, penguins! | [Hello Penguins/index.html](Hello%20Penguins/index.html) |\n"
        "| Helpers in Your Neighborhood |",
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_gitignore():
    path = os.path.join(ROOT, "..", ".gitignore")
    with open(path, encoding="utf-8") as f:
        text = f.read()
    extra = """
# Allow Hello Penguins course images (cartoon + real penguin photos)
!Primary/Hello Penguins/**/*.png
!Primary/Hello Penguins/**/*.jpg
!Primary/Hello Penguins/**/*.jpeg
!Primary/Hello Penguins/**/*.webp
!Primary/assets/icon-penguin.png
"""
    if "Hello Penguins" not in text:
        with open(path, "a", encoding="utf-8") as f:
            f.write(extra)


def patch_course_hub(dest: str):
    path = os.path.join(dest, "index.html")
    with open(path, encoding="utf-8") as f:
        text = f.read()
    text = text.replace(
        '<div class="card-desc">单词音形 · 课文朗读与跟读</div>',
        '<div class="card-desc">单词音形 · 课文朗读 · 企鹅科普竞赛游戏</div>',
    )
    # icon
    text = text.replace("icon-dolphin.png", "icon-penguin.png")
    text = text.replace("icon-pup.png", "icon-penguin.png")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def main():
    if os.path.isdir(DEST):
        shutil.rmtree(DEST)
    shutil.copytree(
        SRC,
        DEST,
        ignore=shutil.ignore_patterns("*.png", "*.jpg", "*.jpeg", "*.webp", "*.mp3", "*.mp4"),
    )
    rename_subfolders(DEST)
    rename_homework_files(DEST)
    walk_replace_files(DEST)

    wd = os.path.join(DEST, "hello-penguins-review-games", "words-data.js")
    with open(wd, "w", encoding="utf-8") as f:
        f.write(words_data_js())

    for sub in [
        "audio",
        "hello-penguins-courseware/audio",
        "hello-penguins-review-games/audio",
    ]:
        base = os.path.join(DEST, sub)
        os.makedirs(base, exist_ok=True)
        with open(os.path.join(base, "audio-manifest.js"), "w", encoding="utf-8") as f:
            f.write(empty_audio_manifest())
        with open(os.path.join(base, "manifest.json"), "w", encoding="utf-8") as f:
            f.write(empty_manifest_json())

    for sub in [
        "hello-penguins-courseware/images/words",
        "hello-penguins-courseware/images/words-meaning",
        "hello-penguins-courseware/images/story",
        "hello-penguins-courseware/images/sentences",
        "hello-penguins-courseware/images/science",
        "hello-penguins-coloring/images",
    ]:
        os.makedirs(os.path.join(DEST, sub), exist_ok=True)

    cw = os.path.join(DEST, "hello-penguins-courseware", "index.html")
    patch_courseware(cw)
    patch_print_story(cw, os.path.join(DEST, "hello-penguins-courseware", "print-story.html"))
    patch_coloring(os.path.join(DEST, "hello-penguins-coloring", "index.html"))
    patch_review_game_images(DEST)
    patch_course_hub(DEST)

    all_slugs = [slug(k) for k, *_ in WORDS]
    half = len(all_slugs) // 2
    hw = os.path.join(DEST, "hello-penguins-homework")
    patch_homework_dictation(os.path.join(hw, "Hello Penguins听写练习01.html"), all_slugs[:half])
    patch_homework_dictation(os.path.join(hw, "Hello Penguins听写练习02.html"), all_slugs[half:])
    patch_copy_words(os.path.join(hw, "Hello Penguins抄写作业 01.html"), all_slugs[:half])
    patch_copy_words(os.path.join(hw, "Hello Penguins抄写作业 02.html"), all_slugs[half:])
    patch_copy_sentences(
        os.path.join(hw, "Hello Penguins抄写作业 03.html"),
        [
            {"word": "penguin", "sentence": "Hello, penguin!"},
            {"word": "huddle", "sentence": "They huddle to keep warm."},
            {"word": "waddle", "sentence": "They waddle over tree roots.", "long": True},
            {"word": "shuffle", "sentence": "But they can shuffle."},
        ],
        "Hello Penguins 03",
    )
    patch_copy_sentences(
        os.path.join(hw, "Hello Penguins抄写作业 04.html"),
        [
            {"word": "slide", "sentence": "And they can slide."},
            {"word": "swim", "sentence": "They use their wings to swim.", "long": True},
            {"word": "splash", "sentence": "Splash!"},
            {"word": "go-fishing", "sentence": "It's time to go fishing!"},
            {"word": "go-back-on-land", "sentence": "It's time to go back on land.", "long": True},
        ],
        "Hello Penguins 04",
    )

    patch_index_primary()
    patch_say_data()
    patch_readme()
    patch_gitignore()

    spec = os.path.join(DEST, "hello-penguins-courseware", "science-image-spec.json")
    if os.path.isfile(spec):
        os.remove(spec)

    games_src = os.path.dirname(__file__)
    cw_dir = os.path.join(DEST, "hello-penguins-courseware")
    for name in ("penguin-science-games.js", "penguin-science-games.css"):
        src = os.path.join(games_src, name)
        if os.path.isfile(src):
            shutil.copy2(src, os.path.join(cw_dir, name))

    print(f"Built {DEST}")
    print(f"Words: {len(WORDS)}, Story sentences: {len(STORY)}")


if __name__ == "__main__":
    main()
