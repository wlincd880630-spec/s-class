#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const L10 = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "L10");
const HEAD_SNIP =
  '  <script src="../assets/lesson-tts-bootstrap.js"></script>\n  <script src="assets/l10-tts-manifest.js"></script>\n  <script src="assets/l10-tts-play.js"></script>\n';

const REPLACE_FN = `  function azureRest(ssml, ok, fail) {
    window.L10LocalTts.speakSsml(ssml, "en-GB-RyanNeural", ok);
  }
  function azureSdk(ssml, voiceName, ok, fail) {
    window.L10LocalTts.speakSsml(ssml, voiceName, ok);
  }
  function azureSpeakSsml(ssml, voice, onDone) {
    window.L10LocalTts.speakSsml(ssml, voice, onDone);
  }
  function azureTtsRestPlay(ssml, onOk, onFail) {
    window.L10LocalTts.speakSsml(ssml, "en-GB-RyanNeural", function () {
      if (onOk) onOk();
    });
    if (onFail) setTimeout(function () {}, 0);
  }`;

for (const name of fs.readdirSync(L10)) {
  if (!name.endsWith(".html")) continue;
  const p = path.join(L10, name);
  let html = fs.readFileSync(p, "utf8");
  if (!html.includes("AZURE_SPEECH") && !html.includes("data-tts")) continue;

  if (!html.includes("l10-tts-play.js")) {
    html = html.replace("</head>", HEAD_SNIP + "</head>");
  }

  html = html.replace(/\s*const AZURE_SPEECH_KEY\s*=\s*"[^"]*";?\n/g, "\n");
  html = html.replace(/\s*const AZURE_SPEECH_REGION\s*=\s*"[^"]*";?\n/g, "\n");

  if (html.includes("function azureRest")) {
    html = html.replace(
      /function azureRest\([\s\S]*?\n  \}\n  function azureSdk/,
      REPLACE_FN + "\n  function azureSdk"
    );
    html = html.replace(
      /function azureSdk\([\s\S]*?\n  \}\n  function buildSsmlEnSlow/,
      "  function buildSsmlEnSlow"
    );
    html = html.replace(
      /function azureSpeakSsml\([\s\S]*?\n  \}\n  function azureSpeak/,
      "  function azureSpeak"
    );
  }

  if (name === "L10-handout.html") {
    html = html.replace(
      /if \(!window\.LessonSpeak[\s\S]*?window\.LessonSpeak\.playEnglish\(txt\)[\s\S]*?\);\s*\}\);/,
      `if (!window.L10LocalTts) {
      alert("朗读模块未加载");
      return;
    }
    ttsLock = true;
    window.L10LocalTts.speakText(txt, function () { ttsLock = false; });
  });`
    );
    html = html.replace(
      /<script src="https:\/\/s-class[^<]+lesson-tts-azure[^<]+"><\/script>\s*/g,
      ""
    );
  }

  fs.writeFileSync(p, html, "utf8");
  console.log("patched", name);
}
