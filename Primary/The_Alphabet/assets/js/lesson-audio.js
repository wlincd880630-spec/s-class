/**
 * 字母课语音：Chant 保留教材 MP3；其余练习用 Azure 英音慢速 TTS。
 * 自动读取 window.AA_LESSON、BB_LESSON、CC_LESSON 或 DD_LESSON。
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
  var trackAudio = null;
  var currentSynth = null;
  var audioCtx = null;
  var voiceSource = null;
  var voiceAudio = null;

  function lesson() {
    return global.AA_LESSON || global.BB_LESSON || global.CC_LESSON || global.DD_LESSON || global.EE_LESSON || global.FF_LESSON || null;
  }

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
      s.onerror = function () { reject(new Error("Speech SDK load failed")); };
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

  function killAudio(a) {
    if (!a) return;
    try {
      a.pause();
      a.removeAttribute("src");
      a.load();
    } catch (e) {}
  }

  function stopTrack() {
    killAudio(trackAudio);
    trackAudio = null;
  }

  function unlockAudio() {
    var AC = global.AudioContext || global.webkitAudioContext;
    if (!AC) return null;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function stopVoice() {
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
    stopTrack();
    stopVoice();
  }

  function isTrackPlaying() {
    return !!(trackAudio && !trackAudio.paused);
  }

  function playMp3(src) {
    if (!src) return Promise.resolve();
    stopVoice();
    stopTrack();
    return new Promise(function (resolve, reject) {
      var a = new Audio(src);
      trackAudio = a;
      a.onended = function () { resolve(); };
      a.onerror = function () { reject(new Error("audio error")); };
      a.play().catch(reject);
    });
  }

  function playFile(src) {
    return playMp3(src);
  }

  function playChant() {
    var L = lesson();
    var src = L && L.tracks && (L.tracks.chant || L.tracks.t06);
    return playMp3(src);
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

  function speakWord(word, slow) {
    unlockAudio();
    return speakSsml(escapeSsml(word), slow ? SLOW : AZURE.rate);
  }

  function speakLetter() {
    var L = lesson();
    var pair = L && L.letter ? L.letter : "Aa";
    var cap = L && L.letterCap ? L.letterCap : pair.charAt(0);
    var small = L && L.letterSmall ? L.letterSmall : (pair.length > 1 ? pair.charAt(1) : pair.toLowerCase());
    return speakSsml(escapeSsml(cap + ". " + small + "."), SLOW);
  }

  function speakPhoneme() {
    var L = lesson();
    var ipa = L && L.soundIpa ? L.soundIpa.replace(/\//g, "") : "a";
    return speakSsml('<phoneme alphabet="ipa" ph="' + ipa + '">' + ipa + "</phoneme>", SLOW);
  }

  function speakListenIntro() {
    var L = lesson();
    var phrase = L && L.mascot ? L.mascot.phrase : "";
    var pair = L && L.letter ? L.letter : "Aa";
    var cap = L && L.letterCap ? L.letterCap : pair.charAt(0);
    var small = L && L.letterSmall ? L.letterSmall : (pair.length > 1 ? pair.charAt(1) : pair.toLowerCase());
    return speakSsml(escapeSsml(cap + ", " + small + ". " + phrase + "."), SLOW);
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
    stopTrack: stopTrack,
    stopClip: stop,
    stopVoice: stopVoice,
    isTrackPlaying: isTrackPlaying,
    playFile: playFile,
    playChant: playChant,
    speakWord: speakWord,
    speakLetter: speakLetter,
    speakPhoneme: speakPhoneme,
    speakListenIntro: speakListenIntro,
    warm: warm,
    unlock: unlockAudio
  };
})(window);
