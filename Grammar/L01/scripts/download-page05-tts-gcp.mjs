#!/usr/bin/env node
/**
 * Lesson01 Page05 — 使用 Google Cloud Text-to-Speech 生成本页所需离线 MP3（本地）。
 *
 * - Vertex AI 不直接出 MP3；与既有 Page03 脚本相同，走 Cloud Text-to-Speech REST：`text:synthesize`。
 * - 鉴权：环境变量 GOOGLE_ACCESS_TOKEN，或本机 `gcloud auth print-access-token`（需先 `gcloud auth login`）。
 * - 配额项目头：`GCP_PROJECT_ID`（默认 project-ec12c6e5-5e03-4771-add）。
 *
 * 用法：
 *   cd Grammar/L01
 *   gcloud config set project project-ec12c6e5-5e03-4771-add
 *   node scripts/download-page05-tts-gcp.mjs
 *
 * 可选：
 *   --dry-run       只打印待合成列表
 *   --no-patch      只生成 mp3，不修改 lesson01-page05-svo-rules.html 内联 manifest
 *   --cos-base URL  patch manifest 时使用的 mp3 URL 前缀（默认与仓库 Grammar/L01 COS 一致）
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { execFileSync, execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HTML_PATH = path.join(ROOT, "lesson01-page05-svo-rules.html");
const OUT_DIR = path.join(ROOT, "assets", "tts-mp3");

const DEFAULT_GCP_PROJECT = "project-ec12c6e5-5e03-4771-add";
const QUOTA_PROJECT = String(process.env.GCP_PROJECT_ID || DEFAULT_GCP_PROJECT).trim();

const DEFAULT_COS_BASE =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L01/assets/tts-mp3/";

const LOG_PATH = path.join(OUT_DIR, "_page05-download-log.txt");

function initLog() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(LOG_PATH, "\uFEFF", "utf8");
}

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  try {
    fs.appendFileSync(LOG_PATH, line, "utf8");
  } catch (_) {}
  console.log(msg);
}

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

function hasCjk(text) {
  return /[\u3400-\u9fff]/.test(String(text || ""));
}

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

/** Windows 下直接 spawn *.cmd 常为 EINVAL，改用 shell 调用。 */
function tryPrintAccessToken(gcloudExe) {
  if (!gcloudExe || !fs.existsSync(gcloudExe)) return "";
  try {
    if (process.platform === "win32") {
      const q = gcloudExe.includes(" ") ? `"${gcloudExe}"` : gcloudExe;
      return String(
        execSync(`${q} auth print-access-token`, {
          encoding: "utf8",
          shell: true,
          windowsHide: true
        })
      ).trim();
    }
    return String(execFileSync(gcloudExe, ["auth", "print-access-token"], { encoding: "utf8" })).trim();
  } catch (_) {
    return "";
  }
}

function candidateGcloudCmdPaths() {
  const seen = new Set();
  const push = (p) => {
    if (p && !seen.has(p)) seen.add(p);
  };
  const la = process.env.LOCALAPPDATA;
  const pf = process.env.ProgramFiles;
  const pf86 = process.env["ProgramFiles(x86)"];
  const joinSdk = (root) => path.join(root, "Google", "Cloud SDK", "google-cloud-sdk", "bin", "gcloud.cmd");
  if (la) push(joinSdk(la));
  if (pf) push(joinSdk(pf));
  if (pf86) push(joinSdk(pf86));
  push("C:\\Program Files\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd");
  return [...seen];
}

function getAccessToken() {
  const env = String(process.env.GOOGLE_ACCESS_TOKEN || "").trim();
  if (env) return env;
  for (const gcloudExe of candidateGcloudCmdPaths()) {
    const t = tryPrintAccessToken(gcloudExe);
    if (t) return t;
  }
  try {
    return String(
      execSync("gcloud auth print-access-token", { encoding: "utf8", shell: true, windowsHide: true })
    ).trim();
  } catch (e) {}
  console.error(
    "无法取得 Google access token。请先运行 gcloud auth login，或设置 GOOGLE_ACCESS_TOKEN。"
  );
  process.exit(1);
}

async function synthesizeMp3GcpOnce(token, text) {
  const isChinese = hasCjk(text);
  const voice = isChinese
    ? { languageCode: "cmn-CN", name: "cmn-CN-Wavenet-A" }
    : { languageCode: "en-US", name: "en-US-Neural2-F" };
  const res = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      ...(QUOTA_PROJECT ? { "x-goog-user-project": QUOTA_PROJECT } : {})
    },
    body: JSON.stringify({
      input: { text },
      voice,
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: isChinese ? 0.92 : 0.94
      }
    })
  });
  const raw = await res.text();
  return { ok: res.ok, status: res.status, raw, json: res.ok ? JSON.parse(raw) : null };
}

async function synthesizeMp3Gcp(token, text, outFile) {
  let t = token;
  for (let attempt = 0; attempt < 2; attempt++) {
    const { ok, status, raw, json } = await synthesizeMp3GcpOnce(t, text);
    if (ok && json && json.audioContent) {
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, Buffer.from(json.audioContent, "base64"));
      return;
    }
    if ((status === 401 || status === 403) && attempt === 0) {
      t = getAccessToken();
      continue;
    }
    throw new Error("Cloud TTS " + status + " " + raw.slice(0, 400));
  }
}

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
  let noPatch = false;
  let cosBase = DEFAULT_COS_BASE;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--dry-run") dryRun = true;
    else if (a[i] === "--no-patch") noPatch = true;
    else if (a[i] === "--cos-base" && a[i + 1]) cosBase = a[++i];
  }
  return { dryRun, noPatch, cosBase };
}

async function main() {
  const { dryRun, noPatch, cosBase } = parseArgs();

  let html = fs.readFileSync(HTML_PATH, "utf8");
  const manifest = extractManifest(html);
  const wanted = collectPage05Phrases(html);
  const missing = wanted.filter((t) => !manifest[t]);
  const already = wanted.filter((t) => !!manifest[t]);

  if (!dryRun) initLog();

  const say = dryRun ? console.log.bind(console) : log;

  say("GCP 配额项目 (x-goog-user-project): " + (QUOTA_PROJECT || "(未设置)"));
  say("本页朗读文案（去重）: " + wanted.length);
  say("已在 manifest 中有 COS 映射: " + already.length);
  say("仍需合成: " + missing.length);

  if (dryRun) {
    missing.forEach((t, i) =>
      console.log(String(i + 1).padStart(4), t.slice(0, 96) + (t.length > 96 ? "…" : ""))
    );
    return;
  }

  if (!missing.length) {
    say("无需生成：manifest 已覆盖本页全部朗读句。");
    say("DONE exitCode=0");
    return;
  }

  let token = getAccessToken();
  say("已获取 access token（长度 " + token.length + "）");
  const added = [];

  for (let i = 0; i < missing.length; i++) {
    const text = missing[i];
    const hash = sha20(text);
    const outFile = path.join(OUT_DIR, `${hash}.mp3`);
    if (fs.existsSync(outFile)) {
      added.push({ text, hash });
      say(`[${i + 1}/${missing.length}] SKIP exists ${hash}`);
      continue;
    }
    if (i > 0 && i % 40 === 0) {
      token = getAccessToken();
      say("刷新 token（每 40 条）");
    }
    say(`[${i + 1}/${missing.length}] ${hash} ${text.slice(0, 72)}`);
    try {
      await synthesizeMp3Gcp(token, text, outFile);
      added.push({ text, hash });
    } catch (e) {
      const msg = e && e.message ? e.message : String(e);
      log("[FAIL] " + text.slice(0, 80) + " :: " + msg);
      console.error("[FAIL]", msg);
      process.exitCode = 2;
      break;
    }
  }

  if (added.length && !noPatch) {
    html = fs.readFileSync(HTML_PATH, "utf8");
    html = patchManifestHtml(html, added, cosBase);
    fs.writeFileSync(HTML_PATH, html, "utf8");
    log("已写入 manifest: " + HTML_PATH);
  } else if (added.length && noPatch) {
    log("已跳过 HTML patch（--no-patch）。");
  }

  log("MP3 目录: " + OUT_DIR);

  const manifestJson = path.join(OUT_DIR, "manifest-page05-gcp.json");
  fs.writeFileSync(
    manifestJson,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        gcpProjectId: QUOTA_PROJECT,
        sourceHtml: path.relative(ROOT, HTML_PATH).replace(/\\/g, "/"),
        cosBaseUrl: cosBase,
        generatedLocally: added.map(({ text, hash }) => ({
          text,
          sha1prefix20: hash,
          localFile: `assets/tts-mp3/${hash}.mp3`,
          cosUrl: cosBase.replace(/\/?$/, "/") + hash + ".mp3"
        }))
      },
      null,
      2
    ),
    "utf8"
  );
  log("清单 JSON: " + manifestJson);
  log("DONE exitCode=" + (process.exitCode || 0));
}

main().catch((e) => {
  const msg = e && e.stack ? e.stack : String(e);
  try {
    initLog();
    log("FATAL " + msg);
  } catch (_) {}
  console.error(e);
  process.exit(1);
});
