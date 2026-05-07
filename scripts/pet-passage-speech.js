/**
 * PET Unit*_passage - 提供 window.azureSpeak 与 window.azureRecognizeOnce
 * Azure 不可用时自动回退到浏览器 TTS/STT，保证朗读与录音可用。
 */
(function () {
    'use strict';

    var AZURE_KEY = window.PET_AZURE_KEY || "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu";
    var AZURE_REGION = window.PET_AZURE_REGION || "southeastasia";

    function azureSpeak(text, opts) {
        opts = opts || {};
        var onEnd = opts.onEnd || function () {};
        var t = typeof text === 'string' ? text.trim().replace(/\s+/g, ' ') : '';
        if (!t) { onEnd(); return; }

        function useBrowserTTS() {
            try {
                var u = new SpeechSynthesisUtterance(t);
                u.lang = opts.voice && opts.voice.indexOf('zh') !== -1 ? 'zh-CN' : 'en-US';
                var voices = speechSynthesis.getVoices();
                var v = opts.voice && opts.voice.indexOf('zh') !== -1
                    ? voices.filter(function (x) { return x.lang.startsWith('zh'); })[0]
                    : voices.filter(function (x) { return x.lang.startsWith('en'); })[0];
                if (v) u.voice = v;
                u.onend = function () { onEnd(); };
                u.onerror = function () { onEnd(); };
                speechSynthesis.speak(u);
            } catch (e) {
                console.warn('pet-passage-speech: browser TTS failed', e);
                onEnd();
            }
        }

        var SpeechSDK = window.SpeechSDK;
        if (SpeechSDK && AZURE_KEY && AZURE_REGION) {
            try {
                var config = SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
                config.speechSynthesisVoiceName = (opts.voice && opts.voice.indexOf('zh') !== -1) ? 'zh-CN-XiaoxiaoNeural' : 'en-US-AvaMultilingualNeural';
                var synth = new SpeechSDK.SpeechSynthesizer(config);
                synth.speakTextAsync(t,
                    function () { try { synth.close(); } catch (_) {} onEnd(); },
                    function (err) {
                        console.warn('pet-passage-speech: Azure TTS failed, using browser', err);
                        try { synth.close(); } catch (_) {}
                        useBrowserTTS();
                    }
                );
            } catch (e) {
                console.warn('pet-passage-speech: Azure TTS init failed, using browser', e);
                useBrowserTTS();
            }
        } else {
            useBrowserTTS();
        }
    }

    function azureRecognizeOnce(locale, onResult, onError, opts) {
        opts = opts || {};
        var onRecognizer = opts.onRecognizer || function () {};

        function useBrowserSTT() {
            var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                if (onError) onError(new Error('Browser does not support speech recognition'));
                return;
            }
            var rec = new SpeechRecognition();
            rec.lang = locale === 'zh-CN' ? 'zh-CN' : 'en-US';
            rec.continuous = false;
            rec.interimResults = false;
            var closed = false;
            var wrapper = {
                close: function () {
                    if (closed) return;
                    closed = true;
                    try { rec.stop(); } catch (_) {}
                }
            };
            onRecognizer(wrapper);
            rec.onresult = function (e) {
                if (closed) return;
                var t = (e.results && e.results[0] && e.results[0][0]) ? e.results[0][0].transcript : '';
                if (onResult) onResult(t);
                closed = true;
            };
            rec.onerror = function () { if (!closed && onError) onError(new Error('Recognition error')); closed = true; };
            rec.onend = function () { closed = true; };
            try { rec.start(); } catch (e) { if (onError) onError(e); closed = true; }
        }

        var SpeechSDK = window.SpeechSDK;
        if (SpeechSDK && AZURE_KEY && AZURE_REGION) {
            try {
                var config = SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
                config.speechRecognitionLanguage = locale;
                var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
                var recognizer = new SpeechSDK.SpeechRecognizer(config, audioConfig);
                onRecognizer(recognizer);
                recognizer.recognizeOnceAsync(
                    function (result) {
                        var text = (result.reason === SpeechSDK.ResultReason.RecognizedSpeech && result.text) ? result.text : '';
                        try { recognizer.close(); } catch (_) {}
                        if (onResult) onResult(text);
                    },
                    function (err) {
                        console.warn('pet-passage-speech: Azure STT failed, using browser', err);
                        try { recognizer.close(); } catch (_) {}
                        useBrowserSTT();
                    }
                );
            } catch (e) {
                console.warn('pet-passage-speech: Azure STT init failed, using browser', e);
                useBrowserSTT();
            }
        } else {
            useBrowserSTT();
        }
    }

    window.azureSpeak = azureSpeak;
    window.azureRecognizeOnce = azureRecognizeOnce;
})();
