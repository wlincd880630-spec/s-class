/* 全局工具与页面初始化 */
const MEDIA_BASE = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/CVC/";
const VOWELS = ["a", "e", "i", "o", "u"];
const VOWEL_MAP = { a: "A", e: "E", i: "I", o: "O", u: "U" };
const ALL_VOWELS = ["a", "e", "i", "o", "u"];

function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

function getParams() {
  return new URLSearchParams(window.location.search);
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randPick(arr, n) {
  return shuffle(arr).slice(0, n);
}

function randomLetters(count, excludes = []) {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const available = letters.filter((l) => !excludes.includes(l));
  return randPick(available, count);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function ttsIcon() {
  return "🔊";
}

function getWordAudio(word) {
  return `${MEDIA_BASE}assets/audio/words/${word.toLowerCase()}.mp3`;
}

function getSentenceAudio(vowel, idx) {
  return `${MEDIA_BASE}assets/audio/sentences/${vowel}-${idx}.mp3`;
}

function getTokenAudio(token) {
  return `${MEDIA_BASE}assets/audio/tokens/${token.toLowerCase()}.mp3`;
}

function buildPlaceholderDataUrl(label, sub = "") {
  const esc = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  const text = esc(label);
  const subText = esc(sub);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#e7f7ff"/>
        <stop offset="100%" stop-color="#fff3d8"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="45%" text-anchor="middle" font-size="66" fill="#2e87be" font-weight="700">${text}</text>
    <text x="50%" y="60%" text-anchor="middle" font-size="24" fill="#4f6f85">${subText}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function imagePathForWord(word) {
  return `${MEDIA_BASE}assets/images/words/${word.toLowerCase()}.png`;
}

function imagePathForSentence(vowel, idx, panel) {
  return `${MEDIA_BASE}assets/images/sentences/${vowel}-${idx}-${panel}.png`;
}

function safeImg(imgEl, src, fallbackLabel, fallbackSub = "请先运行图片生成脚本") {
  imgEl.src = src;
  imgEl.onerror = () => {
    imgEl.src = buildPlaceholderDataUrl(fallbackLabel, fallbackSub);
  };
}

function playAudio(src) {
  const audio = new Audio(src);
  audio.play().catch(() => {
    alert("音频未找到，请先运行 Python 语音生成脚本。");
  });
}

async function loadDB() {
  if (window.CVC_DATA) {
    return window.CVC_DATA;
  }
  throw new Error("未找到内置数据：CVC_DATA");
}

function getWordsByVowel(db, vowel) {
  return db.vowels[vowel]?.words || [];
}

function renderNav(currentVowel = "") {
  const wrap = document.getElementById("navVowels");
  if (!wrap) return;
  wrap.innerHTML = "";
  VOWELS.forEach((v) => {
    const a = document.createElement("a");
    a.href = `vowel.html?vowel=${v}`;
    a.className = "nav-chip";
    a.textContent = `${VOWEL_MAP[v]} CVC`;
    if (currentVowel === v) a.style.background = "#bfe9ff";
    wrap.appendChild(a);
  });
}

/* 首页 */
function initHome(db) {
  renderNav();
  const grid = document.getElementById("vowelGrid");
  grid.innerHTML = "";
  const emojis = { a:"🐱", e:"🛏️", i:"🐷", o:"🐶", u:"☀️" };
  VOWELS.forEach((v) => {
    const count = getWordsByVowel(db, v).length;
    const card = document.createElement("a");
    card.className = "vowel-card";
    card.href = `vowel.html?vowel=${v}`;
    card.innerHTML = `
      <div class="vowel-big">${VOWEL_MAP[v]}</div>
      <div style="font-size:34px;margin-bottom:6px">${emojis[v]||""}</div>
      <div style="font-size:17px;font-weight:700;color:var(--text-lite)">${VOWEL_MAP[v]} CVC Words</div>
      <div class="vowel-count">共 ${count} 个单词</div>
    `;
    grid.appendChild(card);
  });
}

/* 元音列表页 */
function initVowelPage(db) {
  const params = getParams();
  const vowel = (params.get("vowel") || "a").toLowerCase();
  renderNav(vowel);
  setText("vowelTitle", `${VOWEL_MAP[vowel]} CVC 单词`);
  const words = getWordsByVowel(db, vowel);
  const list = document.getElementById("wordGrid");
  list.innerHTML = "";

  words.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.innerHTML = `
      <div class="word-en">${item.word}</div>
      <div class="word-zh">${item.chinese}</div>
      <div class="btn-row">
        <a class="btn primary sm" href="word.html?vowel=${vowel}&idx=${idx}">📖 学单词</a>
        <a class="btn orange sm" href="sentence.html?vowel=${vowel}&idx=${idx}">📝 学句子</a>
      </div>
    `;
    list.appendChild(card);
  });

  const safeSel = (id) => qs(`#${id}`);
  const beg = safeSel("toReviewBeginning"); if (beg) beg.href = `review-beginning.html?vowel=${vowel}`;
  const mid = safeSel("toReviewMiddle");    if (mid) mid.href = `review-middle.html?vowel=${vowel}`;
  const end = safeSel("toReviewEnding");    if (end) end.href = `review-ending.html?vowel=${vowel}`;
  const sp  = safeSel("toSpelling");        if (sp)  sp.href  = `spelling.html?vowel=${vowel}`;
  const qz  = safeSel("toQuiz");            if (qz)  qz.href  = `quiz.html?vowel=${vowel}`;
}

/* 单词学习页 */
function initWordPage(db) {
  const params = getParams();
  const vowel = (params.get("vowel") || "a").toLowerCase();
  const idx = Number(params.get("idx") || 0);
  const words = getWordsByVowel(db, vowel);
  const item = words[idx];
  if (!item) return;
  renderNav(vowel);
  setText("wordValue", item.word);
  setText("wordHint", "🖼 图像提示词：" + item.imagePrompt);
  setText("wordCn", "🇨🇳 " + item.chinese);
  qs("#wordCn").classList.add("hidden");

  const img = qs("#wordImage");
  safeImg(img, imagePathForWord(item.word), item.word, item.imagePrompt);

  qs("#btnSpeakWord").textContent = "🔊 读单词";
  qs("#btnSpeakWord").onclick = () => playAudio(getWordAudio(item.word));
  const btnCn = qs("#btnShowCn");
  if (btnCn) btnCn.onclick = () => {
    qs("#wordCn").classList.toggle("hidden");
    btnCn.textContent = qs("#wordCn").classList.contains("hidden") ? "🈳 显示中文" : "🈚 隐藏中文";
  };

  const prev = Math.max(0, idx - 1);
  const next = Math.min(words.length - 1, idx + 1);
  qs("#btnPrev").href = `word.html?vowel=${vowel}&idx=${prev}`;
  qs("#btnNext").href = `word.html?vowel=${vowel}&idx=${next}`;
  qs("#btnSentence").href = `sentence.html?vowel=${vowel}&idx=${idx}`;
}

function enableDrag(letterEls, slotEls, onDrop) {
  letterEls.forEach((el) => {
    el.draggable = true;
    el.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", el.dataset.char);
      e.dataTransfer.setData("letter-id", el.dataset.id);
      el.style.opacity = "0.6";
    });
    el.addEventListener("dragend", () => {
      el.style.opacity = "1";
    });
  });
  slotEls.forEach((slot) => {
    slot.addEventListener("dragover", (e) => e.preventDefault());
    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      const ch = e.dataTransfer.getData("text/plain");
      const letterId = e.dataTransfer.getData("letter-id");
      onDrop(slot, ch, letterId);
    });
  });
}

/* 听音复习页：单题型（stage 固定） */
function initReviewStagePage(db, stage) {
  const vowel = (getParams().get("vowel") || "a").toLowerCase();
  renderNav(vowel);
  const words = getWordsByVowel(db, vowel);
  const stageNames = ["首音练习", "中音练习", "尾音练习"];
  let wIndex = 0;

  function refresh() {
    const item = words[wIndex];
    if (!item) return;
    const word = item.word.toLowerCase();
    setText("reviewTitle", `${VOWEL_MAP[vowel]} - ${item.word} - ${stageNames[stage]}`);
    safeImg(qs("#reviewImage"), imagePathForWord(item.word), item.word, item.imagePrompt);
    qs("#reviewFeedback").textContent = "";
    qs("#reviewFeedback").className = "feedback";

    const slots = qs("#reviewSlots");
    const options = qs("#reviewOptions");
    slots.innerHTML = "";
    options.innerHTML = "";

    const chars = word.split("");
    let hiddenPos = 0;
    if (stage === 1) hiddenPos = 1;
    if (stage === 2) hiddenPos = 2;
    const correct = chars[hiddenPos];
    let distractors = randomLetters(2, [correct]);
    if (stage === 1) {
      distractors = randPick(
        ALL_VOWELS.filter((v) => v !== correct),
        2
      );
    }
    const picks = shuffle([correct, ...distractors]);

    chars.forEach((ch, i) => {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.dataset.index = i;
      if (i === hiddenPos) {
        slot.textContent = "_";
        slot.dataset.expected = correct;
        slot.dataset.empty = "true";
      } else {
        slot.textContent = ch;
        slot.classList.add("filled");
        slot.dataset.empty = "false";
      }
      slots.appendChild(slot);
    });

    picks.forEach((ch, idx) => {
      const letter = document.createElement("div");
      letter.className = "letter";
      letter.dataset.char = ch;
      letter.dataset.id = `r-${idx}-${ch}`;
      letter.textContent = ch;
      options.appendChild(letter);
    });

    enableDrag(qsa(".letter", options), qsa('[data-empty="true"]', slots), (slot, ch, letterId) => {
      slot.textContent = ch;
      slot.dataset.filled = ch;
      slot.classList.add("filled");
      const letter = qs(`[data-id="${letterId}"]`, options);
      if (letter) letter.remove();
      const ok = ch === slot.dataset.expected;
      const fb = qs("#reviewFeedback");
      fb.textContent = ok ? "太棒了！答对啦 ⭐" : "再试一次哦";
      fb.className = `feedback ${ok ? "ok" : "bad"}`;
    });

    qs("#btnPlayReview").onclick = () => playAudio(getWordAudio(item.word));
  }

  qs("#btnNextStage").onclick = () => {
    const expected = qs('#reviewSlots [data-empty="true"]')?.dataset.expected;
    const filled = qs('#reviewSlots [data-empty="true"]')?.dataset.filled;
    if (expected !== filled) {
      qs("#reviewFeedback").textContent = "先把当前题做对再继续哦。";
      qs("#reviewFeedback").className = "feedback bad";
      return;
    }
    wIndex = (wIndex + 1) % words.length;
    if (wIndex === 0) {
      qs("#reviewFeedback").textContent = "本轮完成，真棒！";
      qs("#reviewFeedback").className = "feedback ok";
    }
    refresh();
  };

  refresh();
}

/* 拼写练习页 */
function initSpellingPage(db) {
  const vowel = (getParams().get("vowel") || "a").toLowerCase();
  renderNav(vowel);
  const words = getWordsByVowel(db, vowel);
  let idx = 0;

  function loadRound() {
    const item = words[idx];
    const word = item.word.toLowerCase();
    setText("spellTitle", `${VOWEL_MAP[vowel]} - 拼写练习`);
    qs("#spellFeedback").textContent = "";
    qs("#spellFeedback").className = "feedback";

    const slots = qs("#spellSlots");
    const pool = qs("#spellLetters");
    slots.innerHTML = "";
    pool.innerHTML = "";

    word.split("").forEach((_, i) => {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.dataset.pos = String(i);
      slot.dataset.expected = word[i];
      slot.dataset.current = "";
      slot.textContent = "_";
      slots.appendChild(slot);
    });

    const letters = shuffle([...word.split(""), ...randomLetters(2, word.split(""))]);
    letters.forEach((ch, i) => {
      const letter = document.createElement("div");
      letter.className = "letter";
      letter.dataset.char = ch;
      letter.dataset.id = `s-${i}-${ch}`;
      letter.textContent = ch;
      pool.appendChild(letter);
    });

    enableDrag(qsa(".letter", pool), qsa(".slot", slots), (slot, ch, letterId) => {
      if (slot.dataset.current) return;
      slot.textContent = ch;
      slot.dataset.current = ch;
      slot.classList.add("filled");
      const letter = qs(`[data-id="${letterId}"]`, pool);
      if (letter) letter.remove();
    });

    qs("#btnSpellAudio").onclick = () => playAudio(getWordAudio(item.word));
  }

  qs("#btnCheckSpell").onclick = () => {
    const slots = qsa("#spellSlots .slot");
    if (slots.some((s) => !s.dataset.current)) {
      qs("#spellFeedback").textContent = "还没有填满哦。";
      qs("#spellFeedback").className = "feedback bad";
      return;
    }
    const ok = slots.every((s) => s.dataset.current === s.dataset.expected);
    qs("#spellFeedback").textContent = ok ? "拼写正确，太棒了！" : "拼写不对，再试一次。";
    qs("#spellFeedback").className = `feedback ${ok ? "ok" : "bad"}`;
  };

  qs("#btnNextWord").onclick = () => {
    idx = (idx + 1) % words.length;
    loadRound();
  };

  loadRound();
}

/* 综合练习：听音选图 */
function initQuizPage(db) {
  const vowel = (getParams().get("vowel") || "a").toLowerCase();
  renderNav(vowel);
  const words = getWordsByVowel(db, vowel);
  let current = null;

  function loadRound() {
    const options = randPick(words, 3);
    current = options[Math.floor(Math.random() * options.length)];
    setText("quizTitle", `${VOWEL_MAP[vowel]} 综合练习`);
    setText("quizPrompt", "Please choose the picture for the word.");
    qs("#quizFeedback").textContent = "";
    qs("#quizFeedback").className = "feedback";
    const wrap = qs("#quizChoices");
    wrap.innerHTML = "";
    shuffle(options).forEach((item) => {
      const btn = document.createElement("button");
      btn.className = "choice-card";
      const img = document.createElement("img");
      safeImg(img, imagePathForWord(item.word), item.word, item.imagePrompt);
      btn.appendChild(img);
      btn.onclick = () => {
        const ok = item.word === current.word;
        qs("#quizFeedback").textContent = ok ? `答对啦！这是 ${current.word}。` : "再听一遍，认真看看图片。";
        qs("#quizFeedback").className = `feedback ${ok ? "ok" : "bad"}`;
      };
      wrap.appendChild(btn);
    });
    qs("#btnQuizAudio").onclick = () => playAudio(getWordAudio(current.word));
  }

  qs("#btnNextQuiz").onclick = loadRound;
  loadRound();
}

/* 句子学习页 */
function initSentencePage(db) {
  const params = getParams();
  const vowel = (params.get("vowel") || "a").toLowerCase();
  const idx = Number(params.get("idx") || 0);
  renderNav(vowel);
  const words = getWordsByVowel(db, vowel);
  const item = words[idx];
  if (!item) return;
  setText("sentenceWord", item.word);
  qs("#sentenceCn").classList.add("hidden");
  setText("sentenceCn", item.sentenceZh);

  const sentenceWrap = qs("#sentenceEn");
  sentenceWrap.innerHTML = "";
  item.sentenceEn.split(" ").forEach((token) => {
    const cleaned = token.replace(/[^\w]/g, "");
    const span = document.createElement("span");
    span.className = "token";
    span.textContent = token;
    span.onclick = () => playAudio(getTokenAudio(cleaned || token));
    sentenceWrap.appendChild(span);
  });

  for (let p = 1; p <= 3; p += 1) {
    const img = qs(`#senImg${p}`);
    safeImg(img, imagePathForSentence(vowel, idx, p), `${item.word} - ${p}`, item.sentenceImagePrompts[p - 1]);
  }

  qs("#btnPlaySentence").onclick = () => playAudio(getSentenceAudio(vowel, idx));
  qs("#btnShowSentenceCn").onclick = () => qs("#sentenceCn").classList.toggle("hidden");

  const prev = Math.max(0, idx - 1);
  const next = Math.min(words.length - 1, idx + 1);
  qs("#btnPrevSentence").href = `sentence.html?vowel=${vowel}&idx=${prev}`;
  qs("#btnNextSentence").href = `sentence.html?vowel=${vowel}&idx=${next}`;
  const ord = qs("#btnSentenceOrder");
  if (ord) ord.href = `sentence-order.html?vowel=${vowel}&idx=${idx}`;
  const blk = qs("#btnSentenceBlank");
  if (blk) blk.href = `sentence-blank.html?vowel=${vowel}&idx=${idx}`;
  const pic = qs("#btnSentencePicture");
  if (pic) pic.href = `sentence-picture.html?vowel=${vowel}&idx=${idx}`;
}

/* 句子练习 - 题型1：乱序排序 */
function initSentenceOrderPage(db) {
  const params = getParams();
  const vowel = (params.get("vowel") || "a").toLowerCase();
  const idx = Number(params.get("idx") || 0);
  renderNav(vowel);
  const item = getWordsByVowel(db, vowel)[idx];
  if (!item) return;
  const tokens = item.sentenceEn.replace(/[.?!]/g, "").split(" ");
  setText("orderTitle", `${item.word} - 句子排序练习`);

  const bank = qs("#orderBank");
  const result = qs("#orderResult");
  bank.innerHTML = "";
  result.innerHTML = "";
  shuffle(tokens).forEach((t) => {
    const b = document.createElement("button");
    b.className = "token";
    b.textContent = t;
    b.onclick = () => {
      const chosen = document.createElement("span");
      chosen.className = "token selected";
      chosen.textContent = t;
      result.appendChild(chosen);
      b.disabled = true;
      b.style.opacity = "0.4";
    };
    bank.appendChild(b);
  });
  qs("#btnOrderAudio").onclick = () => playAudio(getSentenceAudio(vowel, idx));
  qs("#btnOrderCheck").onclick = () => {
    const answer = Array.from(result.children).map((x) => x.textContent).join(" ");
    const target = tokens.join(" ");
    const ok = answer === target;
    setText("orderFeedback", ok ? "顺序正确！" : `再试试，正确句子共 ${tokens.length} 个词。`);
    qs("#orderFeedback").className = `feedback ${ok ? "ok" : "bad"}`;
  };
  qs("#btnOrderReset").onclick = () => window.location.reload();
}

/* 句子练习 - 题型2：挖空拖拽 */
function initSentenceBlankPage(db) {
  const params = getParams();
  const vowel = (params.get("vowel") || "a").toLowerCase();
  const idx = Number(params.get("idx") || 0);
  renderNav(vowel);
  const item = getWordsByVowel(db, vowel)[idx];
  if (!item) return;
  const tokens = item.sentenceEn.replace(/[.?!]/g, "").split(" ");
  setText("blankTitle", `${item.word} - 句子填空练习`);

  const blankCount = tokens.length > 4 ? 2 : 1;
  const blankPositions = randPick(tokens.map((_, i) => i), blankCount).sort((a, b) => a - b);
  const blankWrap = qs("#blankSentence");
  const blankOptions = qs("#blankOptions");
  blankWrap.innerHTML = "";
  blankOptions.innerHTML = "";
  const missing = blankPositions.map((i) => tokens[i]);
  const vocabPool = Array.from(
    new Set(
      getWordsByVowel(db, vowel)
        .map((w) => w.word)
        .filter((w) => !missing.includes(w))
    )
  );
  const distract = randPick(vocabPool.length >= 2 ? vocabPool : ["look", "play"], 2);
  const optionWords = shuffle([...missing, ...distract]);

  tokens.forEach((t, i) => {
    if (blankPositions.includes(i)) {
      const slot = document.createElement("span");
      slot.className = "slot blank-slot";
      slot.dataset.expected = t;
      slot.dataset.current = "";
      slot.textContent = "____";
      blankWrap.appendChild(slot);
    } else {
      const w = document.createElement("span");
      w.className = "token selected";
      w.textContent = t;
      blankWrap.appendChild(w);
    }
  });

  optionWords.forEach((w, i) => {
    const op = document.createElement("div");
    op.className = "letter word-option";
    op.dataset.char = w;
    op.dataset.id = `b-${i}-${w}`;
    op.textContent = w;
    blankOptions.appendChild(op);
  });

  enableDrag(qsa(".word-option", blankOptions), qsa(".blank-slot", blankWrap), (slot, ch, letterId) => {
    if (slot.dataset.current) return;
    slot.textContent = ch;
    slot.dataset.current = ch;
    slot.classList.add("filled");
    const src = qs(`[data-id="${letterId}"]`, blankOptions);
    if (src) src.remove();
  });

  qs("#btnBlankAudio").onclick = () => playAudio(getSentenceAudio(vowel, idx));
  qs("#btnBlankCheck").onclick = () => {
    const all = qsa("#blankSentence .blank-slot");
    const done = all.every((s) => s.dataset.current);
    if (!done) {
      setText("blankFeedback", "请先填完所有空格。");
      qs("#blankFeedback").className = "feedback bad";
      return;
    }
    const ok = all.every((s) => s.dataset.current === s.dataset.expected);
    setText("blankFeedback", ok ? "填空正确！" : "有小错误，再试一次。");
    qs("#blankFeedback").className = `feedback ${ok ? "ok" : "bad"}`;
  };
}

/* 句子练习 - 题型3：看句选图 */
function initSentencePicturePage(db) {
  const params = getParams();
  const vowel = (params.get("vowel") || "a").toLowerCase();
  const idx = Number(params.get("idx") || 0);
  renderNav(vowel);
  const item = getWordsByVowel(db, vowel)[idx];
  if (!item) return;
  setText("picTitle", `${item.word} - 看句选图`);
  setText("picSentence", item.sentenceEn);

  const picChoices = qs("#picChoices");
  picChoices.innerHTML = "";
  const allWords = getWordsByVowel(db, vowel);
  const other = randPick(allWords.filter((w) => w.word !== item.word), 2);
  const choices = shuffle([item, ...other]);
  choices.forEach((w) => {
    const btn = document.createElement("button");
    btn.className = "choice-card";
    const img = document.createElement("img");
    const wIdx = allWords.findIndex((x) => x.word === w.word);
    safeImg(img, imagePathForSentence(vowel, wIdx, 2), w.word, w.imagePrompt);
    btn.appendChild(img);
    btn.onclick = () => {
      const ok = w.word === item.word;
      const fb = qs("#picFeedback");
      fb.textContent = ok ? `正确！中文：${item.sentenceZh}` : "不太对，再看句子意思。";
      fb.className = `feedback ${ok ? "ok" : "bad"}`;
    };
    picChoices.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const db = await loadDB();
    const page = document.body.dataset.page;
    if (page === "home") initHome(db);
    if (page === "vowel") initVowelPage(db);
    if (page === "word") initWordPage(db);
    if (page === "review-beginning") initReviewStagePage(db, 0);
    if (page === "review-middle") initReviewStagePage(db, 1);
    if (page === "review-ending") initReviewStagePage(db, 2);
    if (page === "spelling") initSpellingPage(db);
    if (page === "quiz") initQuizPage(db);
    if (page === "sentence") initSentencePage(db);
    if (page === "sentence-order") initSentenceOrderPage(db);
    if (page === "sentence-blank") initSentenceBlankPage(db);
    if (page === "sentence-picture") initSentencePicturePage(db);
  } catch (err) {
    console.error(err);
    alert("页面初始化失败，请检查 CVC.JSON 是否存在。");
  }
});
