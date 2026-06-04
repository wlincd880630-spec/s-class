/**
 * 将讲义 HTML 引用的本地 CSS 内联，便于 Word 导出
 */
import { readFileSync, existsSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const LINK_RE =
  /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*\/?>/gi;

function resolveHref(htmlPath, href) {
  if (/^https?:\/\//i.test(href)) return null;
  const base = dirname(htmlPath);
  const clean = href.replace(/^\//, "");
  return resolve(base, clean);
}

export function inlineHandoutHtml(htmlPath) {
  const absHtml = resolve(htmlPath);
  let html = readFileSync(absHtml, "utf8");
  const styles = [];

  html = html.replace(LINK_RE, (full, href) => {
    const cssPath = resolveHref(absHtml, href);
    if (!cssPath || !existsSync(cssPath)) return full;
    try {
      styles.push(`/* ${href} */\n${readFileSync(cssPath, "utf8")}`);
    } catch {
      return full;
    }
    return "";
  });

  const block = `<style id="inlined-for-docx">\n${styles.join("\n\n")}\n</style>`;
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${block}\n</head>`);
  } else {
    html = block + html;
  }

  html = html.replace(/\sclass="[^"]*no-print[^"]*"/gi, ' style="display:none"');
  html = html.replace(/<nav class="lesson-pager[\s\S]*?<\/nav>/gi, "");
  html = html.replace(/<header class="grammar-handout-top">[\s\S]*?<\/header>/i, "");

  return html;
}
