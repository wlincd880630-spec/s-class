/**
 * 国家地理分级阅读 · 复习游戏共享工具
 * 依赖：各书 words-data.js、azure-tts.js、audio manifest
 * 配置：window.NG_REVIEW = { wordsApi, ttsApi, title, accent, hubUrl, gamesUrl }
 */
(function (global) {
  "use strict";

  var AZURE_CONFIG = {
    subscriptionKey: "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu",
    region: "southeastasia",
    language: "en-GB",
    voice: "en-GB-RyanNeural",
    speechRate: "0.90",
  };

  var speechSdkReady = null;
  var currentSynthesizer = null;

  function cfg() {
    return global.NG_REVIEW || {};
  }

  function wordsApi() {
    var name = cfg().wordsApi;
    return name && global[name] ? global[name] : null;
  }

  function ttsApi() {
    var name = cfg().ttsApi;
    return name && global[name] ? global[name] : null;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function chunkGroups(arr, size) {
    size = size || 4;
    var out = [];
    for (var i = 0; i < arr.length; i += size) {
      out.push(arr.slice(i, i + size));
    }
    return out;
  }

  function wordImg(w) {
    var api = wordsApi();
    if (!api) return "";
    var base = api.IMG_BASE || "";
    var file = api.wordImgFile ? api.wordImgFile(w) : w.word;
    return base + file + ".png";
  }

  function isMazeEligible(w) {
    return w && w.word && w.word.indexOf(" ") < 0 && w.word.replace(/-/g, "").length >= 2;
  }

  function getSelected() {
    var api = wordsApi();
    return api ? api.getSelected() : [];
  }

  function loadSpeechSDK() {
    if (global.SpeechSDK) return Promise.resolve();
    if (speechSdkReady) return speechSdkReady;
    speechSdkReady = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://aka.ms/csspeech/jsbrowserpackageraw";
      s.onload = function () {
        resolve();
      };
      s.onerror = function () {
        reject(new Error("Speech SDK 加载失败"));
      };
      document.head.appendChild(s);
    });
    return speechSdkReady;
  }

  function escapeSsml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function buildSpeakSsml(text, slow) {
    var rate = slow ? "0.80" : AZURE_CONFIG.speechRate;
    var safe = escapeSsml(text);
    return (
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="' +
      AZURE_CONFIG.language +
      '"><voice name="' +
      AZURE_CONFIG.voice +
      '"><prosody rate="' +
      rate +
      '">' +
      safe +
      "</prosody></voice></speak>"
    );
  }

  function fallbackSpeak(text, onEnd, slow) {
    if (!global.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }
    try {
      global.speechSynthesis.cancel();
    } catch (e0) {}
    var u = new global.SpeechSynthesisUtterance(String(text));
    u.lang = "en-GB";
    u.rate = slow ? 0.82 : Number(AZURE_CONFIG.speechRate) || 0.9;
    u.onend = function () {
      if (onEnd) onEnd();
    };
    u.onerror = function () {
      if (onEnd) onEnd();
    };
    global.speechSynthesis.speak(u);
  }

  function stopSpeak() {
    try {
      if (global.speechSynthesis) global.speechSynthesis.cancel();
    } catch (e1) {}
    if (currentSynthesizer) {
      try {
        currentSynthesizer.close();
      } catch (e2) {}
      currentSynthesizer = null;
    }
    var tts = ttsApi();
    if (tts && tts.stop) tts.stop();
  }

  function speakAzure(text, onEnd, slow) {
    return loadSpeechSDK()
      .then(function () {
        if (currentSynthesizer) {
          try {
            currentSynthesizer.close();
          } catch (e3) {}
          currentSynthesizer = null;
        }
        var sdk = global.SpeechSDK;
        var speechCfg = sdk.SpeechConfig.fromSubscription(
          AZURE_CONFIG.subscriptionKey,
          AZURE_CONFIG.region
        );
        speechCfg.speechSynthesisVoiceName = AZURE_CONFIG.voice;
        var audioCfg = sdk.AudioConfig.fromDefaultSpeakerOutput();
        var synthesizer = new sdk.SpeechSynthesizer(speechCfg, audioCfg);
        currentSynthesizer = synthesizer;
        return new Promise(function (resolve) {
          synthesizer.speakSsmlAsync(
            buildSpeakSsml(text, slow),
            function () {
              try {
                synthesizer.close();
              } catch (e4) {}
              currentSynthesizer = null;
              if (onEnd) onEnd();
              resolve(true);
            },
            function () {
              try {
                synthesizer.close();
              } catch (e5) {}
              currentSynthesizer = null;
              fallbackSpeak(text, onEnd, slow);
              resolve(false);
            }
          );
        });
      })
      .catch(function () {
        fallbackSpeak(text, onEnd, slow);
        return false;
      });
  }

  function speak(text, options) {
    options = options || {};
    if (!text) return Promise.resolve(false);
    stopSpeak();
    var slow = !!options.slow;
    var onEnd = options.onEnd || options.onDone;
    var tts = ttsApi();

    function tryLocal() {
      if (!tts || !tts.speak) return Promise.resolve(false);
      try {
        var result = tts.speak(text, {
          slow: slow,
          rate: slow ? "0.80" : AZURE_CONFIG.speechRate,
          onDone: function () {
            if (onEnd) onEnd();
          },
        });
        if (result && typeof result.then === "function") {
          return result.then(function (ok) {
            return !!ok;
          });
        }
        return Promise.resolve(true);
      } catch (e6) {
        return Promise.resolve(false);
      }
    }

    return tryLocal().then(function (ok) {
      if (ok) return true;
      return speakAzure(text, onEnd, slow);
    });
  }

  function buildMcOptions(correct, pool, count) {
    count = count || 3;
    var distractors = shuffle(
      pool.filter(function (w) {
        return w.word !== correct.word;
      })
    ).slice(0, count - 1);
    return shuffle([correct].concat(distractors));
  }

  function showFeedback(el, msg, good) {
    if (!el) return;
    el.textContent = msg;
    el.className = "ng-feedback " + (good ? "good" : "bad");
  }

  function hideFeedback(el) {
    if (!el) return;
    el.className = "ng-feedback hidden";
  }

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ":" + String(s).padStart(2, "0");
  }

  function GameTimer(el) {
    this.el = el;
    this.sec = 0;
    this._id = null;
  }

  GameTimer.prototype.start = function () {
    var self = this;
    this.stop();
    this.sec = 0;
    if (this.el) this.el.textContent = formatTime(0);
    this._id = setInterval(function () {
      self.sec++;
      if (self.el) self.el.textContent = formatTime(self.sec);
    }, 1000);
  };

  GameTimer.prototype.stop = function () {
    if (this._id) {
      clearInterval(this._id);
      this._id = null;
    }
    return this.sec;
  };

  function showDonePanel(el, stats) {
    if (!el) return;
    var accuracy =
      stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    el.className = "ng-stage ng-done";
    el.innerHTML =
      "<h2>🎉 " +
      (stats.title || "完成！") +
      "</h2>" +
      '<div class="stats-grid">' +
      '<div class="stat"><div class="val">' +
      stats.correct +
      '</div><div class="lbl">正确</div></div>' +
      '<div class="stat"><div class="val">' +
      stats.wrong +
      '</div><div class="lbl">错误</div></div>' +
      '<div class="stat"><div class="val">' +
      accuracy +
      '%</div><div class="lbl">正确率</div></div>' +
      '<div class="stat"><div class="val">' +
      formatTime(stats.timeSec || 0) +
      '</div><div class="lbl">用时</div></div>' +
      "</div>" +
      '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem;margin-top:1rem;">' +
      '<button type="button" class="ng-btn primary" id="ngRetryBtn">再玩一次</button>' +
      '<a class="ng-btn" href="' +
      (cfg().gamesUrl || "index.html") +
      '">返回游戏列表</a>' +
      "</div>";
    var retry = el.querySelector("#ngRetryBtn");
    if (retry && stats.onRetry) {
      retry.addEventListener("click", stats.onRetry);
    }
  }

  function speakBtn(word) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ng-btn sm";
    btn.title = "朗读";
    btn.textContent = "🔊";
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      speak(word);
    });
    return btn;
  }

  /* ── 7×7 单词迷宫生成 ── */
  function generateMazeGrid7(words) {
    var MAZE_SIZE = 7;
    var DIR_SLOTS = [
      { id: "lr", dr: 0, dc: 1, quadrant: 0 },
      { id: "rl", dr: 0, dc: -1, quadrant: 1 },
      { id: "tb", dr: 1, dc: 0, quadrant: 2 },
      { id: "bt", dr: -1, dc: 0, quadrant: 3 },
    ];

    function lettersOf(word) {
      return word.word.replace(/[\s-]/g, "").toLowerCase().split("");
    }

    function quadrantsFor(size) {
      var midR = Math.floor(size / 2);
      var midC = Math.floor(size / 2);
      return [
        { rMin: 0, rMax: midR - 1, cMin: 0, cMax: midC - 1 },
        { rMin: 0, rMax: midR - 1, cMin: midC, cMax: size - 1 },
        { rMin: midR, rMax: size - 1, cMin: 0, cMax: midC - 1 },
        { rMin: midR, rMax: size - 1, cMin: midC, cMax: size - 1 },
      ];
    }

    function fits(size, len, r, c, dir) {
      for (var i = 0; i < len; i++) {
        var nr = r + dir.dr * i;
        var nc = c + dir.dc * i;
        if (nr < 0 || nr >= size || nc < 0 || nc >= size) return false;
      }
      return true;
    }

    function buildCells(grid, size, letters, r, c, dir) {
      if (!fits(size, letters.length, r, c, dir)) return null;
      var cells = [];
      for (var i = 0; i < letters.length; i++) {
        var nr = r + dir.dr * i;
        var nc = c + dir.dc * i;
        var existing = grid[nr][nc];
        if (existing !== "" && existing !== letters[i]) return null;
        cells.push({ r: nr, c: nc, letter: letters[i] });
      }
      return cells;
    }

    function candidates(size, len, dir, quad) {
      var cr = (quad.rMin + quad.rMax) / 2;
      var cc = (quad.cMin + quad.cMax) / 2;
      var list = [];
      var r, c;
      for (r = quad.rMin; r <= quad.rMax; r++) {
        for (c = quad.cMin; c <= quad.cMax; c++) {
          if (fits(size, len, r, c, dir)) {
            list.push({ r: r, c: c, dist: Math.abs(r - cr) + Math.abs(c - cc) });
          }
        }
      }
      list.sort(function (a, b) {
        return a.dist - b.dist;
      });
      var near = list.slice(0, Math.max(4, Math.ceil(list.length * 0.5)));
      return shuffle(near.length ? near : list);
    }

    function applyCells(grid, usage, cells) {
      cells.forEach(function (cell) {
        grid[cell.r][cell.c] = cell.letter;
        usage[cell.r][cell.c]++;
      });
    }

    function revertCells(grid, usage, cells) {
      cells.forEach(function (cell) {
        usage[cell.r][cell.c]--;
        if (usage[cell.r][cell.c] === 0) grid[cell.r][cell.c] = "";
      });
    }

    function placeAll(grid, usage, size, pairs, idx, placements) {
      if (idx >= pairs.length) return placements;
      var pair = pairs[idx];
      var letters = lettersOf(pair.word);
      var dirs = pair.dir;
      var quad = pair.quad;
      var candList = candidates(size, letters.length, dirs, quad);
      var ci;
      for (ci = 0; ci < candList.length; ci++) {
        var pos = candList[ci];
        var cells = buildCells(grid, size, letters, pos.r, pos.c, dirs);
        if (!cells) continue;
        applyCells(grid, usage, cells);
        var result = placeAll(grid, usage, size, pairs, idx + 1, placements.concat([
          { word: pair.word, cells: cells, dir: dirs.id },
        ]));
        if (result) return result;
        revertCells(grid, usage, cells);
      }
      return null;
    }

    function fillNoise(grid, size) {
      var r, c;
      for (r = 0; r < size; r++) {
        for (c = 0; c < size; c++) {
          if (!grid[r][c]) {
            grid[r][c] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
          }
        }
      }
    }

    function tryLayout(wordList, size) {
      var grid = Array.from({ length: size }, function () {
        return Array.from({ length: size }, function () {
          return "";
        });
      });
      var usage = Array.from({ length: size }, function () {
        return Array.from({ length: size }, function () {
          return 0;
        });
      });
      var quads = quadrantsFor(size);
      var slots = shuffle(DIR_SLOTS.slice());
      var ordered = wordList.slice().sort(function (a, b) {
        return lettersOf(b).length - lettersOf(a).length;
      });
      var pairs = ordered.map(function (word, i) {
        return { word: word, dir: slots[i], quad: quads[slots[i].quadrant] };
      });
      pairs = shuffle(pairs);
      var placements = placeAll(grid, usage, size, pairs, 0, []);
      if (!placements || placements.length !== wordList.length) return null;
      fillNoise(grid, size);
      return { grid: grid, placements: shuffle(placements), size: size };
    }

    var list = words.slice(0, 4);
    if (list.length < 4) return { grid: [[]], placements: [], size: MAZE_SIZE };

    var sizes = [MAZE_SIZE, 8];
    var si, retry;
    for (si = 0; si < sizes.length; si++) {
      for (retry = 0; retry < 200; retry++) {
        var result = tryLayout(shuffle(list.slice()), sizes[si]);
        if (result) return result;
      }
    }
    return tryLayout(list, 8) || { grid: [[]], placements: [], size: 8 };
  }

  global.NgReview = {
    AZURE_CONFIG: AZURE_CONFIG,
    cfg: cfg,
    wordsApi: wordsApi,
    shuffle: shuffle,
    chunkGroups: chunkGroups,
    wordImg: wordImg,
    isMazeEligible: isMazeEligible,
    getSelected: getSelected,
    speak: speak,
    stopSpeak: stopSpeak,
    buildMcOptions: buildMcOptions,
    showFeedback: showFeedback,
    hideFeedback: hideFeedback,
    GameTimer: GameTimer,
    showDonePanel: showDonePanel,
    speakBtn: speakBtn,
    generateMazeGrid7: generateMazeGrid7,
    formatTime: formatTime,
    boot: function (run) {
      function start() {
        if (typeof global.NgReview === "undefined") {
          showBootError("游戏脚本未加载，请检查网络后刷新。");
          return;
        }
        var api = wordsApi();
        if (!api || !api.getSelected) {
          showBootError("词表未加载，请返回游戏列表重试。");
          return;
        }
        try {
          run(global.NgReview);
        } catch (err) {
          console.error(err);
          showBootError("游戏初始化失败：" + (err && err.message ? err.message : String(err)));
        }
      }
      function showBootError(msg) {
        var stage = global.document && global.document.getElementById("stage");
        if (stage) {
          stage.innerHTML =
            '<p class="ng-hint">' +
            msg +
            '<br><a href="index.html">返回游戏列表</a> · <a href="settings.html">选词设置</a></p>';
        }
        var btn = global.document && global.document.getElementById("btnStart");
        if (btn) btn.style.display = "none";
      }
      if (global.document.readyState === "loading") {
        global.document.addEventListener("DOMContentLoaded", start);
      } else {
        start();
      }
    },
    renderWordPreview: function (pool) {
      var el = global.document && global.document.getElementById("wordPreview");
      if (!el || !pool || !pool.length) return;
      el.textContent =
        "本次已选 " +
        pool.length +
        " 个单词：" +
        pool
          .map(function (w) {
            return w.word + "（" + w.zh + "）";
          })
          .join(" · ");
    },
  };
})(typeof window !== "undefined" ? window : this);
