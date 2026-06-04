#!/usr/bin/env node
/**
 * 列出 L13 page01 表单/导入句中仍缺 MP3 的英文句（需 Azure 生成后上传 COS）。
 */
import fs from "fs";

const html = fs.readFileSync("L13/lesson13-page01-timeline-intro.html", "utf8");
const m = {};
const block = html.match(/Object.assign\([\s\S]*?\{([\s\S]*?)\n\}\);/)[1];
const re = /"((?:\\.|[^"\\])*)"\s*:\s*"((?:\\.|[^"\\])*)"/g;
let x;
while ((x = re.exec(block))) m[x[1]] = x[2];

const need = [
  "I was hungry yesterday afternoon, because I hadn't eaten anything for breakfast that morning.",
  "When we met at the museum gate, Tom had been worried for an hour.",
  "We hadn't been ready when the teacher started the quiz.",
  "Had you finished your homework before the lights went out?",
  "Had we been in our seats before the film began?",
  "What had you done before the lights went out?",
  "How long had you been hungry before you ate lunch?",
  "I am hungry, because I haven't eaten anything for breakfast.",
];

const missing = need.filter((s) => !m[s]);
console.log("Missing", missing.length, "phrases:");
missing.forEach((s) => console.log("-", s));
