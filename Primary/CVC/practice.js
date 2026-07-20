const MEDIA_BASE = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/CVC/";
/* CVC 课堂练习 - 逻辑模块 */

(function () {
  const VOWEL_MAP = { a: "A", e: "E", i: "I", o: "O", u: "U" };

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function imagePathForWord(word) {
    return `${MEDIA_BASE}assets/images/words/${word.toLowerCase()}.png`;
  }

  function buildPlaceholderDataUrl(label, sub) {
    const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e7f7ff"/><stop offset="100%" stop-color="#fff3d8"/></linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="45%" text-anchor="middle" font-size="66" fill="#2e87be" font-weight="700">${esc(label)}</text>
      <text x="50%" y="60%" text-anchor="middle" font-size="24" fill="#4f6f85">${esc(sub || "请先运行图片生成脚本")}</text>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function safeImg(imgEl, src, fallbackLabel, fallbackSub) {
    if (!imgEl) return;
    imgEl.src = src;
    imgEl.onerror = () => { imgEl.src = buildPlaceholderDataUrl(fallbackLabel, fallbackSub); };
  }

  function getLocalAudio(word) {
    return `${MEDIA_BASE}assets/audio/words/${word.toLowerCase()}.mp3`;
  }

  // Azure TTS - 需要配置 key 和 region
  let speechSynthesizer = null;
  function initAzureTTS() {
    if (window.sdk && window.SpeechConfig) return;
    const key = localStorage.getItem('azure_tts_key') || '';
    const region = localStorage.getItem('azure_tts_region') || 'eastasia';
    if (!key) return null;
    try {
      const config = window.SpeechConfig.fromSubscription(key, region);
      config.speechSynthesisVoiceName = 'en-GB-RyanNeural';
      speechSynthesizer = new window.SpeechSynthesizer(config, null);
      return speechSynthesizer;
    } catch (e) { return null; }
  }

  function speakWithTTS(text, onDone) {
    const syn = initAzureTTS();
    if (syn) {
      syn.speakTextAsync(text, result => {
        if (onDone) onDone();
        if (result.reason === window.ResultReason?.SynthesizingAudioCompleted) {}
      });
      return;
    }
    const audio = new Audio();
    audio.src = getLocalAudio(text);
    audio.onended = () => { if (onDone) onDone(); };
    audio.onerror = () => {
      const fallback = new Audio();
      fallback.src = getLocalAudio(text);
      fallback.onerror = () => { if (onDone) onDone(); };
      fallback.play().catch(() => { if (onDone) onDone(); });
    };
    audio.play().catch(() => { if (onDone) onDone(); });
  }

  function getAllWords(db, vowelKeys) {
    const list = [];
    vowelKeys.forEach(v => {
      const words = db.vowels[v]?.words || [];
      words.forEach(w => list.push({ ...w, vowel: v }));
    });
    return list;
  }

  function randomLetters(count, exclude) {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const avail = letters.filter(l => !exclude.includes(l));
    return shuffle(avail).slice(0, count);
  }

  /**
   * 答对庆祝：彩纸粒子 + 文案（anchorEl 为按钮等，粒子从该处散开；可省略则屏幕中上）
   * @param {HTMLElement|null} anchorEl
   * @param {{ big?: boolean, text?: string }} opts
   */
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
    const t = big ? 2200 : 1500;
    setTimeout(() => overlay.remove(), t);
  }

  window.CVCPractice = {
    shuffle,
    imagePathForWord,
    safeImg,
    buildPlaceholderDataUrl,
    speakWithTTS,
    getAllWords,
    randomLetters,
    VOWEL_MAP,
    getLocalAudio,
    celebrate
  };
})();
