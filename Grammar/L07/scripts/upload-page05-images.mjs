#!/usr/bin/env node
/**
 * 上传 L07 page05 卡通3D配图到腾讯云 COS。
 * 用法：node Grammar/L07/scripts/upload-page05-images.mjs
 * 凭证：项目根 .cos-config.json 或 COS_SECRET_ID / COS_SECRET_KEY
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import COS from "cos-nodejs-sdk-v5";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..", "..");
const IMG_DIR = path.join(__dirname, "..", "assets", "page05-more-comp");
const COS_PREFIX = "s-class/Grammar/L07/assets/page05-more-comp/";

function loadCos() {
  const cfgPath = path.join(ROOT, ".cos-config.json");
  let secretId = process.env.COS_SECRET_ID || process.env.TENCENT_SECRET_ID;
  let secretKey = process.env.COS_SECRET_KEY || process.env.TENCENT_SECRET_KEY;
  let Bucket = "s-class-1403296481";
  let Region = "ap-chengdu";
  if (fs.existsSync(cfgPath)) {
    const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
    secretId = secretId || cfg.SecretId;
    secretKey = secretKey || cfg.SecretKey;
    Bucket = cfg.Bucket || Bucket;
    Region = cfg.Region || Region;
  }
  if (!secretId || !secretKey) {
    console.error("缺少 COS 凭证：.cos-config.json 或 COS_SECRET_ID / COS_SECRET_KEY");
    process.exit(1);
  }
  return { cos: new COS({ SecretId: secretId, SecretKey: secretKey }), Bucket, Region };
}

async function main() {
  const { cos, Bucket } = loadCos();
  const files = fs
    .readdirSync(IMG_DIR)
    .filter((f) => /^l07-p05-.+\.png$/.test(f));
  console.log(`上传 ${files.length} 张 → ${COS_PREFIX}`);
  let ok = 0;
  for (const name of files.sort()) {
    const Key = COS_PREFIX + name;
    const Body = fs.readFileSync(path.join(IMG_DIR, name));
    await new Promise((resolve, reject) => {
      cos.putObject({ Bucket, Key, Body, ContentType: "image/png" }, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    ok++;
    console.log(`OK ${Key} (${(Body.length / 1024 / 1024).toFixed(2)} MB)`);
  }
  console.log(`\n完成：${ok}/${files.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
