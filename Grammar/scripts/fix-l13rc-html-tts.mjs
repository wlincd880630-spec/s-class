import fs from "fs";
import path from "path";

const root = path.resolve("L13-定语从句");
const files = fs.readdirSync(root).filter((n) => n.endsWith(".html"));

const INLINE_MANIFEST_RE =
  /<script src="assets\/lesson-tts-bootstrap\.js"><\/script>\s*<script>\s*window\.__LESSON_TTS_MANIFEST[\s\S]*?\}\);\s*<\/script>/;

const REPLACEMENT = `<script src="assets/l13rc-demo-tts-manifest.js"></script>
  <script src="assets/lesson-tts-bootstrap.js"></script>`;

const SPEAK_TEXT_RE = /const speakText = async \(text\) => \{[\s\S]*?\n  \};/;

const SPEAK_TEXT_NEW = `const speakText = async (text) => {
    const t = String(text || "").replace(/\\s+/g, " ").trim();
    if (!t) return;
    if (window.LessonTTSBootstrap && window.LessonTTSBootstrap.playLocalIfAvailable) {
      const ok = await window.LessonTTSBootstrap.playLocalIfAvailable(t);
      if (ok) return;
      console.warn("[TTS] 本地 MP3 未找到:", t.slice(0, 120));
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel?.();
      const u = new SpeechSynthesisUtterance(t);
      u.lang = /[\\u3400-\\u9fff]/.test(t) ? "zh-CN" : "en-US";
      window.speechSynthesis.speak(u);
    }
  };`;

for (const name of files) {
  let html = fs.readFileSync(path.join(root, name), "utf8");
  const orig = html;

  html = html.replace(/\.\.\/L13\/assets\//g, "assets/");

  if (INLINE_MANIFEST_RE.test(html)) {
    html = html.replace(INLINE_MANIFEST_RE, REPLACEMENT);
  }

  if (name.startsWith("课件Demo") && SPEAK_TEXT_RE.test(html)) {
    html = html.replace(SPEAK_TEXT_RE, SPEAK_TEXT_NEW);
  }

  html = html.replace(
    /<script src="assets\/lesson-tts-bootstrap\.js"><\/script>\s*<script src="assets\/handout-tts-manifest\.js"><\/script>/g,
    `<script src="assets/handout-tts-manifest.js"></script>
  <script src="assets/lesson-tts-bootstrap.js"></script>`
  );

  html = html.replace(
    /<script src="assets\/lesson-tts-bootstrap\.js"><\/script>\s*<script src="assets\/handout-tts-manifest\.js"><\/script>/g,
    `<script src="assets/handout-tts-manifest.js"></script>
  <script src="assets/lesson-tts-bootstrap.js"></script>`
  );

  if (html !== orig) {
    fs.writeFileSync(path.join(root, name), html, "utf8");
    console.log("updated", name);
  }
}
