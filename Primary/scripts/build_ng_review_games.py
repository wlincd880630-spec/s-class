#!/usr/bin/env python3
"""生成自包含复习游戏 4-9（CSS/JS 内联，不依赖外部 assets 文件）"""
import os

ROOT = os.path.join(os.path.dirname(__file__), "..")
COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary"
RESPONSIVE = COS + "/assets/primary-responsive.js?v=2"

with open(os.path.join(ROOT, "assets", "ng-review-shared.css"), encoding="utf-8") as f:
    INLINE_CSS = f.read()
with open(os.path.join(ROOT, "assets", "ng-review-shared.js"), encoding="utf-8") as f:
    INLINE_JS = f.read()

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
        "has_word_img_file": False,
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
        "has_word_img_file": False,
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
        "has_word_img_file": False,
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
        "has_word_img_file": True,
    },
]


def word_img_fn(b):
    if b["has_word_img_file"]:
        return (
            "function wordImg(w){return W.IMG_BASE+W.wordImgFile(w)+'.png';}"
        )
    return "function wordImg(w){return W.IMG_BASE+w.word+'.png';}"


def speak_fn(b):
    t = b["tts_api"]
    return f"""function speakWord(text){{if(window.{t}){t}.speak(text,{{slow:false,azureOnly:true}});}}"""


def head(b, page_title, extra_css=""):
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>{page_title} · {b['title']}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Noto+Sans+SC:wght@500;700&display=swap" rel="stylesheet" />
  <script src="{b['audio_manifest']}"></script>
  <script src="{b['audio_local']}"></script>
  <script src="azure-tts.js"></script>
  <script src="words-data.js"></script>
  <style>
{INLINE_CSS}
:root {{ --ng-accent: {b['accent']}; }}
.setup-panel .chip {{ font-family:"Fredoka",sans-serif; font-size:0.82rem; padding:0.3rem 0.55rem; border:2px solid #d4cfc3; border-radius:999px; background:#fff; }}
.setup-panel .chips {{ display:flex; flex-wrap:wrap; gap:0.35rem; justify-content:center; margin:0.65rem 0; }}
.setup-panel.hidden, .play-panel {{ display:none; }}
.play-panel.on {{ display:block; }}
{extra_css}
  </style>
</head>"""


def tail():
    return f'  <script src="{RESPONSIVE}" defer></script>\n</body>\n</html>\n'


def setup_play_shell(b, emoji, title, hint, play_inner):
    return head(b, title) + f"""
<body class="ng-game">
  <div class="ng-toolbar">
    <div><h1>{emoji} {title}</h1><div class="meta" id="metaBar"></div></div>
    <div class="btns"><a class="ng-btn" href="index.html">← 游戏列表</a><a class="ng-btn" href="settings.html">选词</a></div>
  </div>
  <div class="ng-stage">
    <section class="setup-panel" id="setupPanel">
      <div class="ng-badge">准备开始</div>
      <p class="ng-hint">{hint}</p>
      <p class="ng-hint">已选 <strong id="wordCount">0</strong> 个单词：</p>
      <div class="chips" id="wordChips"></div>
      <div style="text-align:center;margin-top:0.75rem;">
        <button type="button" class="ng-btn primary big" id="btnStart">开始游戏 ▶</button>
      </div>
    </section>
    <section class="play-panel" id="playPanel">
{play_inner}
    </section>
  </div>
"""


def game4(b):
    e, a, w, t = b["emoji"], b["accent"], b["words_api"], b["tts_api"]
    play = f"""
      <div class="ng-badge" id="groupBadge">第 1 组</div>
      <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span><span>已找到 <strong id="foundEl">0</strong>/4</span></div>
      <div class="ng-maze-targets" id="targets"></div>
      <p class="ng-maze-path" id="pathPreview"></p>
      <div class="ng-maze-grid" id="mazeGrid"></div>
      <div class="ng-maze-actions">
        <button type="button" class="ng-btn" id="btnHint">💡 提示</button>
        <button type="button" class="ng-btn primary" id="btnSubmit">✓ 提交</button>
        <button type="button" class="ng-btn" id="btnClear">清除</button>
      </div>
      <div class="ng-feedback hidden" id="feedback"></div>
"""
    return (
        setup_play_shell(
            b,
            e,
            "单词迷宫",
            "7×7 宫格藏 4 个单词（横/竖四方向）。点击图片下方灰条显示中文。仅支持无空格单词。",
            play,
        )
        + f"""
  <script>
{INLINE_JS}
  </script>
  <script>
  (function() {{
    "use strict";
    var W = window.{w};
    {word_img_fn(b)}
    {speak_fn(b)}
    if (!W) return;
    var pool = NgReview.shuffle(W.getSelected().filter(function(w) {{ return w.word.indexOf(" ") < 0; }}).slice());
    renderChips(pool);
    if (pool.length < 4) {{
      document.getElementById("setupPanel").innerHTML = '<p class="ng-hint">迷宫至少需要 4 个无空格单词。<a href="settings.html">去选词</a></p>';
      return;
    }}
    document.getElementById("wordCount").textContent = String(pool.length);
    var groups = [], gi = 0, mazeData, selected = [], pathDir = null;
    var found = {{}}, foundPaths = {{}}, hintCells = {{}}, hintIdx = 0, correct = 0, wrong = 0, timer, pageWords = [];
    document.getElementById("btnStart").onclick = function() {{
      document.getElementById("setupPanel").classList.add("hidden");
      document.getElementById("playPanel").classList.add("on");
      groups = NgReview.shuffle(NgReview.chunkGroups(NgReview.shuffle(pool.slice()), 4));
      gi = 0; correct = 0; wrong = 0; timer = new NgReview.GameTimer(document.getElementById("timerEl")); timer.start();
      loadGroup();
    }};
    document.getElementById("btnHint").onclick = showHint;
    document.getElementById("btnSubmit").onclick = submit;
    document.getElementById("btnClear").onclick = clearSel;
    document.getElementById("mazeGrid").onclick = onCell;
    function renderChips(list) {{
      var host = document.getElementById("wordChips"); host.innerHTML = "";
      list.forEach(function(w) {{ var s = document.createElement("span"); s.className = "chip"; s.textContent = w.word; host.appendChild(s); }});
    }}
    function cellKey(r,c){{return r+","+c;}}
    function loadGroup() {{
      if (gi >= groups.length) {{ finish(); return; }}
      pageWords = NgReview.shuffle(groups[gi].slice(0,4)); found={{}}; foundPaths={{}}; hintCells={{}}; selected=[]; pathDir=null;
      document.getElementById("groupBadge").textContent = "第 "+(gi+1)+" / "+groups.length+" 组";
      mazeData = NgReview.generateMazeGrid7(pageWords);
      renderTargets(); renderGrid();
      document.getElementById("foundEl").textContent = "0";
    }}
    function renderTargets() {{
      var el = document.getElementById("targets"); el.innerHTML="";
      pageWords.forEach(function(w) {{
        var item=document.createElement("div"); item.className="ng-maze-target"+(found[w.word]?" done":"");
        var img=document.createElement("img"); img.src=wordImg(w); img.alt=w.word;
        var zh=document.createElement("div"); zh.className="zh-area hidden-zh"; zh.textContent=w.zh;
        zh.onclick=function(){{zh.classList.remove("hidden-zh");}};
        var actions=document.createElement("div"); actions.className="target-actions";
        var sb=document.createElement("button"); sb.type="button"; sb.className="ng-btn sm"; sb.textContent="🔊";
        sb.onclick=function(ev){{ev.stopPropagation(); speakWord(w.word);}}; actions.appendChild(sb);
        var lbl=document.createElement("div"); lbl.className="word-label"; lbl.textContent=found[w.word]?w.word:"???";
        item.appendChild(img); item.appendChild(zh); item.appendChild(actions); item.appendChild(lbl); el.appendChild(item);
      }});
    }}
    function renderGrid() {{
      var g=document.getElementById("mazeGrid");
      if(!mazeData||!mazeData.grid||!mazeData.grid.length){{g.innerHTML='<p class="ng-hint">迷宫生成失败</p>';return;}}
      var sz=mazeData.size||mazeData.grid.length; g.style.gridTemplateColumns="repeat("+sz+",1fr)"; g.innerHTML="";
      mazeData.grid.forEach(function(row,r){{row.forEach(function(ch,c){{
        var key=cellKey(r,c),cell=document.createElement("div"),cls="ng-maze-cell";
        if(selected.some(function(s){{return s.key===key;}})) cls+=" selected";
        if(hintCells[key]) cls+=" hint";
        Object.keys(foundPaths).forEach(function(w){{if(foundPaths[w][key]) cls+=" found";}});
        cell.className=cls; cell.dataset.r=r; cell.dataset.c=c; cell.textContent=(ch||"?").toUpperCase(); g.appendChild(cell);
      }});}});
    }}
    function getDir(a,b){{var dr=b.r-a.r,dc=b.c-a.c;if(dr&&dc)return null;if(!dr&&!dc)return null;return{{dr:dr?dr/Math.abs(dr):0,dc:dc?dc/Math.abs(dc):0}};}}
    function onCell(e) {{
      var cell=e.target.closest(".ng-maze-cell"); if(!cell||!mazeData) return;
      var r=+cell.dataset.r,c=+cell.dataset.c,key=cellKey(r,c),ch=mazeData.grid[r][c];
      var idx=selected.findIndex(function(s){{return s.key===key;}});
      if(idx>=0){{selected=selected.slice(0,idx+1);pathDir=selected.length>=2?getDir(selected[0],selected[1]):null;}}
      else{{var pt={{r:r,c:c,ch:ch,key:key}};
        if(!selected.length) selected=[pt];
        else if(selected.length===1){{var last=selected[0];if(Math.abs(last.r-r)+Math.abs(last.c-c)===1){{selected.push(pt);pathDir=getDir(selected[0],selected[1]);}}else{{selected=[pt];pathDir=null;}}}}
        else{{var L=selected[selected.length-1];if(pathDir&&L.r+pathDir.dr===r&&L.c+pathDir.dc===c)selected.push(pt);else{{selected=[pt];pathDir=null;}}}}
      }}
      document.getElementById("pathPreview").textContent=selected.length?"当前："+selected.map(function(s){{return s.ch.toUpperCase();}}).join(" "):"";
      renderGrid();
    }}
    function clearSel(){{selected=[];pathDir=null;document.getElementById("pathPreview").textContent="";renderGrid();}}
    function showHint() {{
      var unfound=pageWords.filter(function(w){{return !found[w.word];}}); if(!unfound.length)return;
      var target=unfound[hintIdx++%unfound.length];
      var placement=(mazeData.placements||[]).find(function(p){{return p.word.word===target.word;}});
      if(!placement||!placement.cells.length)return;
      hintCells={{}}; var first=placement.cells[0]; hintCells[cellKey(first.r,first.c)]=true; renderGrid();
      NgReview.showFeedback(document.getElementById("feedback"),"提示："+target.word+" 首字母已高亮",true);
    }}
    function submit() {{
      if(!selected.length){{NgReview.showFeedback(document.getElementById("feedback"),"请先连成单词！",false);return;}}
      var letters=selected.map(function(s){{return s.ch.toLowerCase();}}).join("");
      var match=pageWords.find(function(w){{return !found[w.word]&&w.word.replace(/-/g,"").toLowerCase()===letters;}});
      var fb=document.getElementById("feedback");
      if(match){{correct++;found[match.word]=true;var pmap={{}};selected.forEach(function(s){{pmap[s.key]=true;}});foundPaths[match.word]=pmap;
        speakWord(match.word);NgReview.showFeedback(fb,"找到了 "+match.word+"！🎉",true);selected=[];pathDir=null;
        renderTargets();renderGrid();document.getElementById("foundEl").textContent=String(Object.keys(found).length);
        if(Object.keys(found).length===pageWords.length){{gi++;setTimeout(loadGroup,1200);}}
      }}else{{wrong++;NgReview.showFeedback(fb,"不对，请沿直线重选！",false);clearSel();}}
    }}
    function finish() {{
      var t=timer.stop();
      document.getElementById("playPanel").innerHTML='<div class="ng-done"><h2>🎉 迷宫通关！</h2><p>正确 '+correct+' · 错误 '+wrong+' · 用时 '+NgReview.formatTime(t)+'</p><a class="ng-btn primary" href="index.html">返回</a> <button type="button" class="ng-btn" onclick="location.reload()">再玩</button></div>';
    }}
  }})();
  </script>
"""
        + tail()
    )


def game5(b):
    e, w = b["emoji"], b["words_api"]
    play = """
      <div class="ng-badge" id="progressBadge">第 1 题</div>
      <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span></div>
      <div class="ng-quiz-prompt"><img id="qImg" src="" alt="" /><p class="zh-big" id="qZh"></p></div>
      <div class="ng-quiz-options" id="options"></div>
      <div class="ng-feedback hidden" id="feedback"></div>
"""
    return (
        setup_play_shell(b, e, "看中文选单词", "看中文意思，从 3 个英文单词中选出正确答案。", play)
        + f"""
  <script>{INLINE_JS}</script>
  <script>
  (function(){{"use strict";var W=window.{w};{word_img_fn(b)}{speak_fn(b)};if(!W)return;
    var pool=NgReview.shuffle(W.getSelected().slice());document.getElementById("wordCount").textContent=String(pool.length);
    var host=document.getElementById("wordChips");pool.forEach(function(w){{var s=document.createElement("span");s.className="chip";s.textContent=w.word+" "+w.zh;host.appendChild(s);}});
    if(pool.length<3){{document.getElementById("setupPanel").innerHTML='<p class="ng-hint">至少 3 个单词。<a href="settings.html">去选词</a></p>';return;}}
    var queue=[],qi=0,correct=0,wrong=0,timer=null,answered=false;
    document.getElementById("metaBar").textContent="共 "+pool.length+" 题 · 每次随机顺序";
    document.getElementById("btnStart").onclick=function(){{
      document.getElementById("setupPanel").classList.add("hidden");document.getElementById("playPanel").classList.add("on");
      queue=NgReview.shuffle(pool.slice());qi=0;correct=0;wrong=0;timer=new NgReview.GameTimer(document.getElementById("timerEl"));timer.start();showQ();
    }};
    function showQ(){{
      if(qi>=queue.length){{finish();return;}}answered=false;var w=queue[qi];
      document.getElementById("progressBadge").textContent="第 "+(qi+1)+" / "+queue.length+" 题";
      document.getElementById("qZh").textContent=w.zh;
      var img=document.getElementById("qImg");img.src=wordImg(w);img.alt=w.word;
      NgReview.hideFeedback(document.getElementById("feedback"));
      var opts=NgReview.shuffle(NgReview.buildMcOptions(w,pool,3)),el=document.getElementById("options");el.innerHTML="";
      opts.forEach(function(o){{
        var btn=document.createElement("button");btn.type="button";btn.className="ng-quiz-opt";
        var span=document.createElement("span");span.textContent=o.word;btn.appendChild(span);
        var sp=document.createElement("button");sp.type="button";sp.className="ng-btn sm";sp.textContent="🔊";
        sp.style.marginLeft="auto";sp.onclick=function(ev){{ev.stopPropagation();speakWord(o.word);}};btn.appendChild(sp);
        btn.onclick=function(){{pick(o,w,btn);}};el.appendChild(btn);
      }});
    }}
    function pick(choice,answer,btn){{
      if(answered)return;answered=true;var ok=choice.word===answer.word,fb=document.getElementById("feedback");
      if(ok){{correct++;btn.classList.add("correct");speakWord(answer.word);NgReview.showFeedback(fb,"正确！🎉",true);}}
      else{{wrong++;btn.classList.add("wrong");NgReview.showFeedback(fb,"答案是 "+answer.word,false);}}
      Array.prototype.forEach.call(document.getElementById("options").children,function(b){{b.disabled=true;}});
      qi++;setTimeout(showQ,ok?900:1400);
    }}
    function finish(){{timer.stop();document.getElementById("playPanel").innerHTML='<div class="ng-done"><h2>完成！</h2><p>正确 '+correct+' / 错误 '+wrong+'</p><a class="ng-btn primary" href="index.html">返回</a></div>';}}
  }})();
  </script>
"""
        + tail()
    )


def game6(b):
    e, a, w = b["emoji"], b["accent"], b["words_api"]
    play = """
      <div class="ng-badge" id="groupBadge">第 1 页</div>
      <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span><span>已完成 <strong id="doneEl">0</strong>/3</span></div>
      <div class="ng-connect-wrap" id="connectWrap">
        <svg class="ng-connect-svg" id="linesSvg"></svg>
        <div class="ng-connect-col" id="leftCol"></div>
        <div class="ng-connect-col" id="rightCol"></div>
      </div>
      <div class="ng-feedback hidden" id="feedback"></div>
"""
    return (
        setup_play_shell(b, e, "图片单词连线", "左侧图片与右侧单词配对（不显示中文）。先点一项，再点对应项。", play)
        + f"""
  <script>{INLINE_JS}</script>
  <script>
  (function(){{"use strict";var W=window.{w};{word_img_fn(b)}{speak_fn(b)};if(!W)return;
    var pool=NgReview.shuffle(W.getSelected().slice());document.getElementById("wordCount").textContent=String(pool.length);
    pool.forEach(function(w){{var s=document.createElement("span");s.className="chip";s.textContent=w.word;document.getElementById("wordChips").appendChild(s);}});
    if(pool.length<3){{document.getElementById("setupPanel").innerHTML='<p class="ng-hint">至少 3 个单词。<a href="settings.html">去选词</a></p>';return;}}
    var groups=[],gi=0,correct=0,wrong=0,timer,pageWords=[],matched={{}},selSide=null,selWord=null;
    document.getElementById("btnStart").onclick=function(){{
      document.getElementById("setupPanel").classList.add("hidden");document.getElementById("playPanel").classList.add("on");
      groups=NgReview.shuffle(NgReview.chunkGroups(NgReview.shuffle(pool.slice()),3));
      gi=0;correct=0;wrong=0;timer=new NgReview.GameTimer(document.getElementById("timerEl"));timer.start();loadGroup();
    }};
    function loadGroup(){{
      if(gi>=groups.length){{finish();return;}}
      pageWords=NgReview.shuffle(groups[gi].slice());matched={{}};selSide=null;selWord=null;
      document.getElementById("groupBadge").textContent="第 "+(gi+1)+" / "+groups.length+" 页";
      document.getElementById("doneEl").textContent="0";document.getElementById("linesSvg").innerHTML="";
      var left=document.getElementById("leftCol"),right=document.getElementById("rightCol");left.innerHTML="";right.innerHTML="";
      pageWords.forEach(function(w){{
        var li=document.createElement("div");li.className="ng-connect-item";li.dataset.word=w.word;
        var img=document.createElement("img");img.src=wordImg(w);img.alt=w.word;li.appendChild(img);
        li.onclick=function(){{onPick("img",w.word,li);}};left.appendChild(li);
      }});
      NgReview.shuffle(pageWords).forEach(function(w){{
        var ri=document.createElement("div");ri.className="ng-connect-item";ri.dataset.word=w.word;
        var lbl=document.createElement("div");lbl.className="en-label";lbl.textContent=w.word;ri.appendChild(lbl);
        ri.onclick=function(){{onPick("word",w.word,ri);}};right.appendChild(ri);
      }});
    }}
    function onPick(side,word,el){{
      if(matched[word])return;
      if(!selSide){{selSide=side;selWord=word;el.classList.add("selected");return;}}
      if(selSide===side){{document.querySelectorAll(".ng-connect-item.selected").forEach(function(e){{e.classList.remove("selected");}});selSide=side;selWord=word;el.classList.add("selected");return;}}
      if(selWord===word){{correct++;matched[word]=true;document.querySelectorAll('.ng-connect-item[data-word="'+word+'"]').forEach(function(e){{e.classList.remove("selected");e.classList.add("matched");}});
        drawLine(word);speakWord(word);NgReview.showFeedback(document.getElementById("feedback"),"配对成功！🎉",true);
        document.getElementById("doneEl").textContent=String(Object.keys(matched).length);
        if(Object.keys(matched).length===pageWords.length){{gi++;setTimeout(loadGroup,1000);}}
      }}else{{wrong++;NgReview.showFeedback(document.getElementById("feedback"),"不对，再试试！",false);document.querySelectorAll(".ng-connect-item.selected").forEach(function(e){{e.classList.remove("selected");}});}}
      selSide=null;selWord=null;
    }}
    function drawLine(word){{
      var items=document.querySelectorAll('.ng-connect-item[data-word="'+word+'"]');if(items.length<2)return;
      var wrap=document.getElementById("connectWrap").getBoundingClientRect(),a=items[0].getBoundingClientRect(),b=items[1].getBoundingClientRect();
      var line=document.createElementNS("http://www.w3.org/2000/svg","line");
      line.setAttribute("x1",a.right-wrap.left);line.setAttribute("y1",a.top+a.height/2-wrap.top);
      line.setAttribute("x2",b.left-wrap.left);line.setAttribute("y2",b.top+b.height/2-wrap.top);
      line.setAttribute("stroke","{a}");line.setAttribute("stroke-width","3");document.getElementById("linesSvg").appendChild(line);
    }}
    function finish(){{timer.stop();document.getElementById("playPanel").innerHTML='<div class="ng-done"><h2>连线完成！</h2><p>正确 '+correct+' · 错误 '+wrong+'</p><a class="ng-btn primary" href="index.html">返回</a></div>';}}
  }})();
  </script>
"""
        + tail()
    )


def game7(b):
    e, w = b["emoji"], b["words_api"]
    play = """
      <div class="ng-badge" id="progressBadge">第 1 题</div>
      <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span></div>
      <div class="ng-quiz-prompt"><img id="qImg" src="" alt="" /><p class="en-big" id="qEn"></p>
        <div style="text-align:center;margin-top:0.5rem;"><button type="button" class="ng-btn sm" id="btnSpeak">🔊 朗读</button></div></div>
      <div class="ng-quiz-options" id="options"></div>
      <div class="ng-feedback hidden" id="feedback"></div>
"""
    return (
        setup_play_shell(b, e, "看单词选中文", "看英文单词和图片，从 3 个中文意思中选择正确答案。", play)
        + f"""
  <script>{INLINE_JS}</script>
  <script>
  (function(){{"use strict";var W=window.{w};{word_img_fn(b)}{speak_fn(b)};if(!W)return;
    var pool=NgReview.shuffle(W.getSelected().slice());document.getElementById("wordCount").textContent=String(pool.length);
    pool.forEach(function(w){{var s=document.createElement("span");s.className="chip";s.textContent=w.word;document.getElementById("wordChips").appendChild(s);}});
    if(pool.length<3){{document.getElementById("setupPanel").innerHTML='<p class="ng-hint">至少 3 个单词。<a href="settings.html">去选词</a></p>';return;}}
    var queue=[],qi=0,correct=0,wrong=0,timer=null,answered=false,cur=null;
    document.getElementById("btnStart").onclick=function(){{
      document.getElementById("setupPanel").classList.add("hidden");document.getElementById("playPanel").classList.add("on");
      queue=NgReview.shuffle(pool.slice());qi=0;correct=0;wrong=0;timer=new NgReview.GameTimer(document.getElementById("timerEl"));timer.start();showQ();
    }};
    document.getElementById("btnSpeak").onclick=function(){{if(cur)speakWord(cur.word);}};
    function showQ(){{
      if(qi>=queue.length){{finish();return;}}answered=false;cur=queue[qi];
      document.getElementById("progressBadge").textContent="第 "+(qi+1)+" / "+queue.length+" 题";
      document.getElementById("qEn").textContent=cur.word;document.getElementById("qImg").src=wordImg(cur);
      speakWord(cur.word);NgReview.hideFeedback(document.getElementById("feedback"));
      var zhPool=pool.map(function(w){{return w.zh;}});
      var opts=NgReview.shuffle([cur.zh].concat(NgReview.shuffle(zhPool.filter(function(z){{return z!==cur.zh;}})).slice(0,2)));
      var el=document.getElementById("options");el.innerHTML="";
      opts.forEach(function(zh){{var btn=document.createElement("button");btn.type="button";btn.className="ng-quiz-opt";btn.textContent=zh;
        btn.onclick=function(){{pick(zh,cur,btn);}};el.appendChild(btn);}});
    }}
    function pick(choice,answer,btn){{
      if(answered)return;answered=true;var ok=choice===answer.zh,fb=document.getElementById("feedback");
      if(ok){{correct++;btn.classList.add("correct");NgReview.showFeedback(fb,"正确！🎉",true);}}
      else{{wrong++;btn.classList.add("wrong");NgReview.showFeedback(fb,"答案是："+answer.zh,false);}}
      Array.prototype.forEach.call(document.getElementById("options").children,function(b){{b.disabled=true;}});
      qi++;setTimeout(showQ,ok?900:1400);
    }}
    function finish(){{timer.stop();document.getElementById("playPanel").innerHTML='<div class="ng-done"><h2>完成！</h2><p>正确 '+correct+' / 错误 '+wrong+'</p><a class="ng-btn primary" href="index.html">返回</a></div>';}}
  }})();
  </script>
"""
        + tail()
    )


def game8(b):
    e, w = b["emoji"], b["words_api"]
    play = """
      <div class="ng-badge" id="progressBadge">第 1 题</div>
      <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span><span>得分 <strong id="scoreEl">0</strong></span></div>
      <div class="ng-bubble-stage" id="bubbleStage">
        <div class="ng-bubble-prompt"><div class="zh" id="promptZh">—</div><div class="combo">点击正确的英文泡泡</div></div>
      </div>
      <div class="ng-feedback hidden" id="feedback"></div>
"""
    return (
        setup_play_shell(b, e, "泡泡捞词", "看中文提示，从上升的泡泡中点击正确的英文单词。", play)
        + f"""
  <script>{INLINE_JS}</script>
  <script>
  (function(){{"use strict";var W=window.{w};{speak_fn(b)};if(!W)return;
    var pool=NgReview.shuffle(W.getSelected().slice());document.getElementById("wordCount").textContent=String(pool.length);
    pool.forEach(function(w){{var s=document.createElement("span");s.className="chip";s.textContent=w.word+" "+w.zh;document.getElementById("wordChips").appendChild(s);}});
    if(pool.length<4){{document.getElementById("setupPanel").innerHTML='<p class="ng-hint">至少 4 个单词。<a href="settings.html">去选词</a></p>';return;}}
    var queue=[],qi=0,correct=0,wrong=0,score=0,timer=null,active=false;
    var colors=["#e1f5fe","#b3e5fc","#81d4fa","#4fc3f7"];
    var BUBBLE_SIZE=76;
    document.getElementById("btnStart").onclick=function(){{
      document.getElementById("setupPanel").classList.add("hidden");document.getElementById("playPanel").classList.add("on");
      queue=NgReview.shuffle(pool.slice());qi=0;correct=0;wrong=0;score=0;active=true;timer=new NgReview.GameTimer(document.getElementById("timerEl"));timer.start();nextRound();
    }};
    function nextRound(){{
      if(qi>=queue.length){{finish();return;}}
      var answer=queue[qi];document.getElementById("progressBadge").textContent="第 "+(qi+1)+" / "+queue.length+" 题";
      document.getElementById("promptZh").textContent=answer.zh;document.getElementById("scoreEl").textContent=String(score);
      clearBubbles();
      var opts=NgReview.shuffle(NgReview.buildMcOptions(answer,pool,4));
      var lanes=NgReview.shuffle([14,36,58,80]);
      opts.forEach(function(w,i){{setTimeout(function(){{spawnBubble(w,w.word===answer.word,lanes[i],i);}},i*320);}});
    }}
    function clearBubbles(){{document.getElementById("bubbleStage").querySelectorAll(".ng-bubble").forEach(function(b){{b.remove();}});}}
    function spawnBubble(w,isAnswer,lanePct,stagger){{
      if(!active)return;var stage=document.getElementById("bubbleStage"),b=document.createElement("div");
      b.className="ng-bubble";b.style.width=BUBBLE_SIZE+"px";b.style.height=BUBBLE_SIZE+"px";
      b.style.left=lanePct+"%";b.style.bottom=(6+stagger*5)+"%";b.style.background=colors[stagger%colors.length];
      b.textContent=w.word;b.style.animationDuration=(7+stagger*0.6)+"s";
      b.onclick=function(){{
        if(!active||b.classList.contains("pop"))return;
        if(isAnswer){{b.classList.add("pop");correct++;score+=15;active=false;speakWord(w.word);
          NgReview.showFeedback(document.getElementById("feedback"),"捞到了！+15",true);
          qi++;setTimeout(function(){{active=true;nextRound();}},800);}}
        else{{b.classList.add("pop");wrong++;NgReview.showFeedback(document.getElementById("feedback"),"破了！再试",false);}}
        document.getElementById("scoreEl").textContent=String(score);
      }};stage.appendChild(b);
    }}
    function finish(){{active=false;timer.stop();document.getElementById("playPanel").innerHTML='<div class="ng-done"><h2>得分 '+score+'</h2><a class="ng-btn primary" href="index.html">返回</a></div>';}}
  }})();
  </script>
"""
        + tail()
    )


def game9(b):
    e, w = b["emoji"], b["words_api"]
    play = """
      <div class="ng-badge" id="progressBadge">准备转盘</div>
      <div class="ng-timer-bar"><span>⏱ <strong id="timerEl">0:00</strong></span><span>得分 <strong id="scoreEl">0</strong></span></div>
      <div class="ng-spin-wrap">
        <div class="ng-wheel-container"><div class="ng-wheel-pointer"></div><div class="ng-wheel" id="wheel"></div></div>
        <button type="button" class="ng-btn primary big" id="btnSpin" disabled>🎡 转动转盘</button>
        <div class="ng-spin-challenge ng-hidden" id="challenge">
          <p class="ng-hint">听发音，选出对应图片！</p>
          <p class="en-big" id="targetWord" style="text-align:center;"></p>
          <button type="button" class="ng-btn sm" id="btnReplay" style="display:block;margin:0 auto 0.75rem;">🔊 再听</button>
          <div class="ng-spin-images" id="imgOpts"></div>
        </div>
      </div>
      <div class="ng-feedback hidden" id="feedback"></div>
"""
    extra = ".ng-wheel-label{position:absolute;left:50%;top:50%;width:0;height:0;display:flex;align-items:center;justify-content:center;font-family:Fredoka,sans-serif;font-weight:700;font-size:0.68rem;pointer-events:none;white-space:nowrap;transform-origin:center center;}"
    return (
        setup_play_shell(b, e, "转盘寻宝", "转动转盘，听音选图！", play).replace(
            "<style>", "<style>\n" + extra + "\n", 1
        )
        + f"""
  <script>{INLINE_JS}</script>
  <script>
  (function(){{"use strict";var W=window.{w};{word_img_fn(b)}{speak_fn(b)};if(!W)return;
    var pool=NgReview.shuffle(W.getSelected().slice());document.getElementById("wordCount").textContent=String(pool.length);
    pool.forEach(function(w){{var s=document.createElement("span");s.className="chip";s.textContent=w.word;document.getElementById("wordChips").appendChild(s);}});
    if(pool.length<4){{document.getElementById("setupPanel").innerHTML='<p class="ng-hint">至少 4 个单词。<a href="settings.html">去选词</a></p>';return;}}
    var segments=[],qi=0,correct=0,wrong=0,score=0,timer=null,spinning=false,cur=null,rot=0,segAngle=45;
    var colors=["#f5c400","#66bb6a","#42a5f5","#ab47bc","#ef5350","#ffa726","#26c6da","#8d6e63"];
    document.getElementById("btnStart").onclick=function(){{
      document.getElementById("setupPanel").classList.add("hidden");document.getElementById("playPanel").classList.add("on");
      segments=NgReview.shuffle(pool.slice()).slice(0,Math.min(8,pool.length));
      segAngle=360/segments.length;qi=0;score=0;timer=new NgReview.GameTimer(document.getElementById("timerEl"));timer.start();
      document.getElementById("btnSpin").disabled=false;buildWheel();
      document.getElementById("progressBadge").textContent="共 "+segments.length+" 轮 · 随机顺序";
    }};
    function buildWheel(){{
      var w=document.getElementById("wheel");
      w.style.background="conic-gradient(from 0deg, "+segments.map(function(s,i){{return colors[i%colors.length]+" "+(i*segAngle)+"deg "+((i+1)*segAngle)+"deg";}}).join(", ")+")";
      w.innerHTML="";segments.forEach(function(s,i){{var lbl=document.createElement("div");lbl.className="ng-wheel-label";lbl.textContent=s.word;
        lbl.style.transform="rotate("+(i*segAngle+segAngle/2)+"deg) translateY(-95px)";w.appendChild(lbl);}});
    }}
    document.getElementById("btnSpin").onclick=function(){{
      if(spinning||qi>=segments.length)return;
      spinning=true;document.getElementById("btnSpin").disabled=true;
      document.getElementById("challenge").classList.add("ng-hidden");
      cur=segments[qi];
      var center=qi*segAngle+segAngle/2;
      var targetMod=(360-center)%360;
      var prevMod=((rot%360)+360)%360;
      var delta=(targetMod-prevMod+360)%360;
      if(delta<120) delta+=360;
      rot+=360*(4+Math.floor(Math.random()*2))+delta;
      document.getElementById("wheel").style.transform="rotate("+rot+"deg)";
      setTimeout(function(){{
        spinning=false;
        showChallenge(cur);
        document.getElementById("btnSpin").disabled=false;
      }},3200);
    }};
    function showChallenge(w){{
      document.getElementById("challenge").classList.remove("ng-hidden");
      document.getElementById("targetWord").textContent=w.word;document.getElementById("progressBadge").textContent="第 "+(qi+1)+" / "+segments.length+" 轮";
      speakWord(w.word);var opts=NgReview.shuffle(NgReview.buildMcOptions(w,pool,4)),el=document.getElementById("imgOpts");el.innerHTML="";
      opts.forEach(function(o){{var btn=document.createElement("button");btn.type="button";btn.className="ng-spin-img-opt";
        var img=document.createElement("img");img.src=wordImg(o);img.alt=o.word;btn.appendChild(img);
        btn.onclick=function(){{pickImg(o,w,btn);}};el.appendChild(btn);}});
    }}
    document.getElementById("btnReplay").onclick=function(){{if(cur)speakWord(cur.word);}};
    function pickImg(choice,answer,btn){{
      var ok=choice.word===answer.word,fb=document.getElementById("feedback");
      Array.prototype.forEach.call(document.getElementById("imgOpts").children,function(b){{b.disabled=true;}});
      if(ok){{correct++;score+=15;btn.classList.add("correct");NgReview.showFeedback(fb,"正确！+15",true);}}
      else{{wrong++;btn.classList.add("wrong");NgReview.showFeedback(fb,"答案是 "+answer.word,false);}}
      document.getElementById("scoreEl").textContent=String(score);qi++;
      setTimeout(function(){{document.getElementById("challenge").classList.add("ng-hidden");if(qi>=segments.length)finish();}},ok?900:1400);
    }}
    function finish(){{timer.stop();document.getElementById("btnSpin").disabled=true;document.getElementById("playPanel").innerHTML='<div class="ng-done"><h2>得分 '+score+'</h2><a class="ng-btn primary" href="index.html">返回</a></div>';}}
  }})();
  </script>
"""
        + tail()
    )


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
            with open(path, "w", encoding="utf-8") as f:
                f.write(fn(b))
            print("Wrote", path)


if __name__ == "__main__":
    main()
