/**
 * 课堂同步讲义：加长填空横线、去除中英文括号提示
 * 从 classroom-full.html 恢复 insert（若已被破坏）
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const LESSONS = [
  {
    insert: "L01/assets/l01-classroom-flow-insert.html",
    full: "L01/lesson01-handout-classroom-full.html"
  },
  {
    insert: "L00-主系表与非谓语/assets/l00-classroom-flow-insert.html",
    full: "L00-主系表与非谓语/link-handout-classroom-full.html"
  },
  {
    insert: "L00-主谓宾与非谓语/assets/l00-svo-classroom-flow-insert.html",
    full: "L00-主谓宾与非谓语/svo-handout-classroom-full.html"
  },
  {
    insert: "L02/assets/l02-classroom-flow-insert.html",
    full: "L02/lesson02-handout-classroom-full.html"
  },
  {
    insert: "L03/assets/l03-classroom-flow-insert.html",
    full: "L03/lesson03-handout-classroom-full.html"
  },
  {
    insert: "L05/assets/l05-classroom-flow-insert.html",
    full: "L05/lesson05-handout-classroom-full.html"
  },
  {
    insert: "L06/assets/l06-classroom-flow-insert.html",
    full: "L06/lesson06-handout-classroom-full.html"
  },
  {
    insert: "L07/assets/l07-classroom-flow-insert.html",
    full: "L07/lesson07-handout-classroom-full.html"
  },
  {
    insert: "L08/assets/l08-classroom-flow-insert.html",
    full: "L08/lesson08-handout-classroom-full.html"
  },
  {
    insert: "L09/assets/l09-classroom-flow-insert.html",
    full: "L09/lesson09-handout-classroom-full.html"
  },
  {
    insert: "L10/assets/l10-classroom-flow-insert.html",
    full: "L10/L10-handout-classroom-full.html"
  },
  {
    insert: "L11/assets/l11-classroom-flow-insert.html",
    full: "L11/lesson11-handout-classroom-full.html"
  },
  {
    insert: "L12/assets/l12-classroom-flow-insert.html",
    full: "L12/lesson12-handout-classroom-full.html"
  },
  {
    insert: "L13/assets/l13-classroom-flow-insert.html",
    full: "L13/lesson13-handout-classroom-full.html"
  },
  {
    insert: "L13-定语从句/assets/l13rc-classroom-flow-insert.html",
    full: "L13-定语从句/rel-clause-handout-classroom-full.html"
  }
];

const CLASSROOM_CSS = [
  "L01/assets/l01-handout-classroom.css",
  "L00-主系表与非谓语/assets/l00-handout-classroom.css",
  "L00-主谓宾与非谓语/assets/l00-svo-handout-classroom.css",
  "L02/assets/l02-handout-classroom.css",
  "L03/assets/l03-handout-classroom.css",
  "L05/assets/l05-handout-classroom.css",
  "L06/assets/l06-handout-classroom.css",
  "L07/assets/l07-handout-classroom.css",
  "L08/assets/l08-handout-classroom.css",
  "L09/assets/l09-handout-classroom.css",
  "L10/assets/l10-handout-classroom.css",
  "L11/assets/l11-handout-classroom.css",
  "L12/assets/l12-handout-classroom.css",
  "L13/assets/l13-handout-classroom.css",
  "L13-定语从句/assets/l13rc-handout-classroom.css"
];

const PUBLISHER_CSS = [
  "L01/assets/l01-handout-publisher.css",
  "L00-主系表与非谓语/assets/l00-handout-publisher.css",
  "L00-主谓宾与非谓语/assets/l00-svo-handout-publisher.css",
  "L02/assets/l02-handout-classroom-publisher.css",
  "L03/assets/l03-handout-classroom-publisher.css",
  "L05/assets/l05-handout-classroom-publisher.css",
  "L06/assets/l06-handout-classroom-publisher.css",
  "L07/assets/l07-handout-classroom-publisher.css",
  "L08/assets/l08-handout-classroom-publisher.css",
  "L09/assets/l09-handout-classroom-publisher.css",
  "L10/assets/l10-handout-classroom-publisher.css",
  "L11/assets/l11-handout-classroom-publisher.css",
  "L12/assets/l12-handout-classroom-publisher.css",
  "L13/assets/l13-handout-classroom-publisher.css",
  "L13-定语从句/assets/l13rc-handout-classroom-publisher.css"
];

const BLANK = { base: "5em", sm: "3.5em", md: "7.5em", lg: "11em", xl: "16em" };

function extractInsertFromFull(fullHtml) {
  const m = fullHtml.match(
    /(\s*<div class="handout-sync-guide[\s\S]*?<p class="appendix-label">[\s\S]*?<\/p>\s*)/
  );
  if (!m) throw new Error("无法从 full 讲义提取同步块");
  return m[1];
}

function needsRestore(text) {
  return !text.includes("\n") || text.length < 500;
}

function stripParens(html) {
  let s = html.replace(/（[^）]*）/g, "");
  s = s.replace(/\([^)]*\)/g, "");
  s = s.replace(
    /(<span class="hw-answer-line">[^<]*<span class="handout-blank) handout-blank--lg/g,
    "$1 handout-blank--xl"
  );
  s = s.replace(
    /<span class="handout-blank handout-blank--lg" style="min-width:\s*1[24]em"><\/span>/g,
    '<span class="handout-blank handout-blank--xl"></span>'
  );
  s = s.replace(/[ \t]{2,}/g, " ");
  s = s.replace(/ +\./g, ".");
  s = s.replace(/ +，/g, "，");
  s = s.replace(/ +。/g, "。");
  s = s.replace(/<p class="homework-foot">\s*<\/p>\s*/g, "");
  return s;
}

function patchCssFile(css) {
  let out = css;
  out = out.replace(/min-width: 3\.2em/g, `min-width: ${BLANK.base}`);
  out = out.replace(/height: 1\.15em/g, "height: 1.25em");
  out = out.replace(/min-width: 2em/g, `min-width: ${BLANK.sm}`);
  out = out.replace(/min-width: 4\.5em/g, `min-width: ${BLANK.md}`);
  out = out.replace(/min-width: 7em/g, `min-width: ${BLANK.lg}`);

  if (!out.includes("handout-blank--xl")) {
    const xlBlock = `
.handout-blank--xl,
.lesson-sync-page .handout-blank--xl,
#sec-homework .handout-blank--xl {
  min-width: ${BLANK.xl};
}
`;
    out = out.replace(/(\.handout-blank--lg[^}]+\})/, `$1${xlBlock}`);
  }

  if (!out.includes("body.l01-handout-classroom .handout-blank,") && out.includes("body.l01-handout-classroom .handout-blank {")) {
    out = out.replace(
      /body\.l01-handout-classroom \.handout-blank \{/,
      `body.l01-handout-classroom .handout-blank,
.lesson-sync-page .handout-blank,
#sec-homework .handout-blank {`
    );
    out = out.replace(
      /body\.l01-handout-classroom \.handout-blank--(sm|md|lg) \{/g,
      "body.l01-handout-classroom .handout-blank--$1,\n.lesson-sync-page .handout-blank--$1,\n#sec-homework .handout-blank--$1 {"
    );
    if (!out.includes("print-color-adjust")) {
      out = out.replace(
        /(background: transparent;\n)(\})/,
        "$1  -webkit-print-color-adjust: exact;\n  print-color-adjust: exact;\n$2"
      );
    }
  }

  if (out.includes("@media print") && !out.includes("handout-blank--xl !important")) {
    out = out.replace(
      /(\.handout-blank--lg[^}]+min-width: 11em !important;\s*\})/,
      `$1

  .handout-blank--xl,
  .lesson-sync-page .handout-blank--xl,
  #sec-homework .handout-blank--xl {
    min-width: ${BLANK.xl} !important;
  }`
    );
  }

  out = out.replace(/min-height: 1\.1em/g, "min-height: 1.2em");
  return out;
}

for (const { insert, full } of LESSONS) {
  const insertPath = join(ROOT, insert);
  const fullPath = join(ROOT, full);
  let raw = readFileSync(insertPath, "utf8");
  if (needsRestore(raw) && existsSync(fullPath)) {
    raw = extractInsertFromFull(readFileSync(fullPath, "utf8"));
    console.log("restore from full:", insert);
  }
  writeFileSync(insertPath, stripParens(raw), "utf8");
  console.log("strip", insert);
}

for (const rel of CLASSROOM_CSS) {
  const path = join(ROOT, rel);
  writeFileSync(path, patchCssFile(readFileSync(path, "utf8")), "utf8");
  console.log("css", rel);
}

for (const rel of PUBLISHER_CSS) {
  const path = join(ROOT, rel);
  if (!existsSync(path)) continue;
  writeFileSync(path, patchCssFile(readFileSync(path, "utf8")), "utf8");
  console.log("pub", rel);
}

console.log("OK");
