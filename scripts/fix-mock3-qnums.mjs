import fs from "fs";
const p = "HET/2026 Mock 3/2026成都英语绿卷.html";
let s = fs.readFileSync(p, "utf8");
const before = (s.match(/q-num">\d+\.\./g) || []).length;
s = s.replace(/<span class="q-num">(\d+)\.\.<\/span>/g, '<span class="q-num">$1.</span>');
fs.writeFileSync(p, s);
const after = (s.match(/q-num">\d+\.\./g) || []).length;
console.log(`fixed ${before - after} double-dot q-nums, remaining: ${after}`);
