import fs from "fs";
const p = "d:/2026暑期课程（新8910年级）/L01/lesson01-exercise.html";
const b = fs.readFileSync(p);
console.log("BOM", b[0], b[1], b[2]);
const t = b.toString("utf8");
const line = t.split("\n").find((l) => l.includes('class="top-bar"'));
console.log("top-bar div:", line ? line.slice(0, 200) : "NOT FOUND");
console.log("includes 终极:", t.includes("终极试炼场"));
const idx = t.indexOf('class="top-bar"');
if (idx >= 0) {
  const snip = t.slice(idx, idx + 180);
  console.log("utf8 snippet:", snip);
  console.log("hex:", Buffer.from(snip, "utf8").toString("hex"));
}
const bad = [];
for (let i = 0; i < t.length; i++) {
  const c = t.charCodeAt(i);
  if (c === 0xfffd) bad.push(i);
}
console.log("replacement chars", bad.length);
const m = t.match(/[\u0080-\u009f]/g);
console.log("C1 controls", m ? m.length : 0);
