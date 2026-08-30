/**
 * What are reptiles? · Azure TTS + 音素盒子 + 抄写
 */
const AZURE_CONFIG = {
  subscriptionKey: '4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO',
  region: 'southeastasia',
  voice: 'en-GB-RyanNeural',
  speechRate: '0.90'
};

let currentSynthesizer = null;
const COPY_WRITE_PATTERN = [
  ['trace', 'trace', 'write'],
  ['trace', 'write', 'write'],
];

function loadSpeechSDK() {
  return new Promise((resolve, reject) => {
    if (window.SpeechSDK) { resolve(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/microsoft-cognitiveservices-speech-sdk@1.34.0/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle-min.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function createSpeechConfig() {
  const sdk = window.SpeechSDK;
  const cfg = sdk.SpeechConfig.fromSubscription(AZURE_CONFIG.subscriptionKey, AZURE_CONFIG.region);
  cfg.speechSynthesisVoiceName = AZURE_CONFIG.voice;
  return cfg;
}

function buildSpeakSsml(text) {
  const esc = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-GB"><voice name="${AZURE_CONFIG.voice}"><prosody rate="${AZURE_CONFIG.speechRate}">${esc}</prosody></voice></speak>`;
}

function fallbackSpeak(text, onEnd) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = 0.9;
  u.onend = () => { if (onEnd) onEnd(); };
  speechSynthesis.speak(u);
}

async function speakText(text, onEnd) {
  if (!text) return;
  if (window.LocalAudio && window.__LOCAL_AUDIO_MANIFEST) {
    try {
      const ok = await window.LocalAudio.speak(text, { rate: AZURE_CONFIG.speechRate });
      if (ok) { if (onEnd) onEnd(); return; }
    } catch (e) { /* fall through */ }
  }
  try {
    await loadSpeechSDK();
    if (currentSynthesizer) { currentSynthesizer.close(); currentSynthesizer = null; }
    const sdk = window.SpeechSDK;
    const synthesizer = new sdk.SpeechSynthesizer(createSpeechConfig(), sdk.AudioConfig.fromDefaultSpeakerOutput());
    currentSynthesizer = synthesizer;
    synthesizer.speakSsmlAsync(buildSpeakSsml(text), () => {
      synthesizer.close();
      currentSynthesizer = null;
      if (onEnd) onEnd();
    }, () => {
      synthesizer.close();
      fallbackSpeak(text, onEnd);
    });
  } catch (e) {
    fallbackSpeak(text, onEnd);
  }
}

function renderPhonemeBoxes(container, w) {
  if (!container || !w || !w.phonemes) return;
  container.innerHTML = '';
  function resolvePhoneme(ph, word) {
    if (typeof NgWordIpa !== 'undefined' && NgWordIpa.forPhoneme) {
      return NgWordIpa.forPhoneme(ph, word);
    }
    return { symbol: ph.symbol, silent: ph.symbol === '—' || ph.symbol === '/—/' };
  }
  w.phonemes.forEach(ph => {
    const shown = resolvePhoneme(ph, w);
    const isSilent = shown.silent;
    const symbol = shown.symbol;
    const box = document.createElement('div');
    box.className = 'phoneme-box' + (isSilent ? ' silent' : '');
    box.textContent = isSilent ? '—' : symbol;
    box.dataset.ipa = symbol;
    box.dataset.letter = ph.letter;
    box.title = `音标 ${symbol} · 点击显示字母 ${ph.letter}`;
    box.addEventListener('click', () => {
      const show = !box.classList.contains('show-letter');
      box.textContent = show ? ph.letter : (isSilent ? '—' : symbol);
      box.classList.toggle('show-letter', show);
    });
    container.appendChild(box);
  });
}

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
  renderPhonemeBoxes(phonemeBoxes, word);
  if (!interactivePhoneme) {
    phonemeBoxes.querySelectorAll('.phoneme-box').forEach(box => {
      box.style.pointerEvents = 'none';
    });
  }
  phonemeRow.appendChild(phonemeBoxes);

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

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
