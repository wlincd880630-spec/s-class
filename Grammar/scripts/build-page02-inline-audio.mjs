/**

 * 为 L01 page02 生成内嵌 MP3（data URI），供 file:// 下无跨文件请求时播放。

 * 运行：node scripts/build-page02-inline-audio.mjs

 */

import fs from "fs";

import path from "path";

import { fileURLToPath } from "url";



const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const mp3Dir = path.join(root, "L01", "assets", "tts-mp3");

const outFile = path.join(root, "L01", "assets", "page02-inline-audio.js");



const RELS = [

  "assets/tts-mp3/4ebb3650d63a3ab4a8c6.mp3",

  "assets/tts-mp3/96219e0859893c60b773.mp3",

  "assets/tts-mp3/077068eed062a8a1e789.mp3",

  "assets/tts-mp3/52cb849a92a2ba877589.mp3",

  "assets/tts-mp3/47311d3805c61afad187.mp3",

  "assets/tts-mp3/befbfb6b7f3c86fe3c32.mp3",

  "assets/tts-mp3/d346c77e707d8881c79b.mp3",

  "assets/tts-mp3/d010d3a01eebd64d660f.mp3",

  "assets/tts-mp3/9ca6fc78e71809c53808.mp3",

  "assets/tts-mp3/3784514214dff2b9ea35.mp3",

  "assets/tts-mp3/bbcba0177c26186a49e2.mp3",

];



const blobs = {};

let total = 0;

for (const rel of RELS) {

  const file = path.join(root, "L01", rel.replace(/^assets\/tts-mp3\//, "assets/tts-mp3/"));

  if (!fs.existsSync(file)) {

    console.error("缺少:", file);

    process.exit(1);

  }

  const buf = fs.readFileSync(file);

  total += buf.length;

  blobs[rel] = "data:audio/mpeg;base64," + buf.toString("base64");

}



const js =

  "/* 由 scripts/build-page02-inline-audio.mjs 生成；file:// 内嵌发音，勿手改 */\n" +

  "window.__LESSON_INLINE_AUDIO_BLOBS = " +

  JSON.stringify(blobs) +

  ";\n";



fs.writeFileSync(outFile, js, "utf8");

console.log("已写入", outFile, "共", RELS.length, "条，约", Math.round(total / 1024), "KB 音频");


