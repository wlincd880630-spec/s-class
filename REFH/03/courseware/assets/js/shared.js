/* Shared utilities: Azure TTS, DeepSeek API, config */
(function (global) {
  'use strict';

  const CONFIG_KEY = 'midautumn_courseware_config';
  const IMAGE_BASE = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/REFH/03/courseware/assets/images/';

  const DEFAULT_CONFIG = {
    azureKey: 'C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu',
    azureRegion: 'southeastasia',
    deepseekKey: 'sk-daa16008e81843deba6fefe9dce51465'
  };

  let _audio = null;
  let _blobUrl = null;

  function getConfig() {
    let stored = {};
    try {
      stored = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}');
    } catch (e) {}
    return {
      azureKey: stored.azureKey || DEFAULT_CONFIG.azureKey,
      azureRegion: stored.azureRegion || DEFAULT_CONFIG.azureRegion,
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

  function stopAudio() {
    try {
      if (_audio) { _audio.pause(); _audio = null; }
      if (_blobUrl) { URL.revokeObjectURL(_blobUrl); _blobUrl = null; }
    } catch (e) {}
  }

  function xmlEscape(t) {
    return String(t || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  async function speakText(text, rate) {
    const raw = String(text || '').trim();
    if (!raw) return false;
    const cfg = getConfig();
    const key = cfg.azureKey;
    const region = cfg.azureRegion;
    stopAudio();
    const speed = rate === 'slow' ? '-20%' : rate === 'fast' ? '+15%' : '+0%';
    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural"><prosody rate="${speed}">${xmlEscape(raw)}</prosody></voice></speak>`;
    try {
      const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ssml+xml; charset=utf-8',
          'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
          'Ocp-Apim-Subscription-Key': key
        },
        body: ssml
      });
      if (!res.ok) throw new Error('TTS failed');
      const blob = await res.blob();
      _blobUrl = URL.createObjectURL(blob);
      _audio = new Audio(_blobUrl);
      await _audio.play();
      return true;
    } catch (e) {
      showToast('语音播放失败，请检查 Azure 配置');
      return false;
    }
  }

  async function callDeepSeek(messages, streamCallback) {
    const key = getConfig().deepseekKey;
    const body = {
      model: 'deepseek-chat',
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

  async function evaluateReading(original, audioTranscript) {
    const prompt = `你是英语口语教师。学生朗读以下句子：
原文: "${original}"
学生朗读识别文本: "${audioTranscript || '(未识别到内容)'}"
请评价：1) 发音问题 2) 流利度 3) 改进建议。用中文，简洁分点。`;
    return callDeepSeek([{ role: 'user', content: prompt }]);
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
      <a class="brand" href="index.html">🌕 Mid-Autumn Festival</a>
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

  async function startSpeakingRecord(mode, onText) {
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
    recognizer.recognizing = (_, e) => {
      const interim = e.result.text || '';
      const display = (finalBuf + (finalBuf && interim ? ' ' : '') + interim).trim();
      onText(display, false);
    };
    recognizer.recognized = (_, e) => {
      if (e.result.reason === global.SpeechSDK.ResultReason.RecognizedSpeech && e.result.text) {
        finalBuf += (finalBuf ? ' ' : '') + e.result.text;
        onText(finalBuf.trim(), true);
      }
    };
    recognizer.canceled = (_, e) => {
      const msg = e.errorDetails || String(e.reason || '识别已取消');
      showToast('语音识别失败：' + msg);
      stopSpeakingRecord();
    };

    _speakRec = { recognizer, mode, getText: () => finalBuf.trim() };
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
      if (!_speakRec) { resolve(''); return; }
      const { recognizer, getText } = _speakRec;
      const text = getText();
      _speakRec = null;
      recognizer.stopContinuousRecognitionAsync(
        () => { recognizer.close(); resolve(text); },
        () => { try { recognizer.close(); } catch (e) {} resolve(text); }
      );
    });
  }

  initConfig();

  global.Courseware = {
    getConfig, saveConfig, initConfig,
    speakText, stopAudio,
    callDeepSeek, lookupWord, analyzeSelection,
    evaluateReading, evaluateTranslation,
    showToast, escapeHtml, imageUrl, renderNav,
    injectConfigPanel, toggleConfig, openConfig, saveConfigFromUI,
    loadCourseData, wrapWordsForLookup, splitWords,
    ensureSpeechSdk, startSpeakingRecord, stopSpeakingRecord,
    isSpeakingRecording, getSpeakingRecordingMode
  };
})(window);
