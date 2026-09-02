import fs from "fs";
import path from "path";
import { ROOT, UNITS, loadUnitSource } from "./pet-handout-lib.mjs";

const OUT = path.join(ROOT, "PET/studio/data/handout-source");
fs.mkdirSync(OUT, { recursive: true });
UNITS.forEach((u) => {
  const src = loadUnitSource(u);
  fs.writeFileSync(path.join(OUT, `u${String(u.id).padStart(2, "0")}.json`), JSON.stringify(src, null, 2));
  console.log("unit", u.id, src.vocab.length, src.colloc.length, src.grammar.length);
});
