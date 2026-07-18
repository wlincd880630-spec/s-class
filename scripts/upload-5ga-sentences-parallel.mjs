#!/usr/bin/env node
/** 并行上传 5GA 例句图到 COS，带进度输出 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import COS from 'cos-nodejs-sdk-v5';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'Primary/School_textbook/Courseware/assets/images/sentences');
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, '.cos-config.json'), 'utf8'));
const PREFIX = (CONFIG.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';
const COS_ROOT = `${PREFIX}Primary/School_textbook/Courseware/assets/images/sentences/`;
const CONCURRENCY = 6;

const cos = new COS({ SecretId: CONFIG.SecretId, SecretKey: CONFIG.SecretKey, Timeout: 300000 });
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.jpg')).sort();
let done = 0;
let ok = 0;
let fail = 0;

function uploadOne(name) {
  const local = path.join(DIR, name);
  const Key = COS_ROOT + name;
  return new Promise((resolve) => {
    cos.putObject(
      {
        Bucket: CONFIG.Bucket,
        Region: CONFIG.Region,
        Key,
        Body: fs.readFileSync(local),
        ContentLength: fs.statSync(local).size,
        ContentType: 'image/jpeg',
      },
      (e) => {
        done++;
        if (e) {
          fail++;
          console.error(`FAIL [${done}/${files.length}] ${name}: ${e.message}`);
        } else {
          ok++;
          if (done % 10 === 0 || done === files.length) {
            console.log(`OK [${done}/${files.length}] latest: ${name}`);
          }
        }
        resolve();
      }
    );
  });
}

async function pool(items, limit, fn) {
  const q = [...items];
  await Promise.all(Array.from({ length: limit }, async () => {
    while (q.length) await fn(q.shift());
  }));
}

console.log(`Uploading ${files.length} images (concurrency ${CONCURRENCY})...`);
await pool(files, CONCURRENCY, uploadOne);
console.log(`Done: ${ok} ok, ${fail} fail`);
