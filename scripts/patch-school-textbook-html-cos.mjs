#!/usr/bin/env node
/**
 * 确保 Primary/School_textbook 下所有 HTML 的图片、音频脚本指向腾讯 COS，并上传 HTML。
 *
 * 用法：
 *   node scripts/patch-school-textbook-html-cos.mjs
 *   node scripts/patch-school-textbook-html-cos.mjs --dry-run
 *   node scripts/patch-school-textbook-html-cos.mjs --no-upload
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import COS from "cos-nodejs-sdk-v5";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STB = path.join(ROOT, "Primary/School_textbook");
const COS_HOST = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/";

const dryRun = process.argv.includes("--dry-run");
const noUpload = process.argv.includes("--no-upload");

const MANIFEST = `${COS_HOST}Primary/School_textbook/Courseware/audio/audio-manifest.js?v=1`;
const LOCAL = `${COS_HOST}Primary/School_textbook/Courseware/audio/local-audio.js?v=1`;
const AUDIO_INJECT =
  `  <script src="${MANIFEST}"></script>\n` + `  <script src="${LOCAL}"></script>\n`;

function cosUrl(relFromSClass) {
  return (
    COS_HOST +
    relFromSClass
      .split("/")
      .map((p) => encodeURIComponent(p))
      .join("/")
  );
}

function walkHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(p, acc);
    else if (/\.html$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

function gradeFromRel(rel) {
  const m = rel.match(/^Courseware\/(\d[A-Z]{2})\//);
  return m ? m[1] : null;
}

function patchHtml(filePath) {
  const rel = path.relative(STB, filePath).replace(/\\/g, "/");
  let s = fs.readFileSync(filePath, "utf8");
  const orig = s;
  const grade = gradeFromRel(rel);

  if (grade) {
    const logoCos = cosUrl(`Primary/School_textbook/Courseware/${grade}/assets/images/logo.png`);
    s = s.replace(/src="assets\/images\/logo\.png"/g, `src="${logoCos}"`);
  }
  if (rel === "Courseware/index.html") {
    const hub = cosUrl("Primary/School_textbook/Courseware/logo.png");
    s = s.replace(/src="logo\.png"/g, `src="${hub}"`);
  }

  const isLesson = grade && !rel.endsWith("/index.html");
  const hasUtils = s.includes('src="assets/js/utils.js"');
  if (isLesson && hasUtils && !s.includes("School_textbook/Courseware/audio/audio-manifest.js")) {
    if (/<script src="assets\/data\/data\.js"><\/script>\s*<script src="assets\/js\/utils\.js"><\/script>/.test(s)) {
      s = s.replace(
        /(<script src="assets\/data\/data\.js"><\/script>)\s*(<script src="assets\/js\/utils\.js"><\/script>)/,
        `$1\n${AUDIO_INJECT}$2`
      );
    } else {
      s = s.replace(/(<script src="assets\/js\/utils\.js"><\/script>)/, `${AUDIO_INJECT}$1`);
    }
  }

  if (s !== orig) {
    if (!dryRun) fs.writeFileSync(filePath, s, "utf8");
    return true;
  }
  return false;
}

async function uploadHtml(files) {
  const configPath = path.join(ROOT, ".cos-config.json");
  if (!fs.existsSync(configPath)) {
    console.warn("无 .cos-config.json，跳过 HTML 上传");
    return;
  }
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
  const prefix = (config.CosPrefix || "s-class/").replace(/\/+$/, "") + "/";
  let ok = 0;
  for (const local of files) {
    const rel = path.relative(path.join(ROOT, "Primary"), local).replace(/\\/g, "/");
    const Key = `${prefix}Primary/${rel}`;
    await new Promise((res, rej) => {
      cos.putObject(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          Key,
          Body: fs.readFileSync(local),
          ContentLength: fs.statSync(local).size,
          ContentType: "text/html; charset=utf-8",
        },
        (e) => (e ? rej(e) : res())
      );
    });
    ok++;
  }
  console.log(`uploaded ${ok} HTML to COS`);
}

async function main() {
  const files = walkHtml(STB);
  let patched = 0;
  for (const fp of files) {
    if (patchHtml(fp)) {
      patched++;
      console.log("patched", path.relative(STB, fp).replace(/\\/g, "/"));
    }
  }
  console.log(`HTML patched: ${patched} / ${files.length}`);

  if (!dryRun && !noUpload) await uploadHtml(files);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
