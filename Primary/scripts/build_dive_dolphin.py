#!/usr/bin/env python3
"""从 Peek Otter 模板生成 Dive, dolphin! 全套国家地理分级阅读课程。"""
import json
import os
import re
import shutil

ROOT = os.path.join(os.path.dirname(__file__), "..")
SRC = os.path.join(ROOT, "Peek Otter")
DEST = os.path.join(ROOT, "Dive Dolphin")
COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Dive%20Dolphin"

ACCENT = "#0277bd"
ACCENT_DARK = "#01579B"
ACCENT_LIGHT = "#4FC3F7"
BG_LIGHT = "#E1F5FE"
WILD = "#1e3a5f"

WORDS = [
    ("Dolphin", "海豚", "There are many kinds of dolphins.", "🐬"),
    ("Ocean", "海洋", "Some dolphins live in oceans.", "🌊"),
    ("River", "河流", "Others live in rivers.", "🏞️"),
    ("Dive", "潜水", "Dive, dolphin!", "🤿"),
    ("Swim", "游泳", "Dolphins swim together.", "🏊"),
    ("Hunt", "捕猎", "They work as a team to hunt fish.", "🎣"),
    ("Play", "玩耍", "Dolphins like to play.", "🎾"),
    ("Leap", "跃起", "They like to leap and jump.", "⬆️"),
    ("Flipper", "鳍肢", "All dolphins have flippers.", "🦭"),
    ("Fin", "背鳍", "All dolphins have a fin.", "🔺"),
    ("Tail", "尾巴", "All dolphins have a tail.", "〰️"),
    ("There", "那里", "There are many kinds of dolphins.", "📍"),
    ("Many", "许多", "There are many kinds of dolphins.", "🔢"),
    ("Beak", "喙", "Some have long beaks.", "🦆"),
    ("Long", "长的", "Some have long beaks.", "📏"),
    ("Short", "短的", "Some have short beaks.", "📐"),
    ("Have", "有", "All dolphins have flippers.", "✅"),
    ("These", "这些", "These dolphins have stripes.", "👆"),
    ("Stripe", "条纹", "These dolphins have stripes.", "〰️"),
    ("Some", "一些", "Some dolphins live in oceans.", "🔹"),
    ("Live", "生活", "Some dolphins live in oceans.", "🏠"),
    ("This", "这个", "This dolphin has spots.", "👉"),
    ("Spot", "斑点", "This dolphin has spots.", "🔵"),
    ("Others", "其他的", "Others live in rivers.", "👥"),
    ("Together", "一起", "Dolphins swim together.", "🤝"),
    ("Work", "工作", "They work as a team.", "💼"),
    ("Team", "团队", "They work as a team.", "👥"),
    ("With", "和/用", "Play with things they find.", "🤲"),
    ("Thing", "东西", "Things they find in the water.", "📦"),
    ("They", "它们", "They work as a team.", "🐬"),
    ("Water", "水", "They find things in the water.", "💧"),
    ("Seaweed", "海草", "Seaweed in the ocean.", "🌿"),
    ("Like", "喜欢", "Dolphins like to play.", "❤️"),
    ("Blowhole", "呼吸孔", "Dolphins breathe through a blowhole.", "💨"),
    ("Back", "背部", "A fin on the dolphin's back.", "🔙"),
    ("Down", "向下", "Dive down in the water.", "⬇️"),
    ("Through", "穿过", "Air goes through the blowhole.", "↔️"),
    ("Air", "空气", "They come to get air.", "🌬️"),
    ("Breathe", "呼吸", "Dolphins need to breathe.", "😮‍💨"),
    ("Need to", "需要", "Dolphins need to breathe.", "⚠️"),
    ("Come", "来", "They come to the top.", "➡️"),
    ("Top", "顶部", "Come to the top of the water.", "⬆️"),
    ("Get", "获得", "Get air at the top.", "🎯"),
]

STORY = [
    ("There are many kinds of dolphins.", "有很多种海豚。"),
    ("Some have long beaks.", "一些有长长的喙。"),
    ("Some have short beaks.", "一些有短短的喙。"),
    ("These dolphins have stripes.", "这些海豚有条纹。"),
    ("This dolphin has spots.", "这只海豚有斑点。"),
    ("Some dolphins live in oceans.", "一些海豚生活在海洋里。"),
    ("Others live in rivers.", "其他的生活在河流里。"),
    ("All dolphins have flippers, a fin, and a tail.", "所有海豚都有鳍肢、背鳍和尾巴。"),
    ("Dolphins swim together.", "海豚一起游泳。"),
    ("They work as a team to hunt fish.", "它们团队合作捕猎鱼类。"),
    ("Dolphins like to play with things they find in the water.", "海豚喜欢玩在水里找到的东西。"),
    ("They also like to leap and jump.", "它们也喜欢跃起和跳跃。"),
    ("Dolphins need to breathe.", "海豚需要呼吸。"),
    ("They come to the top of the water to get air.", "它们游到水面获取空气。"),
    ("Dive, dolphin!", "潜下去吧，海豚！"),
]

# 常见字母组合 → soundBoxes 提示
COMBOS = {
    "ph": ("/f/", ["dolphin", "phone", "graph"]),
    "oo": ("长 /oo/", ["moon", "pool", "food"]),
    "ea": ("发 /ē/", ["team", "sea", "beach"]),
    "ee": ("长 e", ["need", "see", "tree"]),
    "ai": ("长 /ā/", ["tail", "rain", "wait"]),
    "ow": ("/ow/", ["blow", "show", "grow"]),
    "igh": ("长 /ī/", ["high", "light", "night"]),
    "ch": ("/ch/", ["beach", "rich", "chip"]),
    "sh": ("/sh/", ["fish", "wish", "dash"]),
    "th": ("/th/", ["they", "this", "with"]),
    "wh": ("/w/", ["what", "when", "where"]),
    "ou": ("/ow/", ["out", "cloud", "about"]),
    "oa": ("/ō/", ["boat", "coat", "road"]),
    "or": ("/or/", ["short", "fork", "corn"]),
    "er": ("/ər/", ["river", "water", "other"]),
    "ar": ("/ar/", ["star", "park", "hard"]),
    "ir": ("/ər/", ["bird", "girl", "first"]),
    "ur": ("/ər/", ["turn", "surf", "curl"]),
    "ea": ("/ē/", ["team", "sea", "beach"]),
    "ew": ("/oo/", ["new", "few", "grew"]),
    "igh": ("/ī/", ["high", "light"]),
    "tion": ("/shən/", ["action", "nation"]),
    "all": ("/ôl/", ["ball", "call", "tall"]),
    "ing": ("/ing/", ["swim", "jump", "play"]),
    "ight": ("/īt/", ["light", "night", "right"]),
    "eak": ("/ēk/", ["beak", "peak", "speak"]),
    "eam": ("/ēm/", ["team", "dream", "steam"]),
    "eed": ("/ēd/", ["need", "feed", "seed"]),
    "air": ("/air/", ["air", "fair", "hair"]),
    "ive": ("/iv/", ["live", "dive", "five"]),
    "ome": ("/ōm/", ["home", "some", "come"]),
    "one": ("/ōn/", ["bone", "stone", "alone"]),
    "ope": ("/ōp/", ["hope", "rope", "slope"]),
    "ore": ("/or/", ["more", "store", "shore"]),
    "ose": ("/ōz/", ["nose", "rose", "close"]),
    "own": ("/own/", ["down", "town", "brown"]),
    "oat": ("/ōt/", ["boat", "coat", "float"]),
    "eed": ("/ēd/", ["need", "feed", "weed"]),
    "eaw": ("/ē/", ["seaweed"]),
    "hole": ("/ōl/", ["hole", "whole", "pole"]),
    "ther": ("/ər/", ["other", "mother", "brother"]),
    "ther": ("/ðər/", ["together", "weather", "feather"]),
    "ough": ("/ō/", ["though", "dough"]),
    "ough": ("/uff/", ["enough", "rough"]),
}


def slug(key: str) -> str:
    return key.lower().replace(" ", "-")


def make_sound_boxes(word: str) -> list:
    w = word.lower()
    boxes = []
    i = 0
    while i < len(w):
        matched = False
        for length in (4, 3, 2):
            chunk = w[i : i + length]
            if chunk in COMBOS and length > 1:
                hint, friends = COMBOS[chunk]
                boxes.append(
                    {
                        "text": chunk,
                        "hint": hint,
                        "combo": True,
                        "friends": friends[:4],
                    }
                )
                i += length
                matched = True
                break
        if not matched:
            ch = w[i]
            hint = {
                "a": "短 a",
                "e": "短 e",
                "i": "短 i",
                "o": "短 o",
                "u": "短 u",
                "y": "y 发 /ī/ 或 /ē/",
            }.get(ch, f"/{ch}/")
            boxes.append({"text": ch, "hint": hint, "combo": False})
            i += 1
    return boxes


def words_js() -> str:
    lines = ["    var WORDS = ["]
    for key, zh, ex, emoji in WORDS:
        sb = make_sound_boxes(key)
        sb_parts = []
        for b in sb:
            if b.get("combo"):
                friends = json.dumps(b["friends"], ensure_ascii=False)
                sb_parts.append(
                    f'{{ text: "{b["text"]}", hint: "{b["hint"]}", combo: true, friends: {friends} }}'
                )
            else:
                sb_parts.append(
                    f'{{ text: "{b["text"]}", hint: "{b["hint"]}", combo: false }}'
                )
        lines.append(
            f'      {{ key: "{key}", zh: "{zh}", ex: "{ex}", emoji: "{emoji}",\n'
            f"        soundBoxes: [\n          "
            + ",\n          ".join(sb_parts)
            + ",\n        ] }},"
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
 * Dive, dolphin! 复习游戏 · 词表 + 选词设置（localStorage）
 */
(function (global) {{
  "use strict";

  var STORAGE_KEY = "diveDolphinReview.selectedWords";

  var DIVE_DOLPHIN_ALL_WORDS = [
{body}
  ];

  var ALL_KEYS = DIVE_DOLPHIN_ALL_WORDS.map(function (w) {{
    return w.word;
  }});

  function mapByWord() {{
    var m = {{}};
    DIVE_DOLPHIN_ALL_WORDS.forEach(function (w) {{
      m[w.word] = w;
    }});
    return m;
  }}

  var WMAP = mapByWord();

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

  global.DiveDolphinWords = {{
    ALL: DIVE_DOLPHIN_ALL_WORDS,
    ALL_KEYS: ALL_KEYS,
    WMAP: WMAP,
    STORAGE_KEY: STORAGE_KEY,
    IMG_BASE: "{COS}/dive-dolphin-courseware/images/words/",
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
        ("Peek Otter", "Dive Dolphin"),
        ("peek-otter", "dive-dolphin"),
        ("Peek, Otter!", "Dive, dolphin!"),
        ("PeekOtter", "DiveDolphin"),
        ("peekOtter", "diveDolphin"),
        ("PEEK_OTTER", "DIVE_DOLPHIN"),
        ("好奇的水獭", "潜水吧，海豚"),
        ("水獭", "海豚"),
        ("otter", "dolphin"),
        ("Otter", "Dolphin"),
        ("🦦", "🐬"),
        ("#00838F", ACCENT_DARK),
        ("#00838f", ACCENT_DARK),
        ("#0277bd", ACCENT),
        ("#4DD0E1", ACCENT_LIGHT),
        ("#E0F7FA", BG_LIGHT),
        ("#00acc1", ACCENT),
        ("#00ACC1", ACCENT),
        (
            "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Peek%20Otter/",
            f"{COS}/",
        ),
        (
            "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Play%20Kitty/peek-otter-courseware/",
            f"{COS}/dive-dolphin-courseware/",
        ),
    ]
    for old, new in pairs:
        text = text.replace(old, new)
    return text


def rename_subfolders(dest: str):
    for name in os.listdir(dest):
        if name.startswith("peek-otter-"):
            os.rename(
                os.path.join(dest, name),
                os.path.join(dest, name.replace("peek-otter", "dive-dolphin")),
            )


def rename_homework_files(dest: str):
    mapping = {
        "Peek Otter听写练习01.html": "Dive Dolphin听写练习01.html",
        "Peek Otter听写练习02.html": "Dive Dolphin听写练习02.html",
        "Peek Otter抄写作业 01.html": "Dive Dolphin抄写作业 01.html",
        "Peek Otter抄写作业 02.html": "Dive Dolphin抄写作业 02.html",
        "Peek Otter抄写作业 03.html": "Dive Dolphin抄写作业 03.html",
        "Peek Otter抄写作业 04.html": "Dive Dolphin抄写作业 04.html",
        "Dive Dolphin听写练习01.html": "Dive Dolphin听写练习01.html",
    }
    hw = os.path.join(dest, "dive-dolphin-homework")
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
        r"var MEDIA_COS = \"[^\"]+\";",
        f'var MEDIA_COS = "{COS}/dive-dolphin-courseware/";',
        text,
        count=1,
    )
    text = re.sub(r"var WORDS = \[[\s\S]*?\];", words_js(), text, count=1)
    text = re.sub(r"var STORY = \[[\s\S]*?\];", story_js(), text, count=1)
    text = text.replace(
        "function wordImg(w) { return MEDIA_COS + \"images/words/\" + w.key.toLowerCase() + \".png\"; }",
        "function wordImg(w) { return MEDIA_COS + \"images/words/\" + String(w.key).toLowerCase().replace(/ /g, \"-\") + \".png\"; }",
    )
    text = text.replace("--wild-green: #2C4A3E;", f"--wild-green: {WILD};")
    text = text.replace("--edge-blue: #1E3A5F;", f"--edge-blue: {WILD};")
    text = text.replace("border: 2px solid #4DD0E1;", f"border: 2px solid {ACCENT_LIGHT};")

    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_homework_dictation(path: str, words: list[str]):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    words_json = json.dumps(words, ensure_ascii=False)
    text = re.sub(r'words: \[[^\]]+\]', f"words: {words_json}", text)
    text = re.sub(r"words: \[[^\]]+\]", f"words: {words_json}", text)
    text = text.replace(
        "IMG_BASE",
        "IMG_BASE",
    )
    text = re.sub(
        r"const IMG_BASE = '[^']+';",
        f"const IMG_BASE = '{COS}/dive-dolphin-courseware/images/words/';",
        text,
    )
    text = re.sub(
        r"var IMG_BASE = \"[^\"]+\";",
        f'var IMG_BASE = "{COS}/dive-dolphin-courseware/images/words/";',
        text,
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_copy_words(path: str, words: list[str]):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    words_repr = json.dumps(words, ensure_ascii=False).replace('"', "'")
    text = re.sub(r"words: \[[^\]]+\]", f"words: {words_repr}", text)
    text = re.sub(
        r"const IMG_BASE = '[^']+';",
        f"const IMG_BASE = '{COS}/dive-dolphin-courseware/images/words/';",
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
        f"const IMG_BASE = '{COS}/dive-dolphin-courseware/images/words/';",
        text,
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_coloring(path: str):
    sections = []
    for key, zh, _ex, _emoji in WORDS:
        s = slug(key)
        sections.append(
            f"""  <section class="sheet"><div class="sheet-hdr"><span>姓名: ___________________</span><span class="badge">{key.lower()} · {zh}</span><span>日期: ____ / ____</span></div><div class="sheet-img"><img src="{COS}/dive-dolphin-coloring/images/{s}.png" alt="{key.lower()} 涂色" /></div><p class="sheet-ftr">Dive, dolphin! · 涂色记单词 · {key.lower()}</p></section>"""
        )
    with open(path, encoding="utf-8") as f:
        text = f.read()
    text = re.sub(
        r"<title>[^<]+</title>",
        f"<title>Dive, dolphin! · 单词涂色卡 · {len(WORDS)} 词</title>",
        text,
        count=1,
    )
    text = re.sub(
        r":root \{ --ng-gold: #f5c400; --ink: #1a1a1a; --accent: [^;]+; \}",
        f":root {{ --ng-gold: #f5c400; --ink: #1a1a1a; --accent: {ACCENT_DARK}; }}",
        text,
        count=1,
    )
    text = re.sub(
        r"(<div id=\"app\">)\s*<section class=\"sheet\">[\s\S]*?</div>\s*<script>",
        r"\1\n" + "\n".join(sections) + "\n  </div>\n\n  <script>",
        text,
        count=1,
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_index_primary():
    path = os.path.join(ROOT, "index.html")
    with open(path, encoding="utf-8") as f:
        text = f.read()
    if "Dive Dolphin/index.html" in text:
        return
    card = f"""
      <a class="card" href="Dive Dolphin/index.html" style="--accent: {ACCENT};">
        <div class="card-top">
          <div class="card-icon">🐬</div>
          <span class="card-arrow" aria-hidden="true">→</span>
        </div>
        <div class="card-tag">Dive, dolphin!</div>
        <div class="card-title">潜水吧，海豚</div>
        <div class="card-tags">
          <span class="tag">互动课件</span>
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
    m_cos = re.search(r'var MEDIA_COS = "([^"]+)"', src)
    m_story = re.search(r"var STORY = (\[[\s\S]*?\]);", src)
    media_cos = m_cos.group(1) if m_cos else f"{COS}/dive-dolphin-courseware/"
    story_raw = m_story.group(1) if m_story else "[]"
    story = []
    for m in re.finditer(
        r'\{\s*en:\s*"((?:\\.|[^"\\])*)"\s*,\s*zh:\s*"((?:\\.|[^"\\])*)"\s*\}',
        story_raw,
    ):
        story.append({"en": m.group(1), "zh": m.group(2)})
    story_json = json.dumps(story, ensure_ascii=False, indent=2)
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>课文 PDF · Dive, dolphin!</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,600;0,8..60,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../assets/ng-story-print.css" />
  <style>:root {{ --accent: {ACCENT}; --wild: {WILD}; }}</style>
</head>
<body class="ng-story-print-body">
  <div class="ng-story-toolbar no-print">
    <h1>🐬 Dive, dolphin! · 课文 PDF</h1>
    <p>导出带<strong>配图</strong>、<strong>英文</strong>与<strong>中文翻译</strong>的精美课文册。</p>
    <div class="row">
      <label>每页句数
        <select id="optPerPage">
          <option value="1" selected>1 句 / 页（推荐）</option>
          <option value="2">2 句 / 页</option>
        </select>
      </label>
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
  <script src="../../assets/ng-story-print.js"></script>
  <script>
  NgStoryPrint.init({{
    title: "Dive, dolphin!",
    subtitle: "国家地理分级阅读 · 互动练习 · 学单词 & 学课文",
    mediaCos: {json.dumps(media_cos, ensure_ascii=False)},
    story: {story_json},
    emoji: "🐬",
    accent: {json.dumps(ACCENT)},
    wild: {json.dumps(WILD)},
    filename: "Dive-Dolphin-Story.pdf"
  }});
  </script>
</body>
</html>
"""
    with open(print_path, "w", encoding="utf-8") as f:
        f.write(html)


def walk_replace_files(dest: str):
    skip_ext = {".png", ".jpg", ".mp3"}
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


def main():
    if os.path.isdir(DEST):
        shutil.rmtree(DEST)
    shutil.copytree(SRC, DEST)
    rename_subfolders(DEST)
    rename_homework_files(DEST)
    walk_replace_files(DEST)

    # words-data.js
    wd = os.path.join(DEST, "dive-dolphin-review-games", "words-data.js")
    with open(wd, "w", encoding="utf-8") as f:
        f.write(words_data_js())

    # empty audio manifests
    for sub in [
        "audio",
        "dive-dolphin-courseware/audio",
        "dive-dolphin-review-games/audio",
    ]:
        base = os.path.join(DEST, sub)
        os.makedirs(base, exist_ok=True)
        with open(os.path.join(base, "audio-manifest.js"), "w", encoding="utf-8") as f:
            f.write(empty_audio_manifest())
        with open(os.path.join(base, "manifest.json"), "w", encoding="utf-8") as f:
            f.write(empty_manifest_json())

    # image dirs
    for sub in [
        "dive-dolphin-courseware/images/words",
        "dive-dolphin-courseware/images/story",
        "dive-dolphin-coloring/images",
    ]:
        os.makedirs(os.path.join(DEST, sub), exist_ok=True)

    cw = os.path.join(DEST, "dive-dolphin-courseware", "index.html")
    patch_courseware(cw)
    patch_print_story(cw, os.path.join(DEST, "dive-dolphin-courseware", "print-story.html"))
    patch_coloring(os.path.join(DEST, "dive-dolphin-coloring", "index.html"))

    all_slugs = [slug(k) for k, *_ in WORDS]
    half = len(all_slugs) // 2
    hw = os.path.join(DEST, "dive-dolphin-homework")
    patch_homework_dictation(os.path.join(hw, "Dive Dolphin听写练习01.html"), all_slugs[:half])
    patch_homework_dictation(os.path.join(hw, "Dive Dolphin听写练习02.html"), all_slugs[half:])
    patch_copy_words(os.path.join(hw, "Dive Dolphin抄写作业 01.html"), all_slugs[:half])
    patch_copy_words(os.path.join(hw, "Dive Dolphin抄写作业 02.html"), all_slugs[half:])
    patch_copy_sentences(
        os.path.join(hw, "Dive Dolphin抄写作业 03.html"),
        [
            {"word": "flipper", "sentence": "All dolphins have flippers."},
            {"word": "fin", "sentence": "All dolphins have a fin."},
            {"word": "tail", "sentence": "All dolphins have a tail."},
            {"word": "team", "sentence": "They work as a team to hunt fish.", "long": True},
        ],
        "Dive Dolphin 03",
    )
    patch_copy_sentences(
        os.path.join(hw, "Dive Dolphin抄写作业 04.html"),
        [
            {"word": "dolphin", "sentence": "Dive, dolphin!"},
            {"word": "swim", "sentence": "Dolphins swim together."},
            {"word": "leap", "sentence": "They like to leap and jump."},
            {"word": "breathe", "sentence": "Dolphins need to breathe."},
            {"word": "air", "sentence": "They come to the top to get air.", "long": True},
            {"word": "ocean", "sentence": "Some dolphins live in oceans."},
        ],
        "Dive Dolphin 04",
    )

    patch_index_primary()

    # README
    readme = os.path.join(ROOT, "README.md")
    with open(readme, encoding="utf-8") as f:
        rt = f.read()
    if "Dive Dolphin" not in rt:
        rt = rt.replace(
            "| Helpers in Your Neighborhood |",
            "| Dive, dolphin! | [Dive Dolphin/index.html](Dive%20Dolphin/index.html) |\n| Helpers in Your Neighborhood |",
        )
        with open(readme, "w", encoding="utf-8") as f:
            f.write(rt)

    print(f"Built {DEST}")
    print(f"Words: {len(WORDS)}, Story sentences: {len(STORY)}")


if __name__ == "__main__":
    main()
