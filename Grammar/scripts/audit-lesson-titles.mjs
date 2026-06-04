import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LESSON_RE = /^(L\d{2}(?:-[^/]+)?|L00-[^/]+)$/;

function walkLessonDirs() {
  return fs.readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && LESSON_RE.test(d.name))
    .map((d) => path.join(ROOT, d.name));
}

function parseIndex(lessonDir) {
  const idx = path.join(lessonDir, "index.html");
  if (!fs.existsSync(idx)) return null;
  const html = fs.readFileSync(idx, "utf8");
  const titleM = html.match(/<title>([^<]*)<\/title>/i);
  const h1M = html.match(/<h1>([^<]*)<\/h1>/i);
  const items = [];
  for (const m of html.matchAll(/<a\s+href="([^"#?]+\.html)"[^>]*>[\s\S]*?<span class="label">([^<]*)<\/span>/gi)) {
    const href = m[1].trim();
    if (href.startsWith("../") || /^index\.html$/i.test(href)) continue;
    const descM = m[0].match(/<span class="desc">([^<]*)<\/span>/i);
    items.push({ href, label: m[2].trim(), desc: descM ? descM[1].trim() : "" });
  }
  return { title: titleM?.[1] || "", h1: h1M?.[1] || "", items };
}

for (const dir of walkLessonDirs()) {
  const rel = path.relative(ROOT, dir);
  const data = parseIndex(dir);
  if (!data) continue;
  console.log("\n=== " + rel + " ===");
  console.log("index title:", data.title);
  console.log("h1:", data.h1);
  for (const it of data.items) {
    const fp = path.join(dir, it.href);
    let pt = "";
    if (fs.existsSync(fp)) {
      const m = fs.readFileSync(fp, "utf8").match(/<title>([^<]*)<\/title>/i);
      pt = m ? m[1] : "";
    }
    console.log(`  ${it.href}`);
    console.log(`    label: ${it.label}`);
    if (it.desc) console.log(`    desc:  ${it.desc}`);
    console.log(`    title: ${pt}`);
  }
}
