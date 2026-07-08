#!/usr/bin/env python3
"""生成国家地理四本书的复习游戏 4-9（COS 资源路径 + 稳定初始化）"""
import os

ROOT = os.path.join(os.path.dirname(__file__), "..")
COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary"
ASSETS_REL = "../../assets"

BOOKS = [
    {
        "dir": "Jump Pup/jump-pup-review-games",
        "title": "Jump, Pup!",
        "emoji": "🐶",
        "words_api": "JumpPupWords",
        "tts_api": "JumpPupTTS",
        "accent": "#2e7d32",
        "audio_manifest": COS + "/Jump%20Pup/jump-pup-review-games/audio/audio-manifest.js",
        "audio_local": COS + "/Jump%20Pup/jump-pup-review-games/audio/local-audio.js",
    },
    {
        "dir": "Play Kitty/play-kitty-review-games",
        "title": "Play, Kitty!",
        "emoji": "🐱",
        "words_api": "PlayKittyWords",
        "tts_api": "PlayKittyTTS",
        "accent": "#c62828",
        "audio_manifest": COS + "/Play%20Kitty/play-kitty-review-games/audio/audio-manifest.js",
        "audio_local": COS + "/Play%20Kitty/play-kitty-review-games/audio/local-audio.js",
    },
    {
        "dir": "Peek Otter/peek-otter-review-games",
        "title": "Peek, Otter!",
        "emoji": "🦦",
        "words_api": "PeekOtterWords",
        "tts_api": "PeekOtterTTS",
        "accent": "#0277bd",
        "audio_manifest": COS + "/Peek%20Otter/peek-otter-review-games/audio/audio-manifest.js",
        "audio_local": COS + "/Peek%20Otter/peek-otter-review-games/audio/local-audio.js",
    },
    {
        "dir": "Helpers in your neighborhood/helpers-neighborhood-review-games",
        "title": "Helpers in Your Neighborhood",
        "emoji": "🏘️",
        "words_api": "HelpersNeighborhoodWords",
        "tts_api": "HelpersNeighborhoodTTS",
        "accent": "#6a1b9a",
        "audio_manifest": "../audio/audio-manifest.js",
        "audio_local": "../audio/local-audio.js",
    },
]

SHARED_CSS = ASSETS_REL + "/ng-review-shared.css?v=2"
SHARED_JS = ASSETS_REL + "/ng-review-shared.js?v=2"
RESPONSIVE_JS = ASSETS_REL + "/primary-responsive.js?v=2"
BUBBLE_BANNER = ASSETS_REL + "/ng-review-images/ng-bubble-game-banner.png"
SPIN_BANNER = ASSETS_REL + "/ng-review-images/ng-spin-wheel-banner.png"


def head(b, page_title):
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>{page_title} · {b['title']}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Noto+Sans+SC:wght@500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{SHARED_CSS}" />
  <script>window.NG_REVIEW={{wordsApi:"{b['words_api']}",ttsApi:"{b['tts_api']}",title:"{b['title']}",accent:"{b['accent']}",gamesUrl:"index.html"}};</script>
  <script src="{b['audio_manifest']}"></script>
  <script src="{b['audio_local']}"></script>
  <script src="azure-tts.js"></script>
  <script src="words-data.js"></script>
  <script src="{SHARED_JS}"></script>
  <style>:root {{ --ng-accent: {b['accent']}; }}</style>
</head>"""


def tail():
    return f"""  <script src="{RESPONSIVE_JS}" defer></script>
</body>
</html>
"""


def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Wrote", path)


def game4(b):
    e, a = b["emoji"], b["accent"]
    return head(b, "单词迷宫") + f"""
<body class="ng-game">
  <div class="ng-toolbar">
    <div><h1>{e} 单词迷宫</h1><div class="meta" id="metaBar">7×7 宫格 · 四方向藏词</div></div>
    <div class="btns"><a class="ng-btn" href="index.html">← 游戏列表</a><button type="button" class="ng-btn primary" id="btnStart">开始</button></div>
  </div>
  <div class="ng-stage" id="stage">
    <div class="ng-hint" id="wordPreview">加载词表…</div>
    <div class="ng-badge" id="groupBadge">点击「开始」生成迷宫</div>
    <div class="ng-hint">点击字母连成单词（横/竖直线），点「提交」确认。点击图片下方灰条显示中文。</div>
    <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span><span>已找到 <strong id="foundEl">0</strong>/4</span></div>
    <div class="ng-maze-targets" id="targets"></div>
    <p class="ng-maze-path" id="pathPreview"></p>
    <div class="ng-maze-grid" id="mazeGrid"></div>
    <div class="ng-maze-actions">
      <button type="button" class="ng-btn" id="btnHint">💡 提示（首字母）</button>
      <button type="button" class="ng-btn primary" id="btnSubmit">✓ 提交</button>
      <button type="button" class="ng-btn" id="btnClear">清除</button>
    </div>
    <div class="ng-feedback hidden" id="feedback"></div>
  </div>
  <script>
  NgReview.boot(function (NR) {{
    var words = NR.getSelected().filter(NR.isMazeEligible);
    NR.renderWordPreview(words);
    if (words.length < 4) {{
      document.getElementById("stage").innerHTML = '<p class="ng-hint">迷宫需要至少 4 个<strong>无空格</strong>单词，当前仅 ' + words.length + ' 个。<a href="settings.html">去选词设置</a></p>';
      document.getElementById("btnStart").style.display = "none"; return;
    }}
    var groups = NR.chunkGroups(NR.shuffle(words), 4), gi = 0, mazeData = null, selected = [], pathDir = null;
    var found = {{}}, foundPaths = {{}}, hintCells = {{}}, hintIdx = 0, correct = 0, wrong = 0, total = words.length, timer = null, pageWords = [];
    document.getElementById("metaBar").textContent = "共 " + words.length + " 词 · 每组 4 词";
    document.getElementById("btnStart").onclick = start;
    document.getElementById("btnHint").onclick = showHint;
    document.getElementById("btnSubmit").onclick = submit;
    document.getElementById("btnClear").onclick = clearSel;
    document.getElementById("mazeGrid").onclick = onCell;
    function start() {{ gi = 0; correct = 0; wrong = 0; timer = new NR.GameTimer(document.getElementById("timerEl")); timer.start(); document.getElementById("btnStart").classList.add("ng-hidden"); loadGroup(); }}
    function cellKey(r, c) {{ return r + "," + c; }}
    function loadGroup() {{
      if (gi >= groups.length) {{ finish(); return; }}
      pageWords = NR.shuffle(groups[gi].slice(0, 4)); found = {{}}; foundPaths = {{}}; hintCells = {{}}; hintIdx = 0; selected = []; pathDir = null;
      document.getElementById("groupBadge").textContent = "第 " + (gi + 1) + " / " + groups.length + " 组";
      mazeData = NR.generateMazeGrid7(pageWords);
      if (!mazeData.placements || mazeData.placements.length < pageWords.length) {{
        NR.showFeedback(document.getElementById("feedback"), "迷宫生成中…", true);
        mazeData = NR.generateMazeGrid7(NR.shuffle(pageWords));
      }}
      renderTargets(); renderGrid();
      NR.hideFeedback(document.getElementById("feedback"));
      document.getElementById("foundEl").textContent = "0"; document.getElementById("pathPreview").textContent = "";
    }}
    function renderTargets() {{
      var el = document.getElementById("targets"); el.innerHTML = "";
      pageWords.forEach(function (w) {{
        var item = document.createElement("div"); item.className = "ng-maze-target" + (found[w.word] ? " done" : "");
        var img = document.createElement("img"); img.src = NR.wordImg(w); img.alt = w.word;
        var zh = document.createElement("div"); zh.className = "zh-area hidden-zh"; zh.textContent = w.zh;
        zh.onclick = function () {{ zh.classList.remove("hidden-zh"); }};
        var actions = document.createElement("div"); actions.className = "target-actions"; actions.appendChild(NR.speakBtn(w.word));
        var lbl = document.createElement("div"); lbl.className = "word-label"; lbl.textContent = found[w.word] ? w.word : "???";
        item.appendChild(img); item.appendChild(zh); item.appendChild(actions); item.appendChild(lbl); el.appendChild(item);
      }});
    }}
    function renderGrid() {{
      var g = document.getElementById("mazeGrid");
      if (!mazeData || !mazeData.grid || !mazeData.grid.length) {{ g.innerHTML = '<p class="ng-hint">迷宫加载失败，请点「开始」重试</p>'; return; }}
      var sz = mazeData.size || mazeData.grid.length;
      g.style.gridTemplateColumns = "repeat(" + sz + ", 1fr)"; g.innerHTML = "";
      mazeData.grid.forEach(function (row, r) {{ row.forEach(function (ch, c) {{
        var key = cellKey(r, c), cell = document.createElement("div"), cls = "ng-maze-cell";
        if (selected.some(function (s) {{ return s.key === key; }})) cls += " selected";
        if (hintCells[key]) cls += " hint";
        Object.keys(foundPaths).forEach(function (w) {{ if (foundPaths[w][key]) cls += " found"; }});
        cell.className = cls; cell.dataset.r = r; cell.dataset.c = c; cell.textContent = (ch || "?").toUpperCase(); g.appendChild(cell);
      }}); }});
    }}
    function getDir(a, b) {{ var dr = b.r - a.r, dc = b.c - a.c; if (dr && dc) return null; if (!dr && !dc) return null; return {{ dr: dr ? dr / Math.abs(dr) : 0, dc: dc ? dc / Math.abs(dc) : 0 }}; }}
    function onCell(e) {{
      var cell = e.target.closest(".ng-maze-cell"); if (!cell || !mazeData) return;
      var r = +cell.dataset.r, c = +cell.dataset.c, key = cellKey(r, c), ch = mazeData.grid[r][c];
      var idx = selected.findIndex(function (s) {{ return s.key === key; }});
      if (idx >= 0) {{ selected = selected.slice(0, idx + 1); pathDir = selected.length >= 2 ? getDir(selected[0], selected[1]) : null; }}
      else {{
        var pt = {{ r: r, c: c, ch: ch, key: key }};
        if (!selected.length) selected = [pt];
        else if (selected.length === 1) {{ var last = selected[0]; if (Math.abs(last.r - r) + Math.abs(last.c - c) === 1) {{ selected.push(pt); pathDir = getDir(selected[0], selected[1]); }} else {{ selected = [pt]; pathDir = null; }} }}
        else {{ var L = selected[selected.length - 1]; if (pathDir && L.r + pathDir.dr === r && L.c + pathDir.dc === c) selected.push(pt); else {{ selected = [pt]; pathDir = null; }} }}
      }}
      document.getElementById("pathPreview").textContent = selected.length ? "当前：" + selected.map(function (s) {{ return s.ch.toUpperCase(); }}).join(" ") : "";
      renderGrid();
    }}
    function clearSel() {{ selected = []; pathDir = null; document.getElementById("pathPreview").textContent = ""; renderGrid(); }}
    function showHint() {{
      var unfound = pageWords.filter(function (w) {{ return !found[w.word]; }}); if (!unfound.length) return;
      var target = unfound[hintIdx++ % unfound.length];
      var placement = (mazeData.placements || []).find(function (p) {{ return p.word.word === target.word; }}); if (!placement || !placement.cells.length) return;
      hintCells = {{}}; var first = placement.cells[0]; hintCells[cellKey(first.r, first.c)] = true; renderGrid();
      NR.showFeedback(document.getElementById("feedback"), "提示：" + target.word + " 的首字母已高亮", true);
    }}
    function submit() {{
      if (!selected.length) {{ NR.showFeedback(document.getElementById("feedback"), "请先点击字母连成单词！", false); return; }}
      var letters = selected.map(function (s) {{ return s.ch.toLowerCase(); }}).join("");
      var match = pageWords.find(function (w) {{ return !found[w.word] && w.word.replace(/-/g, "").toLowerCase() === letters; }});
      var fb = document.getElementById("feedback");
      if (match) {{
        correct++; found[match.word] = true; var pmap = {{}}; selected.forEach(function (s) {{ pmap[s.key] = true; }}); foundPaths[match.word] = pmap;
        NR.speak(match.word); NR.showFeedback(fb, "找到了 " + match.word + "！🎉", true); selected = []; pathDir = null;
        renderTargets(); renderGrid(); document.getElementById("foundEl").textContent = String(Object.keys(found).length);
        if (Object.keys(found).length === pageWords.length) {{ gi++; setTimeout(loadGroup, 1400); }}
      }} else {{ wrong++; NR.showFeedback(fb, "不对哦，请沿直线重新选择！", false); clearSel(); }}
    }}
    function finish() {{
      var t = timer.stop();
      NR.showDonePanel(document.getElementById("stage"), {{ title: "迷宫通关！", correct: correct, wrong: wrong, total: total, timeSec: t, onRetry: function () {{ location.reload(); }} }});
      document.querySelector(".ng-toolbar .btns").innerHTML = '<a class="ng-btn" href="index.html">← 游戏列表</a>';
    }}
  }});
  </script>
""" + tail()


def game5(b):
    e = b["emoji"]
    return head(b, "看中文选单词") + f"""
<body class="ng-game">
  <div class="ng-toolbar">
    <div><h1>{e} 看中文选单词</h1><div class="meta" id="metaBar"></div></div>
    <div class="btns"><a class="ng-btn" href="index.html">← 游戏列表</a><button type="button" class="ng-btn primary" id="btnStart">开始</button></div>
  </div>
  <div class="ng-stage" id="stage">
    <div class="ng-hint" id="wordPreview">加载词表…</div>
    <div class="ng-badge" id="progressBadge">点击「开始」出题</div>
    <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span></div>
    <div class="ng-quiz-prompt">
      <img id="qImg" src="" alt="" style="display:none" />
      <p class="zh-big" id="qZh">准备中…</p>
    </div>
    <div class="ng-quiz-options" id="options"></div>
    <div class="ng-feedback hidden" id="feedback"></div>
  </div>
  <script>
  NgReview.boot(function (NR) {{
    var pool = NR.getSelected(); NR.renderWordPreview(pool);
    if (pool.length < 3) {{ document.getElementById("stage").innerHTML = '<p class="ng-hint">请至少选择 3 个单词。<a href="settings.html">去设置</a></p>'; document.getElementById("btnStart").style.display = "none"; return; }}
    var queue = NR.shuffle(pool.slice()), qi = 0, correct = 0, wrong = 0, timer = null, answered = false;
    document.getElementById("metaBar").textContent = "共 " + pool.length + " 题 · 三选一";
    document.getElementById("btnStart").onclick = function () {{
      qi = 0; correct = 0; wrong = 0; timer = new NR.GameTimer(document.getElementById("timerEl")); timer.start();
      document.getElementById("btnStart").classList.add("ng-hidden"); showQ();
    }};
    function showQ() {{
      if (qi >= queue.length) {{ finish(); return; }}
      answered = false; var w = queue[qi];
      document.getElementById("progressBadge").textContent = "第 " + (qi + 1) + " / " + queue.length + " 题";
      document.getElementById("qZh").textContent = w.zh;
      var img = document.getElementById("qImg"); img.src = NR.wordImg(w); img.style.display = "block"; img.alt = w.word;
      NR.hideFeedback(document.getElementById("feedback"));
      var opts = NR.buildMcOptions(w, pool, 3), el = document.getElementById("options"); el.innerHTML = "";
      opts.forEach(function (o) {{
        var btn = document.createElement("button"); btn.type = "button"; btn.className = "ng-quiz-opt";
        var span = document.createElement("span"); span.textContent = o.word; btn.appendChild(span);
        var sp = NR.speakBtn(o.word); sp.style.marginLeft = "auto"; btn.appendChild(sp);
        btn.onclick = function () {{ pick(o, w, btn); }}; el.appendChild(btn);
      }});
    }}
    function pick(choice, answer, btn) {{
      if (answered) return; answered = true;
      var ok = choice.word === answer.word, fb = document.getElementById("feedback");
      if (ok) {{ correct++; btn.classList.add("correct"); NR.speak(answer.word); NR.showFeedback(fb, "正确！🎉", true); }}
      else {{ wrong++; btn.classList.add("wrong"); NR.showFeedback(fb, "正确答案是 " + answer.word, false); }}
      Array.prototype.forEach.call(document.getElementById("options").children, function (b) {{ b.disabled = true; }});
      qi++; setTimeout(showQ, ok ? 900 : 1400);
    }}
    function finish() {{
      var t = timer.stop();
      NR.showDonePanel(document.getElementById("stage"), {{ title: "挑战完成！", correct: correct, wrong: wrong, total: queue.length, timeSec: t, onRetry: function () {{ location.reload(); }} }});
      document.querySelector(".ng-toolbar .btns").innerHTML = '<a class="ng-btn" href="index.html">← 游戏列表</a>';
    }}
  }});
  </script>
""" + tail()


def game6(b):
    e, a = b["emoji"], b["accent"]
    return head(b, "图片单词连线") + f"""
<body class="ng-game">
  <div class="ng-toolbar">
    <div><h1>{e} 图片单词连线</h1><div class="meta">每页 3 组 · 先点图片再点单词</div></div>
    <div class="btns"><a class="ng-btn" href="index.html">← 游戏列表</a><button type="button" class="ng-btn primary" id="btnStart">开始</button></div>
  </div>
  <div class="ng-stage" id="stage">
    <div class="ng-hint" id="wordPreview">加载词表…</div>
    <div class="ng-badge" id="groupBadge">点击「开始」</div>
    <div class="ng-hint">左侧图片 ↔ 右侧单词配对（不显示中文）</div>
    <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span><span>已完成 <strong id="doneEl">0</strong>/3</span></div>
    <div class="ng-connect-wrap" id="connectWrap">
      <svg class="ng-connect-svg" id="linesSvg"></svg>
      <div class="ng-connect-col" id="leftCol"></div>
      <div class="ng-connect-col" id="rightCol"></div>
    </div>
    <div class="ng-feedback hidden" id="feedback"></div>
  </div>
  <script>
  NgReview.boot(function (NR) {{
    var pool = NR.getSelected(); NR.renderWordPreview(pool);
    if (pool.length < 3) {{ document.getElementById("stage").innerHTML = '<p class="ng-hint">请至少选择 3 个单词。<a href="settings.html">去设置</a></p>'; document.getElementById("btnStart").style.display = "none"; return; }}
    var groups = NR.chunkGroups(NR.shuffle(pool), 3), gi = 0, correct = 0, wrong = 0, total = pool.length, timer = null;
    var pageWords = [], matched = {{}}, selSide = null, selWord = null;
    document.getElementById("btnStart").onclick = function () {{
      gi = 0; correct = 0; wrong = 0; timer = new NR.GameTimer(document.getElementById("timerEl")); timer.start();
      document.getElementById("btnStart").classList.add("ng-hidden"); loadGroup();
    }};
    function loadGroup() {{
      if (gi >= groups.length) {{ finish(); return; }}
      pageWords = groups[gi]; matched = {{}}; selSide = null; selWord = null;
      document.getElementById("groupBadge").textContent = "第 " + (gi + 1) + " / " + groups.length + " 页";
      document.getElementById("doneEl").textContent = "0";
      NR.hideFeedback(document.getElementById("feedback"));
      document.getElementById("linesSvg").innerHTML = "";
      var left = document.getElementById("leftCol"), right = document.getElementById("rightCol");
      left.innerHTML = ""; right.innerHTML = "";
      pageWords.forEach(function (w) {{
        var li = document.createElement("div"); li.className = "ng-connect-item"; li.dataset.word = w.word;
        var img = document.createElement("img"); img.src = NR.wordImg(w); img.alt = w.word; li.appendChild(img);
        li.onclick = function (ev) {{ if (ev.target.closest(".ng-btn")) return; onPick("img", w.word, li); }}; left.appendChild(li);
      }});
      NR.shuffle(pageWords).forEach(function (w) {{
        var ri = document.createElement("div"); ri.className = "ng-connect-item"; ri.dataset.word = w.word;
        var lbl = document.createElement("div"); lbl.className = "en-label"; lbl.textContent = w.word; ri.appendChild(lbl);
        var sp = NR.speakBtn(w.word); ri.appendChild(sp);
        ri.onclick = function (ev) {{ if (ev.target.closest(".ng-btn")) return; onPick("word", w.word, ri); }}; right.appendChild(ri);
      }});
    }}
    function onPick(side, word, el) {{
      if (matched[word]) return;
      if (!selSide) {{ selSide = side; selWord = word; el.classList.add("selected"); return; }}
      if (selSide === side) {{
        document.querySelectorAll(".ng-connect-item.selected").forEach(function (e) {{ e.classList.remove("selected"); }});
        selSide = side; selWord = word; el.classList.add("selected"); return;
      }}
      var fb = document.getElementById("feedback");
      if (selWord === word) {{
        correct++; matched[word] = true;
        document.querySelectorAll('.ng-connect-item[data-word="' + word + '"]').forEach(function (e) {{ e.classList.remove("selected"); e.classList.add("matched"); }});
        drawLine(word); NR.speak(word); NR.showFeedback(fb, "配对成功！🎉", true);
        document.getElementById("doneEl").textContent = String(Object.keys(matched).length);
        if (Object.keys(matched).length === pageWords.length) {{ gi++; setTimeout(loadGroup, 1200); }}
      }} else {{ wrong++; NR.showFeedback(fb, "不对哦，再试试！", false); document.querySelectorAll(".ng-connect-item.selected").forEach(function (e) {{ e.classList.remove("selected"); }}); }}
      selSide = null; selWord = null;
    }}
    function drawLine(word) {{
      var items = document.querySelectorAll('.ng-connect-item[data-word="' + word + '"]'); if (items.length < 2) return;
      var wrap = document.getElementById("connectWrap").getBoundingClientRect();
      var a = items[0].getBoundingClientRect(), b = items[1].getBoundingClientRect();
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", a.right - wrap.left); line.setAttribute("y1", a.top + a.height / 2 - wrap.top);
      line.setAttribute("x2", b.left - wrap.left); line.setAttribute("y2", b.top + b.height / 2 - wrap.top);
      line.setAttribute("stroke", "{a}"); line.setAttribute("stroke-width", "3"); line.setAttribute("stroke-linecap", "round");
      document.getElementById("linesSvg").appendChild(line);
    }}
    function finish() {{
      var t = timer.stop();
      NR.showDonePanel(document.getElementById("stage"), {{ title: "连线完成！", correct: correct, wrong: wrong, total: total, timeSec: t, onRetry: function () {{ location.reload(); }} }});
      document.querySelector(".ng-toolbar .btns").innerHTML = '<a class="ng-btn" href="index.html">← 游戏列表</a>';
    }}
    window.addEventListener("resize", function () {{ var svg = document.getElementById("linesSvg"); if (!svg) return; var m = Object.assign({{}}, matched); svg.innerHTML = ""; Object.keys(m).forEach(drawLine); }});
  }});
  </script>
""" + tail()


def game7(b):
    e = b["emoji"]
    return head(b, "看单词选中文") + f"""
<body class="ng-game">
  <div class="ng-toolbar">
    <div><h1>{e} 看单词选中文</h1><div class="meta" id="metaBar"></div></div>
    <div class="btns"><a class="ng-btn" href="index.html">← 游戏列表</a><button type="button" class="ng-btn primary" id="btnStart">开始</button></div>
  </div>
  <div class="ng-stage" id="stage">
    <div class="ng-hint" id="wordPreview">加载词表…</div>
    <div class="ng-badge" id="progressBadge">点击「开始」出题</div>
    <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span></div>
    <div class="ng-quiz-prompt">
      <img id="qImg" src="" alt="" />
      <p class="en-big" id="qEn">—</p>
      <div style="margin-top:0.5rem;text-align:center;"><button type="button" class="ng-btn sm" id="btnSpeak">🔊 朗读单词</button></div>
    </div>
    <div class="ng-quiz-options" id="options"></div>
    <div class="ng-feedback hidden" id="feedback"></div>
  </div>
  <script>
  NgReview.boot(function (NR) {{
    var pool = NR.getSelected(); NR.renderWordPreview(pool);
    if (pool.length < 3) {{ document.getElementById("stage").innerHTML = '<p class="ng-hint">请至少选择 3 个单词。<a href="settings.html">去设置</a></p>'; document.getElementById("btnStart").style.display = "none"; return; }}
    var queue = NR.shuffle(pool.slice()), qi = 0, correct = 0, wrong = 0, timer = null, answered = false, cur = null;
    document.getElementById("metaBar").textContent = "共 " + pool.length + " 题 · 三选一";
    document.getElementById("btnStart").onclick = function () {{
      qi = 0; correct = 0; wrong = 0; timer = new NR.GameTimer(document.getElementById("timerEl")); timer.start();
      document.getElementById("btnStart").classList.add("ng-hidden"); showQ();
    }};
    document.getElementById("btnSpeak").onclick = function () {{ if (cur) NR.speak(cur.word); }};
    function showQ() {{
      if (qi >= queue.length) {{ finish(); return; }}
      answered = false; cur = queue[qi];
      document.getElementById("progressBadge").textContent = "第 " + (qi + 1) + " / " + queue.length + " 题";
      document.getElementById("qEn").textContent = cur.word;
      document.getElementById("qImg").src = NR.wordImg(cur); document.getElementById("qImg").alt = cur.word;
      NR.speak(cur.word); NR.hideFeedback(document.getElementById("feedback"));
      var zhPool = pool.map(function (w) {{ return w.zh; }});
      var opts = NR.shuffle([cur.zh].concat(NR.shuffle(zhPool.filter(function (z) {{ return z !== cur.zh; }})).slice(0, 2)));
      var el = document.getElementById("options"); el.innerHTML = "";
      opts.forEach(function (zh) {{
        var btn = document.createElement("button"); btn.type = "button"; btn.className = "ng-quiz-opt"; btn.textContent = zh;
        btn.onclick = function () {{ pick(zh, cur, btn); }}; el.appendChild(btn);
      }});
    }}
    function pick(choice, answer, btn) {{
      if (answered) return; answered = true;
      var ok = choice === answer.zh, fb = document.getElementById("feedback");
      if (ok) {{ correct++; btn.classList.add("correct"); NR.showFeedback(fb, "正确！" + answer.zh + " 🎉", true); }}
      else {{ wrong++; btn.classList.add("wrong"); NR.showFeedback(fb, "正确答案是：" + answer.zh, false); }}
      Array.prototype.forEach.call(document.getElementById("options").children, function (b) {{ b.disabled = true; }});
      qi++; setTimeout(showQ, ok ? 900 : 1400);
    }}
    function finish() {{
      var t = timer.stop();
      NR.showDonePanel(document.getElementById("stage"), {{ title: "挑战完成！", correct: correct, wrong: wrong, total: queue.length, timeSec: t, onRetry: function () {{ location.reload(); }} }});
      document.querySelector(".ng-toolbar .btns").innerHTML = '<a class="ng-btn" href="index.html">← 游戏列表</a>';
    }}
  }});
  </script>
""" + tail()


def game8(b):
    e = b["emoji"]
    return head(b, "泡泡捞词") + f"""
<body class="ng-game">
  <div class="ng-toolbar">
    <div><h1>{e} 泡泡捞词</h1><div class="meta">看中文 · 点击正确英文泡泡</div></div>
    <div class="btns"><a class="ng-btn" href="index.html">← 游戏列表</a><button type="button" class="ng-btn primary" id="btnStart">开始</button></div>
  </div>
  <div class="ng-stage" id="stage">
    <img class="ng-banner" src="{BUBBLE_BANNER}" alt="" onerror="this.style.display='none'" />
    <div class="ng-hint" id="wordPreview">加载词表…</div>
    <div class="ng-badge" id="progressBadge">点击「开始」</div>
    <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span><span>连击 <strong id="comboEl">0</strong></span><span>得分 <strong id="scoreEl">0</strong></span></div>
    <div class="ng-bubble-stage" id="bubbleStage">
      <div class="ng-bubble-prompt">
        <div class="zh" id="promptZh">准备中…</div>
        <div class="combo" id="promptHint">看中文，点击正确的英文泡泡</div>
      </div>
    </div>
    <div class="ng-feedback hidden" id="feedback"></div>
  </div>
  <script>
  NgReview.boot(function (NR) {{
    var pool = NR.getSelected(); NR.renderWordPreview(pool);
    if (pool.length < 4) {{ document.getElementById("stage").innerHTML = '<p class="ng-hint">请至少选择 4 个单词。<a href="settings.html">去设置</a></p>'; document.getElementById("btnStart").style.display = "none"; return; }}
    var queue = NR.shuffle(pool.slice()), qi = 0, correct = 0, wrong = 0, combo = 0, score = 0, timer = null, active = false;
    var colors = ["#e1f5fe", "#b3e5fc", "#81d4fa", "#4fc3f7", "#29b6f6"];
    document.getElementById("btnStart").onclick = function () {{
      qi = 0; correct = 0; wrong = 0; combo = 0; score = 0; active = true;
      timer = new NR.GameTimer(document.getElementById("timerEl")); timer.start();
      document.getElementById("btnStart").classList.add("ng-hidden"); nextRound();
    }};
    function nextRound() {{
      if (qi >= queue.length) {{ finish(); return; }}
      var answer = queue[qi];
      document.getElementById("progressBadge").textContent = "第 " + (qi + 1) + " / " + queue.length + " 题";
      document.getElementById("promptZh").textContent = answer.zh;
      document.getElementById("scoreEl").textContent = String(score);
      document.getElementById("comboEl").textContent = String(combo);
      NR.hideFeedback(document.getElementById("feedback"));
      clearBubbles();
      var opts = NR.buildMcOptions(answer, pool, 4), delay = 0;
      opts.forEach(function (w) {{ setTimeout(function () {{ spawnBubble(w, w.word === answer.word); }}, delay); delay += 400; }});
    }}
    function clearBubbles() {{ document.getElementById("bubbleStage").querySelectorAll(".ng-bubble").forEach(function (b) {{ b.remove(); }}); }}
    function spawnBubble(w, isAnswer) {{
      if (!active) return;
      var stage = document.getElementById("bubbleStage"), b = document.createElement("div");
      b.className = "ng-bubble"; var size = 68 + Math.random() * 24;
      b.style.width = size + "px"; b.style.height = size + "px";
      b.style.left = (8 + Math.random() * 70) + "%"; b.style.bottom = "8%";
      b.style.background = colors[Math.floor(Math.random() * colors.length)];
      b.textContent = w.word; b.style.animationDuration = (6 + Math.random() * 2) + "s";
      b.onclick = function () {{
        if (!active || b.classList.contains("pop")) return;
        if (isAnswer) {{
          b.classList.add("pop"); correct++; combo++; score += 10 + combo * 2; active = false;
          NR.speak(w.word); NR.showFeedback(document.getElementById("feedback"), "捞到了！+" + (10 + combo * 2) + " 分 🎉", true);
          document.getElementById("comboEl").textContent = String(combo); document.getElementById("scoreEl").textContent = String(score);
          qi++; setTimeout(function () {{ active = true; nextRound(); }}, 900);
        }} else {{ b.classList.add("pop"); wrong++; combo = 0; document.getElementById("comboEl").textContent = "0"; NR.showFeedback(document.getElementById("feedback"), "泡泡破了！再试一次", false); }}
      }};
      stage.appendChild(b);
    }}
    function finish() {{
      active = false; clearBubbles(); var t = timer.stop();
      NR.showDonePanel(document.getElementById("stage"), {{ title: "泡泡捞词完成！得分 " + score, correct: correct, wrong: wrong, total: queue.length, timeSec: t, onRetry: function () {{ location.reload(); }} }});
      document.querySelector(".ng-toolbar .btns").innerHTML = '<a class="ng-btn" href="index.html">← 游戏列表</a>';
    }}
  }});
  </script>
""" + tail()


def game9(b):
    e, a = b["emoji"], b["accent"]
    return head(b, "转盘寻宝") + f"""
<body class="ng-game">
  <div class="ng-toolbar">
    <div><h1>{e} 转盘寻宝</h1><div class="meta">转动转盘 · 听音选图</div></div>
    <div class="btns"><a class="ng-btn" href="index.html">← 游戏列表</a><button type="button" class="ng-btn primary" id="btnStart">开始</button></div>
  </div>
  <div class="ng-stage" id="stage">
    <img class="ng-banner" src="{SPIN_BANNER}" alt="" onerror="this.style.display='none'" />
    <div class="ng-hint" id="wordPreview">加载词表…</div>
    <div class="ng-badge" id="progressBadge">点击「开始」</div>
    <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span><span>得分 <strong id="scoreEl">0</strong></span></div>
    <div class="ng-spin-wrap">
      <div class="ng-wheel-container">
        <div class="ng-wheel-pointer"></div>
        <div class="ng-wheel" id="wheel"></div>
      </div>
      <button type="button" class="ng-btn primary big" id="btnSpin" disabled>🎡 转动转盘</button>
      <div class="ng-spin-challenge ng-hidden" id="challenge">
        <p class="ng-hint" style="margin-bottom:0.65rem;">听单词发音，选出对应图片！</p>
        <p class="en-big" id="targetWord" style="text-align:center;margin-bottom:0.5rem;"></p>
        <button type="button" class="ng-btn sm" id="btnReplay" style="display:block;margin:0 auto 0.75rem;">🔊 再听一次</button>
        <div class="ng-spin-images" id="imgOpts"></div>
      </div>
    </div>
    <div class="ng-feedback hidden" id="feedback"></div>
  </div>
  <script>
  NgReview.boot(function (NR) {{
    var pool = NR.getSelected(); NR.renderWordPreview(pool);
    if (pool.length < 4) {{ document.getElementById("stage").innerHTML = '<p class="ng-hint">请至少选择 4 个单词。<a href="settings.html">去设置</a></p>'; document.getElementById("btnStart").style.display = "none"; return; }}
    var segments = NR.shuffle(pool.slice()).slice(0, Math.min(8, pool.length));
    var qi = 0, correct = 0, wrong = 0, score = 0, timer = null, spinning = false, cur = null, rot = 0;
    var segAngle = 360 / segments.length;
    var colors = ["#f5c400","#66bb6a","#42a5f5","#ab47bc","#ef5350","#ffa726","#26c6da","#8d6e63"];
    document.getElementById("btnStart").onclick = function () {{
      qi = 0; correct = 0; wrong = 0; score = 0; timer = new NR.GameTimer(document.getElementById("timerEl")); timer.start();
      document.getElementById("btnStart").classList.add("ng-hidden"); document.getElementById("btnSpin").disabled = false;
      buildWheel(); document.getElementById("progressBadge").textContent = "共 " + segments.length + " 轮";
    }};
    function buildWheel() {{
      var w = document.getElementById("wheel");
      w.style.background = "conic-gradient(from 0deg, " + segments.map(function (s, i) {{ return colors[i % colors.length] + " " + (i * segAngle) + "deg " + ((i + 1) * segAngle) + "deg"; }}).join(", ") + ")";
      w.innerHTML = ""; segments.forEach(function (s, i) {{
        var lbl = document.createElement("div"); lbl.className = "ng-wheel-label"; lbl.textContent = s.word;
        lbl.style.transform = "rotate(" + (i * segAngle + segAngle / 2) + "deg) translateY(-90px)"; w.appendChild(lbl);
      }});
    }}
    document.getElementById("btnSpin").onclick = function () {{
      if (spinning || qi >= segments.length) return;
      spinning = true; document.getElementById("btnSpin").disabled = true; document.getElementById("challenge").classList.add("ng-hidden");
      rot += 1440 + Math.random() * 720 + (segments.length - (qi % segments.length)) * segAngle;
      document.getElementById("wheel").style.transform = "rotate(" + rot + "deg)";
      setTimeout(function () {{ spinning = false; cur = segments[qi]; showChallenge(cur); document.getElementById("btnSpin").disabled = false; }}, 3000);
    }};
    function showChallenge(w) {{
      document.getElementById("challenge").classList.remove("ng-hidden");
      document.getElementById("targetWord").textContent = w.word;
      document.getElementById("progressBadge").textContent = "第 " + (qi + 1) + " / " + segments.length + " 轮";
      NR.speak(w.word);
      var opts = NR.buildMcOptions(w, pool, 4), el = document.getElementById("imgOpts"); el.innerHTML = "";
      opts.forEach(function (o) {{
        var btn = document.createElement("button"); btn.type = "button"; btn.className = "ng-spin-img-opt";
        var img = document.createElement("img"); img.src = NR.wordImg(o); img.alt = o.word; btn.appendChild(img);
        btn.onclick = function () {{ pickImg(o, w, btn); }}; el.appendChild(btn);
      }});
    }}
    document.getElementById("btnReplay").onclick = function () {{ if (cur) NR.speak(cur.word); }};
    function pickImg(choice, answer, btn) {{
      var ok = choice.word === answer.word, fb = document.getElementById("feedback");
      Array.prototype.forEach.call(document.getElementById("imgOpts").children, function (b) {{ b.disabled = true; }});
      if (ok) {{ correct++; score += 15; btn.classList.add("correct"); NR.showFeedback(fb, "寻宝成功！+15 分 🎉", true); }}
      else {{ wrong++; btn.classList.add("wrong"); NR.showFeedback(fb, "答案是 " + answer.word, false); }}
      document.getElementById("scoreEl").textContent = String(score); qi++;
      setTimeout(function () {{ document.getElementById("challenge").classList.add("ng-hidden"); NR.hideFeedback(fb); if (qi >= segments.length) finish(); }}, ok ? 1000 : 1500);
    }}
    function finish() {{
      var t = timer.stop(); document.getElementById("btnSpin").disabled = true;
      NR.showDonePanel(document.getElementById("stage"), {{ title: "转盘寻宝完成！得分 " + score, correct: correct, wrong: wrong, total: segments.length, timeSec: t, onRetry: function () {{ location.reload(); }} }});
      document.querySelector(".ng-toolbar .btns").innerHTML = '<a class="ng-btn" href="index.html">← 游戏列表</a>';
    }}
  }});
  </script>
""" + tail()


GAMES = [
    ("game4-word-maze.html", game4),
    ("game5-zh-pick-word.html", game5),
    ("game6-picture-connect.html", game6),
    ("game7-word-pick-zh.html", game7),
    ("game8-bubble-catch.html", game8),
    ("game9-spin-quiz.html", game9),
]


def main():
    for b in BOOKS:
        for fname, fn in GAMES:
            path = os.path.join(ROOT, b["dir"].replace("/", os.sep), fname)
            write(path, fn(b))


if __name__ == "__main__":
    main()
