/**
 * What are reptiles? · Azure TTS + 音素盒子 + 抄写
 */
const AZURE_CONFIG = {
  subscriptionKey: '3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc',
  region: 'eastasia',
  voice: 'en-GB-RyanNeural',
  speechRate: '0.90'
};

let currentSynthesizer = null;
const COPY_WRITE_PATTERN = [
  ['trace', 'trace', 'trace'],
  ['write', 'write', 'write']
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
  w.phonemes.forEach(ph => {
    const isSilent = ph.symbol === '—' || ph.symbol === '/—/';
    const box = document.createElement('div');
    box.className = 'phoneme-box' + (isSilent ? ' silent' : '');
    box.textContent = isSilent ? '—' : ph.symbol;
    box.dataset.ipa = ph.symbol;
    box.dataset.letter = ph.letter;
    box.title = `音标 ${ph.symbol} · 点击显示字母 ${ph.letter}`;
    box.addEventListener('click', () => {
      const show = !box.classList.contains('show-letter');
      box.textContent = show ? ph.letter : (isSilent ? '—' : ph.symbol);
      box.classList.toggle('show-letter', show);
      if (!isSilent) speakText(ph.letter.length === 1 ? w.word : ph.letter);
    });
    container.appendChild(box);
  });
}

function createCopyLineCell(mode, word) {
  const cell = document.createElement('div');
  cell.className = 'copy-cell';
  const line = document.createElement('div');
  line.className = 'four-line' + (mode === 'trace' ? ' trace' : '');
  if (mode === 'trace') line.textContent = word;
  cell.appendChild(line);
  return cell;
}

function buildCopySheet(word, mount) {
  const sheet = document.createElement('div');
  sheet.className = 'copy-sheet';
  const head = document.createElement('div');
  head.className = 'copy-word-head';
  head.innerHTML = `<span class="copy-word-title">${word.word}</span><span class="copy-word-cn">${word.chinese}</span>
    <button type="button" class="btn btn-outline btn-sm copy-speak no-print">🔊</button>`;
  head.querySelector('.copy-speak').addEventListener('click', () => speakText(word.word));
  const phonemeRow = document.createElement('div');
  phonemeRow.className = 'copy-phoneme-row';
  const boxes = document.createElement('div');
  boxes.className = 'phoneme-boxes';
  renderPhonemeBoxes(boxes, word);
  phonemeRow.appendChild(boxes);
  const rowsWrap = document.createElement('div');
  COPY_WRITE_PATTERN.forEach(rowModes => {
    const row = document.createElement('div');
    row.className = 'copy-row';
    rowModes.forEach(mode => row.appendChild(createCopyLineCell(mode, word.word)));
    rowsWrap.appendChild(row);
  });
  sheet.append(head, phonemeRow, rowsWrap);
  mount.appendChild(sheet);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
