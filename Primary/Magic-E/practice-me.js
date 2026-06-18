const MEDIA_BASE = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Magic-E/";
/* Magic E（CVCE）课堂练习 / 测试 — 共用工具 */

(function () {
  const VOWEL_KEYS = ["a", "e", "i", "o", "u"];

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /** 配图：与课件单词页一致 */
  function imagePathForWord(item) {
    const v = item.vowel;
    const i = item.wordIdx;
    if (v == null || i == null) return "";
    return `${MEDIA_BASE}assets/images/magic-e/words/${v}-${i}.png`;
  }

  function getLocalAudio(word) {
    return `${MEDIA_BASE}assets/audio/magic-e/words/${String(word).toLowerCase()}.mp3`;
  }

  function buildPlaceholderDataUrl(label, sub) {
    const esc = (s) =>
      String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e7f7ff"/><stop offset="100%" stop-color="#fff3d8"/></linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="45%" text-anchor="middle" font-size="66" fill="#2e87be" font-weight="700">${esc(label)}</text>
      <text x="50%" y="60%" text-anchor="middle" font-size="24" fill="#4f6f85">${esc(sub || "请运行 generate_magic_e_imagen.py")}</text>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function safeImg(imgEl, src, fallbackLabel, fallbackSub) {
    if (!imgEl) return;
    imgEl.src = src;
    imgEl.onerror = () => {
      imgEl.src = buildPlaceholderDataUrl(fallbackLabel, fallbackSub);
    };
  }

  /** CVCE：第一个元音字母（中间音考点） */
  function firstVowelIndex(word) {
    const w = String(word || "").toLowerCase();
    for (let i = 0; i < w.length; i++) {
      if ("aeiou".includes(w[i])) return i;
    }
    return Math.min(1, w.length - 1);
  }

  /** CVCE：末尾不发音 e 前的一个字母（常为尾辅音） */
  function endingLetterIndex(word) {
    const w = String(word || "").toLowerCase();
    if (w.length < 2) return w.length - 1;
    if (w.endsWith("e")) return w.length - 2;
    return w.length - 1;
  }

  function getAllWords(db, vowelKeys) {
    const list = [];
    vowelKeys.forEach((v) => {
      const words = db.groups?.[v]?.words || [];
      words.forEach((w, wordIdx) => {
        list.push({ ...w, vowel: v, wordIdx });
      });
    });
    return list;
  }

  function randomLetters(count, exclude) {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const ex = exclude.map((c) => String(c).toLowerCase());
    const avail = letters.filter((l) => !ex.includes(l));
    return shuffle(avail).slice(0, count);
  }

  function celebrate(anchorEl, opts) {
    const o = opts || {};
    const big = Boolean(o.big);
    const text = o.text || "🎉 答对啦！";
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight * 0.32;
    if (anchorEl && typeof anchorEl.getBoundingClientRect === "function") {
      const r = anchorEl.getBoundingClientRect();
      cx = r.left + r.width / 2;
      cy = r.top + r.height / 2;
    }
    const overlay = document.createElement("div");
    overlay.className = "celebrate-overlay";
    overlay.setAttribute("aria-hidden", "true");
    const n = big ? 42 : 28;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      p.className = "celebrate-particle";
      const ang = Math.random() * Math.PI * 2;
      const dist = (big ? 90 : 55) + Math.random() * (big ? 160 : 100);
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      p.style.setProperty("--tx", `${Math.cos(ang) * dist}px`);
      p.style.setProperty("--ty", `${Math.sin(ang) * dist - (big ? 50 : 30)}px`);
      p.style.setProperty("--hue", String((i * 41) % 360));
      p.style.animationDelay = `${Math.random() * 0.12}s`;
      if (i % 7 === 0) {
        p.classList.add("celebrate-star");
        p.textContent = ["⭐", "✨", "🌟"][i % 3];
      }
      overlay.appendChild(p);
    }
    const cheer = document.createElement("div");
    cheer.className = big ? "celebrate-cheer celebrate-cheer--big" : "celebrate-cheer";
    cheer.textContent = text;
    cheer.style.left = `${cx}px`;
    cheer.style.top = `${cy - (big ? 50 : 36)}px`;
    overlay.appendChild(cheer);
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), big ? 2200 : 1500);
  }

  /** 听音测试：按题型取「分组用」字母 */
  function testLetterForWord(w, qType) {
    const raw = String(w.word || "").toLowerCase();
    if (raw.length < 2) return "";
    if (qType === "beginning") return raw[0];
    if (qType === "ending") {
      return raw.endsWith("e") && raw.length >= 2 ? raw[raw.length - 2] : raw[raw.length - 1];
    }
    if (qType === "middle") {
      for (let i = 0; i < raw.length; i++) {
        if ("aeiou".includes(raw[i])) return raw[i];
      }
      return raw[1] || raw[0];
    }
    return "";
  }

  function splitIntoTripleGroups(words, qType) {
    const g = {};
    words.forEach((w) => {
      const ch = testLetterForWord(w, qType);
      if (!ch) return;
      if (!g[ch]) g[ch] = [];
      g[ch].push(w);
    });
    const out = [];
    Object.entries(g).forEach(([letter, arr]) => {
      if (arr.length < 3) return;
      const pool = shuffle(arr);
      for (let i = 0; i + 2 < pool.length; i += 3) {
        out.push({ letter, words: pool.slice(i, i + 3) });
      }
    });
    return out;
  }

  window.MEPractice = {
    shuffle,
    imagePathForWord,
    safeImg,
    buildPlaceholderDataUrl,
    getLocalAudio,
    getAllWords,
    randomLetters,
    VOWEL_KEYS,
    celebrate,
    firstVowelIndex,
    endingLetterIndex,
    testLetterForWord,
    splitIntoTripleGroups,
  };
})();
