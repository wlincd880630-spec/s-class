/**
 * 讲义 HTML → Word (.docx)
 */
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import HTMLtoDOCX from "html-to-docx";
import { inlineHandoutHtml } from "./inline-handout-html.mjs";

export async function exportHandoutDocx({ htmlPath, outDocx }) {
  mkdirSync(dirname(outDocx), { recursive: true });
  const html = inlineHandoutHtml(htmlPath);

  const buffer = await HTMLtoDOCX(
    html,
    null,
    {
      orientation: "portrait",
      margins: {
        top: 1440,
        right: 1200,
        bottom: 1440,
        left: 1200
      },
      table: { row: { cantSplit: true } }
    },
    null
  );

  writeFileSync(outDocx, buffer);
  return outDocx;
}
