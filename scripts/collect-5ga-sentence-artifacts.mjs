#!/usr/bin/env node
/** 将 /opt/cursor/artifacts/assets 中已生成的例句图复制到课件 sentences 目录 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ARTIFACTS = '/opt/cursor/artifacts/assets';
const DEST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'Primary/School_textbook/Courseware/assets/images/sentences');
const MANIFEST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'Primary/School_textbook/Courseware/5GA/.sentence-image-manifest.json');

const seeds = new Set(JSON.parse(fs.readFileSync(MANIFEST, 'utf8')).items.map((i) => i.seed));
fs.mkdirSync(DEST, { recursive: true });
let copied = 0;
if (fs.existsSync(ARTIFACTS)) {
  for (const name of fs.readdirSync(ARTIFACTS)) {
    const base = name.replace(/\.(png|jpg|jpeg|webp)$/i, '');
    if (!seeds.has(base)) continue;
    const src = path.join(ARTIFACTS, name);
    const dest = path.join(DEST, `${base}.jpg`);
    fs.copyFileSync(src, dest);
    copied++;
  }
}
const local = fs.readdirSync(DEST).filter((f) => f.endsWith('.jpg') && seeds.has(f.replace('.jpg', '')));
console.log(`artifacts copied this run: ${copied}`);
console.log(`local sentence images: ${local.length}/${seeds.size}`);
