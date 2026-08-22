#!/usr/bin/env node
/**
 * 上传 KP-三单小升初 p04 规则发现页 3D 卡通配图到腾讯云 COS。
 * 用法：node scripts/upload-kp3-p04-images.js
 * 依赖：项目根目录 .cos-config.json（SecretId / SecretKey 已填写）
 */
"use strict";

const fs = require("fs");
const path = require("path");
const COS = require("cos-nodejs-sdk-v5");

const ROOT = path.join(__dirname, "..");
const CONFIG_PATH = path.join(ROOT, ".cos-config.json");
const IMG_DIR = path.join(ROOT, "Grammar/KP-三单小升初/assets/img");
const FILES = ["kp3-i-play.jpg", "kp3-she-plays.jpg"];

if (!fs.existsSync(CONFIG_PATH)) {
  console.error("找不到 .cos-config.json，请先配置腾讯云密钥。");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
if (!config.SecretId || !config.SecretKey || config.SecretId.includes("你的")) {
  console.error(".cos-config.json 中的 SecretId / SecretKey 尚未填写。");
  process.exit(1);
}

const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
const cosPrefix = (config.CosPrefix || "s-class/").replace(/\/+$/, "") + "/";
const bucket = config.Bucket || "s-class-1403296481";
const region = config.Region || "ap-chengdu";

function upload(rel) {
  const local = path.join(IMG_DIR, rel);
  const key = cosPrefix + "Grammar/KP-三单小升初/assets/img/" + rel;
  if (!fs.existsSync(local)) {
    return Promise.reject(new Error("本地文件不存在: " + local));
  }
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: bucket,
        Region: region,
        Key: key,
        Body: fs.readFileSync(local),
        ContentType: "image/jpeg",
      },
      (err, data) => (err ? reject(err) : resolve({ key, data }))
    );
  });
}

(async function main() {
  console.log("上传 p04 3D 卡通配图到 COS…");
  for (const f of FILES) {
    const { key } = await upload(f);
    console.log("  ✓ " + f + " → " + key);
  }
  console.log("\n完成！线上地址示例：");
  console.log("  https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/KP-三单小升初/assets/img/kp3-i-play.jpg");
})().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
