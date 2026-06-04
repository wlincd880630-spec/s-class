#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const L01 = path.join(ROOT, "L01");
const TAG = '  <script src="assets/l01-speak.js"></script>';
const SPEAK_FN = `  function speak(text) {
    if (window.L01Speak && window.L01Speak.speak) {
      return window.L01Speak.speak(text);
    }
    return Promise.resolve();
  }`;

const speakRe = /  function speak\(text\) \{\s*return new Promise\(function \(resolve, reject\) \{[\s\S]*?\n  \}/;

for (const name of fs.readdirSync(L01)) {
  if (!/^lesson01-page.*\.html$/.test(name)) continue;
  const fp = path.join(L01, name);
  let c = fs.readFileSync(fp, "utf8");
  let dirty = false;
  if (!c.includes("l01-speak.js") && c.includes("lesson-tts-azure-play.js")) {
    c = c.replace(
      '<script src="assets/lesson-tts-azure-play.js"></script>',
      '<script src="assets/lesson-tts-azure-play.js"></script>\n' + TAG
    );
    dirty = true;
  }
  if (speakRe.test(c) && !c.includes("L01Speak")) {
    c = c.replace(speakRe, SPEAK_FN);
    dirty = true;
  }
  if (dirty) {
    fs.writeFileSync(fp, c, "utf8");
    console.log("patched", name);
  }
}
