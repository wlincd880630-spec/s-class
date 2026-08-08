#!/usr/bin/env node
/**
 * 并行上传 L07 page05 场景图到腾讯云 COS（只传 *-s1.png / *-s2.png）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import COS from "cos-nodejs-sdk-v5";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..", "..");
const IMG_DIR = path.join(__dirname, "..", "assets", "page05-more-comp");
const COS_PREFIX = "s-class/Grammar/L07/assets/page05-more-comp/";
const CONCURRENCY = 4;

function loadConfig() {
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
    console.error("缺少 COS 凭证");
    process.exit(1);
  }
  return {
    cos: new COS({ SecretId: secretId, SecretKey: secretKey, Timeout: 180000 }),
    Bucket,
    Region,
  };
}

async function main() {
  const { cos, Bucket, Region } = loadConfig();
  const files = fs
    .readdirSync(IMG_DIR)
    .filter((f) => /^l07-p05-.+-s[12]\.png$/.test(f))
    .sort();
  console.log(`并行上传 ${files.length} 张 (concurrency=${CONCURRENCY}) → ${COS_PREFIX}`);

  let done = 0;
  let ok = 0;
  let fail = 0;

  async function uploadOne(name) {
    const Key = COS_PREFIX + name;
    const Body = fs.readFileSync(path.join(IMG_DIR, name));
    await new Promise((resolve, reject) => {
      cos.putObject(
        { Bucket, Region, Key, Body, ContentType: "image/png" },
        (err) => (err ? reject(err) : resolve())
      );
    });
  }

  const queue = [...files];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const name = queue.shift();
        try {
          await uploadOne(name);
          ok++;
          done++;
          console.log(`OK [${done}/${files.length}] ${name}`);
        } catch (e) {
          fail++;
          done++;
          console.error(`FAIL [${done}/${files.length}] ${name}: ${e.message || e}`);
        }
      }
    })
  );

  console.log(`\n完成：${ok} ok, ${fail} fail / ${files.length}`);
  if (fail) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
