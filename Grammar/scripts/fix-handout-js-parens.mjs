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

function repairJs(html) {
  let out = html;
  out = out.replace(/\( \(\) \{/g, "(function () {");
  out = out.replace(/,  \(\) \{/g, ", () => {");
  out = out.replace(/addEventListener\("click",  \(\) \{/g, 'addEventListener("click", () => {');
  out = out.replace(/\.catch\( \(\) \{\}/g, ".catch(() => {})");
  out = out.replace(/\.catch\( \(\) \{/g, ".catch(() => {");
  out = out.replace(/setTimeout\( \(\) \{/g, "setTimeout(() => {");
  out = out.replace(/a\.play\.catch\( \(\) \{/g, "a.play.catch(() => {");
  out = out.replace(/\.trim;/g, ".trim();");
  out = out.replace(/function fillVerbTableFromL02Pdf \{/g, "function fillVerbTableFromL02Pdf() {");
  out = out.replace(/openPrintWindow;/g, "openPrintWindow();");
  out = out.replace(/window\.print;/g, "window.print();");
  out = out.replace(/fillVerbTableFromL02Pdf;/g, "fillVerbTableFromL02Pdf();");
  return out;
}

let n = 0;
for (const fp of walk(ROOT)) {
  const before = fs.readFileSync(fp, "utf8");
  const after = repairJs(before);
  if (after !== before) {
    fs.writeFileSync(fp, after, "utf8");
    console.log("fixed", path.relative(ROOT, fp));
    n++;
  }
}
console.log("done", n);
