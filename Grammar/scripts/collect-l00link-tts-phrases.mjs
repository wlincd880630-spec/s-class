import fs from "fs";
import path from "path";
import vm from "vm";

const root = path.resolve("L00-主系表与非谓语");

function loadJs(rel) {
  const fp = path.join(root, rel);
  if (!fs.existsSync(fp)) return;
  const code = fs.readFileSync(fp, "utf8");
  vm.runInThisContext(code, { filename: fp });
}

const phrases = new Set();

function add(t) {
  const s = String(t || "")
    .replace(/\s+/g, " ")
    .trim();
  if (s) phrases.add(s);
}

// --- page4 vocab bank ---
loadJs("p4-linking-vocab-packs.js");
loadJs("p4-linking-triplets.js");
loadJs("p4-linking-data.js");

if (typeof globalThis.LINKING_P4_getVocabEntries === "function") {
  for (const level of ["junior", "senior"]) {
    const entries = globalThis.LINKING_P4_getVocabEntries(level);
    for (const e of entries) {
      add(e.example_en);
      add(e.make_en);
      add(e.sort_en);
      if (e.make_answer?.length) add(e.make_answer.join(" "));
      if (e.sort_answer?.length) add(e.sort_answer.join(" "));
    }
  }
}

const bank = globalThis.LINKING_P4_BANK;
if (bank) {
  for (const p of [...(bank.junior?.practices || []), ...(bank.senior?.practices || [])]) {
    add(p.tts_logic);
    add(p.tts_sentence);
    add(p.tts);
  }
  for (const b of bank.boss || []) add(b.text);
}

// --- HTML inline manifests & data-tts-read ---
const MANIFEST_RE =
  /"((?:[^"\\]|\\.){2,500})":\s*"(assets\/tts-mp3\/[^"]+\.mp3)"/g;
const TTS_READ_RE = /data-tts-read="([^"]+)"/g;

for (const name of fs.readdirSync(root).filter((n) => n.endsWith(".html"))) {
  const html = fs.readFileSync(path.join(root, name), "utf8");
  let m;
  while ((m = MANIFEST_RE.exec(html))) add(m[1]);
  while ((m = TTS_READ_RE.exec(html))) {
    try {
      add(decodeURIComponent(m[1]));
    } catch {
      add(m[1]);
    }
  }
}

// page3 QUIZ_DATA + speakAzure strings (regex)
const p3 = fs.readFileSync(path.join(root, "page3.html"), "utf8");
const quizTts = [...p3.matchAll(/tts:\s*"((?:\\.|[^"\\])+)"/g)].map((x) =>
  x[1].replace(/\\"/g, '"')
);
quizTts.forEach(add);
for (const m of p3.matchAll(/speakAzure\(\s*["'`]((?:\\.|[^"'`])+?)["'`]/g)) {
  add(m[1].replace(/\\'/g, "'").replace(/\\"/g, '"'));
}
for (const m of p3.matchAll(/speakAzure\(\s*\n?\s*["'`]((?:\\.|[^"'`])+?)["'`]/gs)) {
  add(m[1].replace(/\\'/g, "'").replace(/\\n/g, " "));
}

// page1 extra speakAzure multiline
const p1 = fs.readFileSync(path.join(root, "page1.html"), "utf8");
for (const m of p1.matchAll(/speakAzure\(\s*\n?\s*["'`]((?:\\.|[^"'`])+?)["'`]/gs)) {
  add(m[1].replace(/\\'/g, "'").replace(/\\n/g, " "));
}

// page4 fixed strings
add("Look carefully. Both sentences have is swimming. Are they both linking-verb structures?");
add("动作正在发生（进行时）");
add("描述一件事情（主系表）");

// handout manifest file
const hm = path.join(root, "assets/handout-tts-manifest.js");
if (fs.existsSync(hm)) {
  const t = fs.readFileSync(hm, "utf8");
  let m;
  while ((m = MANIFEST_RE.exec(t))) add(m[1]);
}

// data-tts chips in handouts
for (const name of ["link-handout-junior.html", "link-handout-senior.html", "link-handout-classroom-full.html"]) {
  const fp = path.join(root, name);
  if (!fs.existsSync(fp)) continue;
  const html = fs.readFileSync(fp, "utf8");
  for (const m of html.matchAll(/data-tts="([^"]+)"/g)) add(m[1]);
}

const out = [...phrases].sort();
const outPath = path.resolve("scripts/l00link-tts-phrases.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
console.log(JSON.stringify({ count: out.length, outPath }, null, 2));
