#!/usr/bin/env node
/**
 * 确保全库 HTML 在本地 file:// 教学时语音走本地 MP3。
 * - COS → 相对路径 assets/tts-mp3 或 assets/audio
 * - 收集 L10 / L08(07-09) / L13定语从句 Demo 等遗漏文案并下载 MP3
 * - 重建 L10 manifest；修补 L08 page02 音频基址；L13 Demo 接 bootstrap
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const COS =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/";
const EN_VOICE = "en-GB-RyanNeural";
const ZH_VOICE = "zh-CN-XiaoxiaoNeural";

function sha20(text) {
  return crypto.createHash("sha1").update(String(text), "utf8").digest("hex").slice(0, 20);
}
function sha20Voice(text, voice) {
  return crypto
    .createHash("sha1")
    .update(String(text) + "|" + voice, "utf8")
    .digest("hex")
    .slice(0, 20);
}
function norm(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}
function hasCjk(t) {
  return /[\u3400-\u9fff]/.test(String(t || ""));
}
function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(p, acc);
    } else if (/\.(html|js)$/i.test(name)) acc.push(p);
  }
  return acc;
}
function lessonFromPath(filePath) {
  const rel = path.relative(ROOT, filePath);
  const top = rel.split(path.sep)[0];
  if (/^L\d{2}/.test(top) || top.startsWith("L00-")) return top;
  return null;
}
function relMp3(filePath, lesson, fileName) {
  const fileLesson = lessonFromPath(filePath);
  if (fileLesson === lesson) return `assets/tts-mp3/${fileName}`;
  return path.posix.join("..", lesson, "assets", "tts-mp3", fileName).replace(/\\/g, "/");
}
function pickVoice(text) {
  return hasCjk(text) ? ZH_VOICE : EN_VOICE;
}
function mp3Name(text) {
  const v = pickVoice(text);
  return (hasCjk(text) ? sha20Voice(text, v) : sha20(text)) + ".mp3";
}

function replaceCosInContent(content, filePath) {
  const fileLesson = lessonFromPath(filePath);
  let c = content;
  c = c.replace(
    /https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Grammar\/((?:L\d{2}(?:-[^/]+)?|L00-[^/]+)\/assets\/tts-mp3\/([^"'\s?)]+))/g,
    (_m, lessonPath, fileName) => {
      const lesson = lessonPath.split("/")[0];
      return fileLesson === lesson
        ? `assets/tts-mp3/${fileName}`
        : path.posix.join("..", lesson, "assets", "tts-mp3", fileName).replace(/\\/g, "/");
    }
  );
  c = c.replace(
    /https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Grammar\/((?:L\d{2}(?:-[^/]+)?|L00-[^/]+)\/assets\/audio\/([^"'\s?)]+))/g,
    (_m, lessonPath, fileName) => {
      const lesson = lessonPath.split("/")[0];
      return fileLesson === lesson
        ? `assets/audio/${fileName}`
        : path.posix.join("..", lesson, "assets", "audio", fileName).replace(/\\/g, "/");
    }
  );
  c = c.replace(
    /var\s+PAGE02_AUDIO_BASE\s*=\s*"https:\/\/[^"]*\/L08\/assets\/audio\/page02\/"/,
    'var PAGE02_AUDIO_BASE = "assets/audio/page02/"'
  );
  return c;
}

function extractPhrases(content, opts = {}) {
  const out = [];
  const fields = [
    "sentence",
    "en",
    "text",
    "speakForward",
    "speakInverted",
    "plain",
    "merged",
    "a",
    "b",
    "microText",
    "script",
    "listening",
  ];
  for (const f of fields) {
    const re = new RegExp(`\\b${f}\\s*:\\s*("(?:\\\\.|[^"\\\\])*")`, "gi");
    let m;
    while ((m = re.exec(content)) !== null) {
      try {
        const val = JSON.parse(m[1]);
        if (val && val.length >= 2 && !/^https?:\/\//i.test(val)) out.push(val);
      } catch {}
    }
  }
  for (const m of content.matchAll(/data-tts="([^"]+)"/g)) out.push(m[1]);
  for (const m of content.matchAll(/data-text="([^"]+)"/g)) out.push(m[1]);
  for (const m of content.matchAll(/data-tts-read="([^"]+)"/g)) {
    try {
      out.push(decodeURIComponent(m[1]));
    } catch {
      out.push(m[1]);
    }
  }
  for (const field of ["enLeft", "enRight"]) {
    const re = new RegExp(`\\b${field}\\s*:\\s*"([^"]*)"`, "g");
    let m;
    while ((m = re.exec(content)) !== null) {
      const val = norm(m[1].replace(/<[^>]+>/g, " "));
      if (val.length >= 4) out.push(val);
    }
  }
  for (const m of content.matchAll(/window\.speak\s*\(\s*['"]((?:\\.|[^'\\])*)['"]/g)) {
    try {
      out.push(JSON.parse('"' + m[1].replace(/\\'/g, "'") + '"'));
    } catch {
      out.push(m[1]);
    }
  }
  for (const m of content.matchAll(/return\s+window\.speak\s*\(\s*['"]((?:\\.|[^'\\])*)['"]/g)) {
    try {
      out.push(JSON.parse('"' + m[1].replace(/\\'/g, "'") + '"'));
    } catch {
      out.push(m[1]);
    }
  }
  if (opts.azureSpeak) {
    for (const m of content.matchAll(/azureSpeak\s*\(\s*([^,)]+)/g)) {
      const arg = m[1].trim();
      if ((arg.startsWith('"') || arg.startsWith("'")) && arg.length > 3) {
        try {
          out.push(norm(JSON.parse(arg)));
        } catch {}
      }
    }
  }
  return out.map(norm).filter((t) => t.length >= 2 && !/^https?:\/\//i.test(t));
}

async function azureSynth(text, voice, key, region, outFile) {
  const lang = voice.startsWith("zh") ? "zh-CN" : "en-US";
  const ssml = `<speak version='1.0' xml:lang='${lang}'><voice xml:lang='${lang}' name='${voice}'>${escapeXml(text)}</voice></speak>`;
  const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
    },
    body: ssml,
  });
  const buf = Buffer.from(await res.arrayBuffer());
  if (!res.ok) throw new Error(`Azure ${res.status}`);
  if (buf.length < 80) throw new Error("too small");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
}

function writeManifestJs(manifestPath, entries) {
  const lines = entries
    .sort((a, b) => a.text.localeCompare(b.text))
    .map(({ text, rel }) => `  ${JSON.stringify(text)}: ${JSON.stringify(rel)}`)
    .join(",\n");
  const body = `window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {\n${lines}\n});\n`;
  fs.writeFileSync(manifestPath, body, "utf8");
}

function patchL13Demo(htmlPath) {
  let c = fs.readFileSync(htmlPath, "utf8");
  c = replaceCosInContent(c, htmlPath);
  const phrases = unique(extractPhrases(c));
  const entries = phrases.map((text) => ({
    text,
    rel: relMp3(htmlPath, "L13", mp3Name(text)),
  }));

  if (!c.includes("lesson-tts-bootstrap.js")) {
    const boot =
      '\n  <script src="../assets/lesson-tts-bootstrap.js"></script>\n  <script>\nwindow.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {\n' +
      entries.map(({ text, rel }) => `  ${JSON.stringify(text)}: ${JSON.stringify(rel)}`).join(",\n") +
      "\n});\n  </script>\n";
    c = c.replace("</head>", boot + "</head>");
  } else if (entries.length && !c.includes("__LESSON_TTS_MANIFEST")) {
    const block =
      '\n  <script>\nwindow.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {\n' +
      entries.map(({ text, rel }) => `  ${JSON.stringify(text)}: ${JSON.stringify(rel)}`).join(",\n") +
      "\n});\n  </script>\n";
    c = c.replace("</head>", block + "</head>");
  }

  c = c.replace(
    /window\.speak\s*=\s*async function\(text\)\s*\{[\s\S]*?\n  \};/,
    `window.speak = async function(text) {
    if (!text) return;
    var t = String(text).replace(/\\s+/g, " ").trim();
    if (window.LessonTTSBootstrap && window.LessonTTSBootstrap.playLocalIfAvailable) {
      var ok = await window.LessonTTSBootstrap.playLocalIfAvailable(t);
      if (ok) return;
      console.warn("[TTS] 本地 MP3 未找到:", t.slice(0, 120));
    }
    if (window.speechSynthesis) {
      var u = new SpeechSynthesisUtterance(t);
      u.lang = /[\\u3400-\\u9fff]/.test(t) ? "zh-CN" : "en-US";
      window.speechSynthesis.speak(u);
    }
  };`
  );

  const ttsBtnPatch = `document.querySelectorAll('.tts-btn[data-text], .tts-btn.inline-tts').forEach(function(btn){
    btn.addEventListener('click', function(){
      var t = btn.getAttribute('data-text') || (btn.closest('.card, section') && btn.closest('.card, section').querySelector('.tts-target') && btn.closest('.card, section').querySelector('.tts-target').textContent) || '';
      if (t && window.speak) window.speak(t.trim());
    });
  });`;

  if (!c.includes("playLocalIfAvailable") || !c.includes("tts-btn[data-text]")) {
    /* already patched speak */
  }

  fs.writeFileSync(htmlPath, c, "utf8");
  return { phrases: phrases.length, entries: entries.length };
}

function patchL08SpeakEn(htmlPath) {
  let c = fs.readFileSync(htmlPath, "utf8");
  if (c.includes("lesson-tts-bootstrap.js")) return false;
  const phrases = unique(extractPhrases(c));
  const lesson = "L08";
  const entries = phrases.map((text) => ({ text, rel: relMp3(htmlPath, lesson, mp3Name(text)) }));
  const block =
    '\n  <script src="../assets/lesson-tts-bootstrap.js"></script>\n  <script>\nwindow.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {\n' +
    entries.map(({ text, rel }) => `  ${JSON.stringify(text)}: ${JSON.stringify(rel)}`).join(",\n") +
    "\n});\n  </script>\n";
  c = c.replace("</head>", block + "</head>");
  c = c.replace(
    /function speakEn\(text\)\s*\{[\s\S]*?\n      \}/,
    `function speakEn(text) {
        var t = String(text || "").trim();
        if (!t) return;
        if (window.LessonTTSBootstrap && window.LessonTTSBootstrap.playLocalIfAvailable) {
          window.LessonTTSBootstrap.playLocalIfAvailable(t).then(function (ok) {
            if (!ok) console.warn("[TTS] 本地 MP3 未找到:", t.slice(0, 120));
          });
          return;
        }
      }`
  );
  fs.writeFileSync(htmlPath, c, "utf8");
  return { phrases: phrases.length };
}

function isValidManifestPhrase(t) {
  const n = norm(t);
  if (!n || n.length < 2) return false;
  if (/posterU\s*:|enRight\s*:|enLeft\s*:/.test(n)) return false;
  if (/\\",\s*en/.test(n)) return false;
  return true;
}

function unique(arr) {
  const s = new Set();
  const o = [];
  for (const x of arr) {
    const n = norm(x);
    if (!isValidManifestPhrase(n) || s.has(n)) continue;
    s.add(n);
    o.push(n);
  }
  return o;
}

async function main() {
  const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || "").trim();
  const region = String(process.env.AZURE_SPEECH_REGION || "eastasia").trim();
  const skipDownload = process.argv.includes("--skip-download");

  const files = walk(ROOT).filter((f) => !f.includes(`${path.sep}scripts${path.sep}`));
  let cosFixed = 0;

  /** @type {Map<string, {text:string, lesson:string, fileName:string, voice:string}>} */
  const jobs = new Map();

  for (const fp of files) {
    let c = fs.readFileSync(fp, "utf8");
    const nc = replaceCosInContent(c, fp);
    if (nc !== c) {
      fs.writeFileSync(fp, nc, "utf8");
      cosFixed++;
      c = nc;
    }
    const lesson = lessonFromPath(fp);
    if (!lesson) continue;

    const isL10 = lesson === "L10" && fp.endsWith(".html");
    const isL08trap = /lesson08-page0[789]/.test(fp) || /lesson08-page02/.test(fp);
    const isL13demo = fp.includes("L13-定语从句") && fp.includes("课件Demo");
    const isHandout =
      /handout/i.test(fp) ||
      c.includes("grammar-handout-page") ||
      c.includes("handout-tts-manifest");

    if (isL10 || isL08trap || isL13demo || isHandout || c.includes("__LESSON_TTS_MANIFEST")) {
      for (const t of extractPhrases(c, { azureSpeak: isL10 })) {
        const fn = mp3Name(t);
        const id = `${lesson}|${fn}`;
        if (!jobs.has(id)) jobs.set(id, { text: t, lesson, fileName: fn, voice: pickVoice(t) });
      }
    }
  }

  // L10 manifest 全量重建
  const l10Entries = [];
  for (const [id, job] of jobs) {
    if (job.lesson !== "L10") continue;
    l10Entries.push({
      text: job.text,
      rel: `assets/tts-mp3/${job.fileName}`,
    });
  }
  if (l10Entries.length) {
    writeManifestJs(path.join(ROOT, "L10", "assets", "l10-tts-manifest.js"), l10Entries);
    console.log("L10 manifest:", l10Entries.length, "条");
  }

  // L13 Demo
  for (const name of ["课件Demo_Lesson_Relative_Clause_01.html", "课件Demo_Lesson_Relative_Clause_02.html", "课件Demo_Lesson_Relative_Clause_03.html"]) {
    const p = path.join(ROOT, "L13-定语从句", name);
    if (fs.existsSync(p)) {
      const r = patchL13Demo(p);
      console.log("patched", name, r);
      for (const t of extractPhrases(fs.readFileSync(p, "utf8"))) {
        const fn = mp3Name(t);
        const id = `L13|${fn}`;
        if (!jobs.has(id)) jobs.set(id, { text: t, lesson: "L13", fileName: fn, voice: pickVoice(t) });
      }
    }
  }

  // L08 page07-09
  for (const n of ["lesson08-page07-traps.html", "lesson08-page08-masterplan.html", "lesson08-page09-prophecy.html"]) {
    const p = path.join(ROOT, "L08", n);
    if (fs.existsSync(p)) {
      const r = patchL08SpeakEn(p);
      if (r) {
        console.log("patched L08", n, r.phrases, "phrases");
        for (const t of extractPhrases(fs.readFileSync(p, "utf8"))) {
          const fn = mp3Name(t);
          jobs.set(`L08|${fn}`, { text: t, lesson: "L08", fileName: fn, voice: pickVoice(t) });
        }
      }
    }
  }

  console.log("COS/路径修复文件数:", cosFixed);
  console.log("待下载 MP3 任务:", jobs.size);

  let missing = 0;
  let downloaded = 0;
  for (const job of jobs.values()) {
    const dir = path.join(ROOT, job.lesson, "assets", "tts-mp3");
    const out = path.join(dir, job.fileName);
    if (fs.existsSync(out) && fs.statSync(out).size > 80) continue;
    missing++;
    if (skipDownload || !key) continue;
    try {
      await azureSynth(job.text, job.voice, key, region, out);
      downloaded++;
      process.stdout.write(`OK ${job.lesson}/${job.fileName}\n`);
      await new Promise((r) => setTimeout(r, 100));
    } catch (e) {
      console.error("FAIL", job.lesson, job.fileName, e.message, job.text.slice(0, 50));
    }
  }

  console.log("仍缺失 MP3:", missing - downloaded, "(已下载", downloaded, ")");
  if (missing > 0 && !key && !skipDownload) {
    console.error("请设置 AZURE_SPEECH_KEY 后重新运行以下载缺失音频");
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
