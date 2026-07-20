/**
 * PET Practice - Azure TTS/STT with browser fallback
 * When Azure fails (key, network, CORS) or SDK not loaded, falls back to Web Speech API
 * so speaking practice still works (browser STT has no pronunciation score, we pass 60 to allow progress).
 */
(function () {
    'use strict';

    function playTTS(azureKey, azureRegion, text) {
        if (!text || typeof text !== 'string') return;
        var t = text.trim().replace(/\s+/g, ' ');
        if (!t) return;

        function useBrowserTTS() {
            try {
                var u = new SpeechSynthesisUtterance(t);
                u.lang = 'en-GB';
                u.rate = 0.9;
                var voices = speechSynthesis.getVoices();
                var en = voices.filter(function (v) { return v.lang.startsWith('en'); })[0];
                if (en) u.voice = en;
                speechSynthesis.speak(u);
            } catch (e) {
                console.warn('PetSpeech: browser TTS failed', e);
            }
        }

        var SpeechSDK = window.SpeechSDK;
        if (SpeechSDK && azureKey && azureRegion) {
            try {
                var config = SpeechSDK.SpeechConfig.fromSubscription(azureKey, azureRegion);
                config.speechSynthesisVoiceName = 'en-GB-RyanNeural';
                var synth = new SpeechSDK.SpeechSynthesizer(config);
                var safe = t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
                var ssml = '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-GB">' +
                    '<voice name="en-GB-RyanNeural"><prosody rate="0.90">' + safe + '</prosody></voice></speak>';
                synth.speakSsmlAsync(ssml,
                    function () { try { synth.close(); } catch (_) {} },
                    function (err) {
                        console.warn('PetSpeech: Azure TTS failed, using browser', err);
                        try { synth.close(); } catch (_) {}
                        useBrowserTTS();
                    }
                );
            } catch (e) {
                console.warn('PetSpeech: Azure TTS init failed, using browser', e);
                useBrowserTTS();
            }
        } else {
            useBrowserTTS();
        }
    }

    function createRecognizer(azureKey, azureRegion, referenceText, setScoreFn) {
        var currentScore = 0;
        var azureRecognizer = null;
        var browserRec = null;
        var stopped = false;
        var doneCb = null;

        function finish(score) {
            if (doneCb) {
                var cb = doneCb;
                doneCb = null;
                cb(typeof score === 'number' ? score : currentScore);
            }
        }

        function useBrowserSTT() {
            var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                if (setScoreFn) setScoreFn(60);
                finish(60);
                return;
            }
            try {
                browserRec = new SpeechRecognition();
                browserRec.lang = 'en-GB';
                browserRec.continuous = true;
                browserRec.interimResults = false;
                browserRec.onresult = function (e) {
                    if (e.results && e.results.length && setScoreFn) setScoreFn(60);
                };
                browserRec.onend = function () {
                    if (!stopped) return;
                    if (setScoreFn) setScoreFn(60);
                    finish(60);
                };
                browserRec.onerror = function () {
                    if (setScoreFn) setScoreFn(60);
                    finish(60);
                };
                browserRec.start();
            } catch (e) {
                console.warn('PetSpeech: browser STT failed', e);
                if (setScoreFn) setScoreFn(60);
                finish(60);
            }
        }

        return {
            start: function (onStarted, onError) {
                stopped = false;
                currentScore = 0;
                if (setScoreFn) setScoreFn(0);

                var SpeechSDK = window.SpeechSDK;
                if (SpeechSDK && azureKey && azureRegion && referenceText) {
                    try {
                        var config = SpeechSDK.SpeechConfig.fromSubscription(azureKey, azureRegion);
                        config.speechRecognitionLanguage = 'en-GB';
                        var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
                        var pronConfig = new SpeechSDK.PronunciationAssessmentConfig(
                            referenceText,
                            SpeechSDK.PronunciationAssessmentGradingSystem.HundredMark,
                            SpeechSDK.PronunciationAssessmentGranularity.Phoneme,
                            true
                        );
                        azureRecognizer = new SpeechSDK.SpeechRecognizer(config, audioConfig);
                        pronConfig.applyTo(azureRecognizer);
                        azureRecognizer.recognized = function (s, e) {
                            if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                                try {
                                    var jsonStr = e.result.properties.getProperty(SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult);
                                    if (jsonStr) {
                                        var json = JSON.parse(jsonStr);
                                        if (json.NBest && json.NBest[0] && json.NBest[0].PronunciationAssessment)
                                            currentScore = json.NBest[0].PronunciationAssessment.AccuracyScore;
                                        if (setScoreFn) setScoreFn(currentScore);
                                    }
                                } catch (_) {}
                            }
                        };
                        azureRecognizer.startContinuousRecognitionAsync(
                            function () { if (onStarted) onStarted(); },
                            function (err) {
                                console.warn('PetSpeech: Azure STT start failed, using browser', err);
                                if (onError) onError(err);
                                useBrowserSTT();
                                if (onStarted) onStarted();
                            }
                        );
                    } catch (e) {
                        console.warn('PetSpeech: Azure STT init failed, using browser', e);
                        if (onError) onError(e);
                        useBrowserSTT();
                        if (onStarted) onStarted();
                    }
                } else {
                    useBrowserSTT();
                    if (onStarted) onStarted();
                }
            },
            stop: function (doneCallback) {
                stopped = true;
                doneCb = doneCallback;
                if (azureRecognizer) {
                    var r = azureRecognizer;
                    azureRecognizer = null;
                    r.stopContinuousRecognitionAsync(
                        function () {
                            try { r.close(); } catch (_) {}
                            finish(currentScore);
                        },
                        function () {
                            try { r.close(); } catch (_) {}
                            finish(currentScore);
                        }
                    );
                } else if (browserRec) {
                    try {
                        browserRec.stop();
                    } catch (_) {
                        if (setScoreFn) setScoreFn(60);
                        finish(60);
                    }
                    browserRec = null;
                } else {
                    finish(currentScore);
                }
            }
        };
    }

    window.PetSpeech = {
        playTTS: playTTS,
        createRecognizer: createRecognizer
    };
})();
