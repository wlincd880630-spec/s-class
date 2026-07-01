import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import COS from "cos-nodejs-sdk-v5";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(__dirname, "..", "..", "..");
const config = JSON.parse(fs.readFileSync(path.join(REPO, ".cos-config.json"), "utf8"));
const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
const prefix = (config.CosPrefix || "s-class/").replace(/\/+$/, "") + "/";

const files = [
  ["Grammar/L01/lesson01-handout-zhongkao.html", "text/html; charset=utf-8"],
  ["Grammar/L01/lesson01-handout-classroom-full.html", "text/html; charset=utf-8"],
  ["Grammar/L01/assets/l01-handout-tts.js", "application/javascript; charset=utf-8"],
  ["Grammar/shared/grammar-handout-lookup.js", "application/javascript; charset=utf-8"],
  ["Grammar/shared/grammar-handout-lookup.css", "text/css; charset=utf-8"],
];

async function put(rel, ctype) {
  const local = path.join(REPO, rel);
  const key = prefix + rel.replace(/\\/g, "/");
  await new Promise((resolve, reject) => {
    cos.putObject(
      { Bucket: config.Bucket, Region: config.Region, Key: key, Body: fs.readFileSync(local), ContentType: ctype },
      (err) => (err ? reject(err) : resolve())
    );
  });
  console.log("uploaded", key);
}

for (const [rel, ctype] of files) {
  await put(rel, ctype);
}
console.log("done");
