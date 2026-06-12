#!/usr/bin/env node
/**
 * 将 D:\2026\初中\人教版英语八年级上单词表 同步到 junior_vocab/G8_B1，
 * 并修补 HTML：共享脚本、册别标题、COS 媒体基址。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = "D:\\2026\\初中\\人教版英语八年级上单词表";
const DEST = path.join(ROOT, "junior_vocab", "G8_B1");
const COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/junior_vocab/G8_B1/";

const SKIP_NAMES = new Set(["人教版英语八年级上单词表.pdf", "人教版英语八年级上.pdf"]);

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    if (SKIP_NAMES.has(name)) continue;
    const s = path.join(src, name);
    const d = path.join(dest, name);
    const st = fs.statSync(s);
    if (st.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function patchHtml(filePath, unitNum) {
  let s = fs.readFileSync(filePath, "utf8");
  if (!s.includes("vocab_pdf.js")) {
    s = s.replace(
      '<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>',
      '<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>\n' +
        (unitNum
          ? '  <script src="../../vocab_pdf.js"></script>\n  <script src="../../vocab_teacher_wordlist.js"></script>'
          : '  <script src="vocab_pdf.js"></script>\n  <script src="vocab_teacher_wordlist.js"></script>')
    );
  }
  s = s.replace(/PEP English — 八年级下册/g, "PEP English — 八年级上册");
  s = s.replace(/PEP English — Grade 8 Book 2/gi, "PEP English — 八年级上册");
  if (!s.includes("openVocabPdf") && s.includes('id="send-report-btn"')) {
    s = s.replace(
      '<button class="tb-btn" id="send-report-btn"',
      '<button class="tb-btn" onclick="openVocabPdf()" title="下载例句 PDF">📄 PDF</button>\n      <button class="tb-btn" id="send-report-btn"'
    );
  }
  const mediaRe =
    /const MEDIA_BASE = \(typeof window !== "undefined" && window\.MEDIA_BASE\) \? window\.MEDIA_BASE : "";\r?\nfunction mediaUrl\(path\) \{[^\n]+\}/;
  if (unitNum) {
    const base = `${COS}Unit${unitNum}/`;
    const block =
      `const MEDIA_BASE = "${base}";\n` +
      `function mediaUrl(path) { if (!path) return ""; var p = path.replace(/^Unit${unitNum}\\/?/, ""); return path.startsWith("http") ? path : (MEDIA_BASE + (p ? p.replace(/^\\//, "") : "")); }`;
    if (mediaRe.test(s)) s = s.replace(mediaRe, block);
  } else {
    const block =
      `const COS_VOCAB_ROOT = "${COS}";\n` +
      "function mediaBaseForUnit(n) { return COS_VOCAB_ROOT + \"Unit\" + n + \"/\"; }\n" +
      "function mediaUrl(path) {\n" +
      "  if (!path) return \"\";\n" +
      "  if (path.startsWith(\"http\")) return path;\n" +
      "  const n = typeof currentUnit !== \"undefined\" ? currentUnit : 1;\n" +
      "  return mediaBaseForUnit(n) + path.replace(/^\\//, \"\");\n" +
      "}";
    if (mediaRe.test(s)) s = s.replace(mediaRe, block);
  }
  fs.writeFileSync(filePath, s, "utf8");
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error("源目录不存在:", SRC);
    process.exit(1);
  }
  fs.mkdirSync(DEST, { recursive: true });
  copyDir(SRC, DEST);
  for (const f of ["vocab_pdf.js", "vocab_teacher_wordlist.js"]) {
    fs.copyFileSync(path.join(ROOT, "junior_vocab", f), path.join(DEST, f));
  }
  const pep = path.join(DEST, "pep_vocab_learn.html");
  if (fs.existsSync(pep)) patchHtml(pep, 0);
  for (let n = 1; n <= 8; n++) {
    const fp = path.join(DEST, `Unit${n}`, `Unit${n}.html`);
    if (fs.existsSync(fp)) patchHtml(fp, n);
  }
  console.log("Synced to", DEST);
}

main();
