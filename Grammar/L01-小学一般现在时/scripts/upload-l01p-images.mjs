#!/usr/bin/env node
/**
 * 上传 L01P 配图到腾讯云 COS（支持重试）
 * 用法：node Grammar/L01-小学一般现在时/scripts/upload-l01p-images.mjs
 *       node Grammar/L01-小学一般现在时/scripts/upload-l01p-images.mjs --new-only
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import COS from "cos-nodejs-sdk-v5";
import { L01P_IMAGE_MANIFEST } from "./l01p-image-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR = path.join(__dirname, "..", "assets", "img");
const ROOT = path.join(__dirname, "..", "..", "..");
const CONFIG = path.join(ROOT, ".cos-config.json");
const NEW_ONLY = process.argv.includes("--new-only");

if (!fs.existsSync(CONFIG)) {
  console.error("缺少 .cos-config.json");
  process.exit(1);
}
const cfg = JSON.parse(fs.readFileSync(CONFIG, "utf8"));
const prefix = (cfg.CosPrefix || "s-class/").replace(/\/+$/, "") + "/";
const cos = new COS({ SecretId: cfg.SecretId, SecretKey: cfg.SecretKey, Timeout: 300000, FileParallelLimit: 2, ChunkParallelLimit: 2, ChunkSize: 1024 * 1024 });

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function uploadOne(name, retries = 5) {
  const local = path.join(IMG_DIR, name);
  if (!fs.existsSync(local)) {
    console.warn("SKIP (missing)", name);
    return false;
  }
  const key = prefix + "Grammar/L01-小学一般现在时/assets/img/" + name;
  const size = fs.statSync(local).size;
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise((resolve, reject) => {
        const opts = { Bucket: cfg.Bucket, Region: cfg.Region, Key: key };
        if (size > 1024 * 1024) {
          cos.sliceUploadFile({ ...opts, FilePath: local }, (err, data) => (err ? reject(err) : resolve(data)));
        } else {
          cos.putObject({ ...opts, Body: fs.readFileSync(local) }, (err, data) => (err ? reject(err) : resolve(data)));
        }
      });
      console.log("OK", name, "(" + Math.round(size / 1024) + "KB)");
      return true;
    } catch (e) {
      console.warn("retry", i + 1, name, e.message);
      await sleep(5000 * (i + 1));
    }
  }
  console.error("FAIL", name);
  return false;
}

const files = NEW_ONLY
  ? L01P_IMAGE_MANIFEST.map((m) => m.file)
  : fs.readdirSync(IMG_DIR).filter((f) => f.endsWith(".png"));

let ok = 0;
for (const f of files) {
  if (await uploadOne(f)) ok++;
}
console.log("Done:", ok, "/", files.length);
