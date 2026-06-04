#!/usr/bin/env node
/**
 * 合并 L13 各页 inline manifest 到 page01，补全 formTableSpeak / intro 等缺失键。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "L13");
const TARGET = path.join(ROOT, "lesson13-page01-timeline-intro.html");

function extractManifestBlocks(text) {
  const blocks = [];
  const re = /window\.__LESSON_TTS_MANIFEST\s*=\s*Object\.assign\([\s\S]*?\{\}\s*,\s*\{([\s\S]*?)\}\s*\)/g;
  let m;
  while ((m = re.exec(text))) blocks.push(m[1]);
  const re2 = /window\.__LESSON_TTS_MANIFEST\s*=\s*\{([\s\S]*?)\};/g;
  while ((m = re2.exec(text))) blocks.push(m[1]);
  return blocks;
}

function parseEntries(block) {
  const out = {};
  const re = /"((?:\\.|[^"\\])*)"\s*:\s*"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = re.exec(block))) {
    out[m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\")] = m[2]
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  return out;
}

const merged = {};
for (const name of fs.readdirSync(ROOT)) {
  if (!name.endsWith(".html")) continue;
  const text = fs.readFileSync(path.join(ROOT, name), "utf8");
  for (const block of extractManifestBlocks(text)) {
    Object.assign(merged, parseEntries(block));
  }
}

let html = fs.readFileSync(TARGET, "utf8");
const blockRe =
  /(window\.__LESSON_TTS_MANIFEST\s*=\s*Object\.assign\(window\.__LESSON_TTS_MANIFEST\s*\|\|\s*\{\}\s*,\s*\{)([\s\S]*?)(\n\}\);)/;
const match = html.match(blockRe);
if (!match) {
  console.error("manifest block not found in page01");
  process.exit(1);
}

const current = parseEntries(match[2]);
const before = Object.keys(current).length;
Object.assign(current, merged);

const lines = Object.entries(current)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
  .join("\n");

html = html.replace(blockRe, `$1\n${lines}\n$3`);
fs.writeFileSync(TARGET, html, "utf8");
console.log("page01 manifest:", before, "->", Object.keys(current).length, "entries");
