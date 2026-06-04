import fs from "fs";
import path from "path";

const root = path.resolve("L00-主系表与非谓语");
const files = fs
  .readdirSync(root)
  .filter((n) => n.endsWith(".html") && n !== "index.html");

const INLINE_MANIFEST_RE =
  /<script src="assets\/lesson-tts-bootstrap\.js"><\/script>\s*<script>\s*window\.__LESSON_TTS_MANIFEST[\s\S]*?\}\);\s*<\/script>/;

const REPLACEMENT = `<script src="assets/l00link-course-tts-manifest.js"></script>
  <script src="assets/lesson-tts-bootstrap.js"></script>
  <script src="assets/l00-speak.js"></script>`;

const HANDOUT_BOOT_FIX =
  /<script src="assets\/lesson-tts-bootstrap\.js"><\/script>\s*<script src="assets\/handout-tts-manifest\.js"><\/script>/g;

const HANDOUT_BOOT_FIX2 =
  /<script src="\.\.\/shared\/grammar-handout-print-prep\.js"><\/script>\s*<script src="assets\/lesson-tts-bootstrap\.js"><\/script>\s*<script src="assets\/handout-tts-manifest\.js"><\/script>/g;

const SPEAK_FN_RE =
  /function speakAzure\(text\) \{\s*var t = String\(text[^}]+\}[^}]*\}/;

const SPEAK_FN_NEW = `function speakAzure(text) {
    if (window.L00Speak) return window.L00Speak.speak(text);
    var t = String(text || "").replace(/\\s+/g, " ").trim();
    if (!t || !window.LessonTTSBootstrap) return Promise.resolve();
    return window.LessonTTSBootstrap.playLocalIfAvailable(t).then(function (ok) {
      if (!ok) console.warn("[TTS] 本地 MP3 未找到:", t.slice(0, 120));
    });
  }`;

for (const name of files) {
  let html = fs.readFileSync(path.join(root, name), "utf8");
  const orig = html;

  if (INLINE_MANIFEST_RE.test(html)) {
    html = html.replace(INLINE_MANIFEST_RE, REPLACEMENT);
  } else if (html.includes("lesson-tts-bootstrap.js") && !html.includes("l00link-course-tts-manifest.js")) {
    html = html.replace(
      /<script src="assets\/lesson-tts-bootstrap\.js"><\/script>/,
      `<script src="assets/l00link-course-tts-manifest.js"></script>
  <script src="assets/lesson-tts-bootstrap.js"></script>
  <script src="assets/l00-speak.js"></script>`
    );
  }

  html = html.replace(HANDOUT_BOOT_FIX, `<script src="assets/handout-tts-manifest.js"></script>
  <script src="assets/l00link-course-tts-manifest.js"></script>
  <script src="assets/lesson-tts-bootstrap.js"></script>`);

  html = html.replace(
    HANDOUT_BOOT_FIX2,
    `<script src="../shared/grammar-handout-print-prep.js"></script>
  <script src="assets/handout-tts-manifest.js"></script>
  <script src="assets/l00link-course-tts-manifest.js"></script>
  <script src="assets/lesson-tts-bootstrap.js"></script>`
  );

  html = html.replace(/title="Azure[^"]*"/g, 'title="朗读（本地 MP3）"');

  if (name.startsWith("page") && SPEAK_FN_RE.test(html)) {
    html = html.replace(SPEAK_FN_RE, SPEAK_FN_NEW);
  }

  if (html !== orig) {
    fs.writeFileSync(path.join(root, name), html, "utf8");
    console.log("updated", name);
  }
}

// copy l00-speak.js from sibling course
const src = path.resolve("L00-主谓宾与非谓语/assets/l00-speak.js");
const dst = path.join(root, "assets/l00-speak.js");
if (fs.existsSync(src)) {
  fs.copyFileSync(src, dst);
  console.log("copied l00-speak.js");
}
