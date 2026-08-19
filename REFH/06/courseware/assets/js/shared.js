/* Shared utilities: Azure TTS, DeepSeek API, config */
(function (global) {
  'use strict';

  const CONFIG_KEY = 'braille_tech_courseware_config';
  const IMAGE_BASE = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/REFH/06/courseware/assets/images/';
  const COURSEWARE_WEB_BASE = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/REFH/06/courseware/';
  const ARTICLE_PAGE_URL = COURSEWARE_WEB_BASE + 'part2-reading.html';

  const DEFAULT_CONFIG = {
    azureKey: '9wqQjcwatmfHXVoMv9nO6I2teZBS6LSZL6ROW85tO6fL4ahKjsIaJQQJ99CHACqBBLyXJ3w3AAAYACOGvelV',
    azureRegion: 'southeastasia',
    deepseekKey: 'sk-daa16008e81843deba6fefe9dce51465'
  };

  let _audio = null;
  let _blobUrl = null;

  const LEGACY_AZURE_KEYS = new Set([
    '8d055d682fcd4af98a51828e04542cd4',
    '3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc',
    'C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu',
    'C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdExx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu',
    '43gMKIlSRVGT9PnAFgWkdXyogwXfudT33O2Zk6QtfTKuY1nm01BdJQQJ99BLACHYHv6XJ3w3AAAYACOGts5S',
    'DKRXk8ueSfo5NdIOMqFRTCAfpeGDezJ3Snf5K8gGgtyqxiWdugLzJQQJ99BLACHYHv6XJ3w3AAAYACOGUYP9',
  ]);

  function getConfig() {
    let stored = {};
    try {
      stored = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}');
    } catch (e) {}
    const storedKey = String(stored.azureKey || '').trim();
    const azureKey = (storedKey && !LEGACY_AZURE_KEYS.has(storedKey))
      ? storedKey
      : DEFAULT_CONFIG.azureKey;
    const storedRegion = String(stored.azureRegion || '').trim();
    const azureRegion = (storedRegion && storedRegion !== 'eastasia' && storedRegion !== 'eastus2')
      ? storedRegion
      : DEFAULT_CONFIG.azureRegion;
    return {
      azureKey,
      azureRegion,
      deepseekKey: stored.deepseekKey || DEFAULT_CONFIG.deepseekKey
    };
  }

  function saveConfig(cfg) {
    const merged = {
      azureKey: cfg.azureKey || DEFAULT_CONFIG.azureKey,
      azureRegion: cfg.azureRegion || DEFAULT_CONFIG.azureRegion,
      deepseekKey: cfg.deepseekKey || DEFAULT_CONFIG.deepseekKey
    };
    localStorage.setItem(CONFIG_KEY, JSON.stringify(merged));
    global.__AZURE_SPEECH_KEY__ = merged.azureKey;
    global.__AZURE_SPEECH_REGION__ = merged.azureRegion;
    global.__DEEPSEEK_KEY__ = merged.deepseekKey;
  }

  function initConfig() {
    const cfg = getConfig();
    global.__AZURE_SPEECH_KEY__ = cfg.azureKey;
    global.__AZURE_SPEECH_REGION__ = cfg.azureRegion;
    global.__DEEPSEEK_KEY__ = cfg.deepseekKey;
  }

  function xmlEscape(t) {
    return String(t || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function stopAudio() {
    try {
      if (global.speechSynthesis) global.speechSynthesis.cancel();
    } catch (e) {}
    try {
      if (_audio) { _audio.pause(); _audio = null; }
      if (_blobUrl && (!_fullPlayer || _blobUrl !== _fullPlayer.url)) {
        URL.revokeObjectURL(_blobUrl);
      }
      if (!_fullPlayer) _blobUrl = null;
    } catch (e) {}
  }

  let _fullSpeakCancel = null;
  let _fullPlayer = null;

  function formatAudioTime(sec) {
    if (!isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + String(s).padStart(2, '0');
  }

  function destroyFullPlayer() {
    if (_fullSpeakCancel) _fullSpeakCancel.active = false;
    if (_fullPlayer) {
      try {
        if (_fullPlayer.audio) {
          _fullPlayer.audio.pause();
          _fullPlayer.audio.onended = null;
          _fullPlayer.audio.ontimeupdate = null;
          _fullPlayer.audio.src = '';
        }
        if (_fullPlayer.url) URL.revokeObjectURL(_fullPlayer.url);
      } catch (e) {}
      _fullPlayer = null;
    }
    _fullSpeakCancel = null;
    _audio = null;
    _blobUrl = null;
  }

  function stopFullSpeak() {
    destroyFullPlayer();
  }

  function isFullSpeakReady() {
    return !!(_fullPlayer && _fullPlayer.blob);
  }

  function isFullSpeaking() {
    const a = _fullPlayer?.audio;
    return !!(a && !a.paused && !a.ended);
  }

  async function mergeMp3Blobs(blobs) {
    const bufs = await Promise.all(blobs.map(b => b.arrayBuffer()));
    const len = bufs.reduce((n, b) => n + b.byteLength, 0);
    const out = new Uint8Array(len);
    let off = 0;
    for (const b of bufs) {
      out.set(new Uint8Array(b), off);
      off += b.byteLength;
    }
    return new Blob([out], { type: 'audio/mpeg' });
  }

  async function prepareFullSpeakAudio(text, rate, onProgress) {
    destroyFullPlayer();
    const chunks = splitForTts(text);
    if (!chunks.length) throw new Error('empty');
    const cancel = { active: true };
    _fullSpeakCancel = cancel;
    const speed = rate || 'slow';
    const blobs = [];
    for (let i = 0; i < chunks.length; i++) {
      if (!cancel.active) throw new Error('cancelled');
      if (onProgress) onProgress(i + 1, chunks.length);
      blobs.push(await fetchTtsBlob(chunks[i], speed));
    }
    if (!cancel.active) throw new Error('cancelled');
    const merged = await mergeMp3Blobs(blobs);
    const url = URL.createObjectURL(merged);
    const audio = new Audio(url);
    audio.preload = 'auto';
    _fullPlayer = { audio, url, blob: merged };
    _audio = audio;
    _blobUrl = url;
    _fullSpeakCancel = null;
    return _fullPlayer;
  }

  function playFullSpeak() {
    if (!_fullPlayer?.audio) return Promise.resolve(false);
    return _fullPlayer.audio.play().then(() => true).catch(() => false);
  }

  function pauseFullSpeak() {
    _fullPlayer?.audio?.pause();
  }

  function toggleFullSpeakPlay() {
    if (!_fullPlayer?.audio) return Promise.resolve(false);
    if (_fullPlayer.audio.paused) return playFullSpeak();
    pauseFullSpeak();
    return Promise.resolve(false);
  }

  function skipFullSpeak(delta) {
    const a = _fullPlayer?.audio;
    if (!a || !isFinite(a.duration)) return;
    a.currentTime = Math.max(0, Math.min(a.duration, a.currentTime + delta));
  }

  function seekFullSpeak(ratio) {
    const a = _fullPlayer?.audio;
    if (!a || !isFinite(a.duration)) return;
    a.currentTime = Math.max(0, Math.min(a.duration, ratio * a.duration));
  }

  function getFullSpeakState() {
    const a = _fullPlayer?.audio;
    if (!a) return { ready: false, playing: false, current: 0, duration: 0, progress: 0 };
    const duration = a.duration || 0;
    const current = a.currentTime || 0;
    return {
      ready: true,
      playing: !a.paused && !a.ended,
      current,
      duration,
      progress: duration ? current / duration : 0
    };
  }

  function downloadFullSpeakMp3(filename) {
    if (!_fullPlayer?.blob) return false;
    const a = document.createElement('a');
    a.href = _fullPlayer.url;
    a.download = filename || 'article-full-read.mp3';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return true;
  }

  function bindFullSpeakPlayer(root, opts) {
    if (!root || !_fullPlayer?.audio) return;
    const audio = _fullPlayer.audio;
    const playBtn = root.querySelector('[data-action="play"]');
    const backBtn = root.querySelector('[data-action="back"]');
    const fwdBtn = root.querySelector('[data-action="forward"]');
    const seek = root.querySelector('[data-action="seek"]');
    const timeEl = root.querySelector('[data-action="time"]');
    const dl = root.querySelector('[data-action="download"]');
    const closeBtn = root.querySelector('[data-action="close"]');
    const statusEl = root.querySelector('[data-action="status"]');
    let seeking = false;

    function refresh() {
      const st = getFullSpeakState();
      if (playBtn) playBtn.textContent = st.playing ? '⏸ 暂停' : '▶️ 播放';
      if (timeEl) timeEl.textContent = formatAudioTime(st.current) + ' / ' + formatAudioTime(st.duration);
      if (seek && !seeking && st.duration) seek.value = String(Math.round(st.progress * 1000));
      if (dl && _fullPlayer.blob) {
        dl.href = _fullPlayer.url;
        dl.download = (opts && opts.filename) || 'article-full-read.mp3';
      }
    }

    if (root.dataset.fullSpeakBound !== '1') {
      root.dataset.fullSpeakBound = '1';
      playBtn?.addEventListener('click', () => {
        toggleFullSpeakPlay().then(refresh);
      });
      backBtn?.addEventListener('click', () => { skipFullSpeak(-10); refresh(); });
      fwdBtn?.addEventListener('click', () => { skipFullSpeak(10); refresh(); });
      seek?.addEventListener('input', () => {
        seeking = true;
        seekFullSpeak(parseInt(seek.value, 10) / 1000);
        refresh();
      });
      seek?.addEventListener('change', () => { seeking = false; });
      closeBtn?.addEventListener('click', () => {
        stopFullSpeak();
        root.hidden = true;
        if (opts && opts.onClose) opts.onClose();
      });
      audio.addEventListener('timeupdate', refresh);
      audio.addEventListener('loadedmetadata', refresh);
      audio.addEventListener('play', refresh);
      audio.addEventListener('pause', refresh);
      audio.addEventListener('ended', () => {
        refresh();
        if (statusEl) statusEl.textContent = '朗读完成 · 可拖动进度条回放';
        showToast('全文朗读完成');
      });
    }
    refresh();
  }

  function splitForTts(text, maxLen) {
    const limit = maxLen || 2800;
    const raw = String(text || '').trim();
    if (!raw) return [];
    const sentences = raw.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(s => s.trim()).filter(Boolean) || [raw];
    const chunks = [];
    let buf = '';
    for (const s of sentences) {
      const next = buf ? buf + ' ' + s : s;
      if (next.length > limit && buf) {
        chunks.push(buf.trim());
        buf = s;
      } else {
        buf = next;
      }
    }
    if (buf.trim()) chunks.push(buf.trim());
    return chunks;
  }

  async function fetchTtsBlob(text, rate) {
    const raw = String(text || '').trim();
    if (!raw) return null;
    const cfg = getConfig();
    if (!cfg.azureKey) throw new Error('TTS failed: missing Azure key');
    const speed = rate === 'slow' ? '-25%' : rate === 'fast' ? '+15%' : '+0%';
    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-GB"><voice name="en-GB-RyanNeural"><prosody rate="${speed}">${xmlEscape(raw)}</prosody></voice></speak>`;
    const res = await fetch(`https://${cfg.azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ssml+xml; charset=utf-8',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        'Ocp-Apim-Subscription-Key': cfg.azureKey
      },
      body: ssml
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error('TTS failed HTTP ' + res.status + (detail ? ': ' + detail.slice(0, 160) : ''));
    }
    const blob = await res.blob();
    if (!blob || blob.size < 32) throw new Error('TTS failed: empty audio');
    return blob;
  }

  function playAudioBlob(blob) {
    return new Promise((resolve, reject) => {
      stopAudio();
      _blobUrl = URL.createObjectURL(blob);
      _audio = new Audio(_blobUrl);
      _audio.onended = () => resolve(true);
      _audio.onerror = () => reject(new Error('play failed'));
      _audio.play().catch(reject);
    });
  }

  function cancelBrowserSpeech() {
    try {
      if (global.speechSynthesis) global.speechSynthesis.cancel();
    } catch (e) {}
  }

  function browserHasVoices() {
    try {
      return !!(global.speechSynthesis && (global.speechSynthesis.getVoices() || []).length);
    } catch (e) {
      return false;
    }
  }

  function speakWithBrowser(text, rate) {
    return new Promise((resolve, reject) => {
      if (!global.speechSynthesis || typeof global.SpeechSynthesisUtterance !== 'function') {
        reject(new Error('browser TTS unavailable'));
        return;
      }
      const raw = String(text || '').trim();
      if (!raw) {
        resolve(false);
        return;
      }
      cancelBrowserSpeech();
      const u = new SpeechSynthesisUtterance(raw);
      u.lang = 'en-GB';
      u.rate = rate === 'slow' ? 0.75 : rate === 'fast' ? 1.1 : 0.9;
      const pickVoice = () => {
        const voices = global.speechSynthesis.getVoices() || [];
        return voices.find(v => /en-GB/i.test(v.lang))
          || voices.find(v => /^en(-|_)/i.test(v.lang) || /^en$/i.test(v.lang));
      };
      let settled = false;
      const finish = (ok, err) => {
        if (settled) return;
        settled = true;
        if (ok) resolve(true);
        else reject(err || new Error('browser TTS failed'));
      };
      const applyAndSpeak = () => {
        if (!browserHasVoices()) {
          finish(false, new Error('browser TTS has no voices'));
          return;
        }
        const en = pickVoice();
        if (en) u.voice = en;
        u.onend = () => finish(true);
        u.onerror = (ev) => {
          const code = ev && ev.error ? String(ev.error) : '';
          if (code === 'interrupted' || code === 'canceled') {
            finish(false, new Error('browser TTS ' + code));
            return;
          }
          finish(false, new Error('browser TTS failed: ' + (code || 'unknown')));
        };
        try {
          global.speechSynthesis.speak(u);
        } catch (err) {
          finish(false, err);
        }
      };
      const existing = global.speechSynthesis.getVoices();
      if (existing && existing.length) {
        applyAndSpeak();
      } else {
        let done = false;
        const timer = setTimeout(() => {
          if (done) return;
          done = true;
          applyAndSpeak();
        }, 400);
        global.speechSynthesis.addEventListener('voiceschanged', () => {
          if (done) return;
          done = true;
          clearTimeout(timer);
          applyAndSpeak();
        }, { once: true });
      }
    });
  }

  function playUrlAudio(url) {
    return new Promise((resolve, reject) => {
      stopAudio();
      const audio = new Audio();
      // Google Translate TTS often 404s when Referer is a third-party origin
      try { audio.referrerPolicy = 'no-referrer'; } catch (e) {}
      _audio = audio;
      audio.onended = () => resolve(true);
      audio.onerror = () => reject(new Error('online TTS play failed'));
      audio.src = url;
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(reject);
    });
  }

  async function speakWithOnlineTts(text, rate) {
    const raw = String(text || '').trim();
    if (!raw) return false;
    const isShortWord = /^[A-Za-z][A-Za-z'-]{0,40}$/.test(raw);
    if (isShortWord) {
      await playUrlAudio('https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(raw) + '&type=2');
      return true;
    }
    // Phrase/sentence: Youdao only accepts single tokens in-browser, so speak word-by-word.
    const words = raw.match(/[A-Za-z']+/g) || [];
    if (!words.length) throw new Error('online TTS: no speakable words');
    const gap = rate === 'slow' ? 140 : rate === 'fast' ? 40 : 80;
    for (const w of words) {
      await playUrlAudio('https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(w) + '&type=2');
      await new Promise(r => setTimeout(r, gap));
    }
    return true;
  }

  async function speakWithFallback(text, rate) {
    try {
      await speakWithBrowser(text, rate);
      return true;
    } catch (e) {
      console.warn('Browser TTS unavailable, trying online TTS', e);
      await speakWithOnlineTts(text, rate);
      return true;
    }
  }

  async function speakText(text, rate) {
    stopFullSpeak();
    cancelBrowserSpeech();
    try {
      const blob = await fetchTtsBlob(text, rate);
      if (!blob) return false;
      await playAudioBlob(blob);
      return true;
    } catch (e) {
      console.warn('Azure TTS failed, falling back', e);
      try {
        await speakWithFallback(text, rate);
        return true;
      } catch (e2) {
        console.warn('All TTS fallbacks failed', e2);
        showToast('语音播放失败，请检查 Azure 配置');
        return false;
      }
    }
  }

  async function speakFullText(text, rate) {
    cancelBrowserSpeech();
    try {
      await prepareFullSpeakAudio(text, rate);
      return playFullSpeak();
    } catch (e) {
      if (e.message === 'cancelled' || e.message === 'empty') return false;
      console.warn('Azure full TTS failed, falling back', e);
      try {
        await speakWithFallback(text, rate);
        showToast('Azure 不可用，已用备用语音朗读');
        return true;
      } catch (e2) {
        showToast('全文朗读失败，请检查 Azure 配置');
        return false;
      }
    }
  }

  async function callDeepSeek(messages, streamCallback) {
    const key = getConfig().deepseekKey;
    const body = {
      model: 'deepseek-v4-flash',
      messages,
      temperature: 0.7,
      stream: !!streamCallback
    };
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      throw new Error('DeepSeek API error' + (res.status ? ' (' + res.status + ')' : '') + (errBody ? ': ' + errBody.slice(0, 120) : ''));
    }

    if (streamCallback) {
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let full = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value);
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ') || line.includes('[DONE]')) continue;
          try {
            const j = JSON.parse(line.slice(6));
            const delta = j.choices?.[0]?.delta?.content || '';
            if (delta) { full += delta; streamCallback(full); }
          } catch (e) {}
        }
      }
      return full;
    }
    const j = await res.json();
    return j.choices?.[0]?.message?.content || '';
  }

  async function lookupWord(word, context) {
    const prompt = `You are an English teacher for Chinese middle/high school students. Explain the word "${word}" in context: "${context || ''}".
Return JSON only with keys: word, phonetic, pos, definition_en, definition_cn, example_en, example_cn, synonyms (array), word_forms (array).
Keep definitions concise. Example sentences at 中考/高一 level.`;
    const text = await callDeepSeek([
      { role: 'system', content: 'Return valid JSON only, no markdown.' },
      { role: 'user', content: prompt }
    ]);
    try {
      const m = text.match(/\{[\s\S]*\}/);
      return m ? JSON.parse(m[0]) : { word, definition_en: text, definition_cn: '' };
    } catch (e) {
      return { word, definition_en: text, definition_cn: '' };
    }
  }

  async function analyzeSelection(text, type) {
    const typeLabel = type === 'phrase' ? '词组/短语' : type === 'chunk' ? '义群/语块' : '句子';
    const prompt = `分析以下英文${typeLabel}，面向中国初高中学生：
"${text}"
请给出：1) 中文含义 2) 语法/结构说明 3) 类似表达或考点提示。用简洁中文回答，分点列出。`;
    return callDeepSeek([{ role: 'user', content: prompt }]);
  }

  async function analyzeSentence(sentence, context) {
    const prompt = `你是面向中国初高中学生的英语阅读老师。请深入分析以下英文句子：
"${sentence}"
${context ? `\n所在段落上下文：${context}` : ''}

请用中文回答，使用如下 Markdown 小节标题（保持标题格式）：

## 翻译
给出准确、自然的中文译文。

## 句子结构
分析句子整体结构（主谓宾、从句、修饰成分、句型类型等）。

## 词组与表达
列出句中重要词组、固定搭配或短语（如有），逐一解释含义与用法；若无突出词组可写「本句无明显固定词组」。

## 语法与考点
说明值得注意的语法现象、时态语态、连接手段等考试相关要点。

## 学习提示
给出 1–2 条帮助记忆或理解的语言学习建议。

语言简洁清晰，适合课堂分段阅读讲解。`;
    return callDeepSeek([{ role: 'user', content: prompt }]);
  }

  function formatAiMarkdown(text) {
    if (!text) return '';
    const lines = String(text).split('\n');
    let html = '';
    let inPara = false;
    const closePara = () => { if (inPara) { html += '</p>'; inPara = false; } };
    for (const raw of lines) {
      const line = raw.trimEnd();
      if (!line.trim()) { closePara(); continue; }
      if (line.startsWith('## ')) {
        closePara();
        html += `<h4 class="ai-section-title">${escapeHtml(line.slice(3).trim())}</h4>`;
      } else if (line.startsWith('### ')) {
        closePara();
        html += `<h5 class="ai-subtitle">${escapeHtml(line.slice(4).trim())}</h5>`;
      } else if (/^[-*•]\s/.test(line)) {
        if (!inPara) { html += '<p>'; inPara = true; }
        else html += '<br>';
        html += escapeHtml(line.replace(/^[-*•]\s+/, '• '));
      } else if (/^\d+[.)]\s/.test(line)) {
        closePara();
        html += `<p class="ai-list-item">${escapeHtml(line)}</p>`;
      } else {
        if (!inPara) { html += '<p>'; inPara = true; }
        else html += '<br>';
        html += escapeHtml(line);
      }
    }
    closePara();
    return html || escapeHtml(text);
  }

  async function translateSelection(text) {
    const prompt = `你是英语翻译老师。将以下英文翻译成自然、准确的中文（适合中国初高中学生阅读）。
若是词组/短语，按词组翻译；若是句子，按整句翻译。
只返回中文译文，不要附加解释。
英文: "${text}"`;
    return callDeepSeek([{ role: 'user', content: prompt }]);
  }

  async function evaluateReading(original, audioTranscript, pronunciation) {
    return evaluateReadingCombined(original, audioTranscript, pronunciation);
  }

  function buildAzureSummary(pronunciation) {
    if (!pronunciation || !pronunciation.result) return null;
    const r = pronunciation.result;
    const accuracy = Math.round(r.accuracyScore || 0);
    const fluency = Math.round(r.fluencyScore || 0);
    const completeness = Math.round(r.completenessScore || 0);
    const prosody = Math.round(r.prosodyScore || 0);
    const overall = Math.round(accuracy * 0.4 + fluency * 0.2 + completeness * 0.2 + prosody * 0.2);
    const words = [];
    try {
      const json = pronunciation.json;
      const list = json?.NBest?.[0]?.Words || [];
      list.forEach(w => {
        if (w.PronunciationAssessment?.ErrorType && w.PronunciationAssessment.ErrorType !== 'None') {
          words.push({ word: w.Word, error: w.PronunciationAssessment.ErrorType });
        }
      });
    } catch (e) {}
    return { accuracy, fluency, completeness, prosody, overall, words };
  }

  async function evaluateReadingCombined(original, audioTranscript, pronunciation) {
    const azure = buildAzureSummary(pronunciation);
    const azureLine = azure
      ? `Azure发音评测：准确度${azure.accuracy}，流利度${azure.fluency}，完整度${azure.completeness}，韵律${azure.prosody}，综合${azure.overall}。问题词：${azure.words.map(w => w.word + '(' + w.error + ')').join('、') || '无'}`
      : '（未获取 Azure 发音分数，仅根据识别文本分析）';
    const prompt = `你是英语口语教师。请结合 Azure 发音评测与识别文本，评价学生朗读。
原文: "${original}"
学生朗读识别文本: "${audioTranscript || '(未识别到内容)'}"
${azureLine}
请只返回 JSON：
{"score":0-100,"strengths":"优点(中文)","issues":"问题：发音/流利度/漏读(中文)","tips":"改进建议(中文)","mispronounced_words":["词1"]}`;
    const text = await callDeepSeek([
      { role: 'system', content: 'Return valid JSON only, no markdown.' },
      { role: 'user', content: prompt }
    ]);
    let ai = { score: 0, strengths: '', issues: text, tips: '', mispronounced_words: [] };
    try {
      const m = text.match(/\{[\s\S]*\}/);
      if (m) ai = { ...ai, ...JSON.parse(m[0]) };
    } catch (e) {}
    if (azure && !ai.score) ai.score = azure.overall;
    return { azure, ai, transcript: audioTranscript || '' };
  }

  function renderReadingEvalHtml(data, readText) {
    if (!readText) {
      return '<p style="color:var(--accent2)">请先完成朗读录音，或手动输入识别文字</p>';
    }
    if (!data) {
      return '<p style="color:var(--accent2)">朗读评价失败，请检查 API 配置</p>';
    }
    const azure = data.azure;
    const ai = data.ai || {};
    let azureHtml = '';
    if (azure) {
      azureHtml = `
        <div class="score-grid">
          <div class="score-item"><span class="score-num">${azure.accuracy}</span><span class="score-lbl">准确度</span></div>
          <div class="score-item"><span class="score-num">${azure.fluency}</span><span class="score-lbl">流利度</span></div>
          <div class="score-item"><span class="score-num">${azure.completeness}</span><span class="score-lbl">完整度</span></div>
          <div class="score-item"><span class="score-num">${azure.prosody}</span><span class="score-lbl">韵律</span></div>
          <div class="score-item highlight"><span class="score-num">${azure.overall}</span><span class="score-lbl">Azure综合</span></div>
        </div>
        ${azure.words.length ? `<p class="eval-meta">⚠️ 发音问题词：${azure.words.map(w => escapeHtml(w.word) + ' (' + escapeHtml(w.error) + ')').join('、 ')}</p>` : ''}`;
    } else {
      azureHtml = '<p class="eval-meta">未获取 Azure 发音分数（请用朗读录音按钮录音）</p>';
    }
    return `
      <h4 style="margin-bottom:8px">🎤 朗读评价 <span class="score-badge" style="font-size:1.2rem">${ai.score ?? '--'} 分</span></h4>
      <p class="eval-meta">识别文本：${escapeHtml(readText)}</p>
      ${azureHtml}
      <div class="ai-result">
        ${ai.strengths ? `<p><b>✅ 优点：</b>${escapeHtml(ai.strengths)}</p>` : ''}
        <p><b>❗ 问题：</b>${escapeHtml(ai.issues || '暂无')}</p>
        <p><b>💡 建议：</b>${escapeHtml(ai.tips || '暂无')}</p>
      </div>`;
  }

  function renderTranslationEvalHtml(data, transText) {
    if (!transText) {
      return '<p style="color:var(--accent2)">请先完成翻译录音，或手动输入中文翻译</p>';
    }
    if (!data) {
      return '<p style="color:var(--accent2)">翻译评分失败，请检查 API 配置</p>';
    }
    return `
      <h4 style="margin-bottom:8px">🌐 翻译评分</h4>
      <p class="eval-meta">识别文本：${escapeHtml(transText)}</p>
      <div class="score-badge">${data.score ?? '--'} 分</div>
      <div class="ai-result" style="margin-top:12px">
        <p><b>❗ 问题：</b>${escapeHtml(data.issues || '暂无')}</p>
        <p><b>✅ 标准翻译：</b>${escapeHtml(data.standard || '暂无')}</p>
      </div>`;
  }

  async function runSpeakingEvaluation({ original, readText, transText, pronunciation }) {
    const out = { reading: null, translation: null };
    if (readText) {
      out.reading = await evaluateReadingCombined(original, readText, pronunciation);
    }
    if (transText) {
      out.translation = await evaluateTranslation(original, transText);
    }
    return out;
  }

  async function evaluateTranslation(original, studentTranslation) {
    const prompt = `你是英语翻译评分老师。
原句: "${original}"
学生翻译: "${studentTranslation || '(未提供)'}"
请返回JSON: {"score":0-100,"issues":"问题指出(中文)","standard":"标准翻译(中文)"}`;
    const text = await callDeepSeek([
      { role: 'system', content: 'Return valid JSON only.' },
      { role: 'user', content: prompt }
    ]);
    try {
      const m = text.match(/\{[\s\S]*\}/);
      return m ? JSON.parse(m[0]) : { score: 0, issues: text, standard: '' };
    } catch (e) {
      return { score: 0, issues: text, standard: '' };
    }
  }

  function showToast(msg) {
    let t = document.getElementById('global-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'global-toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function imageUrl(filename) {
    const name = String(filename || '').trim();
    if (!name) return '';
    if (/^https?:\/\//i.test(name)) return name;
    return IMAGE_BASE + name.replace(/^\/+/, '');
  }

  function renderNav(active) {
    const pages = [
      { href: 'index.html', label: '首页' },
      { href: 'part1-vocabulary.html', label: '词汇' },
      { href: 'part2-reading.html', label: '阅读' },
      { href: 'part3-speaking.html', label: '朗读' },
      { href: 'part4-quiz.html', label: '测验' }
    ];
    return `<nav class="top-nav">
      <a class="brand" href="index.html">⠃ Braille & Tech · Accessibility</a>
      <div class="links">${pages.map(p =>
        `<a href="${p.href}" class="${p.href === active ? 'active' : ''}">${p.label}</a>`
      ).join('')}</div>
      <div class="nav-actions">
        <a href="../../../index.html" class="site-home">站点首页</a>
        <button class="btn-icon" onclick="Courseware.openConfig()" title="API设置">⚙️</button>
      </div>
    </nav>`;
  }

  function injectConfigPanel() {
    if (document.getElementById('config-panel')) return;
    const cfg = getConfig();
    const html = `<div class="config-panel" id="config-panel">
      <div class="config-drawer" id="config-drawer">
        <h4 style="margin-bottom:8px;color:var(--primary)">API 配置</h4>
        <label>Azure Speech Key</label>
        <input type="password" id="cfg-azure-key" value="${escapeHtml(cfg.azureKey || '')}" placeholder="Azure 密钥">
        <label>Azure Region</label>
        <input type="text" id="cfg-azure-region" value="${escapeHtml(cfg.azureRegion || DEFAULT_CONFIG.azureRegion)}">
        <label>DeepSeek API Key</label>
        <input type="password" id="cfg-deepseek-key" value="${escapeHtml(cfg.deepseekKey || '')}" placeholder="DeepSeek 密钥">
        <button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="Courseware.saveConfigFromUI()">保存配置</button>
      </div>
      <button class="config-toggle" onclick="Courseware.toggleConfig()">⚙️</button>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function toggleConfig() {
    document.getElementById('config-drawer')?.classList.toggle('open');
  }

  function openConfig() {
    document.getElementById('config-drawer')?.classList.add('open');
  }

  function saveConfigFromUI() {
    saveConfig({
      azureKey: document.getElementById('cfg-azure-key')?.value.trim() || DEFAULT_CONFIG.azureKey,
      azureRegion: document.getElementById('cfg-azure-region')?.value.trim() || DEFAULT_CONFIG.azureRegion,
      deepseekKey: document.getElementById('cfg-deepseek-key')?.value.trim() || DEFAULT_CONFIG.deepseekKey
    });
    showToast('配置已保存');
    toggleConfig();
  }

  function loadCourseData() {
    if (global.COURSE_DATA) return Promise.resolve(global.COURSE_DATA);
    return fetch('assets/data/course-data.json')
      .then(res => { if (!res.ok) throw new Error('fetch failed'); return res.json(); });
  }

  function splitWords(text) {
    return text.split(/(\s+|[.,!?;:'"()\[\]—–-]+)/).filter(Boolean);
  }

  function wrapWordsForLookup(text) {
    return splitWords(text).map(part => {
      if (/^[A-Za-z'-]+$/.test(part)) {
        return `<span class="word-token" data-word="${escapeHtml(part.toLowerCase())}">${escapeHtml(part)}</span>`;
      }
      return escapeHtml(part);
    }).join('');
  }

  const SPEECH_SDK_URL = 'https://cdn.jsdelivr.net/npm/microsoft-cognitiveservices-speech-sdk@latest/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle-min.js';
  let _speechSdkPromise = null;
  let _speakRec = null;
  let _lastPronunciation = null;

  function getLastPronunciation() {
    return _lastPronunciation;
  }

  function stopSpeakingRecordSafe(timeoutMs) {
    return Promise.race([
      stopSpeakingRecord(),
      new Promise(resolve => setTimeout(() => resolve({ text: '', pronunciation: null, mode: null }), timeoutMs || 4000))
    ]);
  }

  function ensureSpeechSdk() {
    if (global.SpeechSDK) return Promise.resolve();
    if (_speechSdkPromise) return _speechSdkPromise;
    _speechSdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SPEECH_SDK_URL;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Azure Speech SDK 加载失败'));
      document.head.appendChild(script);
    });
    return _speechSdkPromise;
  }

  function isSpeakingRecording() {
    return !!_speakRec;
  }

  function getSpeakingRecordingMode() {
    return _speakRec ? _speakRec.mode : null;
  }

  async function startSpeakingRecord(mode, onText, options) {
    options = options || {};
    await ensureSpeechSdk();
    await stopSpeakingRecord();
    const cfg = getConfig();
    if (!cfg.azureKey) throw new Error('请先在设置中配置 Azure Speech Key');

    const lang = mode === 'trans' ? 'zh-CN' : 'en-US';
    const speechConfig = global.SpeechSDK.SpeechConfig.fromSubscription(cfg.azureKey, cfg.azureRegion);
    speechConfig.speechRecognitionLanguage = lang;
    const recognizer = new global.SpeechSDK.SpeechRecognizer(
      speechConfig,
      global.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
    );

    let finalBuf = '';
    let lastPa = null;
    if (mode === 'read' && options.referenceText) {
      const paConfig = new global.SpeechSDK.PronunciationAssessmentConfig(
        options.referenceText,
        global.SpeechSDK.PronunciationAssessmentGradingSystem.HundredMark,
        global.SpeechSDK.PronunciationAssessmentGranularity.Phoneme,
        true
      );
      paConfig.enableProsodyAssessment = true;
      paConfig.applyTo(recognizer);
    }

    recognizer.recognizing = (_, e) => {
      const interim = e.result.text || '';
      const display = (finalBuf + (finalBuf && interim ? ' ' : '') + interim).trim();
      onText(display, false);
    };
    recognizer.recognized = (_, e) => {
      if (e.result.reason === global.SpeechSDK.ResultReason.RecognizedSpeech) {
        if (e.result.text) {
          finalBuf += (finalBuf ? ' ' : '') + e.result.text;
          onText(finalBuf.trim(), true);
        }
        if (mode === 'read' && options.referenceText) {
          try {
            const paResult = global.SpeechSDK.PronunciationAssessmentResult.fromResult(e.result);
            const jsonStr = e.result.properties.getProperty(global.SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult);
            lastPa = { result: paResult, json: jsonStr ? JSON.parse(jsonStr) : null };
          } catch (err) {}
        }
      }
    };
    recognizer.canceled = (_, e) => {
      const msg = e.errorDetails || String(e.reason || '识别已取消');
      showToast('语音识别失败：' + msg);
      stopSpeakingRecord();
    };

    _speakRec = {
      recognizer, mode,
      getText: () => finalBuf.trim(),
      getPronunciation: () => lastPa
    };
    return new Promise((resolve, reject) => {
      recognizer.startContinuousRecognitionAsync(
        () => resolve(),
        err => {
          _speakRec = null;
          try { recognizer.close(); } catch (e) {}
          reject(new Error(err || '无法启动麦克风'));
        }
      );
    });
  }

  function stopSpeakingRecord() {
    return new Promise(resolve => {
      if (!_speakRec) { resolve({ text: '', pronunciation: null, mode: null }); return; }
      const { recognizer, getText, getPronunciation, mode } = _speakRec;
      const text = getText();
      const pronunciation = mode === 'read' && getPronunciation ? getPronunciation() : null;
      _speakRec = null;
      if (pronunciation) _lastPronunciation = pronunciation;
      recognizer.stopContinuousRecognitionAsync(
        () => { recognizer.close(); resolve({ text, pronunciation, mode }); },
        () => { try { recognizer.close(); } catch (e) {} resolve({ text, pronunciation, mode }); }
      );
    });
  }

  let _pdfLibsPromise = null;
  function loadPdfLibs() {
    if (global.html2canvas && global.jspdf?.jsPDF) return Promise.resolve();
    if (_pdfLibsPromise) return _pdfLibsPromise;
    _pdfLibsPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      s.onload = () => {
        if (global.html2canvas && global.jspdf?.jsPDF) resolve();
        else reject(new Error('PDF 库加载不完整'));
      };
      s.onerror = () => reject(new Error('PDF 库加载失败'));
      document.head.appendChild(s);
    });
    return _pdfLibsPromise;
  }

  function loadScriptTag(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('script load failed: ' + src));
      document.head.appendChild(s);
    });
  }

  let _qrLibPromise = null;
  function loadQrLib() {
    if (global.QRCode?.toDataURL) return Promise.resolve();
    if (_qrLibPromise) return _qrLibPromise;
    const sources = [
      'assets/js/vendor/qrcode.min.js',
      'https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js',
      'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js'
    ];
    _qrLibPromise = (async () => {
      let lastErr = null;
      for (const src of sources) {
        try {
          if (global.QRCode?.toDataURL) return;
          await loadScriptTag(src);
          if (global.QRCode?.toDataURL) return;
        } catch (e) {
          lastErr = e;
        }
      }
      _qrLibPromise = null;
      throw lastErr || new Error('QR 库加载不完整');
    })();
    return _qrLibPromise;
  }

  function resolveCoursewareBaseUrl() {
    try {
      const loc = global.location;
      if (loc && /^https?:\/\//i.test(loc.href || '')) {
        const m = String(loc.pathname || '').match(/^(\/REFH\/\d+\/courseware\/)/i);
        if (m) return `${loc.origin}${m[1]}`;
      }
    } catch (e) {}
    return COURSEWARE_WEB_BASE;
  }

  function resolveArticlePageUrl(options) {
    const explicit = options?.pageUrl && String(options.pageUrl).trim();
    if (explicit) return explicit;
    const target = options?.pageTarget || 'part2-reading.html';
    const base = resolveCoursewareBaseUrl();
    if (base) return base + target;
    return ARTICLE_PAGE_URL || '';
  }

  async function buildArticleQrDataUrl(url, accent) {
    if (!url) return '';
    await loadQrLib();
    return global.QRCode.toDataURL(url, {
      width: 132,
      margin: 1,
      color: { dark: accent || '#1c2b24', light: '#ffffff' },
      errorCorrectionLevel: 'M'
    });
  }

  function getVocabPdfCss(accent) {
    const c = accent || '#1a6b4a';
    return `
      html,body{margin:0;padding:0;background:#fff;color:#1c2b24;
        font-family:'Microsoft YaHei','PingFang SC','Noto Sans SC','Segoe UI',sans-serif;
        -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
      .pdf-doc{box-sizing:border-box;width:680px;max-width:680px;margin:0;padding:16px 18px 20px;overflow:visible;}
      .pdf-export-block{overflow:visible;page-break-inside:avoid;break-inside:avoid;}
      .pdf-header-wrap{
        display:flex;align-items:flex-start;justify-content:space-between;gap:12px;
        margin-bottom:16px;padding-bottom:12px;border-bottom:2.5px solid ${c};
      }
      .pdf-header{flex:1;min-width:0;text-align:center;margin-bottom:0;padding-bottom:0;border-bottom:none;}
      .pdf-header h1{font-size:18px;color:${c};margin:0 0 5px;font-weight:700;line-height:1.35;}
      .pdf-header p{font-size:10.5px;color:#5c7268;margin:0 0 3px;line-height:1.45;}
      .pdf-qr-block{
        flex:0 0 auto;width:118px;text-align:center;padding:6px 8px;border-radius:8px;
        border:1px solid #dce8e2;background:linear-gradient(180deg,#fafcfb,#f3f8f5);
      }
      .pdf-qr-img{width:96px;height:96px;display:block;margin:0 auto 4px;border-radius:4px;}
      .pdf-qr-label{font-size:8.5px;font-weight:700;color:${c};line-height:1.3;margin:0;}
      .pdf-qr-hint{font-size:7.5px;color:#5c7268;line-height:1.35;margin:2px 0 0;}
      .pdf-qr-footer{
        margin-top:10px;padding:10px 12px;border-radius:8px;border:1px dashed #dce8e2;
        background:#fafcfb;display:flex;align-items:center;gap:12px;
      }
      .pdf-qr-footer img{width:72px;height:72px;flex:0 0 auto;border-radius:4px;}
      .pdf-qr-footer-text{flex:1;min-width:0;font-size:9.5px;line-height:1.5;color:#5c7268;}
      .pdf-qr-footer-text b{display:block;font-size:10.5px;color:${c};margin-bottom:3px;}
      .pdf-word-card{
        margin-bottom:10px;padding:10px 12px;
        border:1px solid #dce8e2;border-radius:6px;border-left:3px solid ${c};background:#fafcfb;
        overflow:visible;
        page-break-inside:avoid;break-inside:avoid;-webkit-column-break-inside:avoid;
      }
      .pdf-word-title{font-size:14px;font-weight:700;color:${c};margin-bottom:5px;line-height:1.35;}
      .pdf-word-title span{font-size:10px;color:#5c7268;font-weight:500;margin-left:5px;}
      .pdf-row{display:flex;gap:6px;align-items:flex-start;margin-bottom:3px;font-size:10.5px;line-height:1.55;}
      .pdf-label{flex:0 0 56px;font-weight:600;color:${c};}
      .pdf-val{flex:1;min-width:0;word-break:break-word;overflow-wrap:break-word;}
      .pdf-en{color:#333;}.pdf-cn{color:${c};}
      .pdf-section{margin-top:5px;padding-top:5px;border-top:1px dashed #dce8e2;}
      .pdf-badge{display:inline-block;font-size:8.5px;font-weight:600;padding:1px 5px;border-radius:3px;color:#fff;margin:0 5px 3px 0;vertical-align:middle;}
      .pdf-badge.zk{background:#27ae60;}.pdf-badge.g10{background:#e67e22;}.pdf-badge.art{background:#3498db;}
      .pdf-tags{font-size:9.5px;color:#5c7268;margin-top:4px;line-height:1.5;word-break:break-word;}
      @media print{
        @page{size:A4 portrait;margin:12mm;}
        body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
        .pdf-doc{width:auto;max-width:none;padding:0;}
      }`;
  }

  function buildVocabPdfWordCard(v, i) {
    const ae = v.article_example;
    const zk = v.examples?.zhongkao;
    const g10 = v.examples?.grade10;
    let exBlocks = '';
    if (ae?.sentence) {
      exBlocks += `<div class="pdf-section"><span class="pdf-badge art">文章</span>
        <div class="pdf-row"><div class="pdf-val pdf-en">${escapeHtml(ae.sentence)}</div></div>
        <div class="pdf-row"><div class="pdf-val pdf-cn">${escapeHtml(ae.translation || '')}</div></div></div>`;
    }
    if (zk?.sentence) {
      exBlocks += `<div class="pdf-section"><span class="pdf-badge zk">中考</span>
        <div class="pdf-row"><div class="pdf-val pdf-en">${escapeHtml(zk.sentence)}</div></div>
        <div class="pdf-row"><div class="pdf-val pdf-cn">${escapeHtml(zk.translation || '')}</div></div></div>`;
    }
    if (g10?.sentence) {
      exBlocks += `<div class="pdf-section"><span class="pdf-badge g10">高一</span>
        <div class="pdf-row"><div class="pdf-val pdf-en">${escapeHtml(g10.sentence)}</div></div>
        <div class="pdf-row"><div class="pdf-val pdf-cn">${escapeHtml(g10.translation || '')}</div></div></div>`;
    }
    const syn = (v.synonyms || []).length
      ? `<div class="pdf-tags"><b>同义词：</b>${v.synonyms.map(escapeHtml).join(' · ')}</div>` : '';
    const forms = (v.word_forms || []).length
      ? `<div class="pdf-tags"><b>词性变化：</b>${v.word_forms.map(escapeHtml).join(' · ')}</div>` : '';
    const usage = v.other_usage
      ? `<div class="pdf-tags"><b>常见用法：</b>${escapeHtml(v.other_usage)}</div>` : '';
    const pos = v.pos
      ? `<span>${escapeHtml(v.pos)}</span>`
      : (v.phrase_type ? `<span>${escapeHtml(v.phrase_type)}</span>` : '');
    return `<div class="pdf-word-card">
      <div class="pdf-word-title">${i + 1}. ${escapeHtml(v.word)} ${pos}</div>
      <div class="pdf-row"><div class="pdf-label">英文释义</div><div class="pdf-val pdf-en">${escapeHtml(v.definition_en || '')}</div></div>
      <div class="pdf-row"><div class="pdf-label">中文释义</div><div class="pdf-val pdf-cn">${escapeHtml(v.definition_cn || '')}</div></div>
      ${exBlocks}${syn}${forms}${usage}
    </div>`;
  }

  function buildVocabPdfHtml(words, meta) {
    meta = meta || {};
    const date = new Date().toLocaleDateString('zh-CN');
    const title = meta.title || '词汇表';
    const level = meta.level || '';
    const pageUrl = meta.pageUrl || '';
    const qrDataUrl = meta.qrDataUrl || '';
    const qrBlock = qrDataUrl
      ? `<div class="pdf-qr-block">
          <img class="pdf-qr-img" src="${qrDataUrl}" alt="扫码学习">
          <p class="pdf-qr-label">📱 扫码同步学习</p>
          <p class="pdf-qr-hint">手机打开精读课件</p>
        </div>`
      : '';
    const qrFooter = qrDataUrl
      ? `<div class="pdf-export-block pdf-qr-footer">
          <img src="${qrDataUrl}" alt="扫码学习">
          <div class="pdf-qr-footer-text">
            <b>📱 电子化同步学习</b>
            扫描二维码，在手机上打开本篇精读阅读页面，可进行朗读、查词、AI 分析与测验，与纸质 PDF 同步学习。
            ${pageUrl ? `<br><span style="font-size:8.5px;word-break:break-all;">${escapeHtml(pageUrl)}</span>` : ''}
          </div>
        </div>`
      : '';
    return `<div class="pdf-doc">
      <div class="pdf-export-block pdf-header-wrap">
        <div class="pdf-header">
          <h1>${escapeHtml(title)}</h1>
          <p>词汇表 Vocabulary List · 共 ${words.length} 项 · ${date}</p>
          ${level ? `<p>${escapeHtml(level)}</p>` : ''}
        </div>
        ${qrBlock}
      </div>
      ${words.map((v, i) => buildVocabPdfWordCard(v, i)).join('')}
      ${qrFooter}
    </div>`;
  }

  function buildVocabPdfDocument(words, meta) {
    meta = meta || {};
    const accent = meta.accent || '#1a6b4a';
    const body = buildVocabPdfHtml(words, meta);
    const css = getVocabPdfCss(accent);
    return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
      <style>${css}</style></head><body>${body}</body></html>`;
  }

  function escapeRegExp(s) {
    return String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getArticleVocabTerms(data) {
    const items = (data?.vocabulary || []).concat(data?.phrases || []);
    return [...new Set(items.map(i => String(i.word || '').trim()).filter(t => t.length >= 2))]
      .sort((a, b) => b.length - a.length);
  }

  function highlightVocabInText(text, terms) {
    if (!text) return '';
    const sorted = [...terms].sort((a, b) => b.length - a.length);
    const markers = [];
    let work = String(text);
    for (const term of sorted) {
      const re = new RegExp(escapeRegExp(term), 'gi');
      work = work.replace(re, (m) => {
        const id = markers.length;
        markers.push(m);
        return `\uE000V${id}\uE001`;
      });
    }
    let html = escapeHtml(work);
    markers.forEach((m, i) => {
      const token = escapeHtml(`\uE000V${i}\uE001`);
      html = html.split(token).join(`<b class="pdf-vocab">${escapeHtml(m)}</b>`);
    });
    return html;
  }

  function getArticlePdfCss(accent) {
    const c = accent || '#1a6b4a';
    return `
      html,body{margin:0;padding:0;background:#fff;color:#1c2b24;
        font-family:'Microsoft YaHei','PingFang SC','Noto Sans SC',Georgia,serif;
        -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
      .pdf-doc{box-sizing:border-box;width:680px;max-width:680px;margin:0;padding:16px 18px 24px;overflow:visible;}
      .pdf-export-block{overflow:visible;page-break-inside:avoid;break-inside:avoid;}
      .pdf-header-wrap{
        display:flex;align-items:flex-start;justify-content:space-between;gap:12px;
        margin-bottom:14px;padding-bottom:12px;border-bottom:2.5px solid ${c};
      }
      .pdf-header{flex:1;min-width:0;text-align:center;}
      .pdf-header h1{font-size:19px;color:${c};margin:0 0 6px;font-weight:700;line-height:1.35;}
      .pdf-header p{font-size:10.5px;color:#5c7268;margin:0 0 3px;line-height:1.45;}
      .pdf-qr-block{
        flex:0 0 auto;width:118px;text-align:center;padding:6px 8px;border-radius:8px;
        border:1px solid #dce8e2;background:linear-gradient(180deg,#fafcfb,#f3f8f5);
      }
      .pdf-qr-img{width:96px;height:96px;display:block;margin:0 auto 4px;border-radius:4px;}
      .pdf-qr-label{font-size:8.5px;font-weight:700;color:${c};line-height:1.3;margin:0;}
      .pdf-qr-hint{font-size:7.5px;color:#5c7268;line-height:1.35;margin:2px 0 0;word-break:break-all;}
      .pdf-qr-footer{
        margin-top:10px;padding:10px 12px;border-radius:8px;border:1px dashed #dce8e2;
        background:#fafcfb;display:flex;align-items:center;gap:12px;
      }
      .pdf-qr-footer img{width:72px;height:72px;flex:0 0 auto;border-radius:4px;}
      .pdf-qr-footer-text{flex:1;min-width:0;font-size:9.5px;line-height:1.5;color:#5c7268;}
      .pdf-qr-footer-text b{display:block;font-size:10.5px;color:${c};margin-bottom:3px;}
      .pdf-lead{
        margin-bottom:14px;padding:12px 14px;border-radius:8px;
        background:linear-gradient(135deg,${c}12,${c}06);border-left:4px solid ${c};
        font-size:11.5px;line-height:1.65;color:#2a3d34;
      }
      .pdf-lead b.pdf-vocab{color:${c};font-weight:700;}
      .pdf-section-title{
        font-size:14px;font-weight:700;color:${c};margin:0 0 8px;
        padding-bottom:6px;border-bottom:1px solid ${c}33;
      }
      .pdf-questions{
        margin-bottom:10px;padding:10px 12px;border-radius:8px;
        background:linear-gradient(135deg,#fff7ed,#fef9c3);border:1px solid #fde68a;
      }
      .pdf-questions h3{font-size:11px;color:#b45309;margin:0 0 8px;font-weight:700;}
      .pdf-q-item{margin-bottom:7px;font-size:10.5px;line-height:1.55;color:#78350f;}
      .pdf-q-item:last-child{margin-bottom:0;}
      .pdf-q-item b{color:#92400e;}
      .pdf-section-img{
        width:100%;max-height:220px;object-fit:cover;border-radius:10px;
        margin-bottom:10px;border:1px solid #dce8e2;display:block;
      }
      .pdf-para-text{margin-bottom:12px;}
      .pdf-para-text p{font-size:11px;line-height:1.72;margin:0 0 8px;text-align:justify;}
      .pdf-para-text p:last-child{margin-bottom:0;}
      .pdf-vocab{color:${c};font-weight:700;}
      .pdf-quiz-block{
        margin-top:6px;padding:10px 12px;border-radius:8px;
        border:1px solid #dce8e2;background:#fafcfb;
      }
      .pdf-quiz-block h3{font-size:12px;color:${c};margin:0 0 8px;}
      .pdf-quiz-item{margin-bottom:8px;font-size:10px;line-height:1.55;}
      .pdf-quiz-item b{color:${c};}
      @media print{
        @page{size:A4 portrait;margin:12mm;}
        body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
        .pdf-doc{width:auto;max-width:none;padding:0;}
      }`;
  }

  function buildArticlePdfHtml(data, meta) {
    meta = meta || {};
    const terms = getArticleVocabTerms(data);
    const date = new Date().toLocaleDateString('zh-CN');
    const title = data.title_full || data.title || meta.title || 'Reading Article';
    const level = data.level ? `Level ${data.level}` : '';
    const wordCount = data.word_count ? `${data.word_count} words` : '';
    const source = data.source || '';

    const leadHtml = data.article_lead
      ? `<div class="pdf-export-block pdf-lead">${highlightVocabInText(data.article_lead, terms)}</div>`
      : '';

    const shownHeadings = new Set();
    const sectionsHtml = (data.paragraphs || []).map((p, pi) => {
      const heading = p.section_heading || p.title || `Section ${pi + 1}`;
      let headingHtml = '';
      if (heading && !shownHeadings.has(heading)) {
        shownHeadings.add(heading);
        headingHtml = `<div class="pdf-section-title">${escapeHtml(heading)}</div>`;
      }
      const questions = (p.socratic || []).map((q, qi) =>
        `<div class="pdf-q-item"><b>Q${qi + 1}.</b> ${escapeHtml(q.q)}</div>`
      ).join('');
      const questionsBlock = questions
        ? `<div class="pdf-export-block pdf-questions"><h3>📖 阅读理解 Reading Questions</h3>${questions}</div>`
        : '';
      const imgUrl = imageUrl(p.image);
      const imgBlock = imgUrl
        ? `<div class="pdf-export-block pdf-img-wrap"><img class="pdf-section-img" src="${escapeHtml(imgUrl)}" alt="${escapeHtml(p.title || heading)}" crossorigin="anonymous"></div>`
        : '';
      const sentencesHtml = (p.sentences || []).map(s =>
        `<p>${highlightVocabInText(s, terms)}</p>`
      ).join('');
      const textBlock = `<div class="pdf-export-block pdf-para-text">${sentencesHtml}</div>`;
      return `<div class="pdf-para-section">${headingHtml}${questionsBlock}${imgBlock}${textBlock}</div>`;
    }).join('');

    const quizHtml = (data.comprehension_questions || []).length
      ? `<div class="pdf-export-block pdf-quiz-block"><h3>📝 阅读理解测验 Comprehension Quiz</h3>${
          data.comprehension_questions.map((q, qi) =>
            `<div class="pdf-quiz-item"><b>${qi + 1}.</b> ${escapeHtml(q.q)}<br>${
              (q.options || []).map((o, oi) => `${String.fromCharCode(65 + oi)}. ${escapeHtml(o)}`).join('<br>')
            }</div>`
          ).join('')
        }</div>`
      : '';

    const pageUrl = meta.pageUrl || '';
    const qrDataUrl = meta.qrDataUrl || '';
    const qrBlock = qrDataUrl
      ? `<div class="pdf-qr-block">
          <img class="pdf-qr-img" src="${qrDataUrl}" alt="扫码学习">
          <p class="pdf-qr-label">📱 扫码同步学习</p>
          <p class="pdf-qr-hint">手机打开精读课件</p>
        </div>`
      : '';
    const qrFooter = qrDataUrl
      ? `<div class="pdf-export-block pdf-qr-footer">
          <img src="${qrDataUrl}" alt="扫码学习">
          <div class="pdf-qr-footer-text">
            <b>📱 电子化同步学习</b>
            扫描二维码，在手机上打开本篇精读阅读页面，可进行朗读、查词、AI 分析与测验，与纸质 PDF 同步学习。
            ${pageUrl ? `<br><span style="font-size:8.5px;word-break:break-all;">${escapeHtml(pageUrl)}</span>` : ''}
          </div>
        </div>`
      : '';

    return `<div class="pdf-doc">
      <div class="pdf-export-block pdf-header-wrap">
        <div class="pdf-header">
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml([level, wordCount, date].filter(Boolean).join(' · '))}</p>
          ${source ? `<p>${escapeHtml(source)}</p>` : ''}
          <p>词汇表中单词/词组以<b class="pdf-vocab">粗体</b>标注 · 段前含阅读理解问题</p>
        </div>
        ${qrBlock}
      </div>
      ${leadHtml}
      ${sectionsHtml}
      ${quizHtml}
      ${qrFooter}
    </div>`;
  }

  function buildArticlePdfDocument(data, meta) {
    meta = meta || {};
    const accent = meta.accent || '#1a6b4a';
    const body = buildArticlePdfHtml(data, meta);
    const css = getArticlePdfCss(accent);
    return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
      <style>${css}</style></head><body>${body}</body></html>`;
  }

  async function waitPdfImages(idoc) {
    const imgs = [...(idoc?.querySelectorAll('img') || [])];
    await Promise.all(imgs.map(img => {
      if (img.complete && img.naturalWidth) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
        setTimeout(resolve, 8000);
      });
    }));
  }

  async function exportArticlePdf(options) {
    const data = options?.data;
    if (!data?.paragraphs?.length) throw new Error('无文章内容可导出');
    const pageUrl = resolveArticlePageUrl(options || {});
    const meta = {
      title: options.title || data.title,
      accent: options.accent || '#1a6b4a',
      pageUrl
    };
    const filename = options.filename || 'Article_Reading.pdf';
    await loadPdfLibs();
    if (pageUrl) {
      try {
        meta.qrDataUrl = await buildArticleQrDataUrl(pageUrl, meta.accent);
      } catch (e) {
        console.warn('QR code generation failed', e);
      }
    }

    const mask = document.createElement('div');
    mask.setAttribute('aria-busy', 'true');
    mask.style.cssText =
      'position:fixed;inset:0;background:rgba(15,23,42,0.45);z-index:2147483000;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-family:system-ui,sans-serif;';
    mask.textContent = '正在生成文章 PDF（含配图与二维码）…';
    document.body.appendChild(mask);

    const iframe = document.createElement('iframe');
    iframe.setAttribute('title', 'article-pdf-export');
    iframe.style.cssText =
      'position:fixed;left:0;top:0;width:680px;border:0;z-index:2147482000;background:#fff;';
    iframe.srcdoc = buildArticlePdfDocument(data, meta);
    document.body.appendChild(iframe);

    try {
      await waitPdfIframe(iframe);
      const idoc = iframe.contentDocument;
      await waitPdfImages(idoc);
      const root = idoc.querySelector('.pdf-doc');
      if (!root) throw new Error('PDF 内容未找到');

      const h = Math.max(idoc.body.scrollHeight, root.scrollHeight, 400);
      iframe.style.height = h + 40 + 'px';

      const JsPDF = global.jspdf.jsPDF;
      const pdf = new JsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 12;
      const st = { margin, pageW, pageH, contentW: pageW - margin * 2, y: margin, gap: 2.5 };

      for (const block of root.querySelectorAll('.pdf-export-block')) {
        const canvas = await capturePdfBlock(block);
        const isImg = block.querySelector('.pdf-section-img');
        appendCanvasAsWholeBlock(pdf, canvas, st, {
          fitOnePage: block.classList.contains('pdf-img-wrap') && canvas.height / canvas.width > 1.2
        });
        if (isImg) await new Promise(r => setTimeout(r, 80));
      }

      pdf.save(filename);
    } finally {
      mask.remove();
      iframe.remove();
    }
  }

  function waitPdfIframe(iframe) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        const idoc = iframe.contentDocument;
        if (!idoc?.body) {
          settled = true;
          reject(new Error('PDF 文档未就绪'));
          return;
        }
        const fonts = idoc.fonts?.ready || Promise.resolve();
        fonts.then(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              if (!settled) {
                settled = true;
                resolve();
              }
            }, 280);
          });
        });
      };
      iframe.onload = done;
      iframe.onerror = () => {
        if (!settled) {
          settled = true;
          reject(new Error('PDF 预览加载失败'));
        }
      };
      setTimeout(done, 5000);
    });
  }

  function capturePdfBlock(el) {
    const rect = el.getBoundingClientRect();
    const w = Math.ceil(rect.width || el.scrollWidth || el.offsetWidth || 680);
    const h = Math.ceil(el.scrollHeight || el.offsetHeight || 40);
    const doc = el.ownerDocument;
    const win = doc.defaultView || global;
    return global.html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      width: w,
      height: h,
      windowWidth: win.innerWidth || w,
      windowHeight: Math.max(win.innerHeight || 0, h)
    });
  }

  function appendCanvasAsWholeBlock(pdf, canvas, st, options) {
    const gap = st.gap;
    const pageContentH = st.pageH - 2 * st.margin;
    let drawW = st.contentW;
    let drawH = (canvas.height * drawW) / canvas.width;

    if (options?.fitOnePage && drawH > pageContentH) {
      const scale = pageContentH / drawH;
      drawH = pageContentH;
      drawW = drawW * scale;
    }

    const avail = st.pageH - st.margin - st.y;
    if (drawH > avail) {
      pdf.addPage();
      st.y = st.margin;
    }

    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95),
      'JPEG',
      st.margin,
      st.y,
      drawW,
      drawH
    );
    st.y += drawH + gap;
  }

  async function exportVocabPdf(options) {
    const words = options?.words;
    if (!words?.length) throw new Error('无词汇可导出');
    const pageUrl = resolveArticlePageUrl(options || {});
    const meta = {
      title: options.title,
      level: options.level,
      accent: options.accent || '#1a6b4a',
      pageUrl
    };
    const filename = options.filename || 'Vocabulary.pdf';
    await loadPdfLibs();
    if (pageUrl) {
      try {
        meta.qrDataUrl = await buildArticleQrDataUrl(pageUrl, meta.accent);
      } catch (e) {
        console.warn('QR code generation failed', e);
      }
    }

    const mask = document.createElement('div');
    mask.setAttribute('aria-busy', 'true');
    mask.style.cssText =
      'position:fixed;inset:0;background:rgba(15,23,42,0.45);z-index:2147483000;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-family:system-ui,sans-serif;';
    mask.textContent = '正在生成 PDF（含二维码）…';
    document.body.appendChild(mask);

    const iframe = document.createElement('iframe');
    iframe.setAttribute('title', 'pdf-export');
    iframe.style.cssText =
      'position:fixed;left:0;top:0;width:680px;border:0;z-index:2147482000;background:#fff;';
    iframe.srcdoc = buildVocabPdfDocument(words, meta);
    document.body.appendChild(iframe);

    try {
      await waitPdfIframe(iframe);
      const idoc = iframe.contentDocument;
      await waitPdfImages(idoc);
      const root = idoc.querySelector('.pdf-doc');
      if (!root) throw new Error('PDF 内容未找到');

      const h = Math.max(idoc.body.scrollHeight, root.scrollHeight, 400);
      iframe.style.height = h + 40 + 'px';

      const JsPDF = global.jspdf.jsPDF;
      const pdf = new JsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 12;
      const st = {
        margin,
        pageW,
        pageH,
        contentW: pageW - margin * 2,
        y: margin,
        gap: 2.5
      };

      const header = root.querySelector('.pdf-header-wrap');
      if (header) {
        const canvas = await capturePdfBlock(header);
        appendCanvasAsWholeBlock(pdf, canvas, st);
      }
      for (const block of root.querySelectorAll('.pdf-word-card')) {
        const canvas = await capturePdfBlock(block);
        appendCanvasAsWholeBlock(pdf, canvas, st, { fitOnePage: true });
      }
      const qrFooter = root.querySelector('.pdf-qr-footer');
      if (qrFooter) {
        const canvas = await capturePdfBlock(qrFooter);
        appendCanvasAsWholeBlock(pdf, canvas, st);
      }

      pdf.save(filename);
    } finally {
      mask.remove();
      iframe.remove();
    }
  }

  async function openVocabPrintWindow(words, meta) {
    if (!words?.length) {
      showToast('没有可导出的词汇');
      return;
    }
    meta = { ...(meta || {}) };
    const pageUrl = resolveArticlePageUrl(meta);
    meta.pageUrl = pageUrl;
    if (pageUrl) {
      try {
        meta.qrDataUrl = await buildArticleQrDataUrl(pageUrl, meta.accent);
      } catch (e) {
        console.warn('QR code generation failed', e);
      }
    }
    const w = window.open('', '_blank');
    if (!w) {
      showToast('请允许弹出窗口以打印 PDF');
      return;
    }
    w.document.open();
    w.document.write(buildVocabPdfDocument(words, meta));
    w.document.close();
    w.focus();
    w.onload = () => setTimeout(() => {
      w.print();
      showToast('请选择「另存为 PDF」或打印机保存');
    }, 700);
  }

  initConfig();

  global.Courseware = {
    getConfig, saveConfig, initConfig,
    speakText, speakWithBrowser, speakWithFallback, stopAudio, speakFullText, stopFullSpeak, isFullSpeaking, isFullSpeakReady,
    prepareFullSpeakAudio, playFullSpeak, pauseFullSpeak, toggleFullSpeakPlay,
    skipFullSpeak, seekFullSpeak, getFullSpeakState, downloadFullSpeakMp3, bindFullSpeakPlayer,
    callDeepSeek, lookupWord, analyzeSelection, translateSelection, analyzeSentence, formatAiMarkdown,
    evaluateReading, evaluateTranslation, evaluateReadingCombined,
    runSpeakingEvaluation, renderReadingEvalHtml, renderTranslationEvalHtml,
    buildAzureSummary, getLastPronunciation, stopSpeakingRecordSafe,
    showToast, escapeHtml, imageUrl, renderNav,
    injectConfigPanel, toggleConfig, openConfig, saveConfigFromUI,
    loadCourseData, wrapWordsForLookup, splitWords,
    ensureSpeechSdk, startSpeakingRecord, stopSpeakingRecord,
    isSpeakingRecording, getSpeakingRecordingMode,
    buildVocabPdfHtml, exportVocabPdf, openVocabPrintWindow,
    buildArticlePdfHtml, exportArticlePdf
  };
})(window);
