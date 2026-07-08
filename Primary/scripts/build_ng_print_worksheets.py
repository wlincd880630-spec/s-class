#!/usr/bin/env python3
"""为国家地理四本书生成纸质练习 PDF 打印页 print-worksheets.html"""
import os

ROOT = os.path.join(os.path.dirname(__file__), "..")

with open(os.path.join(ROOT, "assets", "ng-review-shared.js"), encoding="utf-8") as f:
    INLINE_JS = f.read()

BOOKS = [
    {
        "dir": "Jump Pup/jump-pup-review-games",
        "title": "Jump, Pup!",
        "emoji": "🐶",
        "words_api": "JumpPupWords",
        "accent": "#2e7d32",
        "has_word_img_file": False,
    },
    {
        "dir": "Play Kitty/play-kitty-review-games",
        "title": "Play, Kitty!",
        "emoji": "🐱",
        "words_api": "PlayKittyWords",
        "accent": "#c62828",
        "has_word_img_file": False,
    },
    {
        "dir": "Peek Otter/peek-otter-review-games",
        "title": "Peek, Otter!",
        "emoji": "🦦",
        "words_api": "PeekOtterWords",
        "accent": "#0277bd",
        "has_word_img_file": False,
    },
    {
        "dir": "Helpers in your neighborhood/helpers-neighborhood-review-games",
        "title": "Helpers in Your Neighborhood",
        "emoji": "🏘️",
        "words_api": "HelpersNeighborhoodWords",
        "accent": "#6a1b9a",
        "has_word_img_file": True,
    },
]


def word_img_fn(b):
    if b["has_word_img_file"]:
        return "function wordImg(w){return W.IMG_BASE+W.wordImgFile(w)+'.png';}"
    return "function wordImg(w){return W.IMG_BASE+w.word+'.png';}"


def generate(b):
    w, t, e, a = b["words_api"], b["title"], b["emoji"], b["accent"]
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>纸质练习 · {t}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Patrick+Hand&family=Noto+Sans+SC:wght@500;700&display=swap" rel="stylesheet" />
  <script src="words-data.js"></script>
  <style>
    :root {{ --gold: #f5c400; --ink: #1a1a1a; --paper: #fffef8; --accent: {a}; }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: "Noto Sans SC", sans-serif;
      background: #eceff1;
      color: var(--ink);
      padding: 1rem;
    }}
    .no-print {{ }}
    .toolbar {{
      max-width: 52rem;
      margin: 0 auto 1rem;
      background: #fff;
      border-radius: 12px;
      padding: 1rem 1.15rem;
      border-left: 5px solid var(--gold);
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }}
    .toolbar h1 {{
      font-family: "Fredoka", sans-serif;
      font-size: 1.25rem;
      color: var(--accent);
      margin-bottom: 0.5rem;
    }}
    .toolbar p {{ font-size: 0.88rem; color: #546e7a; line-height: 1.55; margin-bottom: 0.65rem; }}
    .toolbar .row {{ display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; align-items: center; margin: 0.5rem 0; }}
    .toolbar label {{ font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.35rem; cursor: pointer; }}
    .btn {{
      font-family: "Fredoka", sans-serif;
      font-weight: 700;
      border: 2px solid var(--ink);
      border-radius: 999px;
      padding: 0.5rem 1.1rem;
      background: #fff;
      cursor: pointer;
      font-size: 0.9rem;
      text-decoration: none;
      color: var(--ink);
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }}
    .btn.primary {{ background: var(--gold); border-color: #c9a008; }}
    .btn.accent {{ background: var(--accent); border-color: var(--accent); color: #fff; }}
    .chips {{ display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.35rem; }}
    .chip {{ font-size: 0.78rem; padding: 0.2rem 0.5rem; border: 1px solid #cfd8dc; border-radius: 999px; background: #fafafa; }}
    #printArea {{
      max-width: 52rem;
      margin: 0 auto;
    }}
    .sheet {{
      background: var(--paper);
      padding: 12mm 14mm 14mm;
      margin-bottom: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }}
    .sheet-hdr {{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid var(--gold);
      padding-bottom: 6px;
      margin-bottom: 10px;
    }}
    .sheet-hdr h2 {{
      font-family: "Fredoka", sans-serif;
      font-size: 1.1rem;
      color: var(--accent);
    }}
    .sheet-hdr .meta {{ font-size: 0.78rem; color: #78909c; }}
    .name-line {{ font-size: 0.82rem; margin-bottom: 8px; }}
    .name-line span {{ display: inline-block; min-width: 8rem; border-bottom: 1px solid #90a4ae; }}
    .maze-targets {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-bottom: 10px;
    }}
    .maze-target {{
      text-align: center;
      border: 1px solid #cfd8dc;
      border-radius: 8px;
      padding: 4px;
    }}
    .maze-target img {{ width: 100%; max-height: 80px; object-fit: contain; }}
    .maze-target .zh {{ font-size: 0.8rem; color: #546e7a; margin-top: 3px; }}
    .maze-target .num {{ font-family: "Fredoka", sans-serif; font-size: 0.85rem; color: var(--accent); }}
    .maze-grid {{
      display: grid;
      gap: 3px;
      max-width: 360px;
      margin: 0 auto;
      border: 2px solid #37474f;
      padding: 4px;
      background: #37474f;
    }}
    .maze-cell {{
      aspect-ratio: 1;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Fredoka", sans-serif;
      font-weight: 700;
      font-size: 1.3rem;
      text-transform: uppercase;
    }}
    .maze-hint {{ text-align: center; font-size: 0.75rem; color: #78909c; margin-top: 6px; }}
    .spell-item {{
      display: grid;
      grid-template-columns: 72px 1fr;
      gap: 10px;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px dashed #cfd8dc;
    }}
    .spell-item:last-child {{ border-bottom: none; }}
    .spell-item img {{
      width: 72px;
      height: 54px;
      object-fit: contain;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 2px;
    }}
    .spell-zh {{ font-size: 0.82rem; color: #546e7a; margin-bottom: 4px; }}
    .spell-letters {{
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 6px;
    }}
    .spell-letters span {{
      width: 1.65rem;
      height: 1.65rem;
      border: 2px solid #90caf9;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Patrick Hand", cursive;
      font-size: 1.15rem;
      font-weight: 700;
    }}
    .spell-write {{
      font-size: 0.78rem;
      color: #78909c;
    }}
    .spell-line {{
      display: inline-block;
      min-width: 10rem;
      border-bottom: 2px solid #37474f;
      margin-left: 4px;
      height: 1.2rem;
    }}
    .connect-row {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 8px 0;
    }}
    .connect-item {{
      border: 1px solid #cfd8dc;
      border-radius: 8px;
      padding: 6px;
      text-align: center;
      min-height: 72px;
    }}
    .connect-item img {{ max-height: 48px; max-width: 100%; object-fit: contain; }}
    .connect-blank {{
      font-family: "Fredoka", sans-serif;
      font-size: 1rem;
      color: #b0bec5;
      padding: 1rem 0;
    }}
    .answer-key {{ background: #f1f8e9; }}
    .answer-key .ans {{ font-family: "Fredoka", sans-serif; color: var(--accent); font-weight: 700; }}
    .empty-msg {{ text-align: center; padding: 2rem; color: #78909c; }}

    @media print {{
      body {{ background: #fff; padding: 0; }}
      .no-print {{ display: none !important; }}
      .sheet {{
        box-shadow: none;
        border-radius: 0;
        margin: 0;
        page-break-after: always;
        break-after: page;
      }}
      .sheet:last-child {{ page-break-after: auto; break-after: auto; }}
    }}
    @page {{
      size: A4 portrait;
      margin: 10mm 12mm;
    }}
  </style>
</head>
<body>
  <div class="toolbar no-print">
    <h1>{e} 纸质练习 · 打印 / 导出 PDF</h1>
    <p>根据<strong>选词设置</strong>中已勾选的单词生成练习纸。导出 PDF：点「打印」→ 目标选「另存为 PDF」→ 缩放 <strong>100%</strong>、边距 <strong>无/默认</strong>。</p>
    <div class="chips" id="wordChips"></div>
    <div class="row">
      <label><input type="checkbox" id="optMaze" checked /> 单词迷宫（每组 4 词 / 页）</label>
      <label><input type="checkbox" id="optSpell" checked /> 字母排序（看图拼词）</label>
      <label><input type="checkbox" id="optConnect" checked /> 图片单词连线</label>
      <label><input type="checkbox" id="optAnswers" /> 含答案页（教师用）</label>
    </div>
    <div class="row" style="margin-top:0.75rem;">
      <button type="button" class="btn accent" id="btnGen">📄 生成练习纸</button>
      <button type="button" class="btn primary" id="btnPrint">🖨️ 打印 / 导出 PDF</button>
      <a class="btn" href="index.html">← 游戏列表</a>
      <a class="btn" href="settings.html">⚙️ 选词设置</a>
    </div>
  </div>

  <div id="printArea">
    <p class="empty-msg no-print" id="placeholder">请点击「生成练习纸」预览内容</p>
  </div>

  <script>
{INLINE_JS}
  </script>
  <script>
  (function() {{
    "use strict";
    var W = window.{w};
    {word_img_fn(b)}
    if (!W) {{
      document.getElementById("placeholder").textContent = "词表加载失败";
      return;
    }}

    var pool = NgReview.shuffle(W.getSelected().slice());
    var host = document.getElementById("wordChips");
    host.innerHTML = "";
    document.getElementById("wordChips").insertAdjacentHTML("beforebegin",
      "<p style='font-size:0.85rem;color:#546e7a;margin:0.35rem 0'>已选 " + pool.length + " 个单词</p>");
    pool.forEach(function(w) {{
      var s = document.createElement("span");
      s.className = "chip";
      s.textContent = w.word;
      host.appendChild(s);
    }});

    function shuffle(arr) {{ return NgReview.shuffle(arr.slice()); }}

    function esc(s) {{
      return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    }}

    function sheetHeader(title, sub) {{
      return '<div class="sheet-hdr"><h2>' + esc(title) + '</h2><div class="meta">' + esc(sub) + '</div></div>' +
        '<div class="name-line">姓名：<span></span> &nbsp; 日期：<span></span></div>';
    }}

    function renderMazeSheet(group, idx, total, showAns) {{
      var words = shuffle(group.slice(0, 4));
      var maze = NgReview.generateMazeGrid7(words);
      var html = '<div class="sheet' + (showAns ? ' answer-key' : '') + '">';
      html += sheetHeader("{t} · 单词迷宫", "第 " + idx + " / " + total + " 组 · 7×7");
      html += '<div class="maze-targets">';
      words.forEach(function(w, i) {{
        html += '<div class="maze-target"><div class="num">' + (i+1) + '</div>';
        html += '<img src="' + esc(wordImg(w)) + '" alt="" />';
        html += '<div class="zh">' + esc(w.zh) + '</div>';
        if (showAns) html += '<div class="ans">' + esc(w.word) + '</div>';
        html += '</div>';
      }});
      html += '</div>';
      if (maze && maze.grid && maze.grid.length) {{
        var sz = maze.size || maze.grid.length;
        html += '<div class="maze-grid" style="grid-template-columns:repeat(' + sz + ',1fr)">';
        maze.grid.forEach(function(row) {{
          row.forEach(function(ch) {{
            html += '<div class="maze-cell">' + esc((ch||"?").toUpperCase()) + '</div>';
          }});
        }});
        html += '</div>';
      }}
      html += '<p class="maze-hint">' + (showAns ? '答案页' : '在宫格中找出 4 个单词（横/竖直线）') + '</p>';
      html += '</div>';
      return html;
    }}

    function renderSpellSheet(words, showAns) {{
      var html = '<div class="sheet' + (showAns ? ' answer-key' : '') + '">';
      html += sheetHeader("{t} · 字母排序", "看图 · 乱序字母 · 写出单词 · 共 " + words.length + " 题");
      words.forEach(function(w, i) {{
        var letters = w.word.replace(/[\\s-]/g, "").split("");
        var scrambled = shuffle(letters);
        html += '<div class="spell-item">';
        html += '<img src="' + esc(wordImg(w)) + '" alt="" />';
        html += '<div><div class="spell-zh">' + (i+1) + '. ' + esc(w.zh) + '</div>';
        html += '<div class="spell-letters">';
        scrambled.forEach(function(ch) {{
          html += '<span>' + esc(ch) + '</span>';
        }});
        html += '</div><div class="spell-write">写出单词：';
        if (showAns) html += '<span class="ans">' + esc(w.word) + '</span>';
        else html += '<span class="spell-line"></span>';
        html += '</div></div></div>';
      }});
      html += '</div>';
      return html;
    }}

    function padGroupToThree(group, sourcePool) {{
      var words = group.slice();
      if (words.length >= 3) return shuffle(words.slice(0, 3));
      var src = shuffle(sourcePool.slice());
      while (words.length < 3) {{
        words.push(src[Math.floor(Math.random() * src.length)]);
      }}
      return shuffle(words);
    }}

    function buildConnectGroups(sourcePool) {{
      var shuffled = shuffle(sourcePool.slice());
      var groups = [];
      for (var i = 0; i < shuffled.length; i += 3) {{
        groups.push(padGroupToThree(shuffled.slice(i, i + 3), sourcePool));
      }}
      return groups;
    }}

    function renderConnectSheet(group, idx, total, showAns) {{
      var words = shuffle(group.slice());
      var shuffled = shuffle(words.slice());
      var html = '<div class="sheet' + (showAns ? ' answer-key' : '') + '">';
      html += sheetHeader("{t} · 图片单词连线", "第 " + idx + " / " + total + " 页");
      html += '<div class="connect-row"><div><strong>图片</strong></div><div><strong>单词（已打乱）</strong></div></div>';
      for (var i = 0; i < words.length; i++) {{
        html += '<div class="connect-row">';
        html += '<div class="connect-item"><img src="' + esc(wordImg(words[i])) + '" alt="" /></div>';
        html += '<div class="connect-item" style="display:flex;align-items:center;justify-content:center">';
        html += '<span style="font-family:Fredoka,sans-serif;font-size:1.1rem;font-weight:700">' + esc(shuffled[i].word) + '</span>';
        html += '</div></div>';
      }}
      if (showAns) {{
        html += '<p class="maze-hint">答案：';
        words.forEach(function(w) {{ html += esc(w.word) + ' ↔ ' + esc(w.zh) + ' &nbsp; '; }});
        html += '</p>';
      }} else {{
        html += '<p class="maze-hint">用线将左侧图片与右侧对应的英文单词相连（右侧顺序已打乱）</p>';
      }}
      html += '</div>';
      return html;
    }}

    function generate() {{
      var area = document.getElementById("printArea");
      var optMaze = document.getElementById("optMaze").checked;
      var optSpell = document.getElementById("optSpell").checked;
      var optConnect = document.getElementById("optConnect").checked;
      var optAnswers = document.getElementById("optAnswers").checked;
      pool = NgReview.shuffle(W.getSelected().slice());

      if (!pool.length) {{
        area.innerHTML = '<p class="empty-msg">请先在 <a href="settings.html">选词设置</a> 中勾选单词</p>';
        return;
      }}

      var html = "";
      var mazeWords = pool.filter(function(w) {{ return w.word.indexOf(" ") < 0; }});

      if (optMaze) {{
        if (mazeWords.length < 4) {{
          html += '<div class="sheet"><p class="maze-hint">迷宫需要至少 4 个无空格单词（当前 ' + mazeWords.length + ' 个）</p></div>';
        }} else {{
          var mazeGroups = shuffle(NgReview.chunkGroups(shuffle(mazeWords), 4));
          mazeGroups.forEach(function(g, i) {{
            html += renderMazeSheet(g, i + 1, mazeGroups.length, false);
          }});
          if (optAnswers) {{
            mazeGroups.forEach(function(g, i) {{
              html += renderMazeSheet(g, i + 1, mazeGroups.length, true);
            }});
          }}
        }}
      }}

      if (optSpell) {{
        var spellWords = shuffle(pool.slice());
        for (var i = 0; i < spellWords.length; i += 6) {{
          html += renderSpellSheet(spellWords.slice(i, i + 6), false);
        }}
        if (optAnswers) {{
          for (var j = 0; j < spellWords.length; j += 6) {{
            html += renderSpellSheet(spellWords.slice(j, j + 6), true);
          }}
        }}
      }}

      if (optConnect) {{
        var connGroups = buildConnectGroups(pool);
        connGroups.forEach(function(g, i) {{
          html += renderConnectSheet(g, i + 1, connGroups.length, false);
        }});
        if (optAnswers) {{
          connGroups.forEach(function(g, i) {{
            html += renderConnectSheet(g, i + 1, connGroups.length, true);
          }});
        }}
      }}

      if (!html) {{
        html = '<p class="empty-msg">请至少勾选一种练习类型</p>';
      }}
      area.innerHTML = html;
    }}

    document.getElementById("btnGen").onclick = generate;
    document.getElementById("btnPrint").onclick = function() {{
      if (!document.querySelector("#printArea .sheet")) generate();
      window.print();
    }};

    if (pool.length) generate();
  }})();
  </script>
</body>
</html>
"""


def main():
    for b in BOOKS:
        path = os.path.join(ROOT, b["dir"].replace("/", os.sep), "print-worksheets.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(generate(b))
        print("Wrote", path)


if __name__ == "__main__":
    main()
