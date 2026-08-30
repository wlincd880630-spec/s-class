/* L05 Pronouns · 纸质测试页逻辑（年级分层 · 三套交叉 · DeepSeek · 配图） */
(function () {
  "use strict";

  var DATA = window.L05PronounsTestData;
  if (!DATA) {
    document.body.innerHTML = "<p style='padding:2rem'>缺少 pronouns-test-data.js</p>";
    return;
  }

  var STORAGE_GRADE = "l05-pronouns-test-grade";
  var DEEPSEEK_KEY =
    (window.__DEEPSEEK_API_KEY__ ||
      window.__DEEPSEEK_API_KEY ||
      "sk-daa16008e81843deba6fefe9dce51465").trim();
  var DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";

  var state = {
    grade: localStorage.getItem(STORAGE_GRADE) || "g7",
    items: [],
    mixNote: "",
    source: "bank",
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setStatus(msg, kind) {
    var el = document.getElementById("ptStatus");
    if (!el) return;
    el.textContent = msg || "";
    el.className = "pt-status no-print" + (kind ? " is-" + kind : "");
  }

  function gradeMeta(id) {
    return (DATA.grades && DATA.grades[id]) || (DATA.grades && DATA.grades.g7) || null;
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

  /** 从该年级 3 套题库交叉抽题：轮流从各套取题，再打乱顺序 */
  function crossPick(sets, count) {
    var pools = (sets || []).map(function (s) {
      return shuffle(s || []);
    });
    var picked = [];
    var guard = 0;
    while (picked.length < count && guard < 200) {
      guard++;
      var progressed = false;
      for (var s = 0; s < pools.length && picked.length < count; s++) {
        if (pools[s].length) {
          var item = pools[s].pop();
          picked.push(Object.assign({}, item, { _fromSet: s + 1 }));
          progressed = true;
        }
      }
      if (!progressed) break;
    }
    return shuffle(picked).map(function (it, i) {
      return Object.assign({}, it, { n: i + 1 });
    });
  }

  function rebuildFromBank() {
    var g = gradeMeta(state.grade);
    if (!g || !g.sets || !g.sets.length) {
      state.items = [];
      state.mixNote = "";
      return;
    }
    var count = 10;
    state.items = crossPick(g.sets, count);
    var used = {};
    state.items.forEach(function (it) {
      used[it._fromSet] = (used[it._fromSet] || 0) + 1;
    });
    var parts = Object.keys(used)
      .sort()
      .map(function (k) {
        return "第" + k + "套×" + used[k];
      });
    state.mixNote = g.label + " · 三套交叉（" + parts.join(" · ") + "）";
    state.source = "bank";
  }

  function imgUrl(prompt, seed) {
    var base =
      String(prompt || "cute vivid 3D cartoon kids school scene soft lighting") +
      ", cute vivid 3D cartoon, soft pastel lighting, kid-friendly, no text, no letters, no watermark";
    var clean = base.replace(/[#?&]/g, " ").slice(0, 200);
    return (
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(clean) +
      "?nologo=true&width=640&height=480&model=turbo&seed=" +
      (seed || 1)
    );
  }

  function renderTable(showHints) {
    var T = DATA.table;
    var head =
      "<tr>" +
      T.headers
        .map(function (h) {
          return "<th>" + esc(h) + "</th>";
        })
        .join("") +
      "</tr>";
    var body = T.rows
      .map(function (row) {
        return (
          "<tr>" +
          row
            .map(function (cell, i) {
              if (i === 0) return "<td>" + esc(cell) + "</td>";
              var clean = String(cell).replace(/（[^）]*）/g, "").trim();
              if (showHints) {
                return '<td class="blank-cell">' + esc(clean) + "</td>";
              }
              return '<td class="blank-cell">&nbsp;</td>';
            })
            .join("") +
          "</tr>"
        );
      })
      .join("");
    return (
      '<div class="pt-table-wrap"><table class="pt-table' +
      (showHints ? " show-hints" : "") +
      '" id="ptTable"><thead>' +
      head +
      "</thead><tbody>" +
      body +
      "</tbody></table></div>"
    );
  }

  function stemWithBlank(q, personHint) {
    var hint = personHint ? ' <span class="person-hint">(' + esc(personHint) + ")</span>" : "";
    var once = false;
    return esc(q).replace(/_+/g, function () {
      if (once) return '<span class="blank">______</span>';
      once = true;
      return '<span class="blank">______</span>' + hint;
    });
  }

  function renderQuestions() {
    return (
      '<ol class="pt-qlist">' +
      state.items
        .map(function (it, i) {
          var n = it.n || i + 1;
          var seed = (state.grade.charCodeAt(1) || 7) * 100 + n * 17 + (it.answer || "").length;
          var src = imgUrl(it.imgPrompt, seed);
          return (
            '<li class="pt-q">' +
            '<span class="num">' +
            String(n).padStart(2, "0") +
            "</span>" +
            '<div class="pt-q-main">' +
            '<div class="stem" lang="en">' +
            stemWithBlank(it.q, it.personHint) +
            "</div>" +
            '<figure class="pt-q-fig">' +
            '<img src="' +
            esc(src) +
            '" alt="题意配图" loading="lazy" crossorigin="anonymous" />' +
            '<figcaption class="no-print">卡通 3D · 语境插图</figcaption>' +
            "</figure>" +
            "</div></li>"
          );
        })
        .join("") +
      "</ol>"
    );
  }

  function renderAnswers() {
    return (
      '<div class="pt-answers" id="ptAnswers">' +
      "<h2>参考答案（教师用 · 可单独打印本页）</h2>" +
      '<p class="pt-answers-note">' +
      esc(state.mixNote) +
      (state.source === "ai" ? " · DeepSeek 即时生成" : "") +
      "</p>" +
      '<div class="pt-answers-grid">' +
      state.items
        .map(function (it, i) {
          var n = it.n || i + 1;
          var typeMap = {
            subject: "主格",
            object: "宾格",
            possAdj: "形物",
            possPron: "名物",
            reflexive: "反身",
          };
          return (
            "<div><span>" +
            n +
            ".</span> <b lang='en'>" +
            esc(it.answer) +
            "</b> <i>" +
            esc(typeMap[it.type] || "") +
            "</i>" +
            (it.zh ? " · " + esc(it.zh) : "") +
            "</div>"
          );
        })
        .join("") +
      "</div></div>"
    );
  }

  function paint() {
    var showHints = !!(document.getElementById("chkHints") || {}).checked;
    var showKey = !!(document.getElementById("chkKey") || {}).checked;
    var sheet = document.getElementById("ptSheet");
    if (!sheet) return;
    sheet.classList.toggle("hints-on", showHints);
    var g = gradeMeta(state.grade);
    var label = (g && g.label) || state.grade;
    var qCount = state.items.length;

    sheet.innerHTML =
      '<header class="pt-banner">' +
      '<p class="brand">' +
      esc(DATA.brand || "Steven's Class") +
      " · Grammar L05</p>" +
      "<h1>" +
      esc(DATA.title) +
      "</h1>" +
      '<p class="sub">' +
      esc(label) +
      " · " +
      esc(DATA.subtitle || "") +
      " · 共 " +
      qCount +
      " 题填空</p>" +
      '<p class="mix">' +
      esc(state.mixNote) +
      "</p>" +
      "</header>" +
      '<div class="pt-body">' +
      '<div class="pt-meta">' +
      '<div class="field"><span>姓名</span><div class="line"></div></div>' +
      '<div class="field"><span>班级</span><div class="line"></div></div>' +
      '<div class="field"><span>日期</span><div class="line"></div></div>' +
      "</div>" +
      '<div class="pt-note"><strong>答题说明</strong><ol>' +
      (DATA.instructions || [])
        .map(function (x) {
          return "<li>" + esc(x) + "</li>";
        })
        .join("") +
      "<li>括号内是<strong>人称提示</strong>（如第一人称单数），不是答案。</li>" +
      "</ol></div>" +
      '<h2 class="pt-sec-title">一、代词对照表 <span class="badge">' +
      (showHints ? "提示已显示" : "空白练习") +
      "</span></h2>" +
      '<p class="pt-table-hint-tag">本卷表格已开启提示（答案可见），适合课堂对照练习。</p>' +
      renderTable(showHints) +
      '<h2 class="pt-sec-title">二、代词填空 <span class="badge">' +
      qCount +
      " 题 · " +
      esc(label) +
      "</span></h2>" +
      renderQuestions() +
      '<div class="pt-footer">' +
      "<div>Steven's Class · 五种代词纸质测试 · " +
      esc(label) +
      "</div>" +
      '<div class="pt-score">得分 <span class="box"></span> / ' +
      qCount +
      "</div>" +
      "</div>" +
      (showKey ? renderAnswers() : "") +
      "</div>";
  }

  function waitImages(root, timeoutMs) {
    var imgs = Array.prototype.slice.call((root || document).querySelectorAll("img"));
    if (!imgs.length) return Promise.resolve();
    return new Promise(function (resolve) {
      var left = imgs.length;
      var done = false;
      function tick() {
        left--;
        if (left <= 0 && !done) {
          done = true;
          resolve();
        }
      }
      imgs.forEach(function (img) {
        if (img.complete && img.naturalWidth) tick();
        else {
          img.addEventListener("load", tick, { once: true });
          img.addEventListener("error", tick, { once: true });
        }
      });
      setTimeout(function () {
        if (!done) {
          done = true;
          resolve();
        }
      }, timeoutMs || 12000);
    });
  }

  function printPdf() {
    paint();
    setStatus("正在等待配图加载…", "info");
    waitImages(document.getElementById("ptSheet"), 10000).then(function () {
      setStatus("");
      window.print();
    });
  }

  function downloadPdf() {
    var el = document.getElementById("ptSheet");
    if (!el) return;
    paint();
    if (typeof html2pdf === "undefined") {
      alert("PDF 组件加载中，请稍后再试；或使用「打印 / 另存 PDF」。");
      return;
    }
    var g = gradeMeta(state.grade);
    var opt = {
      margin: [8, 8, 10, 8],
      filename:
        "L05-五种代词-" + ((g && g.label) || state.grade) + "-纸质测试.pdf",
      image: { type: "jpeg", quality: 0.92 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };
    var btn = document.getElementById("btnDownload");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "配图加载中…";
    }
    setStatus("正在加载卡通配图，随后生成 PDF…", "info");
    waitImages(el, 14000).then(function () {
      if (btn) btn.textContent = "生成中…";
      return html2pdf().set(opt).from(el).save();
    })
      .then(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "下载 PDF";
        }
        setStatus("PDF 已下载", "ok");
      })
      .catch(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "下载 PDF";
        }
        setStatus("下载失败，请改用「打印 / 另存 PDF」", "err");
        alert("下载失败，请改用「打印 / 另存 PDF」。");
      });
  }

  function gradeDifficultyLine(grade) {
    var map = {
      g4: "四年级：短句日常语境；主格/宾格/形物为主",
      g5: "五年级：主格+宾格+形物，少量名物",
      g6: "六年级：五种代词入门，反身为基础用法",
      g7: "七年级：五种代词均衡，完整校园语境",
      g8: "八年级：更长语境，易混点辨析",
    };
    return map[grade] || map.g7;
  }

  function deepseekPaper(grade) {
    var sys =
      '你是英语教研老师。只输出 JSON：{"items":[{"q":"完整语境英文，空处用 ______","answer":"代词","type":"subject|object|possAdj|possPron|reflexive","personHint":"第一人称单数|第二人称单数|第三人称单数(男)|第三人称单数(女)|第三人称单数(物)|第一人称复数|第二人称复数|第三人称复数","imgPrompt":"英文画面描述 cute 3D cartoon no text","zh":"中文大意"}]}。正好10题。题干不要任何答案提示；必须有完整语境。';
    var user =
      "请按此难度生成一套代词填空：" +
      gradeDifficultyLine(grade) +
      "。题材新鲜，勿与常见教材原题雷同。";
    return fetch(DEEPSEEK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + DEEPSEEK_KEY,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.85,
        max_tokens: 3200,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user },
        ],
      }),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        var raw = (((j.choices || [])[0] || {}).message || {}).content || "";
        raw = raw.trim();
        if (raw.indexOf("```") === 0) {
          raw = raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
        }
        var parsed = JSON.parse(raw);
        var items = parsed.items || [];
        if (!items.length) throw new Error("empty");
        return items.slice(0, 10).map(function (it, i) {
          return {
            n: i + 1,
            q: String(it.q || "").trim(),
            answer: String(it.answer || "").trim(),
            type: it.type || "subject",
            personHint: it.personHint || "第三人称单数(物)",
            imgPrompt:
              (it.imgPrompt || "cute 3D cartoon school kids scene") +
              ", cute vivid 3D cartoon, soft pastel lighting, no text",
            zh: it.zh || "",
          };
        });
      });
  }

  function onAi() {
    var btn = document.getElementById("btnAi");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "生成中…";
    }
    setStatus("DeepSeek 正在为" + ((gradeMeta(state.grade) || {}).label || "") + "生成新卷…", "info");
    deepseekPaper(state.grade)
      .then(function (items) {
        state.items = items;
        state.mixNote =
          ((gradeMeta(state.grade) || {}).label || "") + " · DeepSeek 即时全新组卷";
        state.source = "ai";
        paint();
        setStatus("AI 组卷完成 · 共 " + items.length + " 题", "ok");
      })
      .catch(function () {
        setStatus("DeepSeek 暂时不可用，已回退到本地三套交叉组卷", "err");
        rebuildFromBank();
        paint();
      })
      .finally(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "✨ AI 组卷";
        }
      });
  }

  function onGradeChange() {
    var sel = document.getElementById("selGrade");
    state.grade = (sel && sel.value) || "g7";
    try {
      localStorage.setItem(STORAGE_GRADE, state.grade);
    } catch (e) {}
    rebuildFromBank();
    paint();
    setStatus("已切换到" + ((gradeMeta(state.grade) || {}).label || "") + "，并重新交叉组卷", "ok");
  }

  function onShuffle() {
    rebuildFromBank();
    paint();
    setStatus("已从三套题库交叉随机换组 · " + state.mixNote, "ok");
  }

  function boot() {
    var sel = document.getElementById("selGrade");
    if (sel) {
      if (!DATA.grades[state.grade]) state.grade = "g7";
      sel.value = state.grade;
      sel.addEventListener("change", onGradeChange);
    }
    rebuildFromBank();
    paint();
    var chk = document.getElementById("chkHints");
    var chkKey = document.getElementById("chkKey");
    if (chk) chk.addEventListener("change", paint);
    if (chkKey) chkKey.addEventListener("change", paint);
    var bp = document.getElementById("btnPrint");
    if (bp) bp.addEventListener("click", printPdf);
    var bd = document.getElementById("btnDownload");
    if (bd) bd.addEventListener("click", downloadPdf);
    var bs = document.getElementById("btnShuffle");
    if (bs) bs.addEventListener("click", onShuffle);
    var ba = document.getElementById("btnAi");
    if (ba) ba.addEventListener("click", onAi);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
