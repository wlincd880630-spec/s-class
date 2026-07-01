import fs from "fs";

const zh = fs.readFileSync("../lesson01-handout-zhongkao.html", "utf8");
const cf = fs.readFileSync("../lesson01-handout-classroom-full.html", "utf8");
const re = /data-tts="([^"]+)"/g;
const u1 = [...zh.matchAll(re)].map((m) => m[1]);
const u2 = [...cf.matchAll(re)].map((m) => m[1]);
const s1 = [...new Set(u1)];
const s2 = [...new Set(u2)];
console.log("zhongkao buttons:", u1.length, "unique:", s1.length);
console.log("classroom buttons:", u2.length, "unique:", s2.length);
console.log("extra in classroom:", s2.filter((x) => !s1.includes(x)).length);
