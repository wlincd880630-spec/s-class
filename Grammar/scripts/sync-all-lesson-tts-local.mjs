#!/usr/bin/env node
/**
 * 全库 TTS 本地化：
 * 1) 将 manifest / HTML 中的腾讯云 COS mp3 链接改为各课 assets/tts-mp3/ 相对路径
 * 2) 收集所有需朗读英文（及少量中文）文案
 * 3) 用 Azure Speech REST 合成缺失的 MP3
 * 4) 为含内联 playAudio / speakAzure 的页面注入 manifest + 改 playAudio 为仅本地播放
 *
 * 环境变量：AZURE_SPEECH_KEY（必填）、AZURE_SPEECH_REGION（默认 southeastasia）
 *
 * 用法：node scripts/sync-all-lesson-tts-local.mjs [--dry-run] [--skip-download] [--only-cos] [--skip-patch]
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const COS_PREFIX =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/";

const EN_VOICE_DEFAULT = "en-GB-RyanNeural";
const EN_VOICE_ARIA = "en-GB-RyanNeural";
const ZH_VOICE = "zh-CN-XiaoxiaoNeural";

const EN_FIELD_KEYS = new Set([
  "en",
  "text",
  "sentence",
  "plain",
  "merged",
  "past",
  "perf",
  "full",
  "enText",
  "left",
  "right",
  "pastTts",
  "a",
  "b",
  "stem",
  "line",
  "microText",
  "script",
  "listening",
  "passage",
]);

/** 与 L01 download-page05-tts-azure.mjs 一致：仅按文案哈希 */
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
  return String(s || "")
    .replace(/\s+/g, " ")
    .trim();
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

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walkFiles(p, acc);
    } else if (/\.(html|js)$/i.test(name)) {
      acc.push(p);
    }
  }
  return acc;
}

function lessonFolderFromPath(filePath) {
  const rel = path.relative(ROOT, filePath);
  const top = rel.split(path.sep)[0];
  if (/^L\d{2}/.test(top) || top.startsWith("L00-")) return top;
  return null;
}

function ttsDirForLesson(lesson) {
  return path.join(ROOT, lesson, "assets", "tts-mp3");
}

function relMp3Path(filePath, lesson, fileName) {
  const fileLesson = lessonFolderFromPath(filePath);
  if (fileLesson === lesson) return `assets/tts-mp3/${fileName}`;
  return path.posix.join("..", lesson, "assets", "tts-mp3", fileName).replace(/\\/g, "/");
}

function replaceCosUrls(content, filePath) {
  const fileLesson = lessonFolderFromPath(filePath);
  return content.replace(
    /https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Grammar\/((?:L\d{2}(?:-[^/]+)?|L00-[^/]+)\/assets\/tts-mp3\/([^"'\s]+\.mp3))/g,
    (_m, lessonPath, fileName) => {
      const lesson = lessonPath.split("/")[0];
      return relMp3Path(filePath, lesson, fileName);
    }
  );
}

function extractManifestEntries(content) {
  const out = [];
  const re =
    /window\.__LESSON_TTS_MANIFEST\s*=\s*Object\.assign\([^,]+,\s*\{([\s\S]*?)\}\s*\)|window\.__LESSON_TTS_MANIFEST\s*=\s*\{([\s\S]*?)\n\};/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const block = m[1] || m[2] || "";
    const pairRe = /("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")/g;
    let p;
    while ((p = pairRe.exec(block)) !== null) {
      try {
        const text = JSON.parse(p[1]);
        const url = JSON.parse(p[2]);
        out.push({ text, url });
      } catch {
        /* skip */
      }
    }
  }
  return out;
}

function extractDataAttrs(content) {
  const out = [];
  const reRead = /data-tts-read="([^"]+)"/g;
  let m;
  while ((m = reRead.exec(content)) !== null) {
    try {
      out.push(decodeURIComponent(m[1]));
    } catch {
      out.push(m[1]);
    }
  }
  const reTts = /data-tts="([^"]+)"/g;
  while ((m = reTts.exec(content)) !== null) out.push(m[1]);
  return out;
}

function extractPlayAudioLiterals(content) {
  const out = [];
  const re = /playAudio\s*\(\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    try {
      out.push(JSON.parse(m[1].replace(/^'/, '"').replace(/'$/, '"')) || eval(m[1]));
    } catch {
      const inner = m[1].slice(1, -1);
      out.push(inner.replace(/\\"/g, '"').replace(/\\n/g, "\n"));
    }
  }
  return out;
}

function extractEnFields(content, onlyIfAzure) {
  if (onlyIfAzure && !/AZURE_KEY|tts\.speech\.microsoft|speakAzure|playAudio/.test(content)) {
    return [];
  }
  const out = [];
  const allowed = new Set([
    "en",
    "text",
    "sentence",
    "plain",
    "merged",
    "past",
    "perf",
    "full",
    "enText",
    "left",
    "right",
    "pastTts",
    "a",
    "b",
    "microText",
    "script",
    "listening",
  ]);
  const re = /\b(en|text|sentence|plain|merged|past|perf|full|enText|left|right|pastTts|a|b|microText|script|listening)\s*:\s*("(?:\\.|[^"\\])*")/gi;
  let m;
  while ((m = re.exec(content)) !== null) {
    if (!allowed.has(m[1].toLowerCase())) continue;
    try {
      const val = JSON.parse(m[2]);
      if (!val || val.length < 2 || /^https?:\/\//i.test(val)) continue;
      if (hasCjk(val) && m[1].toLowerCase() !== "text") continue;
      if (/【/.test(val)) continue;
      out.push(val);
    } catch {
      /* skip */
    }
  }
  return out;
}

function pickVoice(text, fileHint) {
  if (hasCjk(text)) return ZH_VOICE;
  if (/lesson1[12]|L11|L12|L13/.test(fileHint) && /AriaNeural/.test(fileHint)) return EN_VOICE_ARIA;
  if (/lesson1[12]|L11|L12|L13/.test(path.basename(fileHint))) return EN_VOICE_ARIA;
  return EN_VOICE_DEFAULT;
}

async function azureSynthesize(text, voice, key, region, outFile) {
  const lang = voice.startsWith("zh") ? "zh-CN" : "en-US";
  const xmlSafe = escapeXml(text);
  const ssml = `<speak version='1.0' xml:lang='${lang}'><voice xml:lang='${lang}' name='${voice}'>${xmlSafe}</voice></speak>`;
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
  if (!res.ok) throw new Error(`Azure ${res.status}: ${buf.toString("utf8").slice(0, 300)}`);
  if (buf.length < 80) throw new Error(`MP3 too small (${buf.length})`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
}

function mp3FileNameFromUrl(url) {
  const base = path.basename(String(url).split("?")[0]);
  return base.endsWith(".mp3") ? base : null;
}

function inferLessonFromUrl(url) {
  const m = String(url).match(/(?:^|\/)((?:L\d{2}(?:-[^/]+)?|L00-[^/]+))\/assets\/tts-mp3\//);
  return m ? m[1] : null;
}

function injectOrUpdateManifest(filePath, content, entries, lesson) {
  if (!entries.length) return content;
  const lines = entries
    .map(({ text, rel }) => `  ${JSON.stringify(text)}: ${JSON.stringify(rel)}`)
    .join(",\n");
  const block = `window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {\n${lines}\n});`;

  if (content.includes("window.__LESSON_TTS_MANIFEST")) {
    return content.replace(
      /window\.__LESSON_TTS_MANIFEST\s*=\s*Object\.assign\([^;]+;/,
      block
    );
  }

  const bootstrapTag = '<script src="../assets/lesson-tts-bootstrap.js"></script>';
  const bootstrapTagSame = '<script src="assets/lesson-tts-bootstrap.js"></script>';
  let insert = `\n  ${bootstrapTag}\n  <script>\n${block}\n  </script>\n`;

  const lessonDir = lessonFolderFromPath(filePath);
  if (lessonDir && fs.existsSync(path.join(ROOT, lessonDir, "assets"))) {
    insert = `\n  <script src="../assets/lesson-tts-bootstrap.js"></script>\n  <script>\n${block}\n  </script>\n`;
  }

  if (content.includes("</head>")) {
    return content.replace("</head>", insert + "</head>");
  }
  return content;
}

function patchInlinePlayAudio(content) {
  let c = content;
  c = c.replace(
    /const\s+AZURE_KEY\s*=\s*"[^"]*";?\s*/g,
    "/* AZURE_KEY removed — use local MP3 only */\n    "
  );
  c = c.replace(
    /async\s+function\s+playAudio\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\}/,
    `async function playAudio(text, voice) {
      const t = String(text || "").trim();
      if (!t) return;
      const lockFn = typeof lockUI === "function";
      if (lockFn) lockUI();
      try {
        if (window.LessonTTSBootstrap && typeof window.LessonTTSBootstrap.playLocalIfAvailable === "function") {
          const ok = await window.LessonTTSBootstrap.playLocalIfAvailable(t);
          if (ok) return;
        }
        console.warn("[TTS] 本地 MP3 未找到:", t.slice(0, 120));
      } finally {
        if (lockFn) unlockUI();
      }
    }`
  );
  c = c.replace(
    /function\s+speakAzure\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\}/,
    `function speakAzure(text) {
      const t = String(text || "").trim();
      if (!t || !window.LessonTTSBootstrap) return Promise.resolve();
      return window.LessonTTSBootstrap.playLocalIfAvailable(t).then(function (ok) {
        if (!ok) console.warn("[TTS] 本地 MP3 未找到:", t.slice(0, 120));
      });
    }`
  );
  return c;
}

function parseArgs() {
  const a = process.argv.slice(2);
  return {
    dryRun: a.includes("--dry-run"),
    skipDownload: a.includes("--skip-download"),
    onlyCos: a.includes("--only-cos"),
    skipPatch: a.includes("--skip-patch"),
  };
}

async function main() {
  const { dryRun, skipDownload, onlyCos, skipPatch } = parseArgs();
  const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || "").trim();
  const region = String(process.env.AZURE_SPEECH_REGION || "southeastasia").trim();

  const files = walkFiles(ROOT).filter((f) => !f.includes(`${path.sep}scripts${path.sep}`));

  /** @type {Map<string, { text: string, voice: string, lesson: string, fileName: string }>} */
  const jobs = new Map();

  for (const filePath of files) {
    let content = fs.readFileSync(filePath, "utf8");
    const lesson = lessonFolderFromPath(filePath);
    content = replaceCosUrls(content, filePath);

    if (!onlyCos) {
      const manifestEntries = extractManifestEntries(content);
      const inlineAzure = /\bconst\s+AZURE_(?:SPEECH_)?KEY\s*=/.test(content);
      const manifestTextSet = new Set(manifestEntries.map((e) => norm(e.text)));

      for (const { text, url } of manifestEntries) {
        const fn = mp3FileNameFromUrl(url);
        if (!fn) continue;
        const ttsLesson = lesson || inferLessonFromUrl(url) || "_shared";
        const voice = pickVoice(text, filePath);
        const keyId = `${ttsLesson}|${fn}`;
        if (!jobs.has(keyId)) {
          jobs.set(keyId, { text: norm(text), voice, lesson: ttsLesson, fileName: fn });
        }
      }

      const isLessonDataJs =
        /[\\/]l\d+-page\d+-data\.js$/i.test(filePath) || /window\.L\d+_PAGE\d+_DATA/.test(content);
      const phrases = [
        ...extractDataAttrs(content),
        ...extractPlayAudioLiterals(content),
        ...(inlineAzure || isLessonDataJs ? extractEnFields(content, true) : []),
      ];
      for (const raw of phrases) {
        const text = norm(raw);
        if (!text || text.length < 2) continue;
        if (/^https?:\/\//i.test(text)) continue;
        if (manifestTextSet.has(text)) continue;
        const voice = pickVoice(text, filePath);
        const fileName = (hasCjk(text) ? sha20Voice(text, voice) : sha20(text)) + ".mp3";
        const ttsLesson = lesson || "_shared";
        const keyId = `${ttsLesson}|${fileName}`;
        if (!jobs.has(keyId)) {
          jobs.set(keyId, { text, voice, lesson: ttsLesson, fileName });
        }
      }
    }

    if (!dryRun) fs.writeFileSync(filePath, content, "utf8");
  }

  console.log("待检查/合成的朗读句（去重）:", jobs.size);

  if (dryRun) {
    let missing = 0;
    for (const job of jobs.values()) {
      const out = path.join(
        job.lesson === "_shared" ? path.join(ROOT, "assets") : ttsDirForLesson(job.lesson),
        job.fileName
      );
      if (!fs.existsSync(out)) {
        missing++;
        console.log("MISSING", job.lesson, job.fileName, job.text.slice(0, 70));
      }
    }
    console.log("缺失 MP3:", missing);
    return;
  }

  if (!onlyCos && !skipDownload) {
    if (!key) {
      console.error("请设置 AZURE_SPEECH_KEY");
      process.exit(1);
    }
    let i = 0;
    for (const job of jobs.values()) {
      const dir =
        job.lesson === "_shared"
          ? path.join(ROOT, "assets", "tts-mp3")
          : ttsDirForLesson(job.lesson);
      const outFile = path.join(dir, job.fileName);
      if (fs.existsSync(outFile) && fs.statSync(outFile).size > 80) continue;
      i++;
      process.stdout.write(`[${i}] ${job.lesson}/${job.fileName} …\n`);
      try {
        await azureSynthesize(job.text, job.voice, key, region, outFile);
      } catch (e) {
        console.error("  FAIL:", e.message, job.text.slice(0, 60));
      }
      await new Promise((r) => setTimeout(r, 120));
    }
  }

  if (onlyCos || skipPatch) return;

  for (const filePath of files) {
    let content = fs.readFileSync(filePath, "utf8");
    const lesson = lessonFolderFromPath(filePath);
    if (!lesson) continue;
    if (!/\bconst\s+AZURE_KEY\s*=/.test(content)) continue;

    const phrases = unique([
      ...extractDataAttrs(content),
      ...extractPlayAudioLiterals(content),
      ...extractEnFields(content, true),
    ]);

    const manifestEntries = [];
    for (const raw of phrases) {
      const text = norm(raw);
      if (!text || text.length < 2) continue;
      const voice = pickVoice(text, filePath);
      const fileName = (hasCjk(text) ? sha20Voice(text, voice) : sha20(text)) + ".mp3";
      const rel = relMp3Path(filePath, lesson, fileName);
      manifestEntries.push({ text, rel });
    }

    if (manifestEntries.length) {
      content = injectOrUpdateManifest(filePath, content, manifestEntries, lesson);
    }
    content = patchInlinePlayAudio(content);
    fs.writeFileSync(filePath, content, "utf8");
    console.log("patched inline TTS:", path.relative(ROOT, filePath));
  }

  for (const filePath of files) {
    let content = fs.readFileSync(filePath, "utf8");
    if (!content.includes("__LESSON_TTS_MANIFEST")) continue;
    const lesson = lessonFolderFromPath(filePath);
    if (!lesson) continue;

    const entries = extractManifestEntries(content);
    let changed = false;
    for (const { text, url } of entries) {
      const fn = mp3FileNameFromUrl(url) || sha20(text, pickVoice(text, filePath)) + ".mp3";
      const rel = relMp3Path(filePath, lesson, fn);
      const oldQuoted = JSON.stringify(url);
      const newQuoted = JSON.stringify(rel);
      if (oldQuoted !== newQuoted && content.includes(oldQuoted)) {
        content = content.split(oldQuoted).join(newQuoted);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log("fixed manifest paths:", path.relative(ROOT, filePath));
    }
  }

  const manifestJs = path.join(ROOT, "L09", "assets", "l09-tts-manifest.js");
  if (fs.existsSync(manifestJs)) {
    let c = fs.readFileSync(manifestJs, "utf8");
    c = replaceCosUrls(c, manifestJs);
    fs.writeFileSync(manifestJs, c, "utf8");
    console.log("updated L09 manifest");
  }
}

function unique(arr) {
  const s = new Set();
  const o = [];
  for (const x of arr) {
    const n = norm(x);
    if (!n || s.has(n)) continue;
    s.add(n);
    o.push(n);
  }
  return o;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
