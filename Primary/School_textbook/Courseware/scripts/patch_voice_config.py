# -*- coding: utf-8 -*-
"""批量将 utils.js 语音改为英音男声 + 稍慢语速"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GRADES = ['3GA', '3GB', '4GA', '4GB']

OLD_AZURE = """const AZURE_CONFIG = {
  subscriptionKey: 'C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu',
  region: 'southeastasia',
  language: 'en-US',
  voice: 'en-US-JennyNeural'
};"""

NEW_AZURE = """const AZURE_CONFIG = {
  subscriptionKey: 'C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu',
  region: 'southeastasia',
  language: 'en-GB',
  voice: 'en-GB-RyanNeural',
  speechRate: '0.90'
};"""

HELPERS_OLD = """function createSpeechConfig() {
  const sdk = window.SpeechSDK;
  const cfg = sdk.SpeechConfig.fromSubscription(
    AZURE_CONFIG.subscriptionKey,
    AZURE_CONFIG.region
  );
  cfg.speechSynthesisVoiceName = AZURE_CONFIG.voice;
  return cfg;
}

// ─── TTS 朗读 ───"""

HELPERS_NEW = """function createSpeechConfig() {
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

// ─── TTS 朗读 ───"""

OLD_SPEAK = """    synthesizer.speakTextAsync(
      text,"""

NEW_SPEAK = """    synthesizer.speakSsmlAsync(
      buildSpeakSsml(text),"""

OLD_FALLBACK = """function fallbackSpeak(text, onEnd) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.85;
  if (onEnd) u.onend = onEnd;
  speechSynthesis.speak(u);
}"""

NEW_FALLBACK = """function fallbackSpeak(text, onEnd) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = Number(AZURE_CONFIG.speechRate) || 0.9;
  const voice = pickBritishMaleVoice();
  if (voice) u.voice = voice;
  if (onEnd) u.onend = onEnd;
  speechSynthesis.speak(u);
}"""


def patch_file(path: Path) -> str:
    text = path.read_text(encoding='utf-8')
    if 'en-GB-RyanNeural' in text and 'buildSpeakSsml' in text:
        return 'skip'
    if OLD_AZURE not in text and 'en-US-JennyNeural' not in text:
        return 'no-match'
    text = text.replace(OLD_AZURE, NEW_AZURE)
    if HELPERS_OLD in text:
        text = text.replace(HELPERS_OLD, HELPERS_NEW)
    text = text.replace(OLD_SPEAK, NEW_SPEAK)
    text = text.replace(OLD_FALLBACK, NEW_FALLBACK)
    path.write_text(text, encoding='utf-8')
    return 'ok'


def main():
    for g in GRADES:
        p = ROOT / g / 'assets' / 'js' / 'utils.js'
        status = patch_file(p)
        print(f'{g}: {status}')


if __name__ == '__main__':
    main()
