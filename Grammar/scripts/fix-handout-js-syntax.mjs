import fs from "fs";
import path from "path";

const ROOT = "d:\\2026暑期课程（新8910年级）";

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    if (fs.statSync(fp).isDirectory() && !name.startsWith(".") && name !== "node_modules") walk(fp, out);
    else if (/handout/i.test(name) && name.endsWith(".html")) out.push(fp);
  }
  return out;
}

function repairHandoutJs(html) {
  let out = html;

  out = out.replace(/function ([a-zA-Z_$][\w$]*) \{/g, "function $1() {");

  out = out.replace(/\.toUpperCase !==/g, ".toUpperCase() !==");
  out = out.replace(/var p = a\.play;/g, "var p = a.play();");
  out = out.replace(/return res\.blob;/g, "return res.blob();");
  out = out.replace(/return Promise\.resolve;/g, "return Promise.resolve();");
  out = out.replace(/\bresolve;\s*\n(\s*)(\}|return)/g, "resolve();\n$1$2");
  out = out.replace(/\bresolve;\s*\n(\s*\}\);)/g, "resolve();\n$1");

  out = out.replace(/var m = map;/g, "var m = map();");
  out = out.replace(/&& map && typeof init\.body/g, "&& map() && typeof init.body");

  out = out.replace(/a\.onended =  \(\) \{/g, "a.onended = () => {");
  out = out.replace(/a\.onerror =  \(\) \{/g, "a.onerror = () => {");
  out = out.replace(/,  \(\) \{/g, ", () => {");
  out = out.replace(/\n\s+\(\) \{/g, "\n        () => {");
  out = out.replace(/\.then\(\s*\n\s+\(\) \{/g, ".then(\n        () => {");

  out = out.replace(/\brenderUsageLaw;/g, "renderUsageLaw();");
  out = out.replace(/\bsyncNameShow;/g, "syncNameShow();");
  out = out.replace(/\bsyncNamesFromInput;\s*\n/g, "");
  out = out.replace(/\be\.preventDefault;/g, "e.preventDefault();");
  out = out.replace(/\.trim\.slice/g, ".trim().slice");

  out = out.replace(/\bgrowTree;/g, "growTree();");
  out = out.replace(/\blaunchConfetti;/g, "launchConfetti();");
  out = out.replace(/\bfinaleRitual;/g, "finaleRitual();");
  out = out.replace(/function init\(\); \{/g, "function init() {");
  out = out.replace(/\binit;\s*\n(\s*\}\);)/g, "init();\n$1");
  out = out.replace(/\}\);\s*\n\}\);\s*\n(\s*<\/script>)/g, "})();\n$1");
  out = out.replace(/\bstopHandoutTts;/g, "stopHandoutTts();");

  out = out.replace(/document\.getElementById\("btnHandoutPrint"\)\.addEventListener\("click", \(\) => \{\s*syncNameShow;\s*window\.print\(\);\s*\}\);/g,
    'document.getElementById("btnHandoutPrint").addEventListener("click", function () {\n      syncNameShow();\n      window.print();\n    });');

  return out;
}

let n = 0;
for (const fp of walk(ROOT)) {
  const before = fs.readFileSync(fp, "utf8");
  const after = repairHandoutJs(before);
  if (after !== before) {
    fs.writeFileSync(fp, after, "utf8");
    console.log("fixed", path.relative(ROOT, fp));
    n++;
  }
}
console.log("done", n);
