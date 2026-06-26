#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "../HET/2026 Mock 1/2026成都英语黑卷-答案与解析.html");
const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
const out = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes("教师版：屏幕排版")) {
    while (i < lines.length && !lines[i].includes("教师版：PDF/打印")) i++;
    if (lines[i]?.includes("教师版：PDF/打印")) {
      // 去掉误关闭 @media print 的单独一行 }
      while (out.length && out[out.length - 1].trim() === "") out.pop();
      if (out.length && out[out.length - 1].trim() === "}") out.pop();
      out.push(line);
    }
    continue;
  }
  out.push(line);
}

let html = out.join("\n");

html = html.replace(
  /(body\.teacher-edition\.print-compact \.teacher-key \.tk-rubric \{\s+display: none !important;\s+\})\n<\/style>/,
  "$1\n\n}\n</style>"
);

html = html.replace(
  /<div class="toolbar no-print teacher-toolbar">\s*<h1>2026成都中考英语（黑卷）·答案与解析<\/h1>\s*<button type="button" class="primary" id="btnPdf">导出 PDF<\/button>[\s\S]*?<\/div>\s*/,
  ""
);

html = html.replace(
  /const STORAGE_KEY[\s\S]*?function initExamPage\(\) \{[\s\S]*?\}\n\nif \(document\.readyState/,
  "if (document.readyState"
);

html = html.replace(
  /if \(document\.readyState === 'loading'\) \{\s*document\.addEventListener\('DOMContentLoaded', initExamPage\);\s*\} else \{\s*initExamPage\(\);\s*\}/,
  `if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildListenUI);
} else {
  buildListenUI();
}`
);

html = html.replace(/exam-teacher-ui\.css\?v=\d+/g, "exam-teacher-ui.css?v=10");

fs.writeFileSync(file, html, "utf8");
console.log("Fixed:", file);
