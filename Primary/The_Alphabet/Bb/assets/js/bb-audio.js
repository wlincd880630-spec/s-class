/**
 * Bb 课程语音：全部使用 Azure 英音慢速 TTS（不再播放教材 MP3）。
 */
(function (global) {
  "use strict";

  var SLOW = "0.62";

  var AZURE = {
    subscriptionKey: "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
    region: "southeastasia",
    language: "en-GB",
    voice: "en-GB-RyanNeural",
    rate: "0.85"
  };

  var sdkPromise = null;
  var currentSynth = null;
  var audioCtx = null;
  var voiceSource = null;
  var voiceAudio = null;
  var speakChain = Promise.resolve();

  function loadSdk() {
    if (global.SpeechSDK) return Promise.resolve(global.SpeechSDK);
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://aka.ms/csspeech/jsbrowserpackageraw";
      s.onload = function () {
        if (global.SpeechSDK) resolve(global.SpeechSDK);
        else reject(new Error("Speech SDK missing"));
      };
      s.onerror = function () {
        reject(new Error("Speech SDK load failed"));
      };
      document.head.appendChild(s);
    });
    return sdkPromise;
  }

  function escapeSsml(t) {
    return String(t)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function unlockAudio() {
    var AC = global.AudioContext || global.webkitAudioContext;
    if (!AC) return null;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function stopVoice() {
    speakChain = Promise.resolve();
    if (currentSynth) {
      try { currentSynth.close(); } catch (e) {}
      currentSynth = null;
    }
    if (voiceSource) {
      try { voiceSource.stop(); } catch (e0) {}
      voiceSource = null;
    }
    if (voiceAudio) {
      try {
        voiceAudio.pause();
        voiceAudio.removeAttribute("src");
        voiceAudio.load();
      } catch (e1) {}
      voiceAudio = null;
    }
    if (global.speechSynthesis) {
      try { global.speechSynthesis.cancel(); } catch (e3) {}
    }
  }

  function stop() {
    stopVoice();
  }

  function isTrackPlaying() {
    return false;
  }

  function wrapSpeak(inner, rate) {
    var r = rate || AZURE.rate;
    return (
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="' +
      AZURE.language +
      '"><voice name="' +
      AZURE.voice +
      '"><prosody rate="' +
      r +
      '">' +
      inner +
      "</prosody></voice></speak>"
    );
  }

  function playAudioData(arrayBuffer) {
    unlockAudio();
    if (!arrayBuffer || !arrayBuffer.byteLength) {
      return Promise.reject(new Error("empty audio"));
    }
    if (audioCtx) {
      return audioCtx.decodeAudioData(arrayBuffer.slice(0)).then(function (buf) {
        return new Promise(function (resolve, reject) {
          var src = audioCtx.createBufferSource();
          voiceSource = src;
          src.buffer = buf;
          src.connect(audioCtx.destination);
          src.onended = function () {
            if (voiceSource === src) voiceSource = null;
            resolve();
          };
          try { src.start(0); }
          catch (err) { reject(err); }
        });
      });
    }
    var url = URL.createObjectURL(new Blob([arrayBuffer], { type: "audio/wav" }));
    var a = new Audio(url);
    voiceAudio = a;
    return a.play().then(function () {
      return new Promise(function (resolve) {
        a.onended = function () {
          URL.revokeObjectURL(url);
          if (voiceAudio === a) voiceAudio = null;
          resolve();
        };
      });
    });
  }

  function speakSsml(inner, rate) {
    stopVoice();
    unlockAudio();
    var ssml = wrapSpeak(inner, rate);
    var plain = String(inner).replace(/<[^>]+>/g, " ");
    return loadSdk()
      .then(function (sdk) {
        var cfg = sdk.SpeechConfig.fromSubscription(AZURE.subscriptionKey, AZURE.region);
        cfg.speechSynthesisVoiceName = AZURE.voice;
        var synth = new sdk.SpeechSynthesizer(cfg, null);
        currentSynth = synth;
        return new Promise(function (resolve, reject) {
          synth.speakSsmlAsync(
            ssml,
            function (result) {
              var data = result && result.audioData;
              try { synth.close(); } catch (e) {}
              currentSynth = null;
              if (data && data.byteLength) {
                playAudioData(data).then(resolve, reject);
                return;
              }
              reject(new Error("azure empty"));
            },
            function (err) {
              try { synth.close(); } catch (e2) {}
              currentSynth = null;
              reject(err || new Error("azure fail"));
            }
          );
        });
      })
      .catch(function () {
        return browserSpeak(plain, rate === SLOW ? 0.75 : 0.88);
      });
  }

  function browserSpeak(text, rate) {
    return new Promise(function (resolve) {
      if (!global.speechSynthesis) {
        resolve();
        return;
      }
      var u = new SpeechSynthesisUtterance(String(text).replace(/\s+/g, " ").trim());
      u.lang = "en-GB";
      u.rate = rate || 0.88;
      u.onend = resolve;
      u.onerror = resolve;
      global.speechSynthesis.speak(u);
    });
  }

  function lesson() {
    return global.BB_LESSON || null;
  }

  function speakWord(word, slow) {
    unlockAudio();
    return speakSsml(escapeSsml(word), slow ? SLOW : AZURE.rate);
  }

  function speakLetter() {
    var L = lesson();
    var cap = L && L.letterCap ? L.letterCap : "B";
    var small = L && L.letterSmall ? L.letterSmall : "b";
    return speakSsml(escapeSsml(cap + ". " + small + "."), SLOW);
  }

  function speakPhoneme() {
    return speakSsml('<phoneme alphabet="ipa" ph="b">b</phoneme>', SLOW);
  }

  function speakListenIntro() {
    var L = lesson();
    var phrase = L && L.mascot ? L.mascot.phrase : "big bear";
    var cap = L && L.letterCap ? L.letterCap : "B";
    var small = L && L.letterSmall ? L.letterSmall : "b";
    return speakSsml(escapeSsml(cap + ", " + small + ". " + phrase + "."), SLOW);
  }

  function speakChant(ids) {
    var L = lesson();
    var list = ids || (L && L.chantOrder) || [];
    stopVoice();
    speakChain = Promise.resolve();
    list.forEach(function (id) {
      var w = L && L.words && L.words[id];
      if (!w) return;
      speakChain = speakChain.then(function () {
        return speakWord(w.en, true);
      });
    });
    return speakChain;
  }

  function playFile() {
    return speakListenIntro();
  }

  function playClip(_src, _start, _end, wordText) {
    if (wordText) return speakWord(wordText, true);
    return Promise.resolve();
  }

  function warm() {
    unlockAudio();
    return loadSdk().catch(function () { return null; });
  }

  warm();

  global.AAAudio = {
    AZURE: AZURE,
    SLOW: SLOW,
    stop: stop,
    stopTrack: stop,
    stopClip: stop,
    stopVoice: stopVoice,
    isTrackPlaying: isTrackPlaying,
    playFile: playFile,
    playClip: playClip,
    speakWord: speakWord,
    speakLetter: speakLetter,
    speakPhoneme: speakPhoneme,
    speakListenIntro: speakListenIntro,
    speakChant: speakChant,
    warm: warm,
    unlock: unlockAudio
  };
})(window);
