#!/usr/bin/env node
/** 修复 School_textbook 课件 HTML 中破损的 script 标签 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const COURSEWARE = path.join(path.dirname(fileURLToPath(import.meta.url)), "../Primary/School_textbook/Courseware");
const MANIFEST = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/School_textbook/Courseware/audio/audio-manifest.js?v=1";
const LOCAL = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/School_textbook/Courseware/audio/local-audio.js?v=1";

const BLOCK =
  `  <script src="assets/data/data.js"></script>\n` +
  `  <script src="${MANIFEST}"></script>\n` +
  `  <script src="${LOCAL}"></script>\n` +
  `  <script src="assets/js/utils.js"></script>`;

const grades = fs.readdirSync(COURSEWARE).filter((d) => /^\d[A-Z]{2}$/.test(d));
let fixed = 0;
for (const g of grades) {
  for (const name of fs.readdirSync(path.join(COURSEWARE, g))) {
    if (!/\.html$/i.test(name) || name === "index.html") continue;
    const fp = path.join(COURSEWARE, g, name);
    let s = fs.readFileSync(fp, "utf8");
    if (!s.includes("audio-manifest.js")) continue;

    // 破损块：data.js 未闭合 + 内联 manifest/local-audio
    const brokenRe =
      /<script src="assets\/data\/data\.js">[\s\S]*?local-audio\.js[^"]*"><\/script>\s*\n?\s*<script src="assets\/js\/utils\.js"><\/script>/;
    // 已正确或挤在一行的旧格式
    const okRe =
      /<script src="assets\/data\/data\.js"><\/script>\s*<script src="[^"]*audio-manifest\.js[^"]*"><\/script>\s*<script src="[^"]*local-audio\.js[^"]*"><\/script>\s*<script src="assets\/js\/utils\.js"><\/script>/;

    if (brokenRe.test(s)) {
      s = s.replace(brokenRe, BLOCK);
      fs.writeFileSync(fp, s, "utf8");
      fixed++;
      continue;
    }
    if (!okRe.test(s)) {
      // 兜底：从 data.js 到 utils.js 整段替换
      s = s.replace(
        /<script src="assets\/data\/data\.js">[\s\S]*?<script src="assets\/js\/utils\.js"><\/script>/,
        BLOCK
      );
      if (s.includes("audio-manifest.js")) {
        fs.writeFileSync(fp, s, "utf8");
        fixed++;
      }
    } else if (/<\/script>\s{2,}<script src="https:/.test(s)) {
      s = s.replace(okRe, BLOCK);
      fs.writeFileSync(fp, s, "utf8");
      fixed++;
    }
  }
}
console.log("fixed HTML files:", fixed);
