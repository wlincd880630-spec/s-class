#!/usr/bin/env node
/**
 * 仅上传 Primary/Magic-E 媒体到腾讯云 COS（增量）。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import COS from "cos-nodejs-sdk-v5";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ME = path.join(ROOT, "Primary", "Magic-E");
const CONFIG_PATH = path.join(ROOT, ".cos-config.json");
const DRY = process.argv.includes("--dry");

if (!fs.existsSync(CONFIG_PATH)) {
  console.error("找不到 .cos-config.json");
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey, Timeout: 300000 });
const Bucket = config.Bucket;
const Region = config.Region;
const cosPrefix = (config.CosPrefix || "s-class/").replace(/\/+$/, "") + "/";
const MEDIA_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".mp3", ".wav", ".m4a"]);

function walkMedia(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkMedia(p, out);
    else if (MEDIA_EXT.has(path.extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

function listCos(prefix) {
  return new Promise((resolve, reject) => {
    const all = {};
    let marker = "";
    const page = () => {
      cos.getBucket({ Bucket, Region, Prefix: prefix, MaxKeys: 1000, Marker: marker }, (err, data) => {
        if (err) return reject(err);
        for (const o of data.Contents || []) all[o.Key] = parseInt(o.Size, 10);
        if (data.IsTruncated === "true" && data.NextMarker) {
          marker = data.NextMarker;
          page();
        } else resolve(all);
      });
    };
    page();
  });
}

function upload(key, filePath) {
  const size = fs.statSync(filePath).size;
  if (size > 5 * 1024 * 1024) {
    return new Promise((resolve, reject) => {
      cos.sliceUploadFile({ Bucket, Region, Key: key, FilePath: filePath, SliceSize: 5 * 1024 * 1024 }, (e, d) =>
        e ? reject(e) : resolve(d)
      );
    });
  }
  return new Promise((resolve, reject) => {
    cos.putObject({ Bucket, Region, Key: key, Body: fs.createReadStream(filePath), ContentLength: size }, (e, d) =>
      e ? reject(e) : resolve(d)
    );
  });
}

const local = walkMedia(ME);
const prefix = cosPrefix + "Primary/Magic-E/";
const cosObjs = await listCos(prefix);
const todo = local.filter((p) => {
  const key = prefix + path.relative(ME, p).replace(/\\/g, "/");
  return cosObjs[key] !== fs.statSync(p).size;
});

console.log(`Magic-E 媒体：本地 ${local.length}，待上传 ${todo.length}`);
if (DRY) {
  todo.slice(0, 15).forEach((p) => console.log("[dry]", path.relative(ME, p)));
  if (todo.length > 15) console.log(`... 另有 ${todo.length - 15} 个`);
  process.exit(0);
}

let ok = 0;
let fail = 0;
for (const p of todo) {
  const rel = path.relative(ME, p).replace(/\\/g, "/");
  const key = prefix + rel;
  process.stdout.write(`上传: ${rel}...`);
  try {
    await upload(key, p);
    console.log(" OK");
    ok++;
  } catch (e) {
    console.log(" FAIL", e.message);
    fail++;
  }
}
console.log(`完成：成功 ${ok}，失败 ${fail}`);
if (fail) process.exit(1);
