#!/usr/bin/env node
/**
 * Lesson01 Page05 — 用 Azure Speech 生成本页所需离线 MP3，并合并进 lesson01-page05-svo-rules.html 内联 manifest。
 *
 * 环境变量：
 *   AZURE_SPEECH_KEY 或 SPEECH_KEY —— Azure Speech 资源密钥（必填）
 *   AZURE_SPEECH_REGION —— 默认 eastasia
 *
 * 用法：
 *   cd Grammar/L01
 *   set AZURE_SPEECH_KEY=你的密钥
 *   node scripts/download-page05-tts-azure.mjs
 *
 * 可选：
 *   --dry-run        只列出将合成的文案，不请求 Azure、不写文件
 *   --cos-base URL   写入 manifest 的 mp3 基地址（默认与仓库现有 Grammar/L01 COS 前缀一致）
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HTML_PATH = path.join(ROOT, "lesson01-page05-svo-rules.html");
const OUT_DIR = path.join(ROOT, "assets", "tts-mp3");

const DEFAULT_COS_BASE =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L01/assets/tts-mp3/";

function sha20(text) {
  return crypto.createHash("sha1").update(String(text), "utf8").digest("hex").slice(0, 20);
}

function norm(s) {
  return String(s || "")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    const n = norm(x);
    if (!n || seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
}

function hasCjk(t) {
  return /[\u3400-\u9fff]/.test(String(t || ""));
}

/** 从 HTML 中截取 const NAME = [...] 的平衡括号数组并 eval（仅用于字面量数组）。 */
function extractConstArrayLiteral(html, name) {
  const prefix = `const ${name} = `;
  const i = html.indexOf(prefix);
  if (i === -1) throw new Error(`未找到 ${name}`);
  let j = i + prefix.length;
  while (j < html.length && /\s/.test(html[j])) j++;
  if (html[j] !== "[") throw new Error(`${name} 应为数组字面量`);
  let depth = 0;
  const start = j;
  for (; j < html.length; j++) {
    const c = html[j];
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        j++;
        const slice = html.slice(start, j);
        try {
          return Function('"use strict"; return ' + slice)();
        } catch (e) {
          throw new Error(`${name} 解析失败: ${e.message}`);
        }
      }
    }
  }
  throw new Error(`${name} 数组未闭合`);
}

function transformPastTts(s) {
  return String(s || "")
    .replace(/\.\.\./g, ", ")
    .replace(/!/g, ".");
}

function extractVerbDetailFullPhrases(html) {
  const anchor = "function buildVerbDetailBank()";
  const end = "const VERB_DETAIL_BANK = buildVerbDetailBank()";
  const i = html.indexOf(anchor);
  const k = html.indexOf(end, i);
  if (i === -1 || k === -1) throw new Error("未定位 buildVerbDetailBank / VERB_DETAIL_BANK");
  const chunk = html.slice(i, k);
  const out = [];
  const re = /full:\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(chunk)) !== null) out.push(m[1]);
  return out;
}

function collectPage05Phrases(html) {
  const phrases = [];

  const pairs = extractConstArrayLiteral(html, "COMPARE_PAIRS");
  for (const p of pairs) {
    if (p && p.left) phrases.push(p.left);
    if (p && p.right) phrases.push(p.right);
  }

  phrases.push(...extractVerbDetailFullPhrases(html));

  const force = extractConstArrayLiteral(html, "FORCE_BANK");
  for (const row of force) {
    if (row && row.full) phrases.push(row.full);
  }

  const drills = extractConstArrayLiteral(html, "TRANSFORM_DRILLS");
  for (const d of drills) {
    if (d && d.pastTts) phrases.push(transformPastTts(d.pastTts));
  }

  return unique(phrases);
}

function extractManifest(html) {
  const m = html.match(/window\.__LESSON_TTS_MANIFEST\s*=\s*(\{[\s\S]*?\n\});/);
  if (!m) throw new Error("未找到 window.__LESSON_TTS_MANIFEST");
  return Function('"use strict"; return ' + m[1])();
}

function escapeXmlText(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function azureSynthesizeMp3(text, key, region, outFile) {
  const en = !hasCjk(text);
  const voiceName = en ? "en-GB-RyanNeural" : "zh-CN-XiaoxiaoNeural";
  const lang = en ? "en-US" : "zh-CN";
  const gender = en ? "Female" : "Female";
  const xmlSafe = escapeXmlText(text);
  const ssml = `<speak version='1.0' xml:lang='${lang}'><voice xml:lang='${lang}' xml:gender='${gender}' name='${voiceName}'>${xmlSafe}</voice></speak>`;
  const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3"
    },
    body: ssml
  });
  const buf = Buffer.from(await res.arrayBuffer());
  if (!res.ok) {
    const t = buf.toString("utf8").slice(0, 400);
    throw new Error(`Azure ${res.status}: ${t}`);
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
}

/** 在 window.__LESSON_TTS_MANIFEST 的闭合 `};` 之前追加条目（自动补逗号）。 */
function patchManifestHtml(html, additions, cosBase) {
  if (!additions.length) return html;
  const boot = "/* inlined: assets/lesson-tts-bootstrap.js */";
  const idx = html.indexOf(boot);
  if (idx === -1) throw new Error("未找到 lesson-tts-bootstrap 锚点，无法安全插入 manifest。");

  const head = html.slice(0, idx);
  const manifestCloseIdx = head.lastIndexOf("\n};");
  if (manifestCloseIdx === -1) throw new Error("未找到 manifest 闭合 \\n};");

  const before = head.slice(0, manifestCloseIdx);
  const afterManifestInHead = head.slice(manifestCloseIdx + 3);

  const lines = additions.map(({ text, hash }) => {
    const url = cosBase.replace(/\/?$/, "/") + hash + ".mp3";
    return `  ${JSON.stringify(text)}: ${JSON.stringify(url)}`;
  });

  const trimmed = before.trimEnd();
  const comma = trimmed.endsWith(",") ? "" : ",";

  const newHead = trimmed + comma + "\n" + lines.join(",\n") + "\n};" + afterManifestInHead;
  return newHead + html.slice(idx);
}

function parseArgs() {
  const a = process.argv.slice(2);
  let dryRun = false;
  let cosBase = DEFAULT_COS_BASE;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--dry-run") dryRun = true;
    else if (a[i] === "--cos-base" && a[i + 1]) {
      cosBase = a[++i];
    }
  }
  return { dryRun, cosBase };
}

async function main() {
  const { dryRun, cosBase } = parseArgs();
  const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || "").trim();
  const region = String(process.env.AZURE_SPEECH_REGION || "eastasia").trim();

  let html = fs.readFileSync(HTML_PATH, "utf8");
  const manifest = extractManifest(html);
  const wanted = collectPage05Phrases(html);

  const missing = wanted.filter((t) => !manifest[t]);
  const already = wanted.filter((t) => !!manifest[t]);

  console.log("本页朗读文案（去重）:", wanted.length);
  console.log("已在 manifest 中有 COS 映射:", already.length);
  console.log("仍需合成并写入:", missing.length);

  if (dryRun) {
    console.log("\n--dry-run 将合成列表:\n");
    missing.forEach((t, i) => console.log(String(i + 1).padStart(3), t.slice(0, 100) + (t.length > 100 ? "…" : "")));
    return;
  }

  if (!key) {
    console.error("请设置环境变量 AZURE_SPEECH_KEY（或 SPEECH_KEY）。");
    process.exit(1);
  }

  const added = [];
  for (let i = 0; i < missing.length; i++) {
    const text = missing[i];
    const hash = sha20(text);
    const outFile = path.join(OUT_DIR, `${hash}.mp3`);
    process.stdout.write(`[${i + 1}/${missing.length}] ${hash} ${text.slice(0, 60)}…\n`);
    await azureSynthesizeMp3(text, key, region, outFile);
    added.push({ text, hash });
  }

  if (added.length) {
    html = patchManifestHtml(html, added, cosBase);
    fs.writeFileSync(HTML_PATH, html, "utf8");
    console.log("\n已更新:", HTML_PATH);
    console.log("已写入 mp3 目录:", OUT_DIR);
    console.log("\n请将 assets/tts-mp3 下新生成的 .mp3 上传到 COS，路径前缀应与 manifest 中 URL 一致：");
    console.log(cosBase);
  } else {
    console.log("无需生成：manifest 已覆盖本页全部朗读句。");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
