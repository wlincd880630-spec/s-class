/**
 * 60 小时 · 30 课
 * 按 PDF 六阶段选题，按 Oxford Phonics World 的 A–E 课型上课。
 */
(function (global) {
  "use strict";

  var stages = [
    { id: 1, hours: "1–10", title: "字母与短元音", titleEn: "Letters & Short Vowels", color: "#fb5607", blurb: "26 字母 · 首音词 · CVC" },
    { id: 2, hours: "11–16", title: "辅音连缀与组合", titleEn: "Blends & Digraphs", color: "#2a9d8f", blurb: "L/R/S-blends · sh ch th" },
    { id: 3, hours: "17–32", title: "长元音与双元音", titleEn: "Long Vowels & Diphthongs", color: "#7b2cbf", blurb: "Magic e · 元音组合 · R 控制" },
    { id: 4, hours: "33–40", title: "音节与进阶辅音", titleEn: "Syllables & Advanced", color: "#4361ee", blurb: "词尾连缀 · 鼻音 · 划音节" },
    { id: 5, hours: "41–50", title: "构词与阅读", titleEn: "Word Study & Fluency", color: "#e09f3e", blurb: "词缀 · 复合词 · 同音词" },
    { id: 6, hours: "51–60", title: "综合与毕业", titleEn: "Review & Showcase", color: "#d62828", blurb: "听写 · 口语 · 测评 · 展示" }
  ];

  function lesson(cfg) {
    cfg.durationMin = cfg.durationMin || 120;
    cfg.games = cfg.games || ["point", "first", "middle", "last", "mark", "race"];
    cfg.homework = cfg.homework || [];
    return cfg;
  }

  var AZ = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"];
  var NZ = ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  var lessons = [
    lesson({
      id: "L01", stage: 1, hours: "1–2", type: "letters",
      title: "字母 Aa–Mm", titleEn: "Letters Aa–Mm",
      letters: AZ,
      phonemes: AZ,
      focus: { title: "Aa–Mm", sound: "letter sounds", img: "apple", tip: "每个字母：听口诀 → 指 4 图 → 描红 → 听辨 → 歌谣。" },
      words: ["cat", "hat", "map", "bag", "bed", "big", "dog", "duck", "red", "fan", "frog", "jam", "kite", "man"],
      sight: ["a", "I", "am", "is", "the"],
      chant: ["apple", "ball", "cat", "dog", "egg"],
      homework: [
        { kind: "sing", text: "听唱字母歌 3 遍" },
        { kind: "copy", text: "抄写 Aa–Mm 各 3 行" },
        { kind: "read", text: "朗读本课首音词各 3 遍" },
        { kind: "say", text: "用 a / I / am / is / the 各说 1 句" },
        { kind: "talk", text: "背诵自我介绍" }
      ]
    }),
    lesson({
      id: "L02", stage: 1, hours: "3–4", type: "letters",
      title: "字母 Nn–Zz", titleEn: "Letters Nn–Zz",
      letters: NZ,
      phonemes: NZ,
      focus: { title: "Nn–Zz", sound: "letter sounds", img: "nest", tip: "q 带 u。x 多在词尾。" },
      words: ["nest", "pig", "pan", "sun", "tap", "van", "box", "fox", "web", "zip", "ten", "hot"],
      sight: ["and", "you", "are", "my", "we"],
      chant: ["nest", "orange", "pig", "queen", "rabbit"],
      homework: [
        { kind: "sing", text: "完整字母歌 3 遍" },
        { kind: "copy", text: "抄写 Nn–Zz 各 3 行" },
        { kind: "read", text: "朗读本课首音词各 3 遍" },
        { kind: "say", text: "用 and / you / are / my / we 各说 1 句" },
        { kind: "talk", text: "背诵问候对话" }
      ]
    }),
    lesson({
      id: "L03", stage: 1, hours: "5–6", type: "pattern",
      title: "短元音 a · CVC", titleEn: "Short a CVC",
      letters: ["a"],
      phonemes: ["a"],
      focus: { title: "short a", sound: "/æ/", img: "apple", tip: "闭音节 a 发 /æ/。先分音再滑读。" },
      families: [
        { id: "at", words: ["cat", "hat", "mat", "sat", "bat", "rat", "fat"] },
        { id: "an", words: ["can", "man", "fan", "pan", "van"] },
        { id: "ap", words: ["cap", "map", "nap", "tap"] },
        { id: "ag", words: ["bag", "tag"] },
        { id: "ad", words: ["mad", "sad", "dad"] },
        { id: "am", words: ["ham", "jam"] }
      ],
      words: ["cat", "hat", "mat", "sat", "bat", "rat", "can", "man", "fan", "pan", "map", "nap", "tap", "bag", "mad", "sad", "dad", "jam", "ant", "cap"],
      sight: ["a", "an", "can", "has", "had"],
      chant: ["cat", "hat", "can", "man", "map", "bag"],
      homework: [
        { kind: "copy", text: "抄写 8 个 a-CVC 词各 3 遍" },
        { kind: "read", text: "听读本课单词各 3 遍" },
        { kind: "say", text: "用 a / an / can / has / had 各说 2 句" },
        { kind: "talk", text: "背诵 Look! What is that?" },
        { kind: "make", text: "做 6 张 a 的单词卡" }
      ]
    }),
    lesson({
      id: "L04", stage: 1, hours: "7–8", type: "pattern",
      title: "短元音 e i o u", titleEn: "Short e i o u",
      letters: ["e", "i", "o", "u"],
      phonemes: ["e", "i", "o", "u"],
      focus: { title: "short e i o u", sound: "/e/ /ɪ/ /ɒ/ /ʌ/", img: "egg", tip: "五个短元音要能听辨。" },
      families: [
        { id: "e", words: ["bed", "red", "pen", "ten", "hen", "net", "pet", "wet", "jet", "leg"] },
        { id: "i", words: ["big", "pig", "dig", "sit", "pin", "win", "hit", "kit", "zip"] },
        { id: "o", words: ["dog", "log", "fog", "box", "fox", "hot", "pot", "top", "hop", "mop"] },
        { id: "u", words: ["bug", "mug", "rug", "hug", "sun", "run", "bus", "cut", "nut", "cub"] }
      ],
      words: ["bed", "red", "pen", "ten", "hen", "net", "big", "pig", "sit", "pin", "dog", "box", "fox", "hot", "hop", "sun", "run", "bus", "mug", "cub"],
      sight: ["it", "in", "on", "up", "us"],
      chant: ["bed", "pig", "dog", "sun", "box", "bus"],
      homework: [
        { kind: "copy", text: "e/i/o/u 各抄 5 个 CVC 词" },
        { kind: "read", text: "听读本课单词各 3 遍" },
        { kind: "say", text: "五大短元音各举 3 例" },
        { kind: "talk", text: "背诵 Where is the dog?" }
      ]
    }),
    lesson({
      id: "L05", stage: 1, hours: "9–10", type: "review",
      title: "26 字母 + CVC 复习", titleEn: "Alphabet & CVC review",
      letters: AZ.concat(NZ),
      phonemes: ["a", "e", "i", "o", "u"],
      focus: { title: "review", sound: "26 letters", img: "sun", tip: "闪读字母，混合拼 CVC。" },
      words: ["cat", "hat", "map", "bag", "bed", "pen", "pig", "sit", "dog", "box", "sun", "run", "bus", "fox", "jam", "duck"],
      sight: ["I", "a", "the", "and", "you", "are", "my", "we", "can", "is"],
      chant: ["cat", "bed", "pig", "dog", "sun"],
      homework: [
        { kind: "copy", text: "五大短元音各写 5 个 CVC 词" },
        { kind: "read", text: "复习 26 字母口诀" },
        { kind: "talk", text: "背诵 I Spy 对话" }
      ]
    }),
    lesson({
      id: "L06", stage: 2, hours: "11–12", type: "pattern",
      title: "L-blends · R-blends", titleEn: "L-blends and R-blends",
      phonemes: ["l", "r"],
      focus: { title: "blends", sound: "bl cl fl · br cr dr", img: "frog", tip: "两个辅音都要读，不要吞。" },
      families: [
        { id: "l", words: ["black", "blue", "flag", "plum", "clap", "clock", "block"] },
        { id: "r", words: ["crab", "drum", "frog", "green", "tree", "rain"] }
      ],
      words: ["black", "blue", "flag", "plum", "clap", "clock", "block", "crab", "drum", "frog", "green", "tree", "rain"],
      sight: ["blue", "from", "green", "three", "all"],
      chant: ["blue", "flag", "frog", "tree", "crab", "drum"],
      homework: [
        { kind: "copy", text: "L-blends / R-blends 各抄 5 词" },
        { kind: "read", text: "听读本课单词各 3 遍" },
        { kind: "talk", text: "背诵颜色对话" }
      ]
    }),
    lesson({
      id: "L07", stage: 2, hours: "13–14", type: "pattern",
      title: "S-blends 与词尾连缀", titleEn: "S-blends and end blends",
      phonemes: ["s"],
      focus: { title: "s-blends", sound: "st sm sn sp sw", img: "snake", tip: "blend 是两个音，不是一个音。" },
      families: [
        { id: "s", words: ["stop", "star", "swim", "snake", "smile", "spin", "snap", "slip"] },
        { id: "end", words: ["jump", "lamp", "hand", "sand", "nest", "best"] }
      ],
      words: ["stop", "star", "swim", "snake", "smile", "spin", "snap", "slip", "jump", "lamp", "hand", "sand", "nest"],
      sight: ["ask", "best", "just", "must"],
      chant: ["stop", "swim", "snake", "star", "jump", "hand"],
      homework: [
        { kind: "copy", text: "s-blends 各抄 5 词，词尾连缀 3 词" },
        { kind: "read", text: "听读本课单词各 3 遍" },
        { kind: "talk", text: "背诵 Can you swim?" }
      ]
    }),
    lesson({
      id: "L08", stage: 2, hours: "15–16", type: "pattern",
      title: "sh · ch · th · wh · ph", titleEn: "Consonant digraphs",
      phonemes: ["sh", "ch", "th", "thv", "wh", "ph"],
      focus: { title: "digraphs", sound: "sh ch th wh ph", img: "ship", tip: "两个字母一个音。" },
      families: [
        { id: "sh", words: ["ship", "shop", "fish", "dish"] },
        { id: "ch", words: ["chick", "chop", "chin", "chip"] },
        { id: "th", words: ["thumb", "thin", "this", "that", "path"] },
        { id: "wh", words: ["whale", "when", "white"] },
        { id: "ph", words: ["photo", "phone"] }
      ],
      words: ["ship", "shop", "fish", "dish", "chick", "chop", "chin", "chip", "thumb", "thin", "this", "that", "path", "whale", "when", "white", "photo", "phone"],
      sight: ["said", "have", "what", "they"],
      chant: ["ship", "fish", "chick", "thumb", "whale", "photo"],
      homework: [
        { kind: "copy", text: "每种组合抄 3 词" },
        { kind: "read", text: "听读本课单词各 3 遍" },
        { kind: "say", text: "用 said / have / what 各说 1 句" }
      ]
    }),
    lesson({
      id: "L09", stage: 3, hours: "17–18", type: "pattern",
      title: "魔法 e：a-e i-e o-e", titleEn: "Magic e a-e i-e o-e",
      phonemes: ["a_e", "i_e", "o_e"],
      focus: { title: "magic e", sound: "a_e i_e o_e", img: "cake", tip: "词尾 e 不发音，前面元音读字母名。" },
      families: [
        { id: "a-e", words: ["cake", "name", "tape", "lake", "cape"] },
        { id: "i-e", words: ["kite", "like", "time", "five", "bike"] },
        { id: "o-e", words: ["home", "bone", "nose", "rose", "rope"] }
      ],
      words: ["cake", "name", "tape", "lake", "cape", "kite", "like", "time", "five", "bike", "home", "bone", "nose", "rose", "rope"],
      sight: ["like", "have"],
      chant: ["cake", "kite", "home", "name", "time", "nose"],
      homework: [
        { kind: "copy", text: "三组魔法 e 各抄 3 词" },
        { kind: "read", text: "对比 cap/cape、kit/kite（口头）" },
        { kind: "talk", text: "说 I like cake." }
      ]
    }),
    lesson({
      id: "L10", stage: 3, hours: "19–20", type: "pattern",
      title: "魔法 e：e-e u-e 总复习", titleEn: "Magic e e-e u-e",
      phonemes: ["e_e", "u_e"],
      focus: { title: "magic e all", sound: "e_e u_e", img: "cube", tip: "have 不是魔法 e。" },
      families: [
        { id: "u-e", words: ["cube", "tune", "cute"] },
        { id: "e-e", words: ["these"] },
        { id: "all", words: ["cake", "lake", "kite", "bike", "home", "bone", "cube"] }
      ],
      words: ["cube", "tune", "cute", "these", "cake", "lake", "kite", "bike", "home", "bone", "name", "like"],
      sight: ["have", "like", "these"],
      chant: ["cake", "these", "kite", "home", "cube"],
      homework: [
        { kind: "copy", text: "五列魔法 e 分类抄写" },
        { kind: "read", text: "听读本课单词各 3 遍" }
      ]
    }),
    lesson({
      id: "L11", stage: 3, hours: "21–22", type: "pattern",
      title: "ai ay · ee ea", titleEn: "ai ay ee ea",
      phonemes: ["ai", "ay", "ee", "ea"],
      focus: { title: "vowel teams", sound: "/eɪ/ /iː/", img: "rain", tip: "ai 词中，ay 词尾。" },
      families: [
        { id: "ai/ay", words: ["rain", "tail", "wait", "train", "play", "day", "say"] },
        { id: "ee/ea", words: ["tree", "see", "bee", "leaf", "sea", "eat"] }
      ],
      words: ["rain", "tail", "wait", "train", "play", "day", "say", "tree", "see", "bee", "leaf", "sea", "eat"],
      sight: ["people", "two"],
      chant: ["rain", "play", "tree", "see", "leaf", "sea"],
      homework: [
        { kind: "copy", text: "ai/ay/ee/ea 各抄 2 词" },
        { kind: "read", text: "读 I see the sea." }
      ]
    }),
    lesson({
      id: "L12", stage: 3, hours: "23–24", type: "pattern",
      title: "oa ow · igh · y", titleEn: "oa ow igh y",
      phonemes: ["oa", "ow", "igh"],
      focus: { title: "oa igh", sound: "/əʊ/ /aɪ/", img: "boat", tip: "igh 三个字母一个音。" },
      families: [
        { id: "oa/ow", words: ["boat", "road", "coat", "snow", "grow"] },
        { id: "igh", words: ["night", "light", "right"] }
      ],
      words: ["boat", "road", "coat", "snow", "grow", "night", "light", "right", "fly", "my"],
      sight: ["their", "my"],
      chant: ["boat", "snow", "night", "light", "road"],
      homework: [
        { kind: "copy", text: "oa/ow/igh 各抄 2 词" },
        { kind: "read", text: "听读 night / boat / snow" }
      ]
    }),
    lesson({
      id: "L13", stage: 3, hours: "25–26", type: "review",
      title: "长元音综合", titleEn: "Long vowel review",
      phonemes: ["a_e", "ai", "ee", "igh", "oa"],
      focus: { title: "long vowels", sound: "/eɪ/ /iː/ /aɪ/ /əʊ/", img: "cake", tip: "同一音可以有多种拼法。" },
      words: ["cake", "rain", "play", "tree", "sea", "kite", "night", "home", "boat", "snow", "glue", "blue"],
      sight: ["people", "two", "their"],
      chant: ["cake", "rain", "tree", "night", "boat"],
      homework: [
        { kind: "copy", text: "每种长元音写 3 个词" },
        { kind: "read", text: "整理拼法墙" }
      ]
    }),
    lesson({
      id: "L14", stage: 3, hours: "27–28", type: "pattern",
      title: "R 控制：ar er ir or ur", titleEn: "Bossy R",
      phonemes: ["ar", "er", "ir", "or", "ur"],
      focus: { title: "bossy r", sound: "ar or er ir ur", img: "car", tip: "r 会改掉前面的元音。" },
      families: [
        { id: "ar", words: ["car", "star", "park"] },
        { id: "or", words: ["fork", "corn"] },
        { id: "er/ir/ur", words: ["her", "bird", "fur"] }
      ],
      words: ["car", "star", "park", "fork", "corn", "her", "bird", "fur"],
      sight: ["are", "her"],
      chant: ["car", "star", "fork", "bird", "her"],
      homework: [
        { kind: "copy", text: "五组 R 控制各抄 1–2 词" },
        { kind: "read", text: "对比 cat / car" }
      ]
    }),
    lesson({
      id: "L15", stage: 3, hours: "29–30", type: "pattern",
      title: "oi oy · ou ow", titleEn: "oi oy ou ow",
      phonemes: ["oi", "oy", "ou", "ow_d"],
      focus: { title: "diphthongs", sound: "/ɔɪ/ /aʊ/", img: "coin", tip: "oi 词中，oy 词尾。" },
      families: [
        { id: "oi/oy", words: ["coin", "boil", "boy", "toy"] },
        { id: "ou/ow", words: ["cloud", "house", "cow", "now"] }
      ],
      words: ["coin", "boil", "boy", "toy", "cloud", "house", "cow", "now"],
      sight: ["now", "how"],
      chant: ["coin", "boy", "cloud", "house", "cow"],
      homework: [
        { kind: "copy", text: "oi/oy/ou/ow 各抄 2 词" },
        { kind: "talk", text: "说 The boy saw a coin." }
      ]
    }),
    lesson({
      id: "L16", stage: 3, hours: "31–32", type: "pattern",
      title: "oo · 弱读 /ə/", titleEn: "oo and schwa",
      phonemes: ["oo", "oo_s", "schwa"],
      focus: { title: "oo / schwa", sound: "/uː/ /ʊ/ /ə/", img: "moon", tip: "moon 长，book 短。the 弱读。" },
      families: [
        { id: "long oo", words: ["moon", "food"] },
        { id: "short oo", words: ["book", "look"] }
      ],
      words: ["moon", "food", "book", "look", "the", "a"],
      sight: ["the", "a", "could", "would"],
      chant: ["moon", "book", "food", "look"],
      homework: [
        { kind: "copy", text: "长 oo / 短 oo 各抄 3 词" },
        { kind: "read", text: "用弱读读 the book" }
      ]
    }),
    lesson({
      id: "L17", stage: 4, hours: "33–34", type: "pattern",
      title: "三辅音连缀", titleEn: "3-letter blends",
      phonemes: ["s"],
      focus: { title: "str spr", sound: "str spr scr", img: "star", tip: "三个辅音都要读到。" },
      words: ["stop", "star", "spin", "snap", "tree", "frog", "green", "flag"],
      sight: ["three", "from"],
      chant: ["star", "tree", "stop", "spin"],
      homework: [
        { kind: "copy", text: "抄 6 个带连缀的词" },
        { kind: "read", text: "慢切再快读" }
      ]
    }),
    lesson({
      id: "L18", stage: 4, hours: "35–36", type: "review",
      title: "辅音组合复习", titleEn: "Digraph review",
      phonemes: ["sh", "ch", "th", "wh", "ph"],
      focus: { title: "digraphs again", sound: "sh ch th", img: "fish", tip: "清浊 th 要分开。" },
      words: ["ship", "fish", "chick", "thumb", "this", "whale", "photo", "phone"],
      sight: ["they", "there", "what"],
      chant: ["ship", "chick", "thumb", "whale"],
      homework: [
        { kind: "copy", text: "每种 digraph 抄 2 词" },
        { kind: "read", text: "this / thin 对比" }
      ]
    }),
    lesson({
      id: "L19", stage: 4, hours: "37–38", type: "pattern",
      title: "鼻音 m n ng · 边音 l", titleEn: "Nasals and l",
      phonemes: ["m", "n", "ng", "l"],
      focus: { title: "nasals", sound: "/m/ /n/ /ŋ/ /l/", img: "moon", tip: "ng 不要再加 /g/。" },
      words: ["moon", "man", "nest", "sun", "king", "pink", "lion", "leaf"],
      sight: ["some", "come"],
      chant: ["moon", "nest", "king", "lion"],
      homework: [
        { kind: "copy", text: "m/n/ng/l 各抄 2 词" },
        { kind: "read", text: "拉长 /m/ /n/ /ŋ/" }
      ]
    }),
    lesson({
      id: "L20", stage: 4, hours: "39–40", type: "pattern",
      title: "半元音 y w · 音节", titleEn: "y w and syllables",
      phonemes: ["y", "w", "h"],
      focus: { title: "syllables", sound: "y w · clap", img: "yoyo", tip: "先拍音节再拼读。" },
      words: ["yoyo", "yellow", "web", "window", "hat", "rabbit", "umbrella", "picnic"],
      sight: ["you", "we"],
      chant: ["yoyo", "window", "rabbit", "picnic"],
      homework: [
        { kind: "copy", text: "给 rabbit / picnic / umbrella 划音节" },
        { kind: "read", text: "拍掌读多音节词" }
      ]
    }),
    lesson({
      id: "L21", stage: 5, hours: "41–42", type: "pattern",
      title: "前缀与后缀", titleEn: "Prefixes and suffixes",
      phonemes: ["s"],
      focus: { title: "affixes", sound: "un- -ing -s", img: "book", tip: "先认词根，再加词缀。" },
      words: ["sun", "run", "play", "look", "jump", "like"],
      sight: ["look", "play"],
      chant: ["run", "jump", "play", "look"],
      homework: [
        { kind: "copy", text: "写 running / playing / looks / unlike" },
        { kind: "read", text: "圈出词缀" }
      ]
    }),
    lesson({
      id: "L22", stage: 5, hours: "43–44", type: "pattern",
      title: "复合词与多音节", titleEn: "Compounds & syllables",
      phonemes: ["schwa"],
      focus: { title: "compounds", sound: "sun+set", img: "sun", tip: "复合词按词切开。" },
      words: ["sunset", "picnic", "rabbit", "basket", "umbrella", "sandwich"],
      sight: ["because"],
      chant: ["sunset", "picnic", "rabbit", "umbrella"],
      homework: [
        { kind: "copy", text: "拆开再合写 4 个复合/多音节词" },
        { kind: "read", text: "We have a picnic at sunset." }
      ]
    }),
    lesson({
      id: "L23", stage: 5, hours: "45–46", type: "pattern",
      title: "同音词", titleEn: "Homophones",
      phonemes: ["ee", "ea"],
      focus: { title: "homophones", sound: "see / sea", img: "sea", tip: "同音不同形，靠句子判断。" },
      words: ["see", "sea", "tail", "night", "there", "their"],
      sight: ["there", "their", "two"],
      chant: ["see", "sea", "there", "their"],
      homework: [
        { kind: "copy", text: "see/sea、there/their 各造 1 句" },
        { kind: "read", text: "读给家长听，让家长选词" }
      ]
    }),
    lesson({
      id: "L24", stage: 5, hours: "47–48", type: "pattern",
      title: "不规则与默音", titleEn: "Irregular & silent letters",
      phonemes: ["soft_c", "soft_g", "ph"],
      focus: { title: "odd bits", sound: "soft c · kn wr", img: "ice", tip: "先圈出规则部分，心形标不规则。" },
      words: ["ice", "city", "gem", "photo", "phone", "knee", "write", "lamb"],
      sight: ["could", "would", "should", "said"],
      chant: ["ice", "photo", "write", "lamb"],
      homework: [
        { kind: "copy", text: "划掉不发音字母：knee / write / lamb" },
        { kind: "read", text: "给 said / could 画心" }
      ]
    }),
    lesson({
      id: "L25", stage: 5, hours: "49–50", type: "review",
      title: "短文流利朗读", titleEn: "Fluency",
      phonemes: ["s", "a", "sh", "a_e"],
      focus: { title: "fluency", sound: "accurate → smooth", img: "book", tip: "先准，再快，再有表情。" },
      words: ["sun", "ship", "cake", "car", "moon", "rain", "frog", "night"],
      sight: ["the", "I", "said", "to", "you"],
      chant: ["sun", "ship", "cake", "moon"],
      homework: [
        { kind: "read", text: "短文跟读 3 遍，第 3 遍计时" },
        { kind: "talk", text: "用表情再读一遍" }
      ]
    }),
    lesson({
      id: "L26", stage: 6, hours: "51–52", type: "review",
      title: "拼写与听写", titleEn: "Spelling & dictation",
      phonemes: ["a", "e", "i", "o", "u"],
      focus: { title: "dictation", sound: "listen and write", img: "pen", tip: "先听整词，再想规律，最后写。" },
      words: ["cat", "bed", "pig", "dog", "sun", "ship", "cake", "rain", "car", "moon"],
      sight: ["the", "said", "have", "come"],
      chant: ["cat", "ship", "cake", "car"],
      homework: [
        { kind: "copy", text: "听写本课 10 词（家长读）" },
        { kind: "read", text: "错词各抄 3 行" }
      ]
    }),
    lesson({
      id: "L27", stage: 6, hours: "53–54", type: "review",
      title: "口语情景", titleEn: "Speaking",
      phonemes: ["th", "w"],
      focus: { title: "talk", sound: "dialogues", img: "boy", tip: "先爬句子，再对答。" },
      words: ["hello", "name", "play", "like", "home"],
      sight: ["I", "you", "my", "we", "are"],
      chant: ["play", "like", "home"],
      homework: [
        { kind: "talk", text: "和家人演一遍本课对话" },
        { kind: "say", text: "自我介绍 4 句" }
      ]
    }),
    lesson({
      id: "L28", stage: 6, hours: "55–56", type: "review",
      title: "阅读理解", titleEn: "Reading",
      phonemes: ["a_e", "sh"],
      focus: { title: "read", sound: "decode then mean", img: "book", tip: "先拼出来，再想画面。" },
      words: ["cat", "ship", "cake", "home", "rain", "night"],
      sight: ["the", "said", "because"],
      chant: ["cat", "ship", "home"],
      homework: [
        { kind: "read", text: "读短文并回答 3 个问题" },
        { kind: "copy", text: "抄写最喜欢的一句" }
      ]
    }),
    lesson({
      id: "L29", stage: 6, hours: "57–58", type: "review",
      title: "综合测评", titleEn: "Checkpoint",
      phonemes: ["s", "a", "sh", "a_e", "ar"],
      focus: { title: "check", sound: "listen · blend · write", img: "star", tip: "找还要练的音，不是排名。" },
      words: ["sun", "cat", "ship", "cake", "car", "moon", "rain", "frog"],
      sight: ["I", "the", "said", "you", "because"],
      chant: ["sun", "ship", "cake", "car"],
      homework: [
        { kind: "read", text: "订正错题" },
        { kind: "copy", text: "错词各写 3 遍" }
      ]
    }),
    lesson({
      id: "L30", stage: 6, hours: "59–60", type: "review",
      title: "毕业展示", titleEn: "Showcase",
      phonemes: ["s", "a", "sh", "a_e", "ar", "oo"],
      focus: { title: "showcase", sound: "perform", img: "star", tip: "选一篇短文，准确 + 有表情。" },
      words: ["sun", "ship", "cake", "car", "moon", "rain", "frog", "night"],
      sight: ["the", "I", "said", "to", "you", "because"],
      chant: ["sun", "ship", "cake", "moon", "night"],
      homework: [
        { kind: "talk", text: "表演字母歌 + 一段对话" },
        { kind: "read", text: "独立朗读毕业短文" }
      ]
    })
  ];

  var map = {};
  lessons.forEach(function (item) {
    map[item.id] = item;
  });

  global.PHONICS_STAGES = stages;
  global.PHONICS_LESSONS = lessons;
  global.PHONICS_LESSON_MAP = map;
})(typeof window !== "undefined" ? window : this);
