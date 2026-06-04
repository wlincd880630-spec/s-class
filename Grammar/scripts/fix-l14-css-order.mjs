import fs from "fs";
import path from "path";

const shellPath = path.resolve("L14/l14-lesson-shell.css");
let shell = fs.readFileSync(shellPath, "utf8");
const cut = shell.indexOf("body.has-lesson-pager #app nav.lesson-pager {");
if (cut > 0) {
  const head = shell.slice(0, shell.lastIndexOf("/*", cut));
  shell = head + "/* 底栏：assets/grammar-lesson-pager.css（在 shell 之后引入） */\n";
  fs.writeFileSync(shellPath, shell);
}

const dir = path.resolve("L14");
const pagerBeforeShell =
  /<link rel="stylesheet" href="l14-index-nav\.css" \/>\s*<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css" \/>\s*<link rel="stylesheet" href="\.\.\/shared\/grammar-logo\.css" \/>\s*\n\s*<link rel="stylesheet" href="l14-lesson-shell\.css" \/>/g;
const pagerAfterShell =
  `<link rel="stylesheet" href="l14-index-nav.css" />\n  <link rel="stylesheet" href="../shared/grammar-logo.css" />\n  <link rel="stylesheet" href="l14-lesson-shell.css" />\n  <link rel="stylesheet" href="assets/grammar-lesson-pager.css" />`;

for (const f of fs.readdirSync(dir)) {
  if (!/^lesson14-.+\.html$/i.test(f) || f === "lesson14-page11-handout.html") continue;
  const fp = path.join(dir, f);
  let html = fs.readFileSync(fp, "utf8");
  if (pagerBeforeShell.test(html)) {
    html = html.replace(pagerBeforeShell, pagerAfterShell);
    fs.writeFileSync(fp, html);
    console.log("reordered", f);
  }
}
