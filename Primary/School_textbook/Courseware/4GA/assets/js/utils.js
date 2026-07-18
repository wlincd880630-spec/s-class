/**
 * 通用工具：Azure 语音、本地存储、计时、随机等
 */
const AZURE_CONFIG = {
  subscriptionKey: 'C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu',
  region: 'southeastasia',
  language: 'en-GB',
  voice: 'en-GB-RyanNeural',
  speechRate: '0.90'
};

const DEEPSEEK_CONFIG = {
  apiKey: 'sk-daa16008e81843deba6fefe9dce51465',
  url: 'https://api.deepseek.com/chat/completions',
  model: 'deepseek-chat'
};

const STORAGE_PREFIX = 'fltrp_g4s_';

// ─── 本地存储 ───
const Storage = {
  get(key, def = null) {
    try {
      const v = localStorage.getItem(STORAGE_PREFIX + key);
      return v ? JSON.parse(v) : def;
    } catch { return def; }
  },
  set(key, val) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val));
  },
  getFamiliar() { return Storage.get('familiar', {}); },
  setFamiliar(wordId, val) {
    const f = Storage.getFamiliar();
    f[wordId] = val;
    Storage.set('familiar', f);
  },
  getWordTime() { return Storage.get('wordTime', {}); },
  setWordTime(wordId, sec) {
    const t = Storage.getWordTime();
    t[wordId] = (t[wordId] || 0) + sec;
    Storage.set('wordTime', t);
  },
  getTotalTime() { return Storage.get('totalTime', 0); },
  addTotalTime(sec) {
    Storage.set('totalTime', Storage.getTotalTime() + sec);
  }
};

// ─── 计时器 ───
class WordTimer {
  constructor() {
    this.startTs = null;
    this.elapsed = 0;
    this.running = false;
    this._tick = null;
    this.onTick = null;
  }
  start() {
    if (this.running) return;
    this.running = true;
    this.startTs = Date.now();
    this._tick = setInterval(() => {
      if (this.onTick) this.onTick(this.current());
    }, 1000);
  }
  stop() {
    if (!this.running) return 0;
    const sec = this.current();
    this.elapsed += sec;
    this.running = false;
    this.startTs = null;
    clearInterval(this._tick);
    return sec;
  }
  current() {
    if (!this.running) return 0;
    return Math.floor((Date.now() - this.startTs) / 1000);
  }
  reset() {
    this.stop();
    this.elapsed = 0;
  }
}

// ─── 格式化时间 ───
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ─── 数组工具 ───
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n, excludeIds = []) {
  const ids = new Set(excludeIds.map(e => (typeof e === 'string' ? e : e.id)));
  const pool = arr.filter(x => !ids.has(x.id));
  return shuffle(pool).slice(0, Math.min(n, pool.length));
}

/** 生成测验选项：按 id 去重，按显示文本去重 */
function pickQuizOptions(correct, pool, count, getLabel) {
  const options = [{ word: correct, label: getLabel(correct) }];
  const usedIds = new Set([correct.id]);
  const usedLabels = new Set([options[0].label]);

  for (const item of shuffle(pool)) {
    if (options.length >= count) break;
    if (usedIds.has(item.id)) continue;
    let label = getLabel(item);
    if (usedLabels.has(label)) label = item.chinese;
    if (usedLabels.has(label)) continue;
    usedIds.add(item.id);
    usedLabels.add(label);
    options.push({ word: item, label });
  }
  for (const item of shuffle(pool)) {
    if (options.length >= count) break;
    if (usedIds.has(item.id)) continue;
    usedIds.add(item.id);
    usedLabels.add(item.chinese);
    options.push({ word: item, label: item.chinese });
  }
  return shuffle(options);
}

function shortMeaning(w) {
  return w.chinese.split('；')[0].split('，')[0];
}

/** 单词游戏默认每组数量 */
const GAME_GROUP_SIZE = 4;

function chunkGroups(arr, size = GAME_GROUP_SIZE) {
  const groups = [];
  for (let i = 0; i < arr.length; i += size) groups.push(arr.slice(i, i + size));
  return groups;
}

/**
 * 填充最终统计面板
 * @param {HTMLElement} panel
 * @param {Object} s - { title, groups, totalItems, itemLabel, correct, wrong, timeSec, extraRows, onRetry }
 */
function showFinalGameStats(panel, s) {
  const total = (s.correct || 0) + (s.wrong || 0);
  const pct = total > 0 ? Math.round((s.correct || 0) / total * 100) : 100;
  const extras = (s.extraRows || []).map(r =>
    `<div class="report-row"><span>${r.label}</span><span>${r.value}</span></div>`
  ).join('');
  panel.innerHTML = `
    <div class="stats-panel">
      <h3><i class="fa-solid fa-flag-checkered"></i> ${s.title || '全部完成！'}</h3>
      <p>共 <strong>${s.groups}</strong> 组 · <strong>${s.totalItems}</strong> ${s.itemLabel || '个单词'}</p>
      <div style="margin:16px auto;max-width:340px;text-align:left;">
        <div class="report-row"><span>✅ 正确</span><span><strong>${s.correct || 0}</strong> 次</span></div>
        <div class="report-row"><span>❌ 错误</span><span><strong>${s.wrong || 0}</strong> 次</span></div>
        <div class="report-row"><span>正确率</span><span>${pct}%</span></div>
        ${extras}
      </div>
      <p class="progress-ring">总用时 ${formatTime(s.timeSec || 0)}</p>
      <button class="btn btn-primary" id="gameRetryBtn" style="margin-top:16px;">
        <i class="fa-solid fa-rotate-right"></i> 再来一次
      </button>
    </div>`;
  if (s.onRetry) panel.querySelector('#gameRetryBtn').onclick = s.onRetry;
}

function updateGroupProgress(groupIdx, groupTotal, elIds = {}) {
  const n = groupIdx + 1;
  if (elIds.num) document.getElementById(elIds.num).textContent = n;
  if (elIds.total) document.getElementById(elIds.total).textContent = groupTotal;
  if (elIds.num2) document.getElementById(elIds.num2).textContent = n;
  if (elIds.total2) document.getElementById(elIds.total2).textContent = groupTotal;
}

function getUnitById(unitId) {
  return TEXTBOOK_DATA.units.find(u => u.id === unitId);
}

function getAllWords(unitId) {
  const unit = getUnitById(unitId);
  return unit ? unit.words : [];
}

function getWordById(unitId, wordId) {
  return getAllWords(unitId).find(w => w.id === wordId);
}

/** 渲染音素盒子（点击切换音标/字母） */
function renderPhonemeBoxes(container, w) {
  if (!container || !w) return;
  container.innerHTML = '';
  let consumed = 0;
  const parts = w.word.includes(' ') ? w.word.split(' ') : [w.word];

  function appendBox(ph) {
    const isSilent = ph.symbol === '—';
    const box = document.createElement('div');
    box.className = 'phoneme-box' + (ph.letter.length > 2 ? ' wide' : '') + (isSilent ? ' silent' : '');
    box.textContent = isSilent ? '—' : ph.symbol;
    box.title = isSilent ? `不发音：${ph.letter}` : `音标 ${ph.symbol}，点击显示字母：${ph.letter}`;
    box.dataset.ipa = ph.symbol;
    box.dataset.letter = ph.letter;
    if (!isSilent) {
      box.addEventListener('click', () => {
        if (box.classList.contains('show-letter')) {
          box.textContent = box.dataset.ipa;
          box.classList.remove('show-letter');
        } else {
          box.textContent = box.dataset.letter;
          box.classList.add('show-letter');
        }
      });
    } else {
      box.addEventListener('click', () => {
        box.textContent = box.classList.contains('show-letter') ? '—' : ph.letter;
        box.classList.toggle('show-letter');
      });
    }
    container.appendChild(box);
  }

  parts.forEach((part, pi) => {
    if (pi > 0) {
      const gap = document.createElement('div');
      gap.className = 'phoneme-gap';
      container.appendChild(gap);
    }
    let partLen = 0;
    const partPhonemes = [];
    while (partLen < part.replace(/-/g, '').length && consumed < w.phonemes.length) {
      if (w.phonemes[consumed].letter === ' ') {
        consumed += 1;
        continue;
      }
      partPhonemes.push(w.phonemes[consumed]);
      partLen += w.phonemes[consumed].letter.replace(/-/g, '').length;
      consumed += 1;
    }
    partPhonemes.forEach(appendBox);
  });

  while (consumed < w.phonemes.length) {
    appendBox(w.phonemes[consumed++]);
  }
}

/** 听写 A4 每页单词数（双栏合计，留出足够书写空间） */
const DICTATION_WORDS_PER_PAGE = 10;

/** 创建纸质抄写四线格（trace=描红底字，write=空白格） */
function createCopyLineCell(mode, word) {
  const isTrace = mode === 'trace';
  const cell = document.createElement('div');
  cell.className = 'copy-cell copy-cell--' + mode;

  const tag = document.createElement('span');
  tag.className = 'copy-cell-tag no-print';
  tag.textContent = isTrace ? '描红' : '独立书写';

  const grid = document.createElement('div');
  grid.className = 'copy-line-grid';
  grid.setAttribute('aria-hidden', 'true');

  if (isTrace && word) {
    const guide = document.createElement('span');
    guide.className = 'copy-trace-text';
    guide.textContent = word;
    grid.appendChild(guide);
  }

  ['dl-top', 'dl-mid', 'dl-grass', 'dl-base'].forEach(cls => {
    const line = document.createElement('i');
    line.className = 'dl-line ' + cls;
    grid.appendChild(line);
  });

  cell.append(tag, grid);
  return cell;
}

/** 渲染单个单词抄写作业块 */
function buildCopySheet(word, mount, options = {}) {
  const { interactivePhoneme = true } = options;
  const sheet = document.createElement('div');
  sheet.className = 'copy-sheet';
  sheet.dataset.wordId = word.id;

  const head = document.createElement('div');
  head.className = 'copy-word-head';
  head.innerHTML = `
    <span class="copy-word-title">${word.word}</span>
    <span class="copy-word-cn">${word.chinese}</span>
    <button type="button" class="btn btn-sm btn-outline copy-speak no-print" title="朗读">
      <i class="fa-solid fa-volume-high"></i>
    </button>`;
  head.querySelector('.copy-speak').addEventListener('click', () => speakText(word.word));

  const phonemeRow = document.createElement('div');
  phonemeRow.className = 'copy-phoneme-row';
  const phonemeBoxes = document.createElement('div');
  phonemeBoxes.className = 'phoneme-boxes';
  phonemeRow.appendChild(phonemeBoxes);
  renderPhonemeBoxes(phonemeBoxes, word);
  if (!interactivePhoneme) {
    phonemeBoxes.querySelectorAll('.phoneme-box').forEach(box => {
      box.style.pointerEvents = 'none';
    });
  }

  const rowsWrap = document.createElement('div');
  rowsWrap.className = 'copy-rows';
  COPY_WRITE_PATTERN.forEach(rowModes => {
    const row = document.createElement('div');
    row.className = 'copy-row';
    rowModes.forEach(mode => row.appendChild(createCopyLineCell(mode, word.word)));
    rowsWrap.appendChild(row);
  });

  sheet.append(head, phonemeRow, rowsWrap);
  mount.appendChild(sheet);
  return sheet;
}

/** 抄写页每词书写格配置：描红 / 独立书写 */
const COPY_WRITE_PATTERN = [
  ['trace', 'trace', 'write'],
  ['trace', 'write', 'write'],
];

// ─── Azure 语音 SDK 加载 ───
let speechSdkReady = null;

function loadSpeechSDK() {
  if (window.SpeechSDK) return Promise.resolve();
  if (speechSdkReady) return speechSdkReady;
  speechSdkReady = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://aka.ms/csspeech/jsbrowserpackageraw';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Speech SDK 加载失败'));
    document.head.appendChild(s);
  });
  return speechSdkReady;
}

function createSpeechConfig() {
  const sdk = window.SpeechSDK;
  const cfg = sdk.SpeechConfig.fromSubscription(
    AZURE_CONFIG.subscriptionKey,
    AZURE_CONFIG.region
  );
  cfg.speechSynthesisVoiceName = AZURE_CONFIG.voice;
  return cfg;
}

function escapeSsml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSpeakSsml(text) {
  const safe = escapeSsml(text);
  const { voice, language, speechRate } = AZURE_CONFIG;
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language}">` +
    `<voice name="${voice}"><prosody rate="${speechRate}">${safe}</prosody></voice></speak>`;
}

function pickBritishMaleVoice() {
  if (!window.speechSynthesis) return null;
  const voices = speechSynthesis.getVoices();
  const maleGb = voices.find(v =>
    v.lang.replace('_', '-').toLowerCase().startsWith('en-gb') &&
    /ryan|thomas|oliver|george|arthur|male|daniel|gordon|malcolm/i.test(v.name)
  );
  if (maleGb) return maleGb;
  const anyGb = voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith('en-gb'));
  if (anyGb) return anyGb;
  return voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith('en')) || null;
}

// ─── TTS 朗读 ───
let currentSynthesizer = null;

async function speakText(text, onEnd) {
  if (!text) return;
  // 优先播放预生成 MP3（COS / 本地）
  if (window.LocalAudio && window.__LOCAL_AUDIO_MANIFEST) {
    try {
      const ok = await window.LocalAudio.speak(text, { rate: AZURE_CONFIG.speechRate });
      if (ok) {
        if (onEnd) onEnd();
        return;
      }
    } catch (e) {
      console.warn('LocalAudio 播放失败，回退 Azure', e);
    }
  }
  try {
    await loadSpeechSDK();
    if (currentSynthesizer) {
      currentSynthesizer.close();
      currentSynthesizer = null;
    }
    const sdk = window.SpeechSDK;
    const cfg = createSpeechConfig();
    const audioCfg = sdk.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new sdk.SpeechSynthesizer(cfg, audioCfg);
    currentSynthesizer = synthesizer;
    synthesizer.speakSsmlAsync(
      buildSpeakSsml(text),
      result => {
        synthesizer.close();
        currentSynthesizer = null;
        if (onEnd) onEnd(result);
      },
      err => {
        console.warn('Azure TTS 失败，使用 Web Speech API', err);
        synthesizer.close();
        fallbackSpeak(text, onEnd);
      }
    );
  } catch (e) {
    console.warn('TTS fallback', e);
    fallbackSpeak(text, onEnd);
  }
}

function fallbackSpeak(text, onEnd) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = Number(AZURE_CONFIG.speechRate) || 0.9;
  const voice = pickBritishMaleVoice();
  if (voice) u.voice = voice;
  if (onEnd) u.onend = onEnd;
  speechSynthesis.speak(u);
}

// ─── 发音评估：点击开始 / 再次点击结束 ───
class PronunciationRecorder {
  constructor() {
    this.recognizer = null;
    this.isRecording = false;
    this.lastResult = null;
    this.referenceText = '';
  }

  async start(referenceText) {
    if (this.isRecording) return;
    this.referenceText = referenceText;
    this.lastResult = null;
    await loadSpeechSDK();
    const sdk = window.SpeechSDK;
    const cfg = createSpeechConfig();
    cfg.speechRecognitionLanguage = AZURE_CONFIG.language;

    const paConfig = new sdk.PronunciationAssessmentConfig(
      referenceText,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true
    );
    paConfig.enableProsodyAssessment = true;

    const audioCfg = sdk.AudioConfig.fromDefaultMicrophoneInput();
    this.recognizer = new sdk.SpeechRecognizer(cfg, audioCfg);
    paConfig.applyTo(this.recognizer);

    this.recognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        const pa = sdk.PronunciationAssessmentResult.fromResult(e.result);
        this.lastResult = {
          accuracy: pa.accuracyScore,
          fluency: pa.fluencyScore,
          completeness: pa.completenessScore,
          pronScore: pa.pronunciationScore,
          recognized: e.result.text
        };
      }
    };

    this.recognizer.canceled = (s, e) => {
      console.warn('Recognition canceled', e);
    };

    await new Promise((resolve, reject) => {
      this.recognizer.startContinuousRecognitionAsync(resolve, reject);
    });
    this.isRecording = true;
  }

  async stop() {
    if (!this.recognizer || !this.isRecording) return this.lastResult;
    this.isRecording = false;
    await new Promise((resolve, reject) => {
      this.recognizer.stopContinuousRecognitionAsync(resolve, reject);
    });
    this.recognizer.close();
    this.recognizer = null;
    return this.lastResult;
  }

  cancel() {
    if (this.recognizer && this.isRecording) {
      this.isRecording = false;
      this.recognizer.stopContinuousRecognitionAsync(() => {
        this.recognizer.close();
        this.recognizer = null;
      });
    }
  }
}

/** 全局录音器实例（每页共用一个） */
const pronunciationRecorder = new PronunciationRecorder();

/**
 * 四线格描红书写板（参照 Play Kitty 抄写页比例）
 * 格带占画布高 50%、垂直居中；四线位于 0% / 33% / 67% / 100%；基线为 67% 粗蓝线
 */
class HandwritingPad {
  static LINE_BLUE = '#90CAF9';
  static LINE_RED = '#EF9A9A';
  static LINE_DASH = 'rgba(33,150,243,0.32)';
  static TRACE_COLOR = 'rgba(144,202,249,0.55)';

  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.guideWord = '';
    this.practiceWord = '';
    this.traceMode = options.traceMode !== false;
    this.heightRatio = options.heightRatio ?? 0.42;
    this.minWidth = options.minWidth ?? 300;
    this.minHeight = options.minHeight ?? 200;
    this.drawing = false;
    this.strokes = [];
    this.currentStroke = null;
    this._onPointerDown = e => this._start(e);
    this._onPointerMove = e => this._move(e);
    this._onPointerUp = e => this._end(e);
    canvas.addEventListener('pointerdown', this._onPointerDown);
    canvas.addEventListener('pointermove', this._onPointerMove);
    canvas.addEventListener('pointerup', this._onPointerUp);
    canvas.addEventListener('pointercancel', this._onPointerUp);
    canvas.addEventListener('pointerleave', this._onPointerUp);
  }

  setWord(word, opts = {}) {
    const trace = opts.trace !== false;
    this.practiceWord = word || '';
    this.traceMode = trace;
    this.guideWord = trace ? (word || '') : '';
    this.clear();
    if (this.practiceWord && document.fonts) {
      document.fonts.load(`700 48px ${this._fontStack()}`).then(() => this._redraw()).catch(() => {});
    }
  }

  clear() {
    this.strokes = [];
    this.currentStroke = null;
    this.drawing = false;
    this._redraw();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const w = Math.max(this.minWidth, Math.floor(rect.width));
    const h = Math.max(this.minHeight, Math.floor(w * this.heightRatio));
    const dpr = window.devicePixelRatio || 1;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this._w = w;
    this._h = h;
    this._redraw();
  }

  /** Play Kitty：格带 top 25%、高 50%；四线 0/33/67/100% */
  _gridBand() {
    const top = this._h * 0.25;
    const height = this._h * 0.5;
    return { top, height, bottom: top + height };
  }

  _lineYs() {
    const { top, height } = this._gridBand();
    return [
      top + height * 0,
      top + height * 0.33,
      top + height * 0.67,
      top + height * 1,
    ];
  }

  _fontStack() {
    return '"Patrick Hand", cursive';
  }

  /** 字号适配：x 高度占 33%–67% 区间，上伸至顶线，下伸至底线 */
  _fitFontSize(ctx, word, w, lines) {
    const bandH = lines[3] - lines[0];
    const targetXH = (lines[2] - lines[1]) * 0.98;
    const targetAsc = (lines[2] - lines[0]) * 0.98;
    const targetDesc = (lines[3] - lines[2]) * 0.98;
    const stack = this._fontStack();
    let size = bandH * 0.52;

    for (let i = 0; i < 36; i++) {
      ctx.font = `700 ${size}px ${stack}`;
      const wordW = ctx.measureText(word).width;
      const xH = ctx.measureText('x').actualBoundingBoxAscent || size * 0.5;
      const asc = ctx.measureText('d').actualBoundingBoxAscent || size * 0.75;
      const desc = ctx.measureText('g').actualBoundingBoxDescent || size * 0.24;
      const scale = Math.min(
        targetXH / xH,
        targetAsc / asc,
        targetDesc / desc,
        (w * 0.88) / Math.max(wordW, 1)
      );
      size *= scale;
      if (Math.abs(scale - 1) < 0.012) break;
    }
    return Math.max(18, size);
  }

  _drawGrid(ctx, w, lines) {
    const specs = [
      { dash: false, width: 1.8, color: HandwritingPad.LINE_BLUE },
      { dash: true, width: 1.8, color: HandwritingPad.LINE_DASH },
      { dash: false, width: 3.2, color: HandwritingPad.LINE_BLUE },
      { dash: false, width: 1.8, color: HandwritingPad.LINE_RED },
    ];
    lines.forEach((y, i) => {
      const s = specs[i];
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.setLineDash(s.dash ? [7, 5] : []);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  _redraw() {
    if (!this._w) return;
    const ctx = this.ctx;
    const w = this._w;
    const h = this._h;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#fffef8';
    ctx.fillRect(0, 0, w, h);

    const lines = this._lineYs();
    this._drawGrid(ctx, w, lines);

    if (this.guideWord && this.traceMode) {
      const { height: bandH } = this._gridBand();
      const baseline = lines[2] - bandH * (0.4 / 15.5);
      const size = this._fitFontSize(ctx, this.guideWord, w, lines);
      ctx.font = `700 ${size}px ${this._fontStack()}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = HandwritingPad.TRACE_COLOR;
      ctx.fillText(this.guideWord, w / 2, baseline);
    }

    ctx.strokeStyle = '#0984e3';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const allStrokes = this.currentStroke
      ? [...this.strokes, this.currentStroke]
      : this.strokes;
    allStrokes.forEach(stroke => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) ctx.lineTo(stroke[i].x, stroke[i].y);
      ctx.stroke();
    });
  }

  _pos(e) {
    const r = this.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  _start(e) {
    if (!this.practiceWord) return;
    e.preventDefault();
    this.canvas.setPointerCapture(e.pointerId);
    this.drawing = true;
    this.currentStroke = [this._pos(e)];
  }

  _move(e) {
    if (!this.drawing || !this.currentStroke) return;
    e.preventDefault();
    const p = this._pos(e);
    const last = this.currentStroke[this.currentStroke.length - 1];
    if (Math.hypot(p.x - last.x, p.y - last.y) < 1.5) return;
    this.currentStroke.push(p);
    this._redraw();
  }

  _end(e) {
    if (!this.drawing) return;
    e.preventDefault();
    try { this.canvas.releasePointerCapture(e.pointerId); } catch (_) {}
    if (this.currentStroke && this.currentStroke.length) {
      this.strokes.push(this.currentStroke);
    }
    this.currentStroke = null;
    this.drawing = false;
    this._redraw();
  }

  destroy() {
    const c = this.canvas;
    c.removeEventListener('pointerdown', this._onPointerDown);
    c.removeEventListener('pointermove', this._onPointerMove);
    c.removeEventListener('pointerup', this._onPointerUp);
    c.removeEventListener('pointercancel', this._onPointerUp);
    c.removeEventListener('pointerleave', this._onPointerUp);
  }
}

/**
 * 切换录音状态：第一次点击开始，第二次点击结束并返回评分
 * @returns {boolean} 当前是否正在录音
 */
async function togglePronunciationRecording(referenceText, onResult, onError) {
  try {
    if (!pronunciationRecorder.isRecording) {
      await pronunciationRecorder.start(referenceText);
      return true;
    }
    const result = await pronunciationRecorder.stop();
    if (result && (result.pronScore > 0 || result.recognized)) {
      onResult(result);
    } else {
      onError('没有听清，请再试一次！靠近麦克风，清晰朗读。');
    }
    return false;
  } catch (e) {
    pronunciationRecorder.cancel();
    onError('录音出错：' + (e.message || e));
    return false;
  }
}

/** @deprecated 保留兼容，内部转用 toggle */
async function assessPronunciation(referenceText, onResult, onError) {
  await togglePronunciationRecording(referenceText, onResult, onError);
}

function scoreToStars(score) {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 60) return 3;
  if (score >= 40) return 2;
  return 1;
}

function renderStars(container, count) {
  container.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.className = `fa-solid fa-star${i <= count ? ' on' : ''}`;
    container.appendChild(star);
  }
}

// ─── 游戏计时 ───
class GameTimer {
  constructor(el) {
    this.el = el;
    this.sec = 0;
    this._iv = null;
  }
  start() {
    this.sec = 0;
    this._update();
    this._iv = setInterval(() => { this.sec++; this._update(); }, 1000);
  }
  stop() {
    clearInterval(this._iv);
    return this.sec;
  }
  _update() {
    if (this.el) this.el.textContent = formatTime(this.sec);
  }
}

// ─── 字母/单词块 UI 辅助 ───
function createLetterPool(letters, container, onClick) {
  container.innerHTML = '';
  letters.forEach((ch, idx) => {
    const el = document.createElement('div');
    el.className = 'letter-block';
    el.textContent = ch;
    el.dataset.idx = idx;
    el.addEventListener('click', () => {
      if (!el.classList.contains('used')) onClick(ch, el);
    });
    container.appendChild(el);
  });
}

function createWordPool(words, container, onClick) {
  container.innerHTML = '';
  words.forEach((w, idx) => {
    const el = document.createElement('div');
    el.className = 'word-block';
    el.textContent = w;
    el.dataset.idx = idx;
    el.addEventListener('click', () => {
      if (!el.classList.contains('used')) onClick(w, el);
    });
    container.appendChild(el);
  });
}

// ─── 单元选择器 ───
function buildUnitSelector(selectEl, onChange) {
  selectEl.innerHTML = '';
  TEXTBOOK_DATA.units.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u.id;
    opt.textContent = `${u.name}（${u.title}）`;
    selectEl.appendChild(opt);
  });
  if (onChange) selectEl.addEventListener('change', () => onChange(selectEl.value));
  return selectEl.value || TEXTBOOK_DATA.units[0]?.id;
}

function buildWordCheckboxes(container, unitId, selected = [], wordFilter = null) {
  container.innerHTML = '';
  const words = wordFilter
    ? getAllWords(unitId).filter(wordFilter)
    : getAllWords(unitId);
  const wrap = document.createElement('div');
  wrap.className = 'word-tabs';
  words.forEach(w => {
    const label = document.createElement('label');
    label.className = 'word-tab';
    label.style.cursor = 'pointer';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = w.id;
    cb.checked = selected.length === 0 || selected.includes(w.id);
    cb.style.marginRight = '6px';
    label.appendChild(cb);
    label.appendChild(document.createTextNode(w.word));
    wrap.appendChild(label);
  });
  container.appendChild(wrap);
  return wrap;
}

function getSelectedWordIds(container) {
  return [...container.querySelectorAll('input[type=checkbox]:checked')].map(c => c.value);
}

// ─── 全局复习词表（册别首页勾选，各游戏共用） ───

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getReviewStorageKey() {
  const id =
    typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA.book
      ? TEXTBOOK_DATA.book.id
      : (location.pathname.match(/\/([A-Za-z0-9]+)\//) || [])[1] || 'courseware';
  return `courseware-review-words-${id}`;
}

function loadReviewSelection() {
  try {
    const raw = localStorage.getItem(getReviewStorageKey());
    if (!raw) return { unitId: '', wordIds: [] };
    const data = JSON.parse(raw);
    if (Array.isArray(data)) return { unitId: '', wordIds: data };
    return { unitId: data.unitId || '', wordIds: data.wordIds || [] };
  } catch {
    return { unitId: '', wordIds: [] };
  }
}

function saveReviewSelection(unitId, wordIds) {
  localStorage.setItem(
    getReviewStorageKey(),
    JSON.stringify({ unitId, wordIds, updatedAt: Date.now() })
  );
}

function getWordsByIds(ids) {
  if (!ids?.length || typeof TEXTBOOK_DATA === 'undefined') return [];
  const set = new Set(ids);
  const out = [];
  TEXTBOOK_DATA.units.forEach((u) => {
    u.words.forEach((w) => {
      if (set.has(w.id)) out.push(w);
    });
  });
  return out;
}

/** 读取首页保存的复习单词（已打乱） */
function getReviewWords(wordFilter = null) {
  const { wordIds } = loadReviewSelection();
  let words = getWordsByIds(wordIds);
  if (wordFilter) words = words.filter(wordFilter);
  return shuffle(words);
}

/** 游戏启动：校验词数，不足则提示回首页选词 */
function requireReviewWords({ wordFilter = null, minCount = 1, emptyMsg } = {}) {
  const words = getReviewWords(wordFilter);
  if (words.length < minCount) {
    alert(
      emptyMsg ||
        `请先在首页选择至少 ${minCount} 个复习单词！\n\n返回首页 →「选择复习单词」区域勾选后，再进入游戏。`
    );
    return null;
  }
  return words;
}

/** 游戏准备页：显示当前复习词摘要 */
function renderReviewWordSummary(host, { wordFilter = null, minCount = 1 } = {}) {
  if (!host) return;
  const { wordIds } = loadReviewSelection();
  let words = getWordsByIds(wordIds);
  if (wordFilter) words = words.filter(wordFilter);
  const ok = words.length >= minCount;
  const chips = words
    .slice(0, 24)
    .map((w) => `<span class="review-word-chip">${escHtml(w.word)}</span>`)
    .join('');
  const more = words.length > 24 ? `<span class="review-word-chip">+${words.length - 24}</span>` : '';
  host.innerHTML =
    `<div class="review-word-summary${ok ? '' : ' review-word-summary--empty'}">` +
    `<p><i class="fa-solid fa-list-check"></i> 当前复习：<strong>${words.length}</strong> 个单词</p>` +
    (words.length ? `<div class="review-word-chips">${chips}${more}</div>` : '') +
    `<p class="review-word-hint">${ok ? '在首页可更换复习单词' : `请先在首页选择至少 ${minCount} 个单词`}` +
    ` · <a href="index.html#review-words">去选词</a></p></div>`;
}

function updateReviewPickerUI(countEl, chipsEl) {
  const words = getWordsByIds(loadReviewSelection().wordIds);
  if (countEl) countEl.textContent = `已选 ${words.length} 个单词（全书）`;
  if (chipsEl) {
    chipsEl.innerHTML =
      words
        .slice(0, 40)
        .map((w) => `<span class="review-word-chip">${escHtml(w.word)}</span>`)
        .join('') +
      (words.length > 40 ? `<span class="review-word-chip">+${words.length - 40}</span>` : '');
  }
}

/** 册别首页：初始化全局复习词勾选 */
function initReviewWordPickerOnIndex() {
  const unitSelect = document.getElementById('unitSelect');
  const wordCheckArea = document.getElementById('wordCheckArea');
  const countEl = document.getElementById('reviewWordCount');
  const chipsEl = document.getElementById('reviewWordChips');
  if (!unitSelect || !wordCheckArea) return;

  let { unitId, wordIds } = loadReviewSelection();
  if (!wordIds.length) {
    const firstUnit = TEXTBOOK_DATA.units[0]?.id;
    wordIds = getAllWords(firstUnit).map((w) => w.id);
    saveReviewSelection(firstUnit, wordIds);
  }

  function mergeUnitSelection() {
    const currentIds = new Set(loadReviewSelection().wordIds);
    getAllWords(unitSelect.value).forEach((w) => currentIds.delete(w.id));
    getSelectedWordIds(wordCheckArea).forEach((id) => currentIds.add(id));
    saveReviewSelection(unitSelect.value, [...currentIds]);
    updateReviewPickerUI(countEl, chipsEl);
  }

  function refresh() {
    const sel = loadReviewSelection();
    buildWordCheckboxes(wordCheckArea, unitSelect.value, sel.wordIds);
    updateReviewPickerUI(countEl, chipsEl);
  }

  buildUnitSelector(unitSelect, () => {
    saveReviewSelection(unitSelect.value, loadReviewSelection().wordIds);
    refresh();
  });
  if (unitId) unitSelect.value = unitId;
  refresh();

  wordCheckArea.addEventListener('change', mergeUnitSelection);

  document.getElementById('btnSelectAll')?.addEventListener('click', () => {
    const currentIds = new Set(loadReviewSelection().wordIds);
    getAllWords(unitSelect.value).forEach((w) => currentIds.add(w.id));
    saveReviewSelection(unitSelect.value, [...currentIds]);
    refresh();
  });

  document.getElementById('btnClearUnit')?.addEventListener('click', () => {
    const unitSet = new Set(getAllWords(unitSelect.value).map((w) => w.id));
    const merged = loadReviewSelection().wordIds.filter((id) => !unitSet.has(id));
    saveReviewSelection(unitSelect.value, merged);
    refresh();
  });
}
/** 从勾选区获取已选单词（已打乱） */
function getSelectedWords(unitId, container) {
  const ids = getSelectedWordIds(container);
  return shuffle(getAllWords(unitId).filter((w) => ids.includes(w.id)));
}

/** 绑定单元下拉与单词勾选区 */
function initGameWordSelection(unitSelect, wordCheckArea, wordFilter = null) {
  const refresh = () => buildWordCheckboxes(wordCheckArea, unitSelect.value, [], wordFilter);
  buildUnitSelector(unitSelect, refresh);
  refresh();
}


/** 迷宫游戏用词：排除组合短语，且长度不超过 9（适配 8×8 / 9×9） */
function isMazeWord(w) {
  const len = w.word.replace(/[\s-]/g, '').length;
  return !/\s/.test(w.word) && len <= 9;
}

function getMazeWords(unitId) {
  return getAllWords(unitId).filter(isMazeWord);
}

// ─── 迷宫生成 ───
/**
 * 8×8 / 9×9，固定 4 词：左→右、右→左、上→下、下→上 各一，
 * 起点落在四象限内尽量均匀分布；支持交叉共用字母。
 */
function generateMazeGrid(words) {
  const DIR_SLOTS = [
    { id: 'lr', dr: 0, dc: 1, quadrant: 0 },
    { id: 'rl', dr: 0, dc: -1, quadrant: 1 },
    { id: 'tb', dr: 1, dc: 0, quadrant: 2 },
    { id: 'bt', dr: -1, dc: 0, quadrant: 3 },
  ];

  function lettersOf(word) {
    return word.word.replace(/[\s-]/g, '').toLowerCase().split('');
  }

  function quadrantsFor(size) {
    const midR = Math.floor(size / 2);
    const midC = Math.floor(size / 2);
    return [
      { rMin: 0, rMax: midR - 1, cMin: 0, cMax: midC - 1 },
      { rMin: 0, rMax: midR - 1, cMin: midC, cMax: size - 1 },
      { rMin: midR, rMax: size - 1, cMin: 0, cMax: midC - 1 },
      { rMin: midR, rMax: size - 1, cMin: midC, cMax: size - 1 },
    ];
  }

  function fits(size, len, r, c, dir) {
    for (let i = 0; i < len; i++) {
      const nr = r + dir.dr * i;
      const nc = c + dir.dc * i;
      if (nr < 0 || nr >= size || nc < 0 || nc >= size) return false;
    }
    return true;
  }

  function buildCells(grid, size, letters, r, c, dir) {
    if (!fits(size, letters.length, r, c, dir)) return null;
    const cells = [];
    for (let i = 0; i < letters.length; i++) {
      const nr = r + dir.dr * i;
      const nc = c + dir.dc * i;
      const existing = grid[nr][nc];
      if (existing !== '' && existing !== letters[i]) return null;
      cells.push({ r: nr, c: nc, letter: letters[i] });
    }
    return cells;
  }

  function candidates(size, len, dir, quad) {
    const cr = (quad.rMin + quad.rMax) / 2;
    const cc = (quad.cMin + quad.cMax) / 2;
    const list = [];
    for (let r = quad.rMin; r <= quad.rMax; r++) {
      for (let c = quad.cMin; c <= quad.cMax; c++) {
        if (fits(size, len, r, c, dir)) {
          list.push({ r, c, dist: Math.abs(r - cr) + Math.abs(c - cc) });
        }
      }
    }
    list.sort((a, b) => a.dist - b.dist);
    const near = list.slice(0, Math.max(6, Math.ceil(list.length * 0.45)));
    return shuffle(near.length ? near : list);
  }

  function applyCells(grid, usage, cells) {
    cells.forEach(({ r, c, letter }) => {
      grid[r][c] = letter;
      usage[r][c]++;
    });
  }

  function revertCells(grid, usage, cells) {
    cells.forEach(({ r, c }) => {
      usage[r][c]--;
      if (usage[r][c] === 0) grid[r][c] = '';
    });
  }

  function placeAll(grid, usage, size, pairs, idx, placements) {
    if (idx >= pairs.length) return placements;
    const { word, dir, quad } = pairs[idx];
    const letters = lettersOf(word);
    for (const { r, c } of candidates(size, letters.length, dir, quad)) {
      const cells = buildCells(grid, size, letters, r, c, dir);
      if (!cells) continue;
      applyCells(grid, usage, cells);
      const result = placeAll(grid, usage, size, pairs, idx + 1, [
        ...placements,
        { word, cells, dir: dir.id },
      ]);
      if (result) return result;
      revertCells(grid, usage, cells);
    }
    return null;
  }

  function fillNoise(grid, size) {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!grid[r][c]) {
          grid[r][c] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
      }
    }
  }

  function tryLayout(wordList, size) {
    const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ''));
    const usage = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
    const quads = quadrantsFor(size);
    const slots = shuffle([...DIR_SLOTS]);
    const ordered = [...wordList].sort((a, b) => lettersOf(b).length - lettersOf(a).length);
    const pairs = ordered.map((word, i) => ({
      word,
      dir: slots[i],
      quad: quads[slots[i].quadrant],
    }));
    shuffle(pairs);
    const placements = placeAll(grid, usage, size, pairs, 0, []);
    if (!placements || placements.length !== wordList.length) return null;
    fillNoise(grid, size);
    shuffle(placements);
    return { grid, placements, size };
  }

  const list = words.slice(0, 4);
  if (list.length < 4) return { grid: [[]], placements: [], size: 8 };

  const maxLen = Math.max(...list.map(w => lettersOf(w).length));
  const sizes = maxLen <= 8 ? shuffle([8, 9]) : [9];

  for (const size of sizes) {
    for (let retry = 0; retry < 120; retry++) {
      const result = tryLayout(shuffle([...list]), size);
      if (result) return result;
    }
  }
  return tryLayout(list, 9) || { grid: [[]], placements: [], size: 9 };
}

// ─── 反馈 toast ───
function showFeedback(el, msg, good = true) {
  el.textContent = msg;
  el.className = `feedback ${good ? 'good' : 'bad'}`;
  el.classList.remove('hidden');
}

// ─── 例句单词可点击拆分 ───
function wrapSentenceWords(sentence) {
  return sentence.replace(/([a-zA-Z][a-zA-Z'-]*)/g, (match) => {
    const clean = match.replace(/'/g, '');
    if (clean.length < 2) return match;
    return `<span class="word-clickable" data-word="${clean.toLowerCase()}" title="点击查词">${match}</span>`;
  });
}

function findWordInTextbook(word) {
  const w = word.toLowerCase();
  if (typeof TEXTBOOK_DATA === 'undefined') return null;
  for (const unit of TEXTBOOK_DATA.units) {
    for (const item of unit.words) {
      if (item.word.toLowerCase() === w) {
        return { word: item.word, chinese: item.chinese };
      }
    }
  }
  return null;
}

// ─── Deepseek 查词 ───
async function lookupWordDeepseek(word, contextSentence) {
  const cacheKey = `dict_${word}_${(contextSentence || '').slice(0, 40)}`;
  const cached = Storage.get(cacheKey);
  if (cached) return cached;

  const bookHit = findWordInTextbook(word);
  const bookHint = bookHit ? `（教材释义参考：${bookHit.chinese}）` : '';

  const prompt = `你是小学英语词典。学生点击了例句中的单词 "${word}"。
完整例句：${contextSentence || ''}
${bookHint}

请查词并严格输出 JSON（不要 markdown）：
{
  "word": "单词原形",
  "ipa": "/音标/",
  "pos": "词性（中文）",
  "meaning": "中文释义（简洁，适合四年级）",
  "inContext": "在该例句中的具体含义",
  "example": "一个简单英文例句",
  "exampleZh": "例句中文翻译"
}`;

  const res = await fetch(DEEPSEEK_CONFIG.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`
    },
    body: JSON.stringify({
      model: DEEPSEEK_CONFIG.model,
      messages: [
        { role: 'system', content: '你是小学英语词典，只输出合法 JSON。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3
    })
  });

  if (!res.ok) throw new Error('查词服务暂时不可用（' + res.status + '）');
  const data = await res.json();
  let raw = data.choices[0].message.content.trim();
  raw = raw.replace(/^```json\s*|\s*```$/g, '');
  const result = JSON.parse(raw);
  if (bookHit && !result.meaning) result.meaning = bookHit.chinese;
  Storage.set(cacheKey, result);
  return result;
}

// ─── 查词弹窗 ───
let lookupOverlay = null;

function ensureLookupModal() {
  if (lookupOverlay) return lookupOverlay;
  lookupOverlay = document.createElement('div');
  lookupOverlay.className = 'lookup-overlay hidden';
  lookupOverlay.innerHTML = `
    <div class="lookup-modal" role="dialog" aria-label="查词">
      <button class="lookup-close" aria-label="关闭"><i class="fa-solid fa-xmark"></i></button>
      <div id="lookupBody"></div>
    </div>`;
  document.body.appendChild(lookupOverlay);
  lookupOverlay.querySelector('.lookup-close').onclick = closeWordLookup;
  lookupOverlay.addEventListener('click', e => {
    if (e.target === lookupOverlay) closeWordLookup();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lookupOverlay && !lookupOverlay.classList.contains('hidden')) {
      closeWordLookup();
    }
  });
  return lookupOverlay;
}

function closeWordLookup() {
  document.querySelectorAll('.word-clickable.active').forEach(el => el.classList.remove('active'));
  if (lookupOverlay) lookupOverlay.classList.add('hidden');
}

function showLookupLoading(word, sentence) {
  const overlay = ensureLookupModal();
  const body = overlay.querySelector('#lookupBody');
  body.innerHTML = `
    <div class="lookup-loading">
      <i class="fa-solid fa-spinner fa-spin"></i>
      正在查询 <strong>${word}</strong>…
    </div>
    <p class="lookup-context">"${sentence}"</p>`;
  overlay.classList.remove('hidden');
}

function showLookupResult(data, speakWord) {
  const overlay = ensureLookupModal();
  const body = overlay.querySelector('#lookupBody');
  const w = data.word || speakWord;
  body.innerHTML = `
    <div class="lookup-head">
      <span class="lookup-word">${w}</span>
      <span class="lookup-ipa">${data.ipa || ''}</span>
      ${data.pos ? `<span class="lookup-pos">${data.pos}</span>` : ''}
    </div>
    <div class="lookup-section">
      <h4>释义</h4>
      <p>${data.meaning || '—'}</p>
    </div>
    ${data.inContext ? `<div class="lookup-section"><h4>句中含义</h4><p>${data.inContext}</p></div>` : ''}
    ${data.example ? `<div class="lookup-section"><h4>例句</h4><p>${data.example}</p><p style="color:#636e72;margin-top:4px;">${data.exampleZh || ''}</p></div>` : ''}
    <div class="lookup-actions">
      <button class="btn btn-primary btn-lg" id="lookupSpeakBtn"><i class="fa-solid fa-volume-high"></i> 朗读单词</button>
      ${data.example ? `<button class="btn btn-secondary" id="lookupSpeakExBtn"><i class="fa-solid fa-volume-high"></i> 朗读例句</button>` : ''}
    </div>`;
  document.getElementById('lookupSpeakBtn').onclick = () => speakText(w);
  if (data.example) {
    document.getElementById('lookupSpeakExBtn').onclick = () => speakText(data.example);
  }
}

async function openWordLookup(word, contextSentence, clickedEl) {
  document.querySelectorAll('.word-clickable.active').forEach(el => el.classList.remove('active'));
  if (clickedEl) clickedEl.classList.add('active');
  showLookupLoading(word, contextSentence);
  try {
    const data = await lookupWordDeepseek(word, contextSentence);
    showLookupResult(data, word);
  } catch (e) {
    const bookHit = findWordInTextbook(word);
    if (bookHit) {
      showLookupResult({
        word: bookHit.word,
        ipa: '',
        pos: '',
        meaning: bookHit.chinese,
        inContext: '（来自本册教材词表）',
        example: '',
        exampleZh: ''
      }, word);
    } else {
      const body = ensureLookupModal().querySelector('#lookupBody');
      body.innerHTML = `
        <div class="lookup-head"><span class="lookup-word">${word}</span></div>
        <p style="text-align:center;color:#d63031;padding:20px;">查词失败：${e.message}</p>
        <div class="lookup-actions">
          <button class="btn btn-primary" id="lookupSpeakBtn"><i class="fa-solid fa-volume-high"></i> 朗读单词</button>
        </div>`;
      document.getElementById('lookupSpeakBtn').onclick = () => speakText(word);
    }
  }
}

function bindSentenceWordClicks(container) {
  container.querySelectorAll('.word-clickable').forEach(span => {
    span.addEventListener('click', e => {
      e.stopPropagation();
      const card = span.closest('.sentence-card');
      const sentenceEn = card?.querySelector('.sentence-text')?.dataset.sentence
        || card?.querySelector('.sentence-text')?.textContent || '';
      openWordLookup(span.dataset.word, sentenceEn.trim(), span);
    });
  });
}

// ─── 页面初始化动画 ───
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');
});
