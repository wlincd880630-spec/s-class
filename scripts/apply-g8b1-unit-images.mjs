#!/usr/bin/env node
/**
 * 扫描 UnitN/images/*.png，写入 UnitN.json 的 img1/img2，并重建 UnitN.html + pep_vocab_learn.html
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const G8_B1 = path.join(ROOT, "junior_vocab", "G8_B1");

function slug(word) {
  return (
    String(word || "word")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_")
      .toLowerCase()
      .slice(0, 48) || "word"
  );
}

function applyUnit(n) {
  const unitDir = path.join(G8_B1, `Unit${n}`);
  const jsonPath = path.join(unitDir, `Unit${n}.json`);
  const imgDir = path.join(unitDir, "images");
  if (!fs.existsSync(jsonPath)) {
    console.error("missing", jsonPath);
    return false;
  }
  const db = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  let linked = 0;
  for (const w of db.words || []) {
    const s = slug(w.word);
    const p1 = path.join(imgDir, `${s}_1.png`);
    const p2 = path.join(imgDir, `${s}_2.png`);
    const rel1 = `Unit${n}/images/${s}_1.png`;
    const rel2 = `Unit${n}/images/${s}_2.png`;
    if (fs.existsSync(p1)) {
      w.img1 = rel1;
      linked++;
    }
    if (fs.existsSync(p2)) {
      w.img2 = rel2;
      linked++;
    }
  }
  fs.writeFileSync(jsonPath, JSON.stringify(db, null, 2), "utf8");
  console.log(`Unit${n}: linked ${linked} image paths`);

  const all = [];
  for (let u = 1; u <= 8; u++) {
    const jp = path.join(G8_B1, `Unit${u}`, `Unit${u}.json`);
    if (fs.existsSync(jp)) all.push(JSON.parse(fs.readFileSync(jp, "utf8")));
  }
  all.sort((a, b) => (a.unit || 0) - (b.unit || 0));
  execFileSync(
    "python",
    [
      "-c",
      `import json,sys; sys.path.insert(0,r'D:\\\\Python自动化\\\\VocabLab'); from pep_vocab_pipeline import build_html; from pathlib import Path; build_html(Path(r'${G8_B1.replace(/\\/g, "\\\\")}'), json.loads(sys.stdin.read()))`,
    ],
    { input: JSON.stringify(all), stdio: ["pipe", "inherit", "inherit"], encoding: "utf8" }
  );
  execFileSync(process.execPath, [path.join(__dirname, "patch-g8b1-speech.mjs")], { stdio: "inherit" });
  return true;
}

const unit = parseInt(process.argv[2] || process.argv[process.argv.length - 1], 10) || 1;
applyUnit(unit);
