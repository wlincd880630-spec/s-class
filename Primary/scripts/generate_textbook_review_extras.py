#!/usr/bin/env python3
"""为外研版小学教材 Courseware 生成复习游戏 7-9 与纸质练习 PDF 页"""
import json
import os
import re

ROOT = os.path.join(os.path.dirname(__file__), "..", "School_textbook", "Courseware")
COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/School_textbook/Courseware"
AUDIO_MANIFEST = f"{COS}/audio/audio-manifest.js?v=1"
AUDIO_LOCAL = f"{COS}/audio/local-audio.js?v=1"

BOOKS = [
    {"code": "3GA", "label": "三年级上册"},
    {"code": "3GB", "label": "三年级下册"},
    {"code": "4GA", "label": "四年级上册"},
    {"code": "4GB", "label": "四年级下册"},
    {"code": "5GA", "label": "五年级上册"},
    {"code": "5GB", "label": "五年级下册"},
    {"code": "6GA", "label": "六年级上册"},
]

GAME_CSS = """
/* ── 图片单词连线（游戏八）── */
.connect-wrap {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  min-height: 280px;
  margin: 16px 0;
}
.connect-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}
.connect-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;
}
.connect-item {
  border: 3px solid var(--border);
  border-radius: var(--radius);
  padding: 10px;
  background: #fff;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s, background 0.15s;
  min-height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.connect-item img {
  max-height: 72px;
  max-width: 100%;
  object-fit: contain;
}
.connect-item .en-label {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--blue-dark);
}
.connect-item:hover:not(.matched) { transform: translateY(-2px); border-color: var(--yellow); }
.connect-item.selected { border-color: var(--blue); background: #e3f2fd; }
.connect-item.matched { border-color: var(--green); background: #e8f5e9; opacity: 0.85; cursor: default; }

/* ── 转盘寻宝（游戏九）── */
.spin-wrap {
  text-align: center;
  padding: 12px 0 20px;
}
.wheel-container {
  position: relative;
  width: min(280px, 72vw);
  height: min(280px, 72vw);
  margin: 0 auto 20px;
}
.wheel-pointer {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 22px solid var(--pink);
  z-index: 3;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
}
.wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid var(--ink, #2d3436);
  position: relative;
  transition: transform 3.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.wheel-label {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.72rem;
  pointer-events: none;
  white-space: nowrap;
  transform-origin: center center;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.45);
}
.spin-challenge { margin-top: 16px; }
.spin-challenge.hidden { display: none; }
.spin-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-width: 420px;
  margin: 12px auto 0;
}
.spin-img-opt {
  border: 3px solid var(--border);
  border-radius: var(--radius);
  padding: 8px;
  background: #fff;
  cursor: pointer;
  transition: transform 0.15s;
}
.spin-img-opt img {
  width: 100%;
  height: 100px;
  object-fit: contain;
}
.spin-img-opt:hover { transform: scale(1.03); border-color: var(--yellow); }
.spin-img-opt.correct { border-color: var(--green); background: #e8f5e9; }
.spin-img-opt.wrong { border-color: #e17055; background: #ffebee; }
.spin-img-opt:disabled { cursor: default; opacity: 0.7; }

/* ── 纸质练习预览 ── */
.print-toolbar { margin-bottom: 16px; }
.print-toolbar .row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: center;
  margin: 8px 0;
}
.print-toolbar label {
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.print-sheet {
  background: #fff;
  padding: 12mm 14mm 14mm;
  margin-bottom: 16px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.print-sheet-hdr {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid var(--yellow);
  padding-bottom: 6px;
  margin-bottom: 10px;
}
.print-sheet-hdr h2 { font-size: 1.1rem; color: var(--blue-dark); }
.print-sheet-hdr .meta { font-size: 0.78rem; color: #78909c; }
.print-name-line { font-size: 0.82rem; margin-bottom: 8px; }
.print-name-line span {
  display: inline-block;
  min-width: 8rem;
  border-bottom: 1px solid #90a4ae;
}
.print-maze-targets {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 10px;
}
.print-maze-target {
  text-align: center;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  padding: 4px;
}
.print-maze-target img { width: 100%; max-height: 80px; object-fit: contain; }
.print-maze-target .zh { font-size: 0.8rem; color: #546e7a; margin-top: 3px; }
.print-maze-grid {
  display: grid;
  gap: 3px;
  max-width: 360px;
  margin: 0 auto;
  border: 2px solid #37474f;
  padding: 4px;
  background: #37474f;
}
.print-maze-cell {
  aspect-ratio: 1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
}
.print-spell-item {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #cfd8dc;
}
.print-spell-item img {
  width: 72px;
  height: 54px;
  object-fit: contain;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}
.print-spell-letters { display: flex; flex-wrap: wrap; gap: 5px; margin: 4px 0; }
.print-spell-letters span {
  width: 1.65rem;
  height: 1.65rem;
  border: 2px solid #90caf9;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.print-spell-line {
  display: inline-block;
  min-width: 10rem;
  border-bottom: 2px solid #37474f;
  height: 1.2rem;
}
.print-connect-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 12px 0;
}
.print-connect-item {
  border: 1px solid #cfd8dc;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.print-connect-item img { height: 100px; max-width: 100%; object-fit: contain; }
.print-connect-word { font-size: 1.25rem; font-weight: 700; }
.print-quiz-item {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px dashed #cfd8dc;
  align-items: start;
}
.print-quiz-item img {
  width: 64px;
  height: 48px;
  object-fit: contain;
}
.print-quiz-options { margin-top: 6px; }
.print-quiz-options span {
  display: inline-block;
  margin-right: 12px;
  padding: 2px 10px;
  border: 1px solid #b0bec5;
  border-radius: 6px;
  font-size: 0.9rem;
}
.print-memory-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.print-memory-card {
  border: 2px dashed #90a4ae;
  border-radius: 8px;
  padding: 6px;
  text-align: center;
  min-height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}
.print-memory-card img { max-height: 56px; max-width: 100%; object-fit: contain; }
.print-sentence-item { padding: 12px 0; border-bottom: 1px dashed #cfd8dc; }
.print-sentence-words { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.print-sentence-words span {
  padding: 4px 10px;
  border: 1px solid #90caf9;
  border-radius: 6px;
  font-size: 0.9rem;
}
.print-sentence-line {
  margin-top: 8px;
  min-height: 1.5rem;
  border-bottom: 2px solid #37474f;
}
.print-answer-key { background: #f1f8e9; }
.print-answer-key .ans { color: var(--green-dark); font-weight: 700; }
.print-hint { text-align: center; font-size: 0.78rem; color: #78909c; margin-top: 6px; }

@media print {
  .print-sheet {
    box-shadow: none;
    border-radius: 0;
    margin: 0;
    page-break-after: always;
    break-after: page;
  }
  .print-sheet:last-child { page-break-after: auto; break-after: auto; }
}
"""


def logo_url(code):
    return f"{COS}/{code}/assets/images/logo.png"


def head_block(label, title, code):
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>{title} · {label}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="assets/css/common.css">
</head>"""


def top_bar(label, title, icon, code):
    return f"""  <div class="container">
    <div class="top-bar">
      <a class="course-logo" href="index.html" title="Steven's Class English Studio">
        <img src="{logo_url(code)}" alt="Steven's Class English Studio">
      </a>
      <a class="back-link" href="index.html"><i class="fa-solid fa-house"></i> 返回</a>
      <h1 class="page-title"><i class="fa-solid {icon}"></i> {title}</h1>
    </div>"""


def scripts_block():
    return f"""  <script src="assets/data/data.js"></script>
  <script src="{AUDIO_MANIFEST}"></script>
  <script src="{AUDIO_LOCAL}"></script>
  <script src="assets/js/utils.js"></script>"""


def game7_html(b):
    label, code = b["label"], b["code"]
    return (
        head_block(label, "游戏七：看单词选中文", code)
        + """
<body>
"""
        + top_bar(label, "看单词选中文", "fa-language", code)
        + """
    <div class="card" id="setupPanel">
      <div class="control-row"><label>单元：</label><select id="unitSelect"></select></div>
      <p style="color:#636e72;font-size:0.9rem;">每组 4 题，看英文单词与图片，选出正确中文意思</p>
      <button class="btn btn-primary btn-lg" id="btnStart"><i class="fa-solid fa-play"></i> 开始游戏</button>
    </div>

    <div class="card game-area hidden" id="gamePanel">
      <div class="timer-bar">
        <span><i class="fa-solid fa-layer-group"></i> 第 <strong id="groupNum">1</strong> / <strong id="groupTotal">1</strong> 组</span>
        <span>第 <strong id="qNum">1</strong> / <strong id="groupSize">4</strong> 题</span>
        <span><i class="fa-solid fa-stopwatch"></i> <strong id="gameTime">0:00</strong></span>
      </div>
      <div class="quiz-question">
        <img id="qImg" src="" alt="">
        <p id="qWord" style="font-size:1.6rem;font-weight:bold;"></p>
        <button class="btn btn-sm" id="btnSpeak" type="button"><i class="fa-solid fa-volume-high"></i> 朗读</button>
      </div>
      <div class="quiz-options" id="options"></div>
      <div id="feedback" class="feedback hidden"></div>
    </div>

    <div class="card hidden" id="donePanel"></div>
  </div>
"""
        + scripts_block()
        + """
  <script>
    let groups = [], groupIdx = 0, qIdx = 0;
    let statCorrect = 0, statWrong = 0, totalWords = 0;
    let gameTimer = null, answered = false, unitId = '';

    buildUnitSelector(document.getElementById('unitSelect'));
    document.getElementById('btnStart').addEventListener('click', startGame);
    document.getElementById('btnSpeak').addEventListener('click', () => {
      const w = groups[groupIdx]?.[qIdx];
      if (w) speakText(w.word);
    });

    function startGame() {
      unitId = document.getElementById('unitSelect').value;
      const all = shuffle(getAllWords(unitId));
      if (!all.length) return alert('该单元暂无单词！');
      groups = chunkGroups(all);
      groupIdx = 0; qIdx = 0; statCorrect = 0; statWrong = 0; totalWords = all.length;
      document.getElementById('setupPanel').classList.add('hidden');
      document.getElementById('donePanel').classList.add('hidden');
      document.getElementById('gamePanel').classList.remove('hidden');
      gameTimer = new GameTimer(document.getElementById('gameTime'));
      gameTimer.start();
      showQuestion();
    }

    function showQuestion() {
      if (groupIdx >= groups.length) { finishGame(); return; }
      const group = groups[groupIdx];
      if (qIdx >= group.length) {
        if (groupIdx < groups.length - 1) {
          showFeedback(document.getElementById('feedback'), `第 ${groupIdx + 1} 组完成！下一组… 🎉`, true);
          groupIdx++; qIdx = 0;
          setTimeout(showQuestion, 1500);
        } else { finishGame(); }
        return;
      }
      updateGroupProgress(groupIdx, groups.length, { num: 'groupNum', total: 'groupTotal' });
      document.getElementById('qNum').textContent = qIdx + 1;
      document.getElementById('groupSize').textContent = group.length;
      answered = false;
      const w = group[qIdx];
      document.getElementById('qImg').src = w.image;
      document.getElementById('qWord').textContent = w.word;
      document.getElementById('feedback').classList.add('hidden');
      speakText(w.word);
      const all = getAllWords(unitId);
      const el = document.getElementById('options');
      el.innerHTML = '';
      pickQuizOptions(w, all, 4, item => shortMeaning(item)).forEach(({ word: opt, label }) => {
        const btn = document.createElement('div');
        btn.className = 'quiz-option';
        btn.textContent = label;
        btn.addEventListener('click', () => onAnswer(btn, opt.id === w.id));
        el.appendChild(btn);
      });
    }

    function onAnswer(btn, isCorrect) {
      if (answered) return;
      answered = true;
      const fb = document.getElementById('feedback');
      const w = groups[groupIdx][qIdx];
      if (isCorrect) {
        statCorrect++; btn.classList.add('correct');
        showFeedback(fb, '答对了！🌟', true);
      } else {
        statWrong++; btn.classList.add('wrong');
        showFeedback(fb, `正确答案是 ${shortMeaning(w)}`, false);
      }
      setTimeout(() => { qIdx++; showQuestion(); }, 1200);
    }

    function finishGame() {
      const timeSec = gameTimer.stop();
      document.getElementById('gamePanel').classList.add('hidden');
      const donePanel = document.getElementById('donePanel');
      donePanel.classList.remove('hidden');
      showFinalGameStats(donePanel, {
        title: '答题完成！', groups: groups.length, totalItems: totalWords,
        correct: statCorrect, wrong: statWrong, timeSec,
        onRetry: () => { donePanel.classList.add('hidden'); document.getElementById('setupPanel').classList.remove('hidden'); }
      });
    }
  </script>
</body>
</html>
"""
    )


def game8_html(b):
    label, code = b["label"], b["code"]
    return (
        head_block(label, "游戏八：图片单词连线", code)
        + """
<body>
"""
        + top_bar(label, "图片单词连线", "fa-link", code)
        + """
    <div class="card" id="setupPanel">
      <div class="control-row"><label>单元：</label><select id="unitSelect"></select></div>
      <p style="color:#636e72;font-size:0.9rem;">每页 3 组：左侧图片与右侧单词配对连线（不显示中文）</p>
      <button class="btn btn-primary btn-lg" id="btnStart"><i class="fa-solid fa-play"></i> 开始游戏</button>
    </div>

    <div class="card game-area hidden" id="gamePanel">
      <div class="timer-bar">
        <span><i class="fa-solid fa-file"></i> 第 <strong id="pageNum">1</strong> / <strong id="pageTotal">1</strong> 页</span>
        <span>已完成 <strong id="doneCount">0</strong> / <strong id="pageSize">3</strong></span>
        <span><i class="fa-solid fa-stopwatch"></i> <strong id="gameTime">0:00</strong></span>
      </div>
      <div class="connect-wrap" id="connectWrap">
        <svg class="connect-svg" id="linesSvg"></svg>
        <div class="connect-col" id="leftCol"></div>
        <div class="connect-col" id="rightCol"></div>
      </div>
      <div id="feedback" class="feedback hidden"></div>
    </div>

    <div class="card hidden" id="donePanel"></div>
  </div>
"""
        + scripts_block()
        + """
  <script>
    const CONNECT_SIZE = 3;
    let groups = [], groupIdx = 0, pageWords = [];
    let matched = {}, selSide = null, selWord = null;
    let statCorrect = 0, statWrong = 0, totalWords = 0;
    let gameTimer = null, unitId = '';

    buildUnitSelector(document.getElementById('unitSelect'));
    document.getElementById('btnStart').addEventListener('click', startGame);

    function startGame() {
      unitId = document.getElementById('unitSelect').value;
      const all = shuffle(getAllWords(unitId));
      if (all.length < 3) return alert('该单元至少需要 3 个单词！');
      groups = [];
      for (let i = 0; i < all.length; i += CONNECT_SIZE) {
        groups.push(all.slice(i, i + CONNECT_SIZE));
      }
      groupIdx = 0; statCorrect = 0; statWrong = 0; totalWords = all.length;
      document.getElementById('setupPanel').classList.add('hidden');
      document.getElementById('donePanel').classList.add('hidden');
      document.getElementById('gamePanel').classList.remove('hidden');
      gameTimer = new GameTimer(document.getElementById('gameTime'));
      gameTimer.start();
      loadPage();
    }

    function loadPage() {
      if (groupIdx >= groups.length) { finishGame(); return; }
      pageWords = shuffle(groups[groupIdx].slice());
      matched = {}; selSide = null; selWord = null;
      document.getElementById('pageNum').textContent = groupIdx + 1;
      document.getElementById('pageTotal').textContent = groups.length;
      document.getElementById('pageSize').textContent = pageWords.length;
      document.getElementById('doneCount').textContent = '0';
      document.getElementById('linesSvg').innerHTML = '';
      document.getElementById('feedback').classList.add('hidden');
      const left = document.getElementById('leftCol');
      const right = document.getElementById('rightCol');
      left.innerHTML = ''; right.innerHTML = '';
      pageWords.forEach(w => {
        const li = document.createElement('div');
        li.className = 'connect-item';
        li.dataset.word = w.word;
        const img = document.createElement('img');
        img.src = w.image; img.alt = w.word;
        li.appendChild(img);
        li.addEventListener('click', () => onPick('img', w.word, li));
        left.appendChild(li);
      });
      shuffle(pageWords).forEach(w => {
        const ri = document.createElement('div');
        ri.className = 'connect-item';
        ri.dataset.word = w.word;
        const lbl = document.createElement('div');
        lbl.className = 'en-label';
        lbl.textContent = w.word;
        ri.appendChild(lbl);
        ri.addEventListener('click', () => onPick('word', w.word, ri));
        right.appendChild(ri);
      });
    }

    function onPick(side, word, el) {
      if (matched[word]) return;
      const fb = document.getElementById('feedback');
      if (!selSide) { selSide = side; selWord = word; el.classList.add('selected'); return; }
      if (selSide === side) {
        document.querySelectorAll('.connect-item.selected').forEach(e => e.classList.remove('selected'));
        selSide = side; selWord = word; el.classList.add('selected'); return;
      }
      if (selWord === word) {
        statCorrect++; matched[word] = true;
        document.querySelectorAll(`.connect-item[data-word="${word}"]`).forEach(e => {
          e.classList.remove('selected'); e.classList.add('matched');
        });
        drawLine(word);
        speakText(word);
        showFeedback(fb, '配对成功！🎉', true);
        document.getElementById('doneCount').textContent = String(Object.keys(matched).length);
        if (Object.keys(matched).length === pageWords.length) {
          groupIdx++;
          setTimeout(loadPage, 1000);
        }
      } else {
        statWrong++;
        showFeedback(fb, '不对，再试试！', false);
        document.querySelectorAll('.connect-item.selected').forEach(e => e.classList.remove('selected'));
      }
      selSide = null; selWord = null;
    }

    function drawLine(word) {
      const items = document.querySelectorAll(`.connect-item[data-word="${word}"]`);
      if (items.length < 2) return;
      const wrap = document.getElementById('connectWrap').getBoundingClientRect();
      const a = items[0].getBoundingClientRect();
      const b = items[1].getBoundingClientRect();
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', a.right - wrap.left);
      line.setAttribute('y1', a.top + a.height / 2 - wrap.top);
      line.setAttribute('x2', b.left - wrap.left);
      line.setAttribute('y2', b.top + b.height / 2 - wrap.top);
      line.setAttribute('stroke', '#0984e3');
      line.setAttribute('stroke-width', '3');
      document.getElementById('linesSvg').appendChild(line);
    }

    function finishGame() {
      const timeSec = gameTimer.stop();
      document.getElementById('gamePanel').classList.add('hidden');
      const donePanel = document.getElementById('donePanel');
      donePanel.classList.remove('hidden');
      showFinalGameStats(donePanel, {
        title: '连线完成！', groups: groups.length, totalItems: totalWords,
        itemLabel: '个配对', correct: statCorrect, wrong: statWrong, timeSec,
        onRetry: () => { donePanel.classList.add('hidden'); document.getElementById('setupPanel').classList.remove('hidden'); }
      });
    }
  </script>
</body>
</html>
"""
    )


def game9_html(b):
    label, code = b["label"], b["code"]
    return (
        head_block(label, "游戏九：转盘寻宝", code)
        + """
<body>
"""
        + top_bar(label, "转盘寻宝", "fa-dharmachakra", code)
        + """
    <div class="card" id="setupPanel">
      <div class="control-row"><label>单元：</label><select id="unitSelect"></select></div>
      <p style="color:#636e72;font-size:0.9rem;">转动幸运转盘，听音选图——高互动趣味挑战！至少 4 个单词。</p>
      <button class="btn btn-primary btn-lg" id="btnStart"><i class="fa-solid fa-play"></i> 开始游戏</button>
    </div>

    <div class="card game-area hidden" id="gamePanel">
      <div class="timer-bar">
        <span id="progressBadge">准备转盘</span>
        <span>得分 <strong id="scoreEl">0</strong></span>
        <span><i class="fa-solid fa-stopwatch"></i> <strong id="gameTime">0:00</strong></span>
      </div>
      <div class="spin-wrap">
        <div class="wheel-container">
          <div class="wheel-pointer"></div>
          <div class="wheel" id="wheel"></div>
        </div>
        <button type="button" class="btn btn-primary btn-lg" id="btnSpin" disabled>🎡 转动转盘</button>
        <div class="spin-challenge hidden" id="challenge">
          <p style="color:#636e72;margin:8px 0;">听发音，选出对应图片！</p>
          <p id="targetWord" style="font-size:1.4rem;font-weight:bold;text-align:center;"></p>
          <button type="button" class="btn btn-sm" id="btnReplay" style="margin:8px auto;display:block;">
            <i class="fa-solid fa-volume-high"></i> 再听
          </button>
          <div class="spin-images" id="imgOpts"></div>
        </div>
      </div>
      <div id="feedback" class="feedback hidden"></div>
    </div>

    <div class="card hidden" id="donePanel"></div>
  </div>
"""
        + scripts_block()
        + """
  <script>
    const WHEEL_COLORS = ['#f5c400','#66bb6a','#42a5f5','#ab47bc','#ef5350','#ffa726','#26c6da','#8d6e63'];
    let segments = [], qi = 0, score = 0, statCorrect = 0, statWrong = 0;
    let gameTimer = null, spinning = false, cur = null, rot = 0, segAngle = 45;
    let unitId = '', pool = [];

    buildUnitSelector(document.getElementById('unitSelect'));
    document.getElementById('btnStart').addEventListener('click', startGame);
    document.getElementById('btnSpin').addEventListener('click', spinWheel);
    document.getElementById('btnReplay').addEventListener('click', () => { if (cur) speakText(cur.word); });

    function startGame() {
      unitId = document.getElementById('unitSelect').value;
      pool = shuffle(getAllWords(unitId));
      if (pool.length < 4) return alert('该单元至少需要 4 个单词！');
      segments = shuffle(pool.slice()).slice(0, Math.min(8, pool.length));
      segAngle = 360 / segments.length;
      qi = 0; score = 0; statCorrect = 0; statWrong = 0; rot = 0;
      document.getElementById('setupPanel').classList.add('hidden');
      document.getElementById('donePanel').classList.add('hidden');
      document.getElementById('gamePanel').classList.remove('hidden');
      document.getElementById('challenge').classList.add('hidden');
      gameTimer = new GameTimer(document.getElementById('gameTime'));
      gameTimer.start();
      document.getElementById('btnSpin').disabled = false;
      document.getElementById('scoreEl').textContent = '0';
      document.getElementById('progressBadge').textContent = `共 ${segments.length} 轮 · 随机顺序`;
      buildWheel();
    }

    function buildWheel() {
      const w = document.getElementById('wheel');
      w.style.background = 'conic-gradient(from 0deg, ' + segments.map((s, i) =>
        `${WHEEL_COLORS[i % WHEEL_COLORS.length]} ${i * segAngle}deg ${(i + 1) * segAngle}deg`
      ).join(', ') + ')';
      w.innerHTML = '';
      segments.forEach((s, i) => {
        const lbl = document.createElement('div');
        lbl.className = 'wheel-label';
        lbl.textContent = s.word;
        lbl.style.transform = `rotate(${i * segAngle + segAngle / 2}deg) translateY(-95px)`;
        w.appendChild(lbl);
      });
    }

    function spinWheel() {
      if (spinning || qi >= segments.length) return;
      spinning = true;
      document.getElementById('btnSpin').disabled = true;
      document.getElementById('challenge').classList.add('hidden');
      cur = segments[qi];
      const center = qi * segAngle + segAngle / 2;
      const targetMod = (360 - center) % 360;
      const prevMod = ((rot % 360) + 360) % 360;
      let delta = (targetMod - prevMod + 360) % 360;
      if (delta < 120) delta += 360;
      rot += 360 * (4 + Math.floor(Math.random() * 2)) + delta;
      document.getElementById('wheel').style.transform = `rotate(${rot}deg)`;
      setTimeout(() => {
        spinning = false;
        showChallenge(cur);
        document.getElementById('btnSpin').disabled = qi >= segments.length;
      }, 3200);
    }

    function showChallenge(w) {
      document.getElementById('challenge').classList.remove('hidden');
      document.getElementById('targetWord').textContent = w.word;
      document.getElementById('progressBadge').textContent = `第 ${qi + 1} / ${segments.length} 轮`;
      speakText(w.word);
      const all = getAllWords(unitId);
      const opts = pickQuizOptions(w, all, 4, item => item.word).map(o => o.word);
      const el = document.getElementById('imgOpts');
      el.innerHTML = '';
      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'spin-img-opt';
        const img = document.createElement('img');
        img.src = opt.image;
        img.alt = opt.word;
        btn.appendChild(img);
        btn.addEventListener('click', () => pickImg(opt, w, btn));
        el.appendChild(btn);
      });
    }

    function pickImg(choice, answer, btn) {
      const ok = choice.id === answer.id;
      const fb = document.getElementById('feedback');
      document.querySelectorAll('#imgOpts .spin-img-opt').forEach(b => b.disabled = true);
      if (ok) {
        statCorrect++; score += 15;
        btn.classList.add('correct');
        showFeedback(fb, '正确！+15 🎉', true);
      } else {
        statWrong++;
        btn.classList.add('wrong');
        showFeedback(fb, `答案是 ${answer.word}`, false);
      }
      document.getElementById('scoreEl').textContent = String(score);
      qi++;
      setTimeout(() => {
        document.getElementById('challenge').classList.add('hidden');
        if (qi >= segments.length) finishGame();
      }, ok ? 900 : 1400);
    }

    function finishGame() {
      const timeSec = gameTimer.stop();
      document.getElementById('gamePanel').classList.add('hidden');
      const donePanel = document.getElementById('donePanel');
      donePanel.classList.remove('hidden');
      showFinalGameStats(donePanel, {
        title: '转盘挑战完成！',
        groups: 1,
        totalItems: segments.length,
        itemLabel: '轮',
        correct: statCorrect,
        wrong: statWrong,
        timeSec,
        extraRows: [{ label: '🏆 得分', value: String(score) }],
        onRetry: () => { donePanel.classList.add('hidden'); document.getElementById('setupPanel').classList.remove('hidden'); }
      });
    }
  </script>
</body>
</html>
"""
    )


def print_html(b):
    label, code = b["label"], b["code"]
    book_name = b.get("book_name", label)
    return (
        head_block(label, "纸质练习 / PDF", code)
        + """
<body>
"""
        + top_bar(label, "纸质练习 / PDF", "fa-print", code)
        + f"""
    <div class="card no-print print-toolbar">
      <div class="control-row"><label>单元：</label><select id="unitSelect"></select></div>
      <div id="wordCheckArea"></div>
      <p style="color:#636e72;font-size:0.9rem;margin:8px 0;">
        根据所选单词生成可在纸上完成的练习。导出 PDF：点「打印」→ 目标选「另存为 PDF」→ 缩放 <strong>100%</strong>、边距 <strong>无</strong>。
      </p>
      <div class="row">
        <label><input type="checkbox" id="optMaze" checked /> 单词迷宫</label>
        <label><input type="checkbox" id="optSpell" checked /> 字母排序（看图拼词）</label>
        <label><input type="checkbox" id="optConnect" checked /> 图片单词连线</label>
        <label><input type="checkbox" id="optZhPickEn" checked /> 看中文选英文</label>
        <label><input type="checkbox" id="optEnPickZh" checked /> 看单词选中文</label>
        <label><input type="checkbox" id="optMemory" checked /> 翻翻配对卡片</label>
        <label><input type="checkbox" id="optSentence" checked /> 句子听音排序</label>
        <label><input type="checkbox" id="optAnswers" /> 含答案页（教师用）</label>
      </div>
      <div class="row">
        <button type="button" class="btn btn-primary" id="btnGen"><i class="fa-solid fa-file-lines"></i> 生成练习纸</button>
        <button type="button" class="btn btn-success" id="btnPrint"><i class="fa-solid fa-print"></i> 打印 / 导出 PDF</button>
      </div>
    </div>

    <div id="printArea">
      <p class="print-hint no-print" id="placeholder">请选择单元与单词，点击「生成练习纸」预览</p>
    </div>
  </div>
"""
        + scripts_block()
        + f"""
  <script>
    const BOOK_NAME = {json.dumps(book_name, ensure_ascii=False)};
    const unitSelect = document.getElementById('unitSelect');
    const wordCheckArea = document.getElementById('wordCheckArea');

    buildUnitSelector(unitSelect, () => buildWordCheckboxes(wordCheckArea, unitSelect.value));
    buildWordCheckboxes(wordCheckArea, unitSelect.value);

    function esc(s) {{
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }}

    function sheetHeader(title, sub) {{
      return `<div class="print-sheet-hdr"><h2>${{esc(title)}}</h2><div class="meta">${{esc(sub)}}</div></div>
        <div class="print-name-line">姓名：<span></span> &nbsp; 日期：<span></span></div>`;
    }}

    function getPool() {{
      const unitId = unitSelect.value;
      const ids = getSelectedWordIds(wordCheckArea);
      return shuffle(getAllWords(unitId).filter(w => ids.includes(w.id)));
    }}

    function padGroupToFour(group, source) {{
      const words = group.slice();
      const src = shuffle(source.slice());
      while (words.length < 4) {{
        const cands = src.filter(w => !words.some(x => x.id === w.id));
        words.push((cands.length ? cands : src)[Math.floor(Math.random() * (cands.length ? cands : src).length)]);
      }}
      return shuffle(words.slice(0, 4));
    }}

    function padGroupToThree(group, source) {{
      const words = group.slice();
      const src = shuffle(source.slice());
      while (words.length < 3) {{
        words.push(src[Math.floor(Math.random() * src.length)]);
      }}
      return shuffle(words.slice(0, 3));
    }}

    function renderMazeSheet(words, idx, total, showAns) {{
      const prepared = padGroupToFour(words, words);
      let maze = null, tries = 0;
      do {{
        maze = generateMazeGrid(prepared);
        tries++;
      }} while (tries < 12 && (!maze || !maze.grid || !maze.grid[0] || !maze.grid[0].length));
      const sz = maze?.size || (maze?.grid?.length || 0);
      let html = `<div class="print-sheet${{showAns ? ' print-answer-key' : ''}}">`;
      html += sheetHeader(`${{BOOK_NAME}} · 单词迷宫`, `第 ${{idx}} / ${{total}} 组`);
      html += '<div class="print-maze-targets">';
      prepared.forEach((w, i) => {{
        html += `<div class="print-maze-target"><div>${{i+1}}</div><img src="${{esc(w.image)}}" alt="" /><div class="zh">${{esc(shortMeaning(w))}}</div>`;
        if (showAns) html += `<div class="ans">${{esc(w.word)}}</div>`;
        html += '</div>';
      }});
      html += '</div>';
      if (maze && maze.grid && maze.grid.length) {{
        html += `<div class="print-maze-grid" style="grid-template-columns:repeat(${{sz}},1fr)">`;
        maze.grid.forEach(row => row.forEach(ch => {{
          html += `<div class="print-maze-cell">${{esc((ch||'?').toUpperCase())}}</div>`;
        }}));
        html += '</div>';
      }}
      html += `<p class="print-hint">${{showAns ? '答案页' : '在宫格中找出 4 个单词（横/竖直线）'}}</p></div>`;
      return html;
    }}

    function renderSpellSheet(words, showAns) {{
      let html = `<div class="print-sheet${{showAns ? ' print-answer-key' : ''}}">`;
      html += sheetHeader(`${{BOOK_NAME}} · 字母排序`, `共 ${{words.length}} 题`);
      words.forEach((w, i) => {{
        const letters = w.word.replace(/[\\s-]/g, '').split('');
        const scrambled = shuffle(letters);
        html += `<div class="print-spell-item"><img src="${{esc(w.image)}}" alt="" /><div>
          <div>${{i+1}}. ${{esc(shortMeaning(w))}}</div>
          <div class="print-spell-letters">${{scrambled.map(ch => `<span>${{esc(ch)}}</span>`).join('')}}</div>
          <div>写出单词：${{showAns ? `<span class="ans">${{esc(w.word)}}</span>` : '<span class="print-spell-line"></span>'}}</div>
        </div></div>`;
      }});
      html += '</div>';
      return html;
    }}

    function renderConnectSheet(group, idx, total, showAns) {{
      const words = shuffle(group.slice());
      const shuffled = shuffle(words.slice());
      let html = `<div class="print-sheet${{showAns ? ' print-answer-key' : ''}}">`;
      html += sheetHeader(`${{BOOK_NAME}} · 图片单词连线`, `第 ${{idx}} / ${{total}} 页`);
      html += '<div class="print-connect-row"><div><strong>图片</strong></div><div><strong>单词（已打乱）</strong></div></div>';
      words.forEach((w, i) => {{
        html += `<div class="print-connect-row">
          <div class="print-connect-item"><img src="${{esc(w.image)}}" alt="" /></div>
          <div class="print-connect-item"><span class="print-connect-word">${{esc(shuffled[i].word)}}</span></div>
        </div>`;
      }});
      if (showAns) {{
        html += '<p class="print-hint">答案：' + words.map(w => `${{esc(w.word)}} ↔ ${{esc(shortMeaning(w))}}`).join(' &nbsp; ') + '</p>';
      }} else {{
        html += '<p class="print-hint">用线将左侧图片与右侧对应的英文单词相连</p>';
      }}
      html += '</div>';
      return html;
    }}

    function renderQuizSheet(words, mode, showAns) {{
      const title = mode === 'zh-en' ? '看中文选英文' : '看单词选中文';
      let html = `<div class="print-sheet${{showAns ? ' print-answer-key' : ''}}">`;
      html += sheetHeader(`${{BOOK_NAME}} · ${{title}}`, `共 ${{words.length}} 题`);
      const unitId = unitSelect.value;
      const all = getAllWords(unitId);
      words.forEach((w, i) => {{
        const opts = pickQuizOptions(w, all, 4, item => mode === 'zh-en' ? item.word : shortMeaning(item));
        html += `<div class="print-quiz-item"><img src="${{esc(w.image)}}" alt="" /><div>
          <div><strong>${{i+1}}.</strong> ${{mode === 'zh-en' ? esc(shortMeaning(w)) : esc(w.word)}}</div>
          <div class="print-quiz-options">${{opts.map(o => `<span>${{esc(o.label)}}</span>`).join('')}}</div>
          ${{showAns ? `<div class="ans" style="margin-top:4px">答案：${{mode === 'zh-en' ? esc(w.word) : esc(shortMeaning(w))}}</div>` : ''}}
        </div></div>`;
      }});
      html += '</div>';
      return html;
    }}

    function renderMemorySheet(group, idx, total, showAns) {{
      let html = `<div class="print-sheet${{showAns ? ' print-answer-key' : ''}}">`;
      html += sheetHeader(`${{BOOK_NAME}} · 翻翻配对卡片`, `第 ${{idx}} / ${{total}} 组 · 剪下配对`);
      html += '<div class="print-memory-grid">';
      group.forEach(w => {{
        html += `<div class="print-memory-card"><img src="${{esc(w.image)}}" alt="" /><div>${{esc(w.word)}}</div></div>`;
        html += `<div class="print-memory-card">${{showAns ? `<div class="ans">${{esc(w.word)}}</div>` : '?'}}<div>${{esc(shortMeaning(w))}}</div></div>`;
      }});
      html += '</div><p class="print-hint">剪下卡片，翻面后凭记忆配对单词与图片/中文</p></div>';
      return html;
    }}

    function renderSentenceSheet(items, showAns) {{
      let html = `<div class="print-sheet${{showAns ? ' print-answer-key' : ''}}">`;
      html += sheetHeader(`${{BOOK_NAME}} · 句子听音排序`, `共 ${{items.length}} 句`);
      items.forEach((item, i) => {{
        const parts = item.en.replace(/[.!?]+$/,'').split(/\\s+/);
        const scrambled = shuffle(parts);
        html += `<div class="print-sentence-item">
          <div><strong>${{i+1}}.</strong> ${{esc(item.zh)}}</div>
          <div class="print-sentence-words">${{scrambled.map(p => `<span>${{esc(p)}}</span>`).join('')}}</div>
          <div>正确语序：${{showAns ? `<span class="ans">${{esc(item.en)}}</span>` : '<span class="print-sentence-line"></span>'}}</div>
        </div>`;
      }});
      html += '</div>';
      return html;
    }}

    function generate() {{
      const pool = getPool();
      const area = document.getElementById('printArea');
      if (!pool.length) {{
        area.innerHTML = '<p class="print-hint">请至少选择一个单词</p>';
        return;
      }}
      const optMaze = document.getElementById('optMaze').checked;
      const optSpell = document.getElementById('optSpell').checked;
      const optConnect = document.getElementById('optConnect').checked;
      const optZhPickEn = document.getElementById('optZhPickEn').checked;
      const optEnPickZh = document.getElementById('optEnPickZh').checked;
      const optMemory = document.getElementById('optMemory').checked;
      const optSentence = document.getElementById('optSentence').checked;
      const optAnswers = document.getElementById('optAnswers').checked;
      let html = '';
      const mazeWords = pool.filter(w => isMazeWord(w));

      if (optMaze && mazeWords.length) {{
        const groups = [];
        const shuffled = shuffle(mazeWords.slice());
        for (let i = 0; i < shuffled.length; i += 4) groups.push(shuffled.slice(i, i + 4));
        groups.forEach((g, i) => {{ html += renderMazeSheet(g, i + 1, groups.length, false); }});
        if (optAnswers) groups.forEach((g, i) => {{ html += renderMazeSheet(g, i + 1, groups.length, true); }});
      }}

      if (optSpell) {{
        const spellWords = shuffle(pool.slice());
        for (let i = 0; i < spellWords.length; i += 6) {{
          html += renderSpellSheet(spellWords.slice(i, i + 6), false);
        }}
        if (optAnswers) {{
          for (let i = 0; i < spellWords.length; i += 6) {{
            html += renderSpellSheet(spellWords.slice(i, i + 6), true);
          }}
        }}
      }}

      if (optConnect) {{
        const connGroups = [];
        const shuffled = shuffle(pool.slice());
        for (let i = 0; i < shuffled.length; i += 3) connGroups.push(padGroupToThree(shuffled.slice(i, i + 3), pool));
        connGroups.forEach((g, i) => {{ html += renderConnectSheet(g, i + 1, connGroups.length, false); }});
        if (optAnswers) connGroups.forEach((g, i) => {{ html += renderConnectSheet(g, i + 1, connGroups.length, true); }});
      }}

      if (optZhPickEn) {{
        html += renderQuizSheet(shuffle(pool.slice()), 'zh-en', false);
        if (optAnswers) html += renderQuizSheet(pool, 'zh-en', true);
      }}

      if (optEnPickZh) {{
        html += renderQuizSheet(shuffle(pool.slice()), 'en-zh', false);
        if (optAnswers) html += renderQuizSheet(pool, 'en-zh', true);
      }}

      if (optMemory) {{
        const memGroups = [];
        const shuffled = shuffle(pool.slice());
        for (let i = 0; i < shuffled.length; i += 4) memGroups.push(padGroupToFour(shuffled.slice(i, i + 4), pool));
        memGroups.forEach((g, i) => {{ html += renderMemorySheet(g, i + 1, memGroups.length, false); }});
        if (optAnswers) memGroups.forEach((g, i) => {{ html += renderMemorySheet(g, i + 1, memGroups.length, true); }});
      }}

      if (optSentence) {{
        const sentences = shuffle(pool.filter(w => w.sentences && w.sentences[0]).map(w => w.sentences[0]));
        if (sentences.length) {{
          for (let i = 0; i < sentences.length; i += 4) {{
            html += renderSentenceSheet(sentences.slice(i, i + 4), false);
          }}
          if (optAnswers) {{
            for (let i = 0; i < sentences.length; i += 4) {{
              html += renderSentenceSheet(sentences.slice(i, i + 4), true);
            }}
          }}
        }}
      }}

      if (!html) html = '<p class="print-hint">请至少勾选一种练习类型</p>';
      area.innerHTML = html;
    }}

    document.getElementById('btnGen').addEventListener('click', generate);
    document.getElementById('btnPrint').addEventListener('click', () => {{
      if (!document.querySelector('#printArea .print-sheet')) generate();
      window.print();
    }});
  </script>
</body>
</html>
"""
    )


def read_book_name(code):
    data_path = os.path.join(ROOT, code, "assets", "data", "data.js")
    with open(data_path, encoding="utf-8") as f:
        text = f.read()
    m = re.search(r'"name"\s*:\s*"([^"]+)"', text)
    return m.group(1) if m else code


def patch_common_css(code):
    css_path = os.path.join(ROOT, code, "assets", "css", "common.css")
    with open(css_path, encoding="utf-8") as f:
        content = f.read()
    if "/* ── 图片单词连线（游戏八）── */" in content:
        return
    with open(css_path, "a", encoding="utf-8") as f:
        f.write(GAME_CSS)


def patch_index(code, label):
    index_path = os.path.join(ROOT, code, "index.html")
    with open(index_path, encoding="utf-8") as f:
        html = f.read()

    if "review-print.html" not in html:
        insert = """        <a class="nav-card game" href="review-print.html" target="_blank">
          <span class="icon"><i class="fa-solid fa-print"></i></span>
          <h3>纸质练习 / PDF</h3>
          <p>迷宫、拼词、连线、选择题、配对卡片、句子排序——打印或导出 PDF</p>
        </a>
"""
        html = html.replace(
            '      <h2 class="section-title"><i class="fa-solid fa-gamepad"></i> 单词复习（游戏）</h2>\n      <div class="nav-grid">',
            '      <h2 class="section-title"><i class="fa-solid fa-gamepad"></i> 单词复习（游戏）</h2>\n      <div class="nav-grid">\n' + insert,
            1,
        )

    new_games = """        <a class="nav-card game" href="review-game7.html" target="_blank">
          <span class="icon"><i class="fa-solid fa-language"></i></span>
          <h3>游戏七：看单词选中文</h3>
          <p>看英文单词与图片，四选一选出正确中文意思</p>
        </a>
        <a class="nav-card game" href="review-game8.html" target="_blank">
          <span class="icon"><i class="fa-solid fa-link"></i></span>
          <h3>游戏八：图片单词连线</h3>
          <p>左侧图片与右侧单词配对连线（不显示中文）</p>
        </a>
        <a class="nav-card game" href="review-game9.html" target="_blank">
          <span class="icon"><i class="fa-solid fa-dharmachakra"></i></span>
          <h3>游戏九：转盘寻宝</h3>
          <p>转动幸运转盘，听音选图——高互动趣味挑战</p>
        </a>
"""
    if "review-game7.html" not in html:
        html = html.replace(
            """        <a class="nav-card game" href="review-game6.html" target="_blank">
          <span class="icon"><i class="fa-solid fa-fish"></i></span>
          <h3>游戏六：听音捞鱼</h3>
          <p>听发音限时抢答，点击正确的单词鱼，连击加分</p>
        </a>
      </div>""",
            """        <a class="nav-card game" href="review-game6.html" target="_blank">
          <span class="icon"><i class="fa-solid fa-fish"></i></span>
          <h3>游戏六：听音捞鱼</h3>
          <p>听发音限时抢答，点击正确的单词鱼，连击加分</p>
        </a>
""" + new_games + """      </div>""",
            1,
        )

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(html)


def main():
    for b in BOOKS:
        code = b["code"]
        b["book_name"] = read_book_name(code)
        book_dir = os.path.join(ROOT, code)
        files = {
            "review-game7.html": game7_html(b),
            "review-game8.html": game8_html(b),
            "review-game9.html": game9_html(b),
            "review-print.html": print_html(b),
        }
        for name, content in files.items():
            path = os.path.join(book_dir, name)
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  wrote {code}/{name}")
        patch_common_css(code)
        patch_index(code, b["label"])
        print(f"  patched {code}/index.html + common.css")
    print("Done.")


if __name__ == "__main__":
    main()
