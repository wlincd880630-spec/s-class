const MEDIA_BASE = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Magic-E/";
/* Magic E（CVCE）按 aCe / eCe / iCe / oCe / uCe 分组；样式见 styles.css */

const ME_VOWELS = ["a", "e", "i", "o", "u"];

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

function qsMe(selector, parent = document) {
  return parent.querySelector(selector);
}

function getMagicEDB() {
  return window.MAGIC_E_DATA || null;
}

function getMagicEGroups() {
  const db = getMagicEDB();
  return db && db.groups ? db.groups : {};
}

function getWordsByMagicVowel(v) {
  const g = getMagicEGroups()[v];
  return g && Array.isArray(g.words) ? g.words : [];
}

function getPatternLabel(v) {
  const g = getMagicEGroups()[v];
  return g && g.patternLabel ? g.patternLabel : `${v}Ce`;
}

function imagePathMagicEWord(vowel, idx) {
  return `${MEDIA_BASE}assets/images/magic-e/words/${vowel}-${idx}.png`;
}

function imagePathMagicESentence(vowel, idx, panel) {
  return `${MEDIA_BASE}assets/images/magic-e/sentences/${vowel}-${idx}-${panel}.png`;
}

function audioPathMagicEWord(w) {
  return `${MEDIA_BASE}assets/audio/magic-e/words/${w.toLowerCase()}.mp3`;
}

function audioPathMagicESentence(vowel, idx) {
  return `${MEDIA_BASE}assets/audio/magic-e/sentences/${vowel}-${idx}.mp3`;
}

function audioPathMagicEToken(token) {
  const t = String(token).replace(/[^\w]/g, "").toLowerCase();
  return `${MEDIA_BASE}assets/audio/magic-e/tokens/${t}.mp3`;
}

function playMagicE(src) {
  const audio = new Audio(src);
  audio.play().catch(() => {
    alert("音频未找到，请先运行 generate_magic_e_mp3.py 生成 MP3。");
  });
}

function safeImgMagicE(imgEl, src, label, sub) {
  imgEl.src = src;
  imgEl.onerror = () => {
    imgEl.src = buildPlaceholderDataUrl(label, sub || "请运行 generate_magic_e_imagen.py");
  };
}

function renderMagicENav(currentVowel = "") {
  const wrap = document.getElementById("navMagicE");
  if (!wrap) return;
  wrap.innerHTML = "";
  /* 首页不显示顶栏导航；内页仅保留 aCe～uCe 分组，不含 CVC / Magic E 入口链接 */
  if (document.body.dataset.page === "magic-e-home") return;
  ME_VOWELS.forEach((v) => {
    const a = document.createElement("a");
    a.href = `magic-e-vowel.html?vowel=${v}`;
    a.className = "nav-chip";
    a.textContent = getPatternLabel(v);
    if (currentVowel === v) {
      a.style.background = "#bfe9ff";
      a.style.borderColor = "#4facf7";
    }
    wrap.appendChild(a);
  });
}

function initMagicEHome() {
  renderMagicENav();
  const grid = document.getElementById("magicEVowelGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const emojis = { a: "🎂", e: "⭐", i: "🪁", o: "🏠", u: "🐶" };
  ME_VOWELS.forEach((v) => {
    const words = getWordsByMagicVowel(v);
    const label = getPatternLabel(v);
    const card = document.createElement("a");
    card.className = "vowel-card";
    card.href = `magic-e-vowel.html?vowel=${v}`;
    card.innerHTML = `
      <div class="vowel-big">${label}</div>
      <div style="font-size:34px;margin-bottom:6px">${emojis[v] || ""}</div>
      <div style="font-size:17px;font-weight:700;color:var(--text-lite)">Magic E · ${label}</div>
      <div class="vowel-count">共 ${words.length} 个单词</div>
    `;
    grid.appendChild(card);
  });
}

function initMagicEVowelList() {
  const params = new URLSearchParams(window.location.search);
  const vowel = (params.get("vowel") || "a").toLowerCase();
  if (!ME_VOWELS.includes(vowel)) return;
  renderMagicENav(vowel);
  const words = getWordsByMagicVowel(vowel);
  const label = getPatternLabel(vowel);
  document.title = `Magic E · ${label}`;
  qsMe("#magicVowelTitle").textContent = `${label} 单词`;
  qsMe("#magicVowelHint").textContent =
    `本组为「辅音 + ${vowel.toUpperCase()} + 辅音 + 不发音 e」类长元音词（示意：${vowel}_ _ e）。`;
  const list = qsMe("#magicWordGrid");
  list.innerHTML = "";
  words.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.innerHTML = `
      <div class="word-en">${item.word}</div>
      <div class="word-zh">${item.chinese}</div>
      <div class="btn-row">
        <a class="btn primary sm" href="magic-e-word.html?vowel=${vowel}&idx=${idx}">📖 学单词</a>
        <a class="btn orange sm" href="magic-e-sentence.html?vowel=${vowel}&idx=${idx}">📝 例句</a>
      </div>
    `;
    list.appendChild(card);
  });
}

function initMagicEWord() {
  const params = new URLSearchParams(window.location.search);
  const vowel = (params.get("vowel") || "a").toLowerCase();
  const idx = Number(params.get("idx") || 0);
  const words = getWordsByMagicVowel(vowel);
  const item = words[idx];
  if (!item) return;
  renderMagicENav(vowel);
  document.title = `Magic E · ${item.word}`;
  qsMe("#meWordValue").textContent = item.word;
  qsMe("#meWordCn").textContent = "🇨🇳 " + item.chinese;
  qsMe("#meWordCn").classList.add("hidden");
  qsMe("#meWordHint").textContent = "🖼 配图提示：" + item.imagePrompt;
  safeImgMagicE(qsMe("#meWordImage"), imagePathMagicEWord(vowel, idx), item.word, item.imagePrompt);
  qsMe("#btnMeSpeakWord").onclick = () => playMagicE(audioPathMagicEWord(item.word));
  qsMe("#btnMeShowCn").onclick = () => {
    qsMe("#meWordCn").classList.toggle("hidden");
    qsMe("#btnMeShowCn").textContent = qsMe("#meWordCn").classList.contains("hidden")
      ? "🈳 显示中文"
      : "🈚 隐藏中文";
  };
  const prev = Math.max(0, idx - 1);
  const next = Math.min(words.length - 1, idx + 1);
  qsMe("#btnMeWordPrev").href = `magic-e-word.html?vowel=${vowel}&idx=${prev}`;
  qsMe("#btnMeWordNext").href = `magic-e-word.html?vowel=${vowel}&idx=${next}`;
  qsMe("#btnMeToSentence").href = `magic-e-sentence.html?vowel=${vowel}&idx=${idx}`;
  qsMe("#btnMeBackList").href = `magic-e-vowel.html?vowel=${vowel}`;
}

function initMagicESentence() {
  const params = new URLSearchParams(window.location.search);
  const vowel = (params.get("vowel") || "a").toLowerCase();
  const idx = Number(params.get("idx") || 0);
  const words = getWordsByMagicVowel(vowel);
  const item = words[idx];
  if (!item) return;
  renderMagicENav(vowel);
  document.title = `Magic E 例句 · ${item.word}`;
  qsMe("#meSentenceTitle").textContent = item.word;
  const enWrap = qsMe("#meSentenceEn");
  enWrap.innerHTML = "";
  item.sentenceEn.split(" ").forEach((token) => {
    const span = document.createElement("span");
    span.className = "token";
    span.textContent = token;
    const cleaned = token.replace(/[^\w]/g, "");
    span.onclick = () => playMagicE(audioPathMagicEToken(cleaned || token));
    enWrap.appendChild(span);
  });
  qsMe("#meSentenceCn").textContent = item.sentenceZh;
  qsMe("#meSentenceCn").classList.add("hidden");
  for (let n = 1; n <= 3; n += 1) {
    const img = qsMe(`#meSenImg${n}`);
    safeImgMagicE(
      img,
      imagePathMagicESentence(vowel, idx, n),
      `${item.word} ${n}`,
      item.sentenceImagePrompts[n - 1]
    );
  }
  qsMe("#btnMePlaySentence").onclick = () => playMagicE(audioPathMagicESentence(vowel, idx));
  qsMe("#btnMeToggleCn").onclick = () => qsMe("#meSentenceCn").classList.toggle("hidden");
  const prev = Math.max(0, idx - 1);
  const next = Math.min(words.length - 1, idx + 1);
  qsMe("#btnMePrev").href = `magic-e-sentence.html?vowel=${vowel}&idx=${prev}`;
  qsMe("#btnMeNext").href = `magic-e-sentence.html?vowel=${vowel}&idx=${next}`;
  qsMe("#btnBackWord").href = `magic-e-word.html?vowel=${vowel}&idx=${idx}`;
  qsMe("#btnBackVowel").href = `magic-e-vowel.html?vowel=${vowel}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (!window.MAGIC_E_DATA) {
    if (page && page.startsWith("magic-e")) {
      console.error("缺少 magic-e-data.js");
      alert("缺少 Magic E 数据文件 magic-e-data.js。");
    }
    return;
  }
  if (page === "magic-e-home") initMagicEHome();
  if (page === "magic-e-vowel") initMagicEVowelList();
  if (page === "magic-e-word") initMagicEWord();
  if (page === "magic-e-sentence") initMagicESentence();
});
