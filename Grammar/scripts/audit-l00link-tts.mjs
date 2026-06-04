import fs from "fs";
import path from "path";

const root = path.resolve("L00-主系表与非谓语");
const manifest = {};
const t = fs.readFileSync(path.join(root, "assets/l00link-course-tts-manifest.js"), "utf8");
const re = /"((?:[^"\\]|\\.){2,500})":\s*"(assets\/tts-mp3\/[^"]+\.mp3)"/g;
let m;
while ((m = re.exec(t))) manifest[m[1]] = m[2];

const missing = Object.entries(manifest).filter(([k, rel]) => !fs.existsSync(path.join(root, rel)));

const pages = ["page1.html", "page2.html", "page3.html", "page4.html"];
const pageIssues = [];
for (const name of pages) {
  const html = fs.readFileSync(path.join(root, name), "utf8");
  pageIssues.push({
    file: name,
    hasCourseManifest: html.includes("l00link-course-tts-manifest.js"),
    manifestBeforeBootstrap:
      html.indexOf("l00link-course-tts-manifest.js") < html.indexOf("lesson-tts-bootstrap.js"),
    hasL00Speak: html.includes("l00-speak.js"),
    brokenInline: html.includes("' + encodeURIComponent(plain"),
  });
}

const handouts = ["link-handout-junior.html", "link-handout-senior.html", "link-handout-classroom-full.html"];
const handoutIssues = handouts.map((name) => {
  const html = fs.readFileSync(path.join(root, name), "utf8");
  const chips = [...html.matchAll(/data-tts="([^"]+)"/g)].map((x) => x[1]);
  const unmapped = chips.filter((c) => !manifest[c]);
  const bootIdx = html.indexOf("lesson-tts-bootstrap.js");
  const manIdx = html.indexOf("handout-tts-manifest.js");
  return {
    file: name,
    chips: chips.length,
    unmappedChips: unmapped.length,
    bootstrapBeforeHandout: bootIdx >= 0 && manIdx >= 0 && bootIdx < manIdx,
  };
});

console.log(
  JSON.stringify(
    {
      manifestKeys: Object.keys(manifest).length,
      missingMp3: missing.length,
      sampleMissing: missing.slice(0, 3).map(([k]) => k.slice(0, 60)),
      pageIssues,
      handoutIssues,
    },
    null,
    2
  )
);
