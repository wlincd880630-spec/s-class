#!/usr/bin/env node
/**
 * 为 HET 词形填空课件（套题*.html）独立作答页接入 DeepSeek 双击查词。
 * 用法: node scripts/patch-het-cloze-courseware-lookup.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "HET", "词形填空练习", "courseware");

const CSS_LINK =
  '  <link rel="stylesheet" href="../../exam-shared/courseware-cloze-lookup.css?v=1" />\n';
const SCRIPT_TAG =
  '  <script src="../../exam-shared/courseware-cloze-lookup.js?v=1"></script>\n';

const RENDER_HOOK =
  "      bindVocabInteractions(root);\n      if (typeof bindClozePracticeLookup === \"function\") bindClozePracticeLookup(root, PASSAGE);\n      syncNavActive();";

const RENDER_OLD =
  "      bindVocabInteractions(root);\n      syncNavActive();";

function patchFile(file) {
  let s = fs.readFileSync(file, "utf8");
  const name = path.basename(file);
  if (name.includes("handout") || name === "index.html") return false;
  if (!name.match(/^套题\d+选词填空\.html$/)) return false;

  let changed = false;

  if (!s.includes("courseware-cloze-lookup.css")) {
    s = s.replace("</head>", CSS_LINK + "</head>");
    changed = true;
  }

  if (!s.includes("courseware-cloze-lookup.js")) {
    s = s.replace(/\n  <script>\n/, "\n" + SCRIPT_TAG + "  <script>\n");
    changed = true;
  }

  if (!s.includes("bindClozePracticeLookup") && s.includes(RENDER_OLD)) {
    s = s.replace(RENDER_OLD, RENDER_HOOK);
    changed = true;
  }

  if (changed) fs.writeFileSync(file, s, "utf8");
  return changed;
}

let changed = 0;
for (const name of fs.readdirSync(DIR)) {
  if (!name.endsWith(".html")) continue;
  const file = path.join(DIR, name);
  if (patchFile(file)) {
    changed++;
    console.log("patched", name);
  }
}
console.log(`Done: ${changed} files.`);
