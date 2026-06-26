#!/usr/bin/env node
/**
 * 将 data.js 中 picsum 例句/占位图下载到本地并上传 COS，再改写为 COS URL。
 *
 * 用法：
 *   node scripts/sync-school-textbook-sentence-images.mjs
 *   node scripts/sync-school-textbook-sentence-images.mjs --dry-run
 *   node scripts/sync-school-textbook-sentence-images.mjs --skip-download
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import COS from "cos-nodejs-sdk-v5";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COURSEWARE = path.join(ROOT, "Primary/School_textbook/Courseware");
const SENTENCE_IMG_DIR = path.join(COURSEWARE, "assets/images/sentences");
const COS_HOST = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/";

const dryRun = process.argv.includes("--dry-run");
const skipDownload = process.argv.includes("--skip-download");

const PICSUM_RE = /https:\/\/picsum\.photos\/seed\/([^/]+)\/(\d+)\/(\d+)/g;

function cosUrl(relFromSClass) {
  return (
    COS_HOST +
    relFromSClass
      .split("/")
      .map((p) => encodeURIComponent(p))
      .join("/")
  );
}

function sentenceCosUrl(seed) {
  return cosUrl(`Primary/School_textbook/Courseware/assets/images/sentences/${seed}.jpg`);
}

function collectPicsumRefs() {
  const grades = fs.readdirSync(COURSEWARE).filter((d) => /^\d[A-Z]{2}$/.test(d));
  const bySeed = new Map();
  const fileHits = [];

  for (const grade of grades) {
    const fp = path.join(COURSEWARE, grade, "assets/data/data.js");
    const content = fs.readFileSync(fp, "utf8");
    let m;
    const re = new RegExp(PICSUM_RE.source, "g");
    while ((m = re.exec(content)) !== null) {
      const [full, seed, w, h] = m;
      if (!bySeed.has(seed)) {
        bySeed.set(seed, { seed, w, h, url: full });
      }
      fileHits.push({ grade, seed, full });
    }
  }
  return { grades, bySeed, fileHits };
}

async function downloadOne(seed, w, h) {
  const out = path.join(SENTENCE_IMG_DIR, `${seed}.jpg`);
  if (!skipDownload && fs.existsSync(out) && fs.statSync(out).size > 500) {
    return { out, skipped: true };
  }
  const src = `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
  const res = await fetch(src, { redirect: "follow" });
  if (!res.ok) throw new Error(`${src} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error(`${seed}: file too small`);
  if (!dryRun) {
    fs.mkdirSync(SENTENCE_IMG_DIR, { recursive: true });
    fs.writeFileSync(out, buf);
  }
  return { out, skipped: false };
}

function patchDataFiles() {
  const grades = fs.readdirSync(COURSEWARE).filter((d) => /^\d[A-Z]{2}$/.test(d));
  let files = 0;
  let replacements = 0;
  for (const grade of grades) {
    const fp = path.join(COURSEWARE, grade, "assets/data/data.js");
    let s = fs.readFileSync(fp, "utf8");
    const before = (s.match(/picsum\.photos/g) || []).length;
    if (!before) continue;
    s = s.replace(PICSUM_RE, (_, seed) => {
      replacements++;
      return sentenceCosUrl(seed);
    });
    if (!dryRun) fs.writeFileSync(fp, s, "utf8");
    files++;
    console.log(`  patched ${grade}/assets/data/data.js (${before} picsum → COS)`);
  }
  return { files, replacements };
}

async function uploadToCos() {
  const configPath = path.join(ROOT, ".cos-config.json");
  if (!fs.existsSync(configPath)) {
    console.warn("无 .cos-config.json，跳过 COS 上传");
    return;
  }
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey, Timeout: 600000 });
  const prefix = (config.CosPrefix || "s-class/").replace(/\/+$/, "") + "/";
  const cosRoot = `${prefix}Primary/School_textbook/Courseware/assets/images/sentences/`;

  if (!fs.existsSync(SENTENCE_IMG_DIR)) return;
  const files = fs.readdirSync(SENTENCE_IMG_DIR).filter((f) => f.endsWith(".jpg"));
  let ok = 0;
  let fail = 0;
  for (const name of files) {
    const local = path.join(SENTENCE_IMG_DIR, name);
    const Key = cosRoot + name;
    try {
      await new Promise((res, rej) => {
        cos.putObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key,
            Body: fs.readFileSync(local),
            ContentLength: fs.statSync(local).size,
            ContentType: "image/jpeg",
          },
          (e) => (e ? rej(e) : res())
        );
      });
      ok++;
      if (ok % 100 === 0) console.log("  uploaded", ok, "/", files.length);
    } catch (e) {
      fail++;
      console.error("  fail", name, e.message);
    }
  }
  console.log(`COS sentences: ${ok} ok, ${fail} fail`);
}

async function main() {
  const { bySeed, fileHits } = collectPicsumRefs();
  console.log(`picsum refs in data.js: ${fileHits.length}`);
  console.log(`unique seeds: ${bySeed.size}`);

  if (dryRun) {
    console.log("dry-run sample seeds:", [...bySeed.keys()].slice(0, 8).join(", "));
    return;
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  const seeds = [...bySeed.values()];
  for (let i = 0; i < seeds.length; i++) {
    const { seed, w, h } = seeds[i];
    try {
      const r = await downloadOne(seed, w, h);
      if (r.skipped) skipped++;
      else downloaded++;
      if ((i + 1) % 50 === 0) console.log(`  download ${i + 1}/${seeds.length}`);
      await new Promise((r) => setTimeout(r, 80));
    } catch (e) {
      failed++;
      console.error("  download fail:", seed, e.message);
    }
  }
  console.log(`download: ${downloaded} new, ${skipped} skipped, ${failed} failed`);

  const patch = patchDataFiles();
  console.log(`patched ${patch.files} data.js (${patch.replacements} replacements)`);

  await uploadToCos();

  // 同步 8 册 data.js 到 COS
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, ".cos-config.json"), "utf8"));
  const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
  const prefix = (config.CosPrefix || "s-class/").replace(/\/+$/, "") + "/";
  const grades = fs.readdirSync(COURSEWARE).filter((d) => /^\d[A-Z]{2}$/.test(d));
  for (const g of grades) {
    const local = path.join(COURSEWARE, g, "assets/data/data.js");
    const Key = `${prefix}Primary/School_textbook/Courseware/${g}/assets/data/data.js`;
    await new Promise((res, rej) => {
      cos.putObject(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          Key,
          Body: fs.readFileSync(local),
          ContentLength: fs.statSync(local).size,
          ContentType: "application/javascript; charset=utf-8",
        },
        (e) => (e ? rej(e) : res())
      );
    });
    console.log("  uploaded data.js", g);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
