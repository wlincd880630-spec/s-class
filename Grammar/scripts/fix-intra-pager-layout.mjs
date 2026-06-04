import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const INTRA_NAV_RE =
  /<nav class="lesson-pager"([^>]*)>\s*<button[^>]*class="pager-prev"[^>]*>[\s\S]*?<\/button>\s*<a class="pager-home pager-home--logo"[^>]*>[\s\S]*?<\/a>\s*<span[^>]*class="pager-mid"[^>]*>[\s\S]*?<\/span>\s*<button[^>]*class="pager-next"[^>]*>[\s\S]*?<\/button>\s*<\/nav>/gi;

function fixNav(html) {
  return html.replace(INTRA_NAV_RE, (full, navAttrs) => {
    const prevBtn = full.match(/<button[^>]*class="pager-prev"[^>]*>[\s\S]*?<\/button>/i)?.[0] || "";
    const logoA = full.match(/<a class="pager-home pager-home--logo"[^>]*>[\s\S]*?<\/a>/i)?.[0] || "";
    const midSpan = full.match(/<span[^>]*class="pager-mid"[^>]*>[\s\S]*?<\/span>/i)?.[0] || "";
    const nextBtn = full.match(/<button[^>]*class="pager-next"[^>]*>[\s\S]*?<\/button>/i)?.[0] || "";
    const logo = logoA.replace(/pager-home pager-home--logo/g, "pager-logo");
    const extra = [
      ...(navAttrs.matchAll(/\s(?:id|aria-label)="[^"]*"/g)),
    ]
      .map((m) => m[0])
      .join("");

    return `<nav class="lesson-pager is-intra-nav"${extra}>
      <div class="pager-zone pager-zone--left">
        ${prevBtn}
      </div>
      ${logo}
      <div class="pager-zone pager-zone--right">
        ${midSpan}
        ${nextBtn}
      </div>
    </nav>`;
  });
}

let n = 0;
for (const dir of ["L11", "L12", "L13"]) {
  const lessonDir = path.join(ROOT, dir);
  for (const file of fs.readdirSync(lessonDir)) {
    if (!/\.html$/i.test(file)) continue;
    const fp = path.join(lessonDir, file);
    let html = fs.readFileSync(fp, "utf8");
    if (!INTRA_NAV_RE.test(html)) continue;
    INTRA_NAV_RE.lastIndex = 0;
    const next = fixNav(html);
    if (next !== html) {
      fs.writeFileSync(fp, next, "utf8");
      console.log("fixed", path.relative(ROOT, fp));
      n++;
    }
  }
}
console.log("done:", n, "files");
