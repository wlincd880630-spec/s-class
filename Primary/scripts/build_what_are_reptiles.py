#!/usr/bin/env python3
"""从 Dive Dolphin 模板生成 What are reptiles? BBC 科学课程全套内容。"""
import json
import os
import re
import shutil

ROOT = os.path.join(os.path.dirname(__file__), "..")
SRC = os.path.join(ROOT, "Dive Dolphin")
DEST = os.path.join(ROOT, "What are reptiles")
COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/What%20are%20reptiles"

ACCENT = "#2e7d32"
ACCENT_DARK = "#1b5e20"
ACCENT_LIGHT = "#66bb6a"
BG_LIGHT = "#e8f5e9"
WILD = "#1b4332"

# (key, zh, example, emoji)
WORDS = [
    ("Reptile", "爬行动物", "Reptiles are cold-blooded vertebrates.", "🦎"),
    ("Scale", "鳞片", "Most reptiles are covered in dry, scaly skin.", "🔶"),
    ("Skin", "皮肤", "Reptiles have dry, scaly skin.", "🧴"),
    ("Vertebrate", "脊椎动物", "Reptiles are one of the five main groups of vertebrates.", "🦴"),
    ("Backbone", "脊椎；脊柱", "Vertebrates have a backbone inside their body.", "🦴"),
    ("Cold-blooded", "冷血的；变温的", "All reptiles are cold-blooded.", "🌡️"),
    ("Species", "物种", "There are six species of reptile which live in the UK.", "🐾"),
    ("Snake", "蛇", "Snakes are reptiles which do not have limbs.", "🐍"),
    ("Lizard", "蜥蜴", "Some species of lizard can drop their tails.", "🦎"),
    ("Tortoise", "陆龟", "Marion is a tortoise from One Zoo Three.", "🐢"),
    ("Turtle", "海龟", "Turtles and tortoises are mostly herbivores.", "🐢"),
    ("Crocodile", "鳄鱼", "Crocodiles spend much of their time in the water.", "🐊"),
    ("Alligator", "短吻鳄", "Crocodiles and alligators are large reptiles.", "🐊"),
    ("Chameleon", "变色龙", "A veiled chameleon can change its colours.", "🦎"),
    ("Tuatara", "喙头蜥", "Tuatara are only found in New Zealand.", "🦎"),
    ("Fossil", "化石", "Fossil evidence shows reptiles have been on Earth for 315 million years.", "🦕"),
    ("Dinosaur", "恐龙", "Tuataras have existed since the time of the dinosaurs.", "🦕"),
    ("Egg", "蛋", "Most reptiles lay eggs.", "🥚"),
    ("Lung", "肺", "All reptiles have lungs and need air to breathe.", "🫁"),
    ("Limb", "肢体；四肢", "Snakes do not have limbs.", "🦵"),
    ("Exoskeleton", "外骨骼", "The shell of a tortoise is an exoskeleton.", "🛡️"),
    ("Shell", "壳", "Turtles and tortoises cannot crawl out of their shells.", "🐚"),
    ("Carnivore", "食肉动物", "Most reptiles are carnivores and eat meat.", "🥩"),
    ("Herbivore", "食草动物", "Turtles and tortoises are herbivorous reptiles.", "🌿"),
    ("Predator", "捕食者", "A predator hunts other animals for food.", "🦁"),
    ("Prey", "猎物", "Lizards drop their tails to escape predators.", "🐭"),
    ("Hunt", "捕猎", "Adders will hunt small mammals and birds.", "🎯"),
    ("Breathe", "呼吸", "All reptiles have lungs and need air to breathe.", "💨"),
    ("Water", "水", "They can be found living in both water and on the land.", "💧"),
    ("Land", "陆地", "Some reptiles live on land.", "🏔️"),
    ("Continent", "大陆", "Reptiles are found on all continents except Antarctica.", "🌍"),
    ("Antarctica", "南极洲", "No reptiles live in Antarctica.", "🧊"),
    ("Rare", "稀有的", "UK reptiles are rare and very shy.", "💎"),
    ("Shy", "害羞的", "Spotting them in the wild can be difficult.", "🙈"),
    ("Tail", "尾巴", "They drop their tails and run away!", "〰️"),
    ("Meat", "肉", "Most reptiles are carnivores and eat meat.", "🍖"),
    ("Plant", "植物", "Some iguanas have evolved to eat plants.", "🌱"),
    ("Evolve", "进化", "Some species of iguana have evolved to eat plants.", "🧬"),
    ("Discover", "发现", "New reptile species are being discovered all the time.", "🔍"),
    ("Heathland", "荒地", "Adders can be found living in heathland and moors.", "🌾"),
    ("Moor", "沼泽地", "Adders live in heathland and moors across Great Britain.", "🌿"),
    ("Adder", "蝰蛇", "Adders are snakes found in Great Britain.", "🐍"),
    ("Iguana", "鬣蜥", "Some species of iguana eat plants.", "🦎"),
    ("Skink", "石龙子", "Some skinks give birth to live young.", "🦎"),
    ("Amphibian", "两栖动物", "Adders hunt small mammals, birds, lizards, and amphibians.", "🐸"),
    ("Mammal", "哺乳动物", "Adders hunt small mammals.", "🐿️"),
]

STORY = [
    ("What are reptiles?", "什么是爬行动物？"),
    ("Most reptiles are covered in dry, scaly skin.", "大多数爬行动物身上覆盖着干燥、有鳞片的皮肤。"),
    ("They can be found living in both water and on the land.", "它们既能在水里生活，也能在陆地上生活。"),
    ("There are six species of reptile which live in the UK.", "英国有六种爬行动物。"),
    ("They are rare and very shy so spotting them in the wild can be difficult.", "它们很稀有也很害羞，所以在野外很难见到。"),
    ("Reptiles are one of the five main groups of vertebrates.", "爬行动物是五大脊椎动物类群之一。"),
    ("Vertebrates are animals that have a backbone inside their body.", "脊椎动物是体内有脊柱的动物。"),
    ("Fossil evidence shows that reptiles have been on Earth for about 315 million years.", "化石证据表明，爬行动物已在地球上生存约三亿一千五百万年。"),
    ("There are around 10,000 different types of reptile living on Earth today.", "如今地球上大约有上万种爬行动物。"),
    ("Snakes are reptiles which do not have limbs.", "蛇是没有四肢的爬行动物。"),
    ("The shell of a tortoise is part of its skeleton on the outside of its body.", "陆龟的壳是长在体外的骨骼的一部分。"),
    ("When a skeleton is on the outside it is called an exoskeleton.", "骨骼长在体外就叫做外骨骼。"),
    ("Reptiles are found on all continents except Antarctica.", "除南极洲外，各大洲都有爬行动物。"),
    ("There are four main types: lizards and snakes, crocodiles and alligators, turtles and tortoises, and tuatara.", "主要有四类：蜥蜴和蛇、鳄鱼和短吻鳄、海龟和陆龟，以及喙头蜥。"),
    ("Some lizards drop their tails to escape predators.", "有些蜥蜴会断尾逃跑，躲避捕食者。"),
    ("All reptiles have lungs and need air to breathe.", "所有爬行动物都有肺，需要空气才能呼吸。"),
    ("Reptiles are cold-blooded, which means they cannot control their body temperature.", "爬行动物是冷血动物，不能自己调节体温。"),
    ("Most reptiles lay eggs, but some give birth to live young.", "大多数爬行动物产卵，但有些直接生下幼崽。"),
    ("Most reptiles are carnivores, but turtles and tortoises are mostly herbivores.", "大多数爬行动物吃肉，但海龟和陆龟大多吃植物。"),
]

COMBOS = {
    "ph": ("/f/", ["phone", "graph", "photo"]),
    "ch": ("/ch/", ["chameleon", "rich", "chip"]),
    "sh": ("/sh/", ["shell", "fish", "wish"]),
    "th": ("/ð/", ["they", "this", "breathe"]),
    "ck": ("/k/", ["back", "snake", "duck"]),
    "ea": ("/ē/", ["meat", "sea", "beach"]),
    "ee": ("/ē/", ["need", "see", "tree"]),
    "oo": ("/oo/", ["moon", "food", "zoo"]),
    "ou": ("/ow/", ["out", "about", "sound"]),
    "ow": ("/ow/", ["grow", "show", "slow"]),
    "or": ("/or/", ["fork", "corn", "moor"]),
    "er": ("/ər/", ["water", "other", "predator"]),
    "ar": ("/ar/", ["star", "park", "hard"]),
    "ir": ("/ər/", ["bird", "first", "dirt"]),
    "ur": ("/ər/", ["turtle", "turn", "fur"]),
    "le": ("/əl/", ["turtle", "table", "little"]),
    "tion": ("/shən/", ["nation", "action"]),
    "ous": ("/əs/", ["famous", "dangerous"]),
    "ex": ("/eks/", ["exit", "extra"]),
    "sk": ("/sk/", ["skin", "skink", "ask"]),
    "all": ("/ôl/", ["all", "call", "small"]),
    "ight": ("/īt/", ["light", "night"]),
    "ore": ("/or/", ["more", "store"]),
}


def slug(key: str) -> str:
    return key.lower().replace(" ", "-")


def make_sound_boxes(word: str) -> list:
    w = word.lower().replace("-", "")
    boxes = []
    i = 0
    raw = word.lower()
    while i < len(raw):
        if raw[i] == "-":
            i += 1
            continue
        matched = False
        for length in (4, 3, 2):
            chunk = raw[i : i + length]
            if chunk in COMBOS and length > 1:
                hint, friends = COMBOS[chunk]
                boxes.append({"text": chunk, "hint": hint, "combo": True, "friends": friends[:4]})
                i += length
                matched = True
                break
        if not matched:
            ch = raw[i]
            hint = {"a": "短 a", "e": "短 e", "i": "短 i", "o": "短 o", "u": "短 u"}.get(ch, f"/{ch}/")
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
                sb_parts.append(f'{{ text: "{b["text"]}", hint: "{b["hint"]}", combo: false }}')
        lines.append(
            f'      {{ key: "{key}", zh: "{zh}", ex: "{ex}", emoji: "{emoji}",\n'
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
    entries = [f'    {{ word: "{key.lower()}", zh: "{zh}", emoji: "{emoji}" }},' for key, zh, _ex, emoji in WORDS]
    body = "\n".join(entries)
    return f'''/**
 * What are reptiles? 复习游戏 · 词表
 */
(function (global) {{
  "use strict";
  var STORAGE_KEY = "whatAreReptilesReview.selectedWords";
  var ALL_WORDS = [
{body}
  ];
  var ALL_KEYS = ALL_WORDS.map(function (w) {{ return w.word; }});
  var WMAP = {{}};
  ALL_WORDS.forEach(function (w) {{ WMAP[w.word] = w; }});
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
    }} catch (e) {{ return null; }}
  }}
  function saveKeys(keys) {{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeKeys(keys)));
  }}
  function getSelectedKeys() {{
    var stored = getStoredKeys();
    return stored && stored.length ? stored : ALL_KEYS.slice();
  }}
  function getSelected() {{
    return getSelectedKeys().map(function (k) {{ return WMAP[k]; }}).filter(Boolean);
  }}
  function chunkForMemory(size) {{
    size = size || 3;
    var list = getSelected();
    var chunks = [];
    for (var i = 0; i < list.length; i += size) chunks.push(list.slice(i, i + size));
    return chunks;
  }}
  function shuffle(arr) {{
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {{
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }}
    return a;
  }}
  global.WhatAreReptilesWords = {{
    ALL: ALL_WORDS, ALL_KEYS: ALL_KEYS, WMAP: WMAP, STORAGE_KEY: STORAGE_KEY,
    IMG_BASE: "{COS}/what-are-reptiles-courseware/images/words/",
    getSelected: getSelected, getSelectedKeys: getSelectedKeys,
    saveKeys: saveKeys, chunkForMemory: chunkForMemory, shuffle: shuffle,
    MIN_WORDS_GAME1: 2, MIN_WORDS_GAME2: 2, MIN_WORDS_GAME3: 1,
    MIN_WORDS_GAME4: 4, MIN_WORDS_GAME5: 3, MIN_WORDS_GAME6: 3,
    MIN_WORDS_GAME7: 3, MIN_WORDS_GAME8: 4, MIN_WORDS_GAME9: 4,
  }};
}})(typeof window !== "undefined" ? window : this);
'''


def replace_all(text: str) -> str:
    pairs = [
        ("Dive Dolphin", "What are reptiles"),
        ("Dive%20Dolphin", "What%20are%20reptiles"),
        ("dive-dolphin", "what-are-reptiles"),
        ("Dive, dolphin!", "What are reptiles?"),
        ("DiveDolphin", "WhatAreReptiles"),
        ("diveDolphin", "whatAreReptiles"),
        ("潜水吧，海豚", "什么是爬行动物"),
        ("海豚", "爬行动物"),
        ("🐬", "🦎"),
        ("#0277bd", ACCENT),
        ("#01579B", ACCENT_DARK),
        ("#4FC3F7", ACCENT_LIGHT),
        ("#E1F5FE", BG_LIGHT),
        ("#1e3a5f", WILD),
        (
            "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Dive%20Dolphin/",
            f"{COS}/",
        ),
    ]
    for old, new in pairs:
        text = text.replace(old, new)
    return text


def empty_audio_manifest() -> str:
    return 'window.__LOCAL_AUDIO_MANIFEST = {"voice": "en-GB-RyanNeural", "lookup": {}};'


def empty_manifest_json() -> str:
    return json.dumps({"voice": "en-GB-RyanNeural", "lookup": {}}, indent=2) + "\n"


def rename_subfolders(dest: str):
    for name in os.listdir(dest):
        if name.startswith("dive-dolphin-"):
            os.rename(
                os.path.join(dest, name),
                os.path.join(dest, name.replace("dive-dolphin", "what-are-reptiles")),
            )


def rename_homework_files(dest: str):
    hw = os.path.join(dest, "what-are-reptiles-homework")
    if not os.path.isdir(hw):
        return
    for name in os.listdir(hw):
        if name.startswith("Dive Dolphin"):
            new = name.replace("Dive Dolphin", "What are reptiles")
            os.rename(os.path.join(hw, name), os.path.join(hw, new))


def patch_courseware(path: str):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    text = re.sub(
        r'var MEDIA_COS = "[^"]+";',
        f'var MEDIA_COS = "{COS}/what-are-reptiles-courseware/";',
        text,
        count=1,
    )
    text = re.sub(r"var WORDS = \[[\s\S]*?\];", words_js(), text, count=1)
    text = re.sub(r"var STORY = \[[\s\S]*?\];", story_js(), text, count=1)
    text = text.replace("国家地理分级阅读", "BBC Bitesize 科学 · 小学高年级")
    text = text.replace("单词小剧场", "单词学习 · 一词一页")
    text = text.replace("Dive, dolphin!", "What are reptiles?")
    if "ng-azure-tts-enhance.js" not in text:
        text = text.replace(
            '<script src="audio/local-audio.js"></script>',
            '<script src="audio/local-audio.js"></script>\n'
            '  <script src="../../assets/ng-azure-tts-enhance.js"></script>\n'
            '  <script>NgAzureTTS.enhance("LocalAudio");</script>',
        )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_homework_dictation(path: str, words: list[str]):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    words_json = json.dumps(words, ensure_ascii=False)
    text = re.sub(r"words: \[[^\]]+\]", f"words: {words_json}", text)
    text = re.sub(
        r'var IMG_BASE = "[^"]+";',
        f'var IMG_BASE = "{COS}/what-are-reptiles-courseware/images/words/";',
        text,
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def patch_copy_words(path: str, words: list[str]):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    words_repr = json.dumps(words, ensure_ascii=False).replace('"', "'")
    text = re.sub(r"words: \[[^\]]+\]", f"words: {words_repr}", text)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


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


def patch_index_primary():
    path = os.path.join(ROOT, "index.html")
    with open(path, encoding="utf-8") as f:
        text = f.read()
    if "What are reptiles/index.html" in text:
        return
    card = f"""
      <a class="card" href="What are reptiles/index.html" style="--accent: {ACCENT};">
        <div class="card-top">
          <div class="card-icon">🦎</div>
          <span class="card-arrow" aria-hidden="true">→</span>
        </div>
        <div class="card-tag">What are reptiles?</div>
        <div class="card-title">什么是爬行动物</div>
        <div class="card-tags">
          <span class="tag">BBC 科学</span>
          <span class="tag">互动课件</span>
          <span class="tag">复习游戏</span>
          <span class="tag">听写抄写</span>
        </div>
      </a>"""
    text = text.replace(
        '    </div>\n\n    <footer>',
        card + '\n    </div>\n\n    <footer>',
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def main():
    if os.path.isdir(DEST):
        shutil.rmtree(DEST)
    shutil.copytree(SRC, DEST)
    rename_subfolders(DEST)
    rename_homework_files(DEST)
    walk_replace_files(DEST)

    wd = os.path.join(DEST, "what-are-reptiles-review-games", "words-data.js")
    with open(wd, "w", encoding="utf-8") as f:
        f.write(words_data_js())

    for sub in ["audio", "what-are-reptiles-courseware/audio", "what-are-reptiles-review-games/audio"]:
        base = os.path.join(DEST, sub)
        os.makedirs(base, exist_ok=True)
        with open(os.path.join(base, "audio-manifest.js"), "w", encoding="utf-8") as f:
            f.write(empty_audio_manifest())
        with open(os.path.join(base, "manifest.json"), "w", encoding="utf-8") as f:
            f.write(empty_manifest_json())

    for sub in [
        "what-are-reptiles-courseware/images/words",
        "what-are-reptiles-courseware/images/words-meaning",
        "what-are-reptiles-courseware/images/story",
        "what-are-reptiles-coloring/images",
    ]:
        os.makedirs(os.path.join(DEST, sub), exist_ok=True)

    cw = os.path.join(DEST, "what-are-reptiles-courseware", "index.html")
    patch_courseware(cw)

    all_slugs = [slug(k) for k, *_ in WORDS]
    half = len(all_slugs) // 2
    hw = os.path.join(DEST, "what-are-reptiles-homework")
    if os.path.isdir(hw):
        for fname, words in [
            ("What are reptiles听写练习01.html", all_slugs[:half]),
            ("What are reptiles听写练习02.html", all_slugs[half:]),
            ("What are reptiles抄写作业 01.html", all_slugs[:half]),
            ("What are reptiles抄写作业 02.html", all_slugs[half:]),
        ]:
            p = os.path.join(hw, fname)
            if os.path.isfile(p):
                if "听写" in fname:
                    patch_homework_dictation(p, words)
                else:
                    patch_copy_words(p, words)

    patch_index_primary()
    print(f"Built {DEST}")
    print(f"Words: {len(WORDS)}, Story: {len(STORY)}")


if __name__ == "__main__":
    main()
