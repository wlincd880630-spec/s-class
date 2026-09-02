/**
 * 教材 MP3 与单词语音分轨：点图、排卡不会打断正在播放的 Track。
 */
(function (global) {
  "use strict";

  var AZURE = {
    subscriptionKey: "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
    region: "southeastasia",
    language: "en-GB",
    voice: "en-GB-RyanNeural",
    rate: "0.85"
  };

  var sdkPromise = null;
  var trackAudio = null;
  var clipAudio = null;
  var clipTimer = null;
  var currentSynth = null;

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

  function stopClip() {
    if (clipTimer) {
      clearInterval(clipTimer);
      clipTimer = null;
    }
    killAudio(clipAudio);
    clipAudio = null;
  }

  function stopVoice() {
    if (currentSynth) {
      try { currentSynth.close(); } catch (e) {}
      currentSynth = null;
    }
    if (global.speechSynthesis) {
      try { global.speechSynthesis.cancel(); } catch (e3) {}
    }
  }

  function stop() {
    stopTrack();
    stopClip();
    stopVoice();
  }

  function isTrackPlaying() {
    return !!(trackAudio && !trackAudio.paused);
  }

  function playFile(src) {
    stopTrack();
    return new Promise(function (resolve, reject) {
      var a = new Audio(src);
      trackAudio = a;
      a.onended = function () { resolve(); };
      a.onerror = function () { reject(new Error("audio error")); };
      a.play().catch(reject);
    });
  }

  function playClip(src, start, end) {
    stopClip();
    return new Promise(function (resolve, reject) {
      var a = new Audio(src);
      clipAudio = a;
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        try { a.pause(); } catch (e) {}
        if (clipTimer) {
          clearInterval(clipTimer);
          clipTimer = null;
        }
        resolve();
      }
      a.onerror = function () { reject(new Error("clip error")); };
      a.onended = finish;
      a.onloadedmetadata = function () {
        try { a.currentTime = Math.max(0, start || 0); } catch (e) {}
        a.play().catch(reject);
        clipTimer = setInterval(function () {
          if (end && a.currentTime >= end) finish();
        }, 80);
      };
    });
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

  function speakSsml(inner, rate) {
    stopVoice();
    var ssml = wrapSpeak(inner, rate);
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
              try { synth.close(); } catch (e) {}
              currentSynth = null;
              var ok = result && result.reason === sdk.ResultReason.SynthesizingAudioCompleted;
              if (ok) resolve();
              else reject(new Error("azure empty"));
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
        return browserSpeak(inner.replace(/<[^>]+>/g, " "));
      });
  }

  function browserSpeak(text) {
    return new Promise(function (resolve) {
      if (!global.speechSynthesis) {
        resolve();
        return;
      }
      var u = new SpeechSynthesisUtterance(String(text).replace(/\s+/g, " ").trim());
      u.lang = "en-GB";
      u.rate = 0.88;
      u.onend = resolve;
      u.onerror = resolve;
      global.speechSynthesis.speak(u);
    });
  }

  function speakWord(word, slow) {
    return speakSsml(escapeSsml(word), slow ? "0.65" : AZURE.rate);
  }

  global.AAAudio = {
    AZURE: AZURE,
    stop: stop,
    stopTrack: stopTrack,
    stopClip: stopClip,
    stopVoice: stopVoice,
    isTrackPlaying: isTrackPlaying,
    playFile: playFile,
    playClip: playClip,
    speakWord: speakWord
  };
})(window);
