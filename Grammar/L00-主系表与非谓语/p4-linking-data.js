/**
 * 主系表 Page4 题库（数据驱动）
 * 词表与句包来源：page4.docx（tools/import-page4-from-docx-extract.py 生成 packs / triplets）。
 * 填入方式：juniorVocab / seniorVocab 短语列表；可选 p4-linking-vocab-packs.js（句包）、p4-linking-triplets.js（人工句与配图覆盖）。
 * 配图：词表图 asset/img/p4_vocab/；精讲组句练习图为 asset/img/ 下 p4_practice_*.png（见 juniorPractices / seniorPractices）。
 */
(function (global) {
  "use strict";

  var juniorVocab = [
  "be busy doing sth",
  "it is + adj. + for sb. + to do sth",
  "it is + adj. + of sb. + to do sth",
  "be afraid of doing sth",
  "be ready to do sth",
  "be worth doing",
  "be used to doing sth",
  "be proud of doing sth",
  "be glad/happy to do sth",
  "be sorry to do sth",
  "be interested in doing sth",
  "be good at doing sth",
  "be tired of doing sth",
  "be excited to do sth",
  "be willing to do sth",
  "be surprised to do sth",
  "be crazy about doing sth",
  "be lucky to do sth",
  "be sure to do sth",
  "be careful not to do sth",
  "be fond of doing sth",
  "be bored with doing sth",
  "it is no use doing sth",
  "be free to do sth",
  "be unable to do sth",
  "it is time to do sth",
  "be worried about doing sth",
  "be famous for doing sth",
  "be pleased to do sth",
  "be easy / hard to do",
  "it is fun to do sth. / doing sth",
  "it is dangerous to do sth",
  "be successful in doing sth",
  "it is polite / impolite to do sth",
  "it is helpful for sb. to do sth",
  "it is impossible to do sth",
  "it is a good idea to do sth",
  "be amazed to do sth",
  "be sorry for doing sth",
  "be angry at / about doing sth",
  "it is one's turn to do sth",
  "be sure of doing sth",
  "be tired from doing sth",
  "it is better to do sth",
  "be thankful for doing sth"
];

  var seniorVocab = [
  "be likely to do sth",
  "be supposed to do sth",
  "be eager to do sth",
  "be addicted to doing sth",
  "be determined to do sth",
  "be to blame",
  "be bound to do sth",
  "be committed to doing sth",
  "be opposed to doing sth",
  "be reluctant to do sth",
  "be accustomed to doing sth",
  "be anxious to do sth",
  "be desperate to do sth",
  "be hesitant to do sth",
  "be engaged in doing sth",
  "be designed to do sth",
  "be qualified to do sth",
  "be content with doing sth",
  "be cautious about doing sth",
  "be inclined to do sth",
  "be devoted to doing sth",
  "it is vital for sb. to do sth",
  "be ashamed of doing sth",
  "be motivated to do sth",
  "be fortunate to do sth",
  "it is worthwhile doing / to do sth",
  "be privileged to do sth",
  "be scheduled to do sth",
  "it is a waste of time/money doing sth",
  "be obliged to do sth",
  "be responsible for doing sth",
  "it is essential for sb. to do sth",
  "be equal to doing sth",
  "it is a privilege to do sth",
  "be optimistic about doing sth",
  "be capable of doing sth",
  "it is typical of sb. to do sth",
  "be thrilled to do sth",
  "it is critical for sb. to do sth",
  "be doomed to do sth",
  "be absorbed in doing sth",
  "it is a pity to do sth",
  "it is beneficial for sb. to do sth",
  "it is an honor to do sth",
  "be dedicated to doing sth",
  "be bound up with",
  "it is crucial for sb. to do sth",
  "be fascinated by / with doing sth",
  "be keen on doing sth",
  "it is highly recommended to do sth",
  "be obsessed with doing sth",
  "be intended to do sth",
  "it is illegal to do sth",
  "be prone to doing sth",
  "it is demanding for sb. to do sth",
  "it is considerate of sb. to do sth",
  "it is urgent for sb. to do sth",
  "be apt to do sth",
  "it is mandatory for sb. to do sth",
  "it is ridiculous to do sth",
  "it is a relief to do sth",
  "it is fundamental for sb. to do sth",
  "be equipped to do sth",
  "it is an adventure to do sth",
  "be destined to do sth"
];

  var juniorPractices = [];

  var seniorPractices = [];

  var bossSentences = [
    { id: "bs1", text: "I want to sleep.", bucket: "svo" },
    { id: "bs2", text: "My dream is to fly.", bucket: "linking" },
    { id: "bs3", text: "They smell the flower.", bucket: "svo" },
    { id: "bs4", text: "The flower smells sweet.", bucket: "linking" },
    { id: "bs5", text: "To help others is important.", bucket: "linking" },
    { id: "bs6", text: "She enjoys swimming.", bucket: "svo" }
  ];

  /** 词表例句（中英）—— 键为小写短语，与 juniorVocab / seniorVocab 项一致 */
  var EXACT = {};

  function sentenceCase(plain) {
    var s = String(plain || "")
      .replace(/\s+/g, " ")
      .trim();
    if (!s) return s;
    if (!/[.!?…]$/.test(s)) s += ".";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /**
   * 与仓库根目录 build-page4verbs.mjs 中 P4_PIC_STYLE_PREFIX 完全一致（主谓宾 Page4 Vertex 图的设计）。
   * 主系表词表图采用相同前缀 + 简短画面英文，不再叠魔法教室长段与重复禁令（generate_images.py 仍会统一追加零文字后缀）。
   */
  var LINKING_P4_PIC_STYLE_PREFIX =
    "Wholesome children's picture-book illustration, non-violent, no weapons, no horror, in cartoon crayon and colored-pencil style: " +
    "confident clean line art, rich saturated palette, visible diagonal crayon strokes and cross-hatching, " +
    "waxy grain, warm cream paper background, NOT photorealistic NOT glossy 3D. " +
    "MANDATORY: zero readable text—no letters, numbers, words, signs, book/screen UI, captions, titles, worksheet headers, logos, or typography; " +
    "no pasted English sentences or lesson banners; use blank or abstract non-letter shapes only. ";

  function sanitizeForImagenPrompt(s) {
    return String(s || "")
      .replace(/"/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  /** 与 generate_images.py _slug_linking_vocab_phrase 一致，供 p4_vocab 文件名对齐 */
  function slugLinkingVocabPhrase(phrase) {
    var raw = String(phrase || "")
      .trim()
      .toLowerCase();
    var s = raw
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    var maxLen = 56;
    if (s.length > maxLen) {
      s = s.substring(0, maxLen).replace(/_+$/g, "");
    }
    return s || "phrase";
  }

  /** 去掉句末标点，便于 prompt 里统一只接一个句号，避免 humble.. */
  function trimSentenceEndForPrompt(s) {
    return String(s || "")
      .replace(/\s+/g, " ")
      .replace(/[.!?…]+$/g, "")
      .trim();
  }

  /** 按用法分类给 Imagen 一句构图提示，帮助「达意」 */
  function categoryImagenHint(categoryId) {
    var map = {
      sense_linking:
        "Make the linking-verb meaning obvious through faces, posture, or clear sensory props (food, sound waves, texture, weather).",
      be_basic:
        "Show the state clearly: classroom, hall, or hobby props so be + complement reads instantly.",
      get_plus_adj:
        "Show a clear BEFORE/AFTER or lighting change so get + adjective feels like entering a new state.",
      change_btg:
        "Emphasize transformation: color, size, role, or growth matching become / turn / grow.",
      stay_prove:
        "For stay/keep, show calm steady body language; for prove, show evidence moment (map, test result) that supports the outcome.",
      it_of:
        "Show the kind person AND the generous action in the infinitive; warm moral tone, two focal beats in one frame if needed.",
      it_for:
        "Show the challenge and the person it is hard/easy for; exaggerate emotion a little for clarity.",
      it_other:
        "Keep the dummy it pattern readable: spotlight the real action or abstract idea in the clause.",
      be_pattern_ing:
        "Busy: stacks of tasks; worth: a book/film prop glowing; used to: repeated daily habit cues.",
      be_good_at:
        "Sports, art, or stage props that instantly show skill level.",
      be_prep:
        "Clear fear, boredom, pride, or preference through faces and opposing props.",
      be_person_to:
        "Face-to-face meeting, phone call, or door opening—emotion on faces for glad/sorry/eager/afraid.",
      be_thing_adj_to:
        "Object-centered still life or danger/safety cues (cliff, water glass) matching the adjective + to do.",
      junior_misc:
        "One readable focal moment; exaggerate cartoon storytelling clarity.",
      appear_seem_adv:
        "Surface appearance vs hidden truth hints; body language and setting support seem/appear patterns.",
      prove_turnout:
        "Reveal moment: exam paper, lab, or surprise box—make the outcome emotion clear.",
      happen_come_remain:
        "Coincidence staging, journey, or waiting—clear time/place cues.",
      gradual_change:
        "Small montage feeling in one image: growing fondness, habit, or role shift.",
      senior_happen_advanced:
        "Same as happen/come but slightly more adult setting (office, station) still cartoon crayon.",
      remain_keep_state:
        "Silence, patience, or ongoing state—minimal motion, strong facial read.",
      linking_special:
        "Metaphorical staging for as if / bound to—slightly theatrical but friendly.",
      linking_worth:
        "Balance scale, ticket, or adventure prop to show worth / risk.",
      linking_meant:
        "Destiny or duty vibe through costume, signpost, or spotlight—still cute not epic dark.",
      be_prediction:
        "Weather, exam, or race finish line—probability readable at a glance.",
      it_seem_pattern:
        "Wise choice moment: clock, door, or two paths—supports it seems wise to …",
      it_that_clause:
        "Newspaper silhouette, chat bubble shapes WITHOUT letters, crowd rumor mood—no readable text.",
      it_thought:
        "Public judgment scene: staring vs polite—no text on signs.",
      be_plus_prep_ing:
        "Habit loops, addiction screens stylized as abstract shapes, devotion helping hands.",
      be_prep_of:
        "Courtroom-lite cartoon, detective magnifying glass, or awareness eyes in mirror—friendly.",
      be_modal_like:
        "Train timetable, promise note without text, meeting entrance—obligation/likelihood clear.",
      be_will_attitude:
        "Handshake, step forward vs step back for willing/reluctant.",
      be_manner_to:
        "Lock, door, timer—careful/quick/slow action frozen mid-motion.",
      too_enough_to:
        "Exaggerate tired legs, excited eyes, or birthday cake for too/enough stories.",
      be_adj_to_adv:
        "Abstract idea as glowing orb or maze—still one focal read.",
      senior_misc:
        "One crisp story moment; prioritize grammar clarity over clutter."
    };
    return map[categoryId] || map.junior_misc;
  }

  /**
   * 例句图：语义与页面 example_en 一致；prompt 中不出现易被画成标题的 STEP/ESL/make-sentence 等字样。
   */
  function buildExampleImagenPromptEn(phrase, exampleEn, categoryId) {
    var enLine = trimSentenceEndForPrompt(sanitizeForImagenPrompt(exampleEn));
    var phraseClean = sanitizeForImagenPrompt(phrase);
    return (
      LINKING_P4_PIC_STYLE_PREFIX +
      "Collocation " +
      phraseClean +
      ". One cartoon scene whose story matches this meaning for the teacher handout (never paint this line as visible writing, chalk, posters, phone screens, or captions): " +
      enLine +
      ". " +
      categoryImagenHint(categoryId) +
      " crayon storybook style."
    );
  }

  /**
   * 造句图：语义与页面 make_en 一致；附带例句与排序句仅作含义锚点，措辞避免诱发画面标题栏。
   */
  function buildMakeImagenPromptEn(phrase, exampleEn, makeEn, sortEn, categoryId) {
    var exLine = trimSentenceEndForPrompt(sanitizeForImagenPrompt(exampleEn));
    var mkLine = trimSentenceEndForPrompt(sanitizeForImagenPrompt(makeEn));
    var sortLine = trimSentenceEndForPrompt(sanitizeForImagenPrompt(sortEn));
    var phraseClean = sanitizeForImagenPrompt(phrase);
    return (
      LINKING_P4_PIC_STYLE_PREFIX +
      "Collocation " +
      phraseClean +
      ". One new cartoon scene, different people or room than the first picture on this card; the moment must match this meaning only (never show it as typed text or banners): " +
      mkLine +
      ". First picture on the card was about (meaning reference only—no labels): " +
      exLine +
      ". Same card also has a reorder drill about (context only—one scene, no split panels, no extra text): " +
      sortLine +
      ". " +
      categoryImagenHint(categoryId) +
      " crayon storybook style."
    );
  }

  function pairForPhrase(phrase, idx) {
    var L = phrase.trim().toLowerCase();
    var sp = getSentencePack(phrase);
    if (sp && sp.example && sp.example.en && sp.example.zh) {
      return { en: String(sp.example.en).trim(), zh: String(sp.example.zh).trim() };
    }
    if (EXACT[L]) return EXACT[L];

    var subj = ["He", "She", "They", "We", "I", "It"][idx % 6];
    var sensory = ["The soup", "The cake", "The music"][idx % 3];
    var plan = ["The plan", "The idea", "The test"][idx % 3];

    // —— It / 形式主语 + 形容词 + 非谓语（to do / doing） ——
    if (/^it\s+is\b/.test(L)) {
      return {
        en: sentenceCase(phrase),
        zh: "It is + 形容词 + (of sb / for sb) + to do，或 It is + 形容词 + to do（表语区常为不定式）。"
      };
    }
    if (/^it\s+was\b/.test(L)) {
      return { en: sentenceCase(phrase), zh: "It was + 形容词 + … + to do。" };
    }
    if (/^it\s+feels\b/.test(L)) {
      return { en: sentenceCase(phrase), zh: "It feels + 形容词 + to do。" };
    }
    if (/^it\s+seems\b/.test(L) || /^it\s+appears\b/.test(L) || /^it\s+sounds\b/.test(L)) {
      return { en: sentenceCase(phrase), zh: "It seems/appears/sounds + 形容词 + to do。" };
    }

    // —— be + 形容词 + doing（busy / worth / used to / good at …） ——
    if (/^be\s+busy\s+doing\b/.test(L)) {
      var brest = phrase.replace(/^be\s+busy\s+doing\s*/i, "").trim() || "my homework";
      return { en: "She is busy doing " + brest + ".", zh: "忙于做…（be busy + doing）" };
    }
    if (/^be\s+busy\s+\w+ing\b/.test(L)) {
      var bping = phrase.replace(/^be\s+busy\s+/i, "").trim();
      return { en: "He is busy " + bping + ".", zh: "忙于…（busy + doing）" };
    }
    if (/^be\s+worth\s+/.test(L)) {
      var wv = phrase.replace(/^be\s+worth\s+/i, "").trim() || "reading";
      return { en: "The book is worth " + wv + ".", zh: "值得…（worth + doing）" };
    }
    if (/^be\s+used\s+to\s+/.test(L)) {
      var ut = phrase.replace(/^be\s+used\s+to\s+/i, "").trim() || "walking";
      return { en: "I am used to " + ut + ".", zh: "习惯于…（used to + doing，to 为介词）" };
    }
    if (/^be\s+accustomed\s+to\s+/.test(L)) {
      var ac = phrase.replace(/^be\s+accustomed\s+to\s+/i, "").trim() || "the cold";
      return { en: "We are accustomed to " + ac + ".", zh: "习惯于…（accustomed to + doing）" };
    }
    if (/^be\s+good\s+at\s+/.test(L)) {
      var ga = phrase.replace(/^be\s+good\s+at\s+/i, "").trim() || "English";
      return { en: "He is good at " + ga + ".", zh: "擅长…（good at + doing）" };
    }
    if (/^be\s+bad\s+at\s+/.test(L)) {
      var ba = phrase.replace(/^be\s+bad\s+at\s+/i, "").trim() || "math";
      return { en: "She is bad at " + ba + ".", zh: "不擅长…" };
    }
    if (/^be\s+afraid\s+of\s+/.test(L)) {
      var ao = phrase.replace(/^be\s+afraid\s+of\s+/i, "").trim() || "flying";
      return { en: "He is afraid of " + ao + ".", zh: "害怕 / 担心…（of + doing）" };
    }
    if (/^be\s+tired\s+of\s+/.test(L)) {
      var to = phrase.replace(/^be\s+tired\s+of\s+/i, "").trim() || "waiting";
      return { en: "I am tired of " + to + ".", zh: "厌倦…（of + doing）" };
    }
    if (/^be\s+fond\s+of\s+/.test(L)) {
      var fo = phrase.replace(/^be\s+fond\s+of\s+/i, "").trim() || "music";
      return { en: "She is fond of " + fo + ".", zh: "喜欢…" };
    }
    if (/^be\s+keen\s+on\s+/.test(L)) {
      var ko = phrase.replace(/^be\s+keen\s+on\s+/i, "").trim() || "reading";
      return { en: "They are keen on " + ko + ".", zh: "热衷于…（on + doing）" };
    }
    if (/^be\s+proud\s+of\s+/.test(L)) {
      var po = phrase.replace(/^be\s+proud\s+of\s+/i, "").trim() || "winning";
      return { en: "We are proud of " + po + ".", zh: "为…自豪" };
    }
    if (/^be\s+sorry\s+for\s+/.test(L)) {
      var sf = phrase.replace(/^be\s+sorry\s+for\s+/i, "").trim() || "being late";
      return { en: "I am sorry for " + sf + ".", zh: "为…感到抱歉（for + doing）" };
    }
    if (/^be\s+addicted\s+to\s+/.test(L)) {
      var ad = phrase.replace(/^be\s+addicted\s+to\s+/i, "").trim() || "gaming";
      return { en: "He is addicted to " + ad + ".", zh: "沉溺于…" };
    }
    if (/^be\s+devoted\s+to\s+/.test(L)) {
      var dv = phrase.replace(/^be\s+devoted\s+to\s+/i, "").trim() || "helping";
      return { en: "She is devoted to " + dv + ".", zh: "致力于…" };
    }
    if (/^be\s+committed\s+to\s+/.test(L)) {
      var cm = phrase.replace(/^be\s+committed\s+to\s+/i, "").trim() || "learning";
      return { en: "We are committed to " + cm + ".", zh: "承诺 / 致力于…" };
    }
    if (/^be\s+opposed\s+to\s+/.test(L)) {
      var op = phrase.replace(/^be\s+opposed\s+to\s+/i, "").trim() || "changing";
      return { en: "They are opposed to " + op + ".", zh: "反对…" };
    }
    if (/^be\s+close\s+to\s+/.test(L)) {
      var cl = phrase.replace(/^be\s+close\s+to\s+/i, "").trim() || "finishing";
      return { en: "I am close to " + cl + ".", zh: "接近于…（to + doing）" };
    }
    if (/^be\s+capable\s+of\s+/.test(L)) {
      var cp = phrase.replace(/^be\s+capable\s+of\s+/i, "").trim() || "solving it";
      return { en: "He is capable of " + cp + ".", zh: "有能力…（of + doing）" };
    }
    if (/^be\s+guilty\s+of\s+/.test(L)) {
      var gy = phrase.replace(/^be\s+guilty\s+of\s+/i, "").trim() || "lying";
      return { en: "She was guilty of " + gy + ".", zh: "犯有…罪 / 过错" };
    }
    if (/^be\s+aware\s+of\s+/.test(L)) {
      var aw = phrase.replace(/^be\s+aware\s+of\s+/i, "").trim() || "being late";
      return { en: "I am aware of " + aw + ".", zh: "意识到…" };
    }

    // —— too / enough + 形容词 + to do ——
    if (/^too\s+\w+\s+to\s+/.test(L)) {
      return { en: sentenceCase(phrase), zh: "too + 形容词 + to do（太…而不能…）" };
    }
    if (/^be\s+.+\benough\s+to\s+/i.test(L)) {
      var enaf = phrase.replace(/^be\s+/i, "").trim();
      return { en: "The task is " + enaf + ".", zh: "be + 形容词 + enough + to do。" };
    }
    if (/\benough\s+to\s+/.test(L)) {
      return { en: sentenceCase(phrase), zh: "形容词 + enough + to do（足够…以至于能…）" };
    }

    // —— be + 形容词 + to do（人作主语 / 物作主语） ——
    if (
      /^be\s+/.test(L) &&
      /\s+to\s+[a-z]/i.test(phrase) &&
      L.indexOf("doing") < 0 &&
      !/^be\s+to\s/.test(L)
    ) {
      var afterBe3 = phrase.replace(/^be\s+/i, "").trim();
      if (
        /^be\s+(easy|difficult|hard|simple|impossible|dangerous|safe|important|interesting|fun)\s+to\s+/i.test(L)
      ) {
        return {
          en: "The question is " + afterBe3 + ".",
          zh: "物作主语：be + 形容词 + to do（说明性质）。"
        };
      }
      if (/^be\s+(likely|unlikely|bound|supposed|meant)\s+to\s+/i.test(L)) {
        return {
          en: "He is " + afterBe3 + ".",
          zh: "be + likely / supposed … + to do（表语后不定式）"
        };
      }
      return { en: "I am " + afterBe3 + ".", zh: "be + 形容词 + to do（表语后接不定式）。" };
    }

    // —— 其它 be + 表语（无 to/doing 扩展时） ——
    if (/^be\s+/.test(L)) {
      return {
        en: "We practice the pattern: " + phrase + ".",
        zh: "主系表中的 be 搭配：「" + phrase + "」。可替换主语与表语练习。"
      };
    }

    if (/^seem\s+to\s/.test(L)) {
      return { en: "I seem " + phrase.slice(5).trim() + ".", zh: "我似乎…（" + phrase + "）" };
    }
    if (/^appear\s+to\s/.test(L)) {
      return { en: "She appears " + phrase.slice(7).trim() + ".", zh: "她显得…（" + phrase + "）" };
    }
    if (/^appear\s+/.test(L) && L.indexOf("appear to") !== 0) {
      return { en: "She appears " + phrase.slice(7).trim() + ".", zh: "显得…（" + phrase + "）" };
    }

    if (/^look\s+like\s/.test(L)) {
      var rest = phrase.slice(9).trim();
      var vb = subj === "They" ? "look" : "looks";
      return { en: subj + " " + vb + " like " + rest + ".", zh: "看起来像…" };
    }
    if (/^sound\s+like\s/.test(L)) {
      var r2 = phrase.slice(11).trim();
      var vb2 = subj === "They" ? "sound" : "sounds";
      return { en: "It " + vb2 + " like " + r2 + ".", zh: "听起来像…" };
    }
    if (/^feel\s+like\s/.test(L)) {
      return { en: "I feel like " + phrase.slice(10).trim() + ".", zh: "想要 / 感觉像…" };
    }
    if (/^smell\s+like\s/.test(L)) {
      return { en: sensory + " smells like " + phrase.slice(11).trim() + ".", zh: "闻起来像…" };
    }
    if (/^taste\s+like\s/.test(L)) {
      return { en: sensory + " tastes like " + phrase.slice(11).trim() + ".", zh: "尝起来像…" };
    }

    if (/\b(as if|as though)\b/.test(L)) {
      return {
        en: "It sounds as if you are right.",
        zh: "仿佛 / 好像…（练习搭配：" + phrase + "）"
      };
    }

    if (/^turn\s+out\b/.test(L)) {
      var tail = phrase.slice(9).trim();
      if (!tail || tail === "that…") return { en: "Everything turned out fine.", zh: "结果一切都好。" };
      return { en: "It turned out " + tail + ".", zh: "结果是…" };
    }

    if (/^prove\s+to\s+be\b/.test(L)) {
      return { en: plan + " proved " + phrase.slice(6).trim() + ".", zh: "被证明是…" };
    }
    if (/^prove\s+/.test(L) && L.indexOf("prove to") !== 0 && L.indexOf("prove worth") !== 0) {
      return { en: plan + " proved " + phrase.slice(6).trim() + ".", zh: "证明为…" };
    }

    if (/^remain\b/.test(L)) {
      return { en: "It remains " + phrase.slice(7).trim() + ".", zh: "…（" + phrase + "）" };
    }
    if (/^go\s+on\s+being\b/.test(L)) {
      return { en: "They go on being friends.", zh: "他们继续做朋友。" };
    }
    if (/^end\s+up\s/.test(L)) {
      return { en: "We ended up " + phrase.slice(7).trim() + ".", zh: "最后…（" + phrase + "）" };
    }
    if (/^come\s+to\s/.test(L)) {
      return { en: "She came " + phrase.slice(5).trim() + ".", zh: "逐渐…（" + phrase + "）" };
    }
    if (/^happen\s+to\s/.test(L)) {
      return { en: "I happened " + phrase.slice(7).trim() + ".", zh: "碰巧…（" + phrase + "）" };
    }

    if (/^(seem|look|sound|feel|taste|smell)\s+/.test(L)) {
      var first = L.split(/\s+/)[0];
      var rest = phrase.trim().split(/\s+/).slice(1).join(" ");
      var s0 = first === "taste" || first === "smell" ? sensory : subj;
      var v =
        s0 === "They" || s0 === "We"
          ? first
          : first === "feel" && rest.indexOf("like") === 0
            ? "feels"
            : first + "s";
      return { en: s0 + " " + v + " " + rest + ".", zh: "主系表例句（" + phrase + "）" };
    }

    if (/^get\s+/.test(L)) {
      return { en: "Things may " + phrase + ".", zh: "状态变化（" + phrase + "）" };
    }
    if (/^grow\s+/.test(L)) {
      return { en: "Plants " + phrase + " here.", zh: "生长/变化（" + phrase + "）" };
    }
    if (/^stay\s+/.test(L)) {
      return { en: "Please " + phrase + ".", zh: "保持…（" + phrase + "）" };
    }
    if (/^keep\s+/.test(L)) {
      return { en: "They try to " + phrase + ".", zh: "保持…（" + phrase + "）" };
    }
    if (/^become\s+/.test(L)) {
      return { en: "She will " + phrase + ".", zh: "变成…（" + phrase + "）" };
    }

    return {
      en: "In class we practice: " + phrase + ".",
      zh: "课堂练习搭配：「" + phrase + "」。请结合主系表朗读。"
    };
  }

  function buildWordPack(example_en) {
    var raw = String(example_en || "")
      .replace(/\s+/g, " ")
      .trim();
    var tokens = raw.match(/\S+/g) || [];
    var sortWords = tokens.map(function (t, i) {
      return {
        id: "st" + i,
        text: t,
        role: i === 0 ? "subj" : i === 1 ? "lv" : "pred"
      };
    });
    var sortAnswer = sortWords.map(function (w) {
      return w.id;
    });
    var distractors = ["very", "was", "not", "and", "the", "a", "is", "are"];
    var used = {};
    tokens.forEach(function (t) {
      used[t.toLowerCase().replace(/^[("]+|[.,!?)]+$/g, "")] = true;
    });
    var dx = [];
    for (var d = 0; d < distractors.length && dx.length < 2; d++) {
      if (!used[distractors[d]]) dx.push(distractors[d]);
    }
    var makeWords = sortWords.slice();
    var mk = 0;
    dx.forEach(function (text) {
      makeWords.push({ id: "dx" + mk++, text: text, role: "distractor" });
    });
    return {
      sort_words: sortWords,
      sort_answer: sortAnswer,
      make_words: makeWords,
      make_answer: sortAnswer.slice()
    };
  }

  /** 自动生成句包：例句+造句+排序（初中/高中）；键为小写短语 */
  function getSentencePack(phrase) {
    var g = global.LINKING_VOCAB_SENTENCE_PACKS;
    if (!g || typeof g !== "object") return null;
    var p = g[phrase.trim().toLowerCase()];
    if (!p || !p.example || !p.make || !p.sort) return null;
    if (!p.example.en || !p.make.en || !p.sort.en) return null;
    return p;
  }

  /** 人工精修：可覆盖例句 example、造句 make、排序 sort（及可选 Imagen）；make/sort 必填，example 可选 */
  function getTripletOverride(phrase) {
    var g = global.LINKING_VOCAB_TRIPLETS;
    if (!g || typeof g !== "object") return null;
    var t = g[phrase.trim().toLowerCase()];
    if (!t || !t.make || !t.sort) return null;
    if (!t.make.en || !t.sort.en) return null;
    return t;
  }

  /**
   * p4-linking-triplets.js 中 LINKING_VOCAB_IMAGEN_VISUAL：纯视觉短英文（无整句），用于 Vertex。
   * 优先级：triplet 全文 imagen 覆盖 > 此处 visual 体 + 统一前缀 > 自动生成 build*ImagenPromptEn。
   */
  function getImagenVisualOverride(phrase) {
    var g = global.LINKING_VOCAB_IMAGEN_VISUAL;
    if (!g || typeof g !== "object") return null;
    var o = g[phrase.trim().toLowerCase()];
    if (!o || typeof o !== "object") return null;
    return o;
  }

  function wrapVisualImagenPrompt(visualBody) {
    var b = String(visualBody || "").trim();
    if (!b) return "";
    b = b.replace(/[.,;:\s]+$/g, "");
    return LINKING_P4_PIC_STYLE_PREFIX + b + ", crayon storybook style.";
  }

  function normSentenceKey(s) {
    return String(s || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .replace(/\.+$/, "");
  }

  /** 在主句前加情景状语；仅对代词/Please/Let 主句小写句首，避免误伤 Painting 等专有义主语 */
  function prependSetting(en, settingEn) {
    var t = String(en || "")
      .replace(/\s+/g, " ")
      .trim();
    if (!t) return t;
    if (!/[.!?…]$/.test(t)) t += ".";
    t = t.replace(/[.!?…]+$/, "");
    var first = t.split(/\s+/)[0];
    var lowerFirst =
      /^(He|She|They|It|We|I|You|Please|Let's|Let)$/i.test(first) ||
      /^let$/i.test(first);
    var body = lowerFirst ? t.charAt(0).toLowerCase() + t.slice(1) : t;
    var out = (settingEn + body).replace(/\s+/g, " ").trim() + ".";
    return sentenceCase(out);
  }

  /** 拆分「主语 + 谓语部」（谓语以连系动词或 be 开头）；失败则 null */
  function splitSubjectPredicate(en) {
    var bare = String(en || "")
      .trim()
      .replace(/[.!?…]+$/, "");
    if (!bare) return null;
    var re =
      /\b(is|are|was|were|am|'m|'s|'re|seem|seems|seemed|look|looks|looked|sound|sounds|sounded|feel|feels|felt|taste|tastes|tasted|smell|smells|smelled|appear|appears|appeared|become|becomes|became|get|gets|got|grow|grows|grew|stay|stays|stayed|remain|remains|remained|keep|keeps|kept|prove|proves|proved|continue|continues|continued|turn|turns|turned|went on|goes on|go on|went|goes|go|end|ends|ended|happened|happens|happen|came|come|chances|chance)\b/i;
    var ix = bare.search(re);
    if (ix <= 0) return null;
    var subj = bare.slice(0, ix).trim();
    var pred = bare.slice(ix).trim();
    if (!subj || !pred) return null;
    return { subj: subj, pred: pred };
  }

  function headToken(subj) {
    return String(subj || "")
      .trim()
      .split(/\s+/)[0]
      .replace(/^["'(]+/, "");
  }

  function isPluralSubject(subj) {
    var s = String(subj || "").trim();
    var h = headToken(s).toLowerCase();
    if (/^(they|we|these|those)$/i.test(h)) return true;
    if (/\bnews\b/i.test(s)) return false;
    if (/^(the|these|those)\s+\S+s\b/i.test(s)) return true;
    return false;
  }

  var ALT_SUBJ_SG = [
    "The visitor",
    "Ms. Huang",
    "The little cat",
    "My teammate",
    "The speaker",
    "A stranger",
    "The patient",
    "Coach Rivera",
    "The new student",
    "Grandpa Chen"
  ];
  var ALT_SUBJ_PL = [
    "The neighbors",
    "Those volunteers",
    "The reporters",
    "My classmates",
    "The athletes",
    "The musicians",
    "The tourists"
  ];

  function pickAltSubject(origSubj, seed) {
    var pl = isPluralSubject(origSubj);
    var pool = pl ? ALT_SUBJ_PL.slice() : ALT_SUBJ_SG.slice();
    var h = headToken(origSubj);
    pool = pool.filter(function (x) {
      return headToken(x).toLowerCase() !== h.toLowerCase();
    });
    if (!pool.length) pool = pl ? ALT_SUBJ_PL : ALT_SUBJ_SG;
    return pool[Math.abs(seed) % pool.length];
  }

  function isThirdPersonSingularSubject(subj) {
    if (isPluralSubject(subj)) return false;
    var h = headToken(subj);
    if (/^(I|You|We|They)$/i.test(h)) return false;
    return true;
  }

  /** 换主语后，谓语首部常见连系动词与 be 随第三人称单数现在时变化 */
  function agreeLinkingPredicate(subj, predicate) {
    var p = String(predicate || "").trim();
    if (!p || !isThirdPersonSingularSubject(subj)) return p;
    if (/^am\b/i.test(p)) return p.replace(/^am\b/i, "is");
    if (/^are\b/i.test(p)) return p.replace(/^are\b/i, "is");
    var pairs = [
      [/^seem\b/i, "seems"],
      [/^look\b/i, "looks"],
      [/^feel\b/i, "feels"],
      [/^sound\b/i, "sounds"],
      [/^taste\b/i, "tastes"],
      [/^smell\b/i, "smells"],
      [/^appear\b/i, "appears"],
      [/^get\b/i, "gets"],
      [/^grow\b/i, "grows"],
      [/^stay\b/i, "stays"],
      [/^remain\b/i, "remains"],
      [/^keep\b/i, "keeps"],
      [/^prove\b/i, "proves"],
      [/^become\b/i, "becomes"],
      [/^turn\b/i, "turns"],
      [/^continue\b/i, "continues"],
      [/^go\b/i, "goes"],
      [/^end\b/i, "ends"]
    ];
    for (var i = 0; i < pairs.length; i++) {
      if (pairs[i][0].test(p)) return p.replace(pairs[i][0], pairs[i][1]);
    }
    return p;
  }

  var SETTING_MAKE = [
    "At the train station, ",
    "During the storm, ",
    "On the school trip, ",
    "Inside the old theater, ",
    "Beside the running track, ",
    "After the interview, ",
    "Near the harbor, "
  ];
  var SETTING_SORT = [
    "Later that night, ",
    "In the hospital lobby, ",
    "Before sunrise, ",
    "Behind the museum, ",
    "On live TV, ",
    "Under the bright lights, ",
    "Halfway through class, "
  ];

  /** 主语为单词且非人称代词（如 Practice / Painting）：不换主语，只换状语并微调谓语 */
  function buildTitleLikeSubjectMakeSort(exampleEn, idx) {
    var sp = splitSubjectPredicate(exampleEn);
    if (!sp) return null;
    var w = sp.subj.trim().split(/\s+/);
    if (w.length !== 1) return null;
    if (/^(I|You|He|She|We|They|It|Someone|Everybody|Nobody)$/i.test(w[0])) return null;
    var mk = prependSetting(exampleEn, SETTING_MAKE[idx % SETTING_MAKE.length]);
    var sr = prependSetting(exampleEn, SETTING_SORT[(idx + 5) % SETTING_SORT.length]);
    if (normSentenceKey(mk) === normSentenceKey(sr)) {
      sr = prependSetting(exampleEn, SETTING_SORT[(idx + 6) % SETTING_SORT.length]);
    }
    return { makeEn: mk, sortEn: sr };
  }

  function buildDeclarativeMakeSort(exampleEn, idx) {
    var sp = splitSubjectPredicate(exampleEn);
    if (!sp) return null;
    var mkSub = pickAltSubject(sp.subj, idx + 1);
    var srSub = pickAltSubject(sp.subj, idx + 19);
    if (headToken(mkSub).toLowerCase() === headToken(srSub).toLowerCase()) {
      srSub = pickAltSubject(sp.subj, idx + 29);
    }
    var mkCore = sentenceCase(mkSub + " " + agreeLinkingPredicate(mkSub, sp.pred));
    var srCore = sentenceCase(srSub + " " + agreeLinkingPredicate(srSub, sp.pred));
    var mk = prependSetting(mkCore, SETTING_MAKE[idx % SETTING_MAKE.length]);
    var sr = prependSetting(srCore, SETTING_SORT[(idx + 3) % SETTING_SORT.length]);
    return { makeEn: mk, sortEn: sr };
  }

  /** Please … / Let's …：换地点或情境状语，保留核心祈使结构 */
  function stripTrailingPrepChunk(s) {
    return String(s || "")
      .replace(/\s+(in|on|at|near|while|during|before|after|for|inside|outside|until|as)\s+[^.!?…]+$/i, "")
      .trim();
  }

  function buildImperativeMakeSort(exampleEn, phrase, idx) {
    var t = String(exampleEn || "").trim();
    if (!/^please\s+/i.test(t) && !/^let's\b/i.test(t) && !/^let us\b/i.test(t)) return null;
    var bare = t.replace(/[.!?…]+$/, "");
    var core = stripTrailingPrepChunk(bare);
    if (core.length < 6) core = bare;
    var tailMake = [
      " in the reading room tonight.",
      " during the school assembly.",
      " on the late-night bus.",
      " while the baby sleeps upstairs.",
      " near the stage before the show.",
      " at the clinic waiting area.",
      " in the hotel hallway."
    ];
    var tailSort = [
      " for one minute before the exam starts.",
      " when the guide begins the tour.",
      " as the film crew rolls in.",
      " after the alarm stops ringing.",
      " until the principal finishes speaking.",
      " inside the echoey gym.",
      " when visitors enter the gallery."
    ];
    var mk = sentenceCase(core + tailMake[idx % tailMake.length]);
    var sr = sentenceCase(core + tailSort[(idx + 5) % tailSort.length]);
    if (normSentenceKey(mk) === normSentenceKey(t)) mk = sentenceCase(core + tailMake[(idx + 1) % tailMake.length]);
    if (normSentenceKey(sr) === normSentenceKey(t)) sr = sentenceCase(core + tailSort[(idx + 6) % tailSort.length]);
    if (normSentenceKey(mk) === normSentenceKey(sr)) sr = sentenceCase(core + tailSort[(idx + 7) % tailSort.length]);
    return { makeEn: mk, sortEn: sr };
  }

  /** It is / It was / It seems … 等形式主语句：换状语，必要时插入 still / really 等副词（不改变短语核心） */
  function buildItPatternMakeSort(exampleEn, idx) {
    var t = String(exampleEn || "").trim();
    if (!/^it\s+(is|was|seems|appears|sounds|feels)\b/i.test(t)) return null;
    var mkSet = [
      "After the bell, ",
      "In the crowded hall, ",
      "When the lights went down, ",
      "On Parents' Day, ",
      "After reading the email, "
    ];
    var srSet = [
      "Without more time, ",
      "Under pressure, ",
      "At the last minute, ",
      "With everyone watching, ",
      "Before the vote, "
    ];
    var advMake = ["", "still ", "really ", "clearly ", "always "];
    var advSort = ["", "never ", "almost ", "suddenly ", "obviously "];
    var body = t.replace(/[.!?…]+$/, "");
    var insertAdv = function (s, adv) {
      if (!adv) return s;
      return s.replace(/\bIt (is|was|seems|appears|sounds|feels)\b/i, function (_, v) {
        return "It " + v + " " + adv.trim();
      });
    };
    var mkBody = insertAdv(body, advMake[idx % advMake.length]);
    var srBody = insertAdv(body, advSort[(idx + 2) % advSort.length]);
    var mk = prependSetting(mkBody + ".", mkSet[idx % mkSet.length]);
    var sr = prependSetting(srBody + ".", srSet[(idx + 4) % srSet.length]);
    return { makeEn: mk, sortEn: sr };
  }

  /** 尽力保证三句英文在归一化后互不相同 */
  function ensureThreeWayDistinct(exampleEn, makeEn, sortEn, phrase, idx) {
    var exN = normSentenceKey(exampleEn);
    var mk = makeEn;
    var sr = sortEn;
    var sp = splitSubjectPredicate(exampleEn);
    var bump = 0;
    while (bump < 14 && sp && (normSentenceKey(mk) === exN || normSentenceKey(mk) === normSentenceKey(sr))) {
      bump++;
      var subM = pickAltSubject(sp.subj, idx + bump);
      mk = prependSetting(
        sentenceCase(subM + " " + agreeLinkingPredicate(subM, sp.pred)),
        SETTING_MAKE[(idx + bump) % SETTING_MAKE.length]
      );
    }
    bump = 0;
    while (bump < 14 && (normSentenceKey(sr) === exN || normSentenceKey(sr) === normSentenceKey(mk))) {
      bump++;
      if (sp) {
        var subS = pickAltSubject(sp.subj, idx + 50 + bump);
        sr = prependSetting(
          sentenceCase(subS + " " + agreeLinkingPredicate(subS, sp.pred)),
          SETTING_SORT[(idx + bump + 2) % SETTING_SORT.length]
        );
      } else {
        sr = prependSetting(exampleEn, SETTING_SORT[(idx + bump + 2) % SETTING_SORT.length]);
      }
    }
    return { makeEn: mk, sortEn: sr };
  }

  /**
   * 造句 + 排序：优先 TRIPLETS，其次句包，再无则规则。
   * 界面文案：cn 为短指令；hint_zh 为参考译文，页面上默认折叠，点「显示提示」展开。
   */
  function buildMakeAndSort(phrase, examplePair, idx, categoryId) {
    var exEn = examplePair.en.trim();
    var trip = getTripletOverride(phrase);
    if (trip) {
      return {
        make: {
          cn: "请把词块连成完整英文",
          hint_zh: trip.make.zh && String(trip.make.zh).trim() ? String(trip.make.zh).trim() : "",
          en: trip.make.en.trim(),
          pic_prompt: "造句图：另一情景（句式迁移）· " + phrase
        },
        sort: {
          cn: "将句子排序",
          hint_zh: trip.sort.zh && String(trip.sort.zh).trim() ? String(trip.sort.zh).trim() : "",
          en: trip.sort.en.trim()
        }
      };
    }

    var spack = getSentencePack(phrase);
    if (spack) {
      return {
        make: {
          cn: "请把词块连成完整英文",
          hint_zh: spack.make.zh && String(spack.make.zh).trim() ? String(spack.make.zh).trim() : "",
          en: String(spack.make.en).trim(),
          pic_prompt: "造句图：另一情景（句式迁移）· " + phrase
        },
        sort: {
          cn: "将句子排序",
          hint_zh: spack.sort.zh && String(spack.sort.zh).trim() ? String(spack.sort.zh).trim() : "",
          en: String(spack.sort.en).trim()
        }
      };
    }

    var auto = buildImperativeMakeSort(exEn, phrase, idx);
    if (!auto) auto = buildItPatternMakeSort(exEn, idx);
    if (!auto && /^try\s+not\s+to\b/i.test(exEn)) {
      auto = {
        makeEn: prependSetting(exEn, SETTING_MAKE[idx % SETTING_MAKE.length]),
        sortEn: prependSetting(exEn, SETTING_SORT[(idx + 4) % SETTING_SORT.length])
      };
    }
    if (!auto) auto = buildTitleLikeSubjectMakeSort(exEn, idx);
    if (!auto) auto = buildDeclarativeMakeSort(exEn, idx);

    if (!auto) {
      var p2 = pairForPhrase(phrase, idx + 11);
      var p3 = pairForPhrase(phrase, idx + 23);
      auto = {
        makeEn: prependSetting(p2.en, SETTING_MAKE[idx % SETTING_MAKE.length]),
        sortEn: prependSetting(p3.en, SETTING_SORT[(idx + 2) % SETTING_SORT.length])
      };
    }

    var fixed = ensureThreeWayDistinct(exEn, auto.makeEn, auto.sortEn, phrase, idx);
    return {
      make: {
        cn: "请把词块连成完整英文",
        hint_zh: "",
        en: fixed.makeEn,
        pic_prompt: "造句图：另一情景（句式迁移）· " + phrase
      },
      sort: {
        cn: "将句子排序",
        hint_zh: "",
        en: fixed.sortEn
      }
    };
  }

  function prefixPackIds(pack, prefix) {
    function prefW(arr) {
      return arr.map(function (w) {
        return { id: prefix + w.id, text: w.text, role: w.role };
      });
    }
    function prefA(ids) {
      return ids.map(function (id) {
        return prefix + id;
      });
    }
    return {
      sort_words: prefW(pack.sort_words),
      sort_answer: prefA(pack.sort_answer),
      make_words: prefW(pack.make_words),
      make_answer: prefA(pack.make_answer)
    };
  }

  function buildVocabEntry(phrase, idx, level, vocabExportIndex) {
    var pair = pairForPhrase(phrase, idx);
    var tripEx = getTripletOverride(phrase);
    if (tripEx && tripEx.example && tripEx.example.en && String(tripEx.example.en).trim()) {
      var ezh = tripEx.example.zh && String(tripEx.example.zh).trim();
      pair = {
        en: String(tripEx.example.en).trim(),
        zh: ezh ? ezh : pair.zh
      };
    }
    var categoryId =
      level === "junior" ? juniorPhraseCategory(phrase) : seniorPhraseCategory(phrase);
    var ms = buildMakeAndSort(phrase, pair, idx, categoryId);
    var example_pic_prompt = "例句图：" + pair.zh;

    var make = ms.make;
    var pm = prefixPackIds(buildWordPack(make.en), "m_");

    var sort = ms.sort;
    var ps = prefixPackIds(buildWordPack(sort.en), "s_");

    var vis = getImagenVisualOverride(phrase);

    var example_imagen_en =
      tripEx && tripEx.example_imagen_en && String(tripEx.example_imagen_en).trim()
        ? String(tripEx.example_imagen_en).trim()
        : vis &&
            vis.example_imagen_en &&
            String(vis.example_imagen_en).trim()
          ? wrapVisualImagenPrompt(String(vis.example_imagen_en).trim())
          : buildExampleImagenPromptEn(phrase, pair.en, categoryId);

    var make_imagen_en =
      tripEx && tripEx.make && tripEx.make.imagen_en && String(tripEx.make.imagen_en).trim()
        ? String(tripEx.make.imagen_en).trim()
        : vis &&
            vis.make_imagen_en &&
            String(vis.make_imagen_en).trim()
          ? wrapVisualImagenPrompt(String(vis.make_imagen_en).trim())
          : buildMakeImagenPromptEn(phrase, pair.en, make.en, sort.en, categoryId);

    var slug = slugLinkingVocabPhrase(phrase);
    var pad = ("0000" + String(vocabExportIndex | 0)).slice(-4);
    var imgDir = "asset/img/p4_vocab/" + pad + "_" + level + "_" + slug;

    return {
      phrase: phrase,
      categoryId: categoryId,
      example_en: pair.en,
      example_cn: pair.zh,
      example_pic_prompt: example_pic_prompt,
      example_image: imgDir + "_ex.png",
      example_imagen_en: example_imagen_en,
      make_cn: make.cn,
      make_hint_zh: make.hint_zh != null ? String(make.hint_zh) : "",
      make_en: make.en,
      make_pic_prompt: make.pic_prompt,
      make_image: imgDir + "_mk.png",
      make_imagen_en: make_imagen_en,
      sort_en: sort.en,
      sort_cn: sort.cn,
      sort_hint_zh: sort.hint_zh != null ? String(sort.hint_zh) : "",
      make_words: pm.make_words,
      make_answer: pm.make_answer,
      sort_words: ps.sort_words,
      sort_answer: ps.sort_answer
    };
  }

  /** 词汇表分类：用于词表页折叠分组，点击词条仍进原有详情 */
  var VOCAB_CATEGORY_META = {
    sense_linking: {
      zh: "感官系动词 + 表语",
      en: "seem / look / sound / feel / taste / smell …",
      note: "表示「看起来、听起来、摸起来……」，后接形容词或 like / to do 等。"
    },
    be_basic: {
      zh: "be + 表语 / 名词 / to do（基础）",
      en: "be quiet / be ready / be my hobby …",
      note: "最常见连系动词 be，表示状态、身份或说明。"
    },
    get_plus_adj: {
      zh: "get + 形容词",
      en: "get ready / get dark / get angry",
      note: "get 作连系动词，多表示「进入某种状态」，可与 be / become 对照记忆。"
    },
    change_btg: {
      zh: "become / turn / grow + 表语",
      en: "become strong / turn red / grow tall",
      note: "表示变化：身份、颜色、生长等。"
    },
    stay_prove: {
      zh: "stay / keep / prove + 表语",
      en: "stay calm / prove useful",
      note: "保持状态；prove 常表「后来被证明是……」。"
    },
    it_of: {
      zh: "It is + 品格/评价 + of sb + to do",
      en: "It is kind of her to …",
      note: "形容词多描写人的品德或行为是否得体，用 of 引出「谁」。"
    },
    it_for: {
      zh: "It is + 形容词 + for sb + to do",
      en: "It is hard for me to …",
      note: "形容词多描写事情难度或情境，用 for 引出对象。"
    },
    it_other: {
      zh: "It is / It feels + …（其它形式主语）",
      en: "It is important to … / It feels good to …",
      note: "含 necessary / important / fun / wrong、no use、time、a pity 等未归入 of/for 的句型。"
    },
    be_pattern_ing: {
      zh: "be busy / worth / used to + doing",
      en: "be busy doing / be worth reading …",
      note: "后接动名词或介词短语的固定结构。"
    },
    be_good_at: {
      zh: "be good at / bad at + doing",
      en: "be good at swimming",
      note: "擅长与不擅长。"
    },
    be_prep: {
      zh: "be + 形容词 + 介词短语",
      en: "be afraid of / fond of / proud of …",
      note: "be tired of、be keen on、be sorry for 等介词搭配。"
    },
    be_person_to: {
      zh: "be + 形容词 + to do（人·心情/态度）",
      en: "be glad to / be ready to go …",
      note: "描写人的心情与态度：glad / happy / sorry / eager / ready / surprised…"
    },
    be_thing_adj_to: {
      zh: "be + 形容词 + to do（说明性质）",
      en: "be easy to answer",
      note: "主语多为物或事，说明「好不好做、安不安全」等。"
    },
    junior_misc: { zh: "其它", en: "", note: "" },
    it_seem_pattern: {
      zh: "It seems / appears / sounds + … + to do",
      en: "It seems wise to wait.",
      note: "形式主语 it + seem/appear/sound，后接形容词与不定式。"
    },
    it_that_clause: {
      zh: "It is said / believed / reported + that …",
      en: "It is said that …",
      note: "that 从句为真正主语，表示传闻、报道。"
    },
    it_thought: {
      zh: "It is thought / considered + …",
      en: "It is considered rude to …",
      note: "表示人们普遍认为或认定。"
    },
    linking_worth: {
      zh: "… worth + doing / it（价值判断）",
      en: "sound worth trying / prove worth doing",
      note: "与 worth 连用的系表结构。"
    },
    linking_meant: {
      zh: "feel / look … supposed & meant",
      en: "feel supposed to be",
      note: "「本应、好像注定」等语气。"
    },
    senior_happen_advanced: {
      zh: "happen / chance / come to / turn out（进阶体）",
      en: "happen to have been / turn out to matter",
      note: "完成体或结果更突出的变体。"
    },
    gradual_change: {
      zh: "逐渐变化：grow / get / come to …",
      en: "grow to like / come to love",
      note: "兴趣、身份、状态逐渐变成……"
    },
    appear_seem_adv: {
      zh: "seem / appear（高中拓展）",
      en: "seem to have been / appear to be lost",
      note: "含完成不定式、unlikely 等与 seem/appear 的搭配。"
    },
    prove_turnout: {
      zh: "prove / turn out",
      en: "prove to be true / turn out fine",
      note: "证明结果如何、最后真相怎样。"
    },
    happen_come_remain: {
      zh: "happen / come to / end up / remain …",
      en: "happen to be / come to be known",
      note: "碰巧、演变、持续处于某种状态。"
    },
    remain_keep_state: {
      zh: "remain / keep / stay + 表语",
      en: "remain silent / keep being",
      note: "保持或继续某种状态。"
    },
    linking_special: {
      zh: "bound to / as if / as though",
      en: "look bound to fail / sound as if",
      note: "固定套语与「仿佛」类表达。"
    },
    be_prediction: {
      zh: "be likely / sure / certain + …",
      en: "be likely to be",
      note: "推测与必然趋势。"
    },
    be_plus_prep_ing: {
      zh: "be busy / used to / devoted / close to …",
      en: "be used to being / be close to finishing",
      note: "be 后接动名词或介词短语的常见搭配。"
    },
    be_prep_of: {
      zh: "be capable / guilty / aware + of",
      en: "be capable of solving",
      note: "be + 形容词 + of + doing。"
    },
    be_modal_like: {
      zh: "be likely / unlikely / bound / supposed / meant",
      en: "be supposed to arrive",
      note: "义务、趋势、注定等情态色彩。"
    },
    be_will_attitude: {
      zh: "be eager / willing / reluctant … + to",
      en: "be willing to share",
      note: "意愿与态度。"
    },
    be_manner_to: {
      zh: "be careful / quick / slow + to",
      en: "be careful to lock",
      note: "做事方式。"
    },
    too_enough_to: {
      zh: "too … to / … enough to",
      en: "too tired to walk / old enough to vote",
      note: "程度与结果。"
    },
    be_adj_to_adv: {
      zh: "be + 形容词 + to do（进阶）",
      en: "be impossible to ignore",
      note: "主语常为物或事，说明性质。"
    },
    senior_misc: { zh: "其它", en: "", note: "" }
  };

  var JUNIOR_VOCAB_CAT_ORDER = [
    "sense_linking",
    "be_basic",
    "get_plus_adj",
    "change_btg",
    "stay_prove",
    "it_of",
    "it_for",
    "it_other",
    "be_pattern_ing",
    "be_good_at",
    "be_prep",
    "be_person_to",
    "be_thing_adj_to",
    "junior_misc"
  ];

  var SENIOR_VOCAB_CAT_ORDER = [
    "appear_seem_adv",
    "prove_turnout",
    "happen_come_remain",
    "gradual_change",
    "senior_happen_advanced",
    "remain_keep_state",
    "linking_special",
    "linking_worth",
    "linking_meant",
    "be_prediction",
    "it_of",
    "it_for",
    "it_seem_pattern",
    "it_that_clause",
    "it_thought",
    "it_other",
    "be_plus_prep_ing",
    "be_prep_of",
    "be_modal_like",
    "be_will_attitude",
    "be_manner_to",
    "too_enough_to",
    "be_adj_to_adv",
    "senior_misc"
  ];

  function juniorPhraseCategory(p) {
    if (/^it is .+ of .+ to\b/.test(p)) return "it_of";
    if (/^it is .+ for .+ to\b/.test(p)) return "it_for";
    if (/^it feels\b/.test(p)) return "it_other";
    if (/^it is\b/.test(p)) return "it_other";
    if (/^be busy doing\b/.test(p)) return "be_pattern_ing";
    if (/^be worth\b/.test(p)) return "be_pattern_ing";
    if (/^be used to\b/.test(p)) return "be_pattern_ing";
    if (/^be good at\b|^be bad at\b/.test(p)) return "be_good_at";
    if (
      /^be afraid of\b|^be tired of\b|^be fond of\b|^be keen on\b|^be proud of\b|^be sorry for\b/.test(
        p
      )
    )
      return "be_prep";
    if (
      /^be glad to\b|^be happy to\b|^be sorry to\b|^be eager to\b|^be ready to\b|^be surprised to\b|^be lucky to\b|^be afraid to\b/.test(
        p
      )
    )
      return "be_person_to";
    if (
      /^be easy to\b|^be hard to\b|^be difficult to\b|^be fun to\b|^be dangerous to\b|^be safe to\b|^be important to\b/.test(
        p
      )
    )
      return "be_thing_adj_to";
    if (/^be (quiet|my hobby|the key)$/.test(p) || p === "be ready" || p === "be to help")
      return "be_basic";
    if (/^(seem|look|sound|feel|taste|smell)\b/.test(p)) return "sense_linking";
    if (/^get\b/.test(p)) return "get_plus_adj";
    if (/^(become|turn|grow)\b/.test(p)) return "change_btg";
    if (/^(stay|keep|prove)\b/.test(p)) return "stay_prove";
    return "junior_misc";
  }

  function seniorPhraseCategory(p) {
    if (/^it is .+ of .+ to\b/.test(p)) return "it_of";
    if (/^it is .+ for .+ to\b/.test(p)) return "it_for";
    if (/^it seems\b|^it appears\b|^it sounds\b/.test(p)) return "it_seem_pattern";
    if (/^it is said that\b|^it is believed that\b|^it is reported that\b/.test(p))
      return "it_that_clause";
    if (/^it is thought\b|^it is considered\b/.test(p)) return "it_thought";
    if (
      /^it is no use\b|^it is no good\b|^it is a pity\b|^it is time to\b|^it is a pleasure\b/.test(p)
    )
      return "it_other";
    if (/^it is\b/.test(p)) return "it_other";
    if (
      /^sound worth trying\b|^prove worth doing\b|^seem worth it\b|^appear worth the risk\b/.test(p)
    )
      return "linking_worth";
    if (
      /^feel supposed to be\b|^look meant to be\b|^sound supposed to be\b|^prove meant to be\b/.test(
        p
      )
    )
      return "linking_meant";
    if (
      /^happen to have been\b|^chance to become\b|^come to prove true\b|^turn out to matter\b/.test(p)
    )
      return "senior_happen_advanced";
    if (
      /^grow to like\b|^come to love\b|^get to be\b|^come to appear\b|^turn out looking\b/.test(p)
    )
      return "gradual_change";
    if (/^appear\b|^seem\b/.test(p)) return "appear_seem_adv";
    if (/^prove\b|^turn out\b/.test(p)) return "prove_turnout";
    if (
      /^happen to\b|^chance to\b|^come to\b|^remain to be seen\b|^continue to be\b|^go on being\b|^end up\b/.test(
        p
      )
    )
      return "happen_come_remain";
    if (
      /^remain silent\b|^remain to be done\b|^keep being\b|^keep on being\b|^stay being\b/.test(p)
    )
      return "remain_keep_state";
    if (
      /^feel bound to be\b|^look bound to fail\b|^sound as if\b|^look as though\b|^feel as if\b|^taste as if\b|^smell as if\b/.test(
        p
      )
    )
      return "linking_special";
    if (/^be likely to be\b|^be sure to be\b|^be certain to become\b/.test(p)) return "be_prediction";
    if (
      /^be busy\b|^be worth mentioning\b|^be used to being\b|^be accustomed\b|^be addicted\b|^be devoted\b|^be committed\b|^be opposed\b|^be close to\b/.test(
        p
      )
    )
      return "be_plus_prep_ing";
    if (/^be capable of\b|^be guilty of\b|^be aware of\b/.test(p)) return "be_prep_of";
    if (
      /^be likely to succeed\b|^be unlikely to agree\b|^be bound to happen\b|^be supposed to arrive\b|^be meant to be together\b/.test(
        p
      )
    )
      return "be_modal_like";
    if (
      /^be eager to\b|^be reluctant to\b|^be willing to\b|^be anxious to\b|^be content to\b/.test(p)
    )
      return "be_will_attitude";
    if (/^be careful to\b|^be quick to\b|^be slow to\b/.test(p)) return "be_manner_to";
    if (/^too .+ to\b|^old enough\b|^warm enough\b|^difficult enough\b/.test(p)) return "too_enough_to";
    if (/^be impossible to\b|^be easy enough to\b|^be hard to define\b/.test(p)) return "be_adj_to_adv";
    return "senior_misc";
  }

  function getVocabCategoryGroups(level) {
    var entries = getVocabEntries(level);
    var catFn = level === "junior" ? juniorPhraseCategory : seniorPhraseCategory;
    var order = level === "junior" ? JUNIOR_VOCAB_CAT_ORDER : SENIOR_VOCAB_CAT_ORDER;
    var map = {};
    entries.forEach(function (e, i) {
      var cid = catFn(e.phrase);
      if (!map[cid]) map[cid] = [];
      map[cid].push({ index: i, phrase: e.phrase });
    });
    var out = [];
    order.forEach(function (id) {
      if (!map[id] || !map[id].length) return;
      var meta = VOCAB_CATEGORY_META[id] || { zh: id, en: "", note: "" };
      out.push({
        id: id,
        title: meta.zh,
        hint: meta.en,
        note: meta.note || "",
        items: map[id]
      });
      delete map[id];
    });
    Object.keys(map).forEach(function (id) {
      if (!map[id].length) return;
      var meta = VOCAB_CATEGORY_META[id] || { zh: id, en: "", note: "" };
      out.push({
        id: id,
        title: meta.zh,
        hint: meta.en,
        note: meta.note || "",
        items: map[id]
      });
    });
    return out;
  }

  var vocabCache = { junior: null, senior: null, _ver: 0 };
  var VOCAB_ENTRIES_CACHE_VER = 25;

  function getVocabEntries(level) {
    if (vocabCache._ver !== VOCAB_ENTRIES_CACHE_VER) {
      vocabCache.junior = null;
      vocabCache.senior = null;
      vocabCache._ver = VOCAB_ENTRIES_CACHE_VER;
    }
    if (!vocabCache[level]) {
      var arr = level === "junior" ? juniorVocab : seniorVocab;
      var offset = level === "senior" ? juniorVocab.length : 0;
      vocabCache[level] = arr.map(function (ph, i) {
        return buildVocabEntry(ph, i, level, offset + i);
      });
    }
    return vocabCache[level];
  }

  global.LINKING_P4_BANK = {
    junior: { vocabulary: juniorVocab, practices: juniorPractices },
    senior: { vocabulary: seniorVocab, practices: seniorPractices },
    boss: bossSentences
  };

  global.LINKING_P4_getVocabEntries = getVocabEntries;
  global.LINKING_P4_getVocabCategoryGroups = getVocabCategoryGroups;
})(typeof window !== "undefined" ? window : globalThis);
