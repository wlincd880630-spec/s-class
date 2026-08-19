#!/usr/bin/env node
/**
 * 全站 Azure Speech API → southeastasia 新密钥
 * 用法: node scripts/patch-azure-api-southeastasia.mjs [--dry-run]
 *
 * 注意：REFH/.../shared.js 中的 LEGACY_AZURE_KEYS 会保留旧密钥，
 * 用于覆盖 localStorage 里的过期配置。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const dryRun = process.argv.includes("--dry-run");

const NEW_KEY =
  "9wqQjcwatmfHXVoMv9nO6I2teZBS6LSZL6ROW85tO6fL4ahKjsIaJQQJ99CHACqBBLyXJ3w3AAAYACOGvelV";
const NEW_REGION = "southeastasia";

/** 历史密钥（含上一版 southeastasia 密钥）一律替换为 NEW_KEY */
const OLD_KEYS = [
  "8d055d682fcd4af98a51828e04542cd4",
  "3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc",
  "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu",
  "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdExx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu",
  "43gMKIlSRVGT9PnAFgWkdXyogwXfudT33O2Zk6QtfTKuY1nm01BdJQQJ99BLACHYHv6XJ3w3AAAYACOGts5S",
  "DKRXk8ueSfo5NdIOMqFRTCAfpeGDezJ3Snf5K8gGgtyqxiWdugLzJQQJ99BLACHYHv6XJ3w3AAAYACOGUYP9",
];

const LEGACY_BLOCK = `  const LEGACY_AZURE_KEYS = new Set([\n${OLD_KEYS.map(
  (k) => `    '${k}',`
).join("\n")}\n  ]);`;

const EXT = new Set([
  ".html",
  ".js",
  ".mjs",
  ".json",
  ".py",
  ".md",
  ".ps1",
  ".txt",
]);

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".cursor",
  "dist",
  "build",
]);

const SKIP_FILES = new Set([
  "scripts/patch-azure-api-eastasia.mjs",
  "scripts/patch-azure-api-southeastasia.mjs",
]);

let filesChanged = 0;
let totalReplacements = 0;

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (EXT.has(path.extname(name).toLowerCase())) out.push(full);
  }
  return out;
}

function patchContent(text) {
  let s = text;
  let n = 0;

  function rep(from, to) {
    if (!from || !s.includes(from)) return;
    const parts = s.split(from);
    const count = parts.length - 1;
    if (count > 0) {
      s = parts.join(to);
      n += count;
    }
  }

  function repRe(re, to) {
    const before = s;
    s = s.replace(re, to);
    if (s !== before) {
      const m = before.match(
        new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g")
      );
      n += m ? m.length : 1;
    }
  }

  // Protect LEGACY_AZURE_KEYS blocks: replace whole block with canonical old-key list
  // after bulk key swap (so localStorage override still works).
  const hadLegacy = /const LEGACY_AZURE_KEYS\s*=\s*new Set\(\[[\s\S]*?\]\)/.test(s);

  for (const old of OLD_KEYS) rep(old, NEW_KEY);

  if (hadLegacy) {
    const before = s;
    s = s.replace(
      /  const LEGACY_AZURE_KEYS = new Set\(\[[\s\S]*?\]\);/,
      LEGACY_BLOCK
    );
    if (s !== before) n += 1;
  }

  // --- Region: eastasia / eastus2 / eastus → southeastasia ---
  const regionPairs = [
    ["azureRegion", "eastasia"],
    ["azureRegion", "eastus2"],
    ["azureRegion", "eastus"],
    ["azure_region", "eastasia"],
    ["azure_region", "eastus2"],
    ["AZURE_REGION", "eastasia"],
    ["AZURE_REGION", "eastus2"],
    ["AZURE_REGION", "eastus"],
    ["AZURE_SPEECH_REGION", "eastasia"],
    ["AZURE_SPEECH_REGION", "eastus2"],
    ["AZURE_SPEECH_REGION", "eastus"],
    ["speechRegion", "eastasia"],
    ["speechRegion", "eastus2"],
    ["speechRegion", "eastus"],
    ["__AZURE_SPEECH_REGION__", "eastasia"],
    ["__AZURE_SPEECH_REGION__", "eastus2"],
    ["DEFAULT_REGION", "eastasia"],
    ["DEFAULT_REGION", "eastus2"],
    ["AZ_REG", "eastasia"],
    ["AZ_REG", "eastus2"],
    ["AZ_REG", "eastus"],
    ["REG", "eastasia"],
    ["REG", "eastus2"],
  ];

  for (const [key, oldReg] of regionPairs) {
    rep(`${key}: '${oldReg}'`, `${key}: '${NEW_REGION}'`);
    rep(`${key}: "${oldReg}"`, `${key}: "${NEW_REGION}"`);
    rep(`${key} = '${oldReg}'`, `${key} = '${NEW_REGION}'`);
    rep(`${key} = "${oldReg}"`, `${key} = "${NEW_REGION}"`);
    rep(`"${key}": "${oldReg}"`, `"${key}": "${NEW_REGION}"`);
    rep(`"${key}":"${oldReg}"`, `"${key}":"${NEW_REGION}"`);
    rep(`'${key}': '${oldReg}'`, `'${key}': '${NEW_REGION}'`);
    rep(`const ${key} = "${oldReg}"`, `const ${key} = "${NEW_REGION}"`);
    rep(`const ${key} = '${oldReg}'`, `const ${key} = '${NEW_REGION}'`);
    rep(`var ${key} = "${oldReg}"`, `var ${key} = "${NEW_REGION}"`);
    rep(`var ${key} = '${oldReg}'`, `var ${key} = '${NEW_REGION}'`);
    rep(`let ${key} = "${oldReg}"`, `let ${key} = "${NEW_REGION}"`);
    rep(`let ${key} = '${oldReg}'`, `let ${key} = '${NEW_REGION}'`);
  }

  rep('region: "eastasia"', `region: "${NEW_REGION}"`);
  rep("region: 'eastasia'", `region: '${NEW_REGION}'`);
  rep('region: "eastus2"', `region: "${NEW_REGION}"`);
  rep("region: 'eastus2'", `region: '${NEW_REGION}'`);
  rep('"region": "eastasia"', `"region": "${NEW_REGION}"`);
  rep('"region": "eastus2"', `"region": "${NEW_REGION}"`);

  rep('|| "eastasia"', `|| "${NEW_REGION}"`);
  rep("|| 'eastasia'", `|| '${NEW_REGION}'`);
  rep('|| "eastus2"', `|| "${NEW_REGION}"`);
  rep("|| 'eastus2'", `|| '${NEW_REGION}'`);
  rep('|| "eastus"', `|| "${NEW_REGION}"`);
  rep("|| 'eastus'", `|| '${NEW_REGION}'`);

  rep('var r = "eastasia"', `var r = "${NEW_REGION}"`);
  rep("var r = 'eastasia'", `var r = '${NEW_REGION}'`);

  rep(
    '<option value="eastasia">Southeast Asia</option>',
    `<option value="${NEW_REGION}">Southeast Asia</option>`
  );
  rep(
    '<option value="eastasia">East Asia</option>',
    `<option value="${NEW_REGION}">Southeast Asia</option>`
  );
  rep('id="azure-region" value="eastasia"', `id="azure-region" value="${NEW_REGION}"`);

  rep("（如 eastasia）", `（${NEW_REGION}）`);
  rep("区域默认 `eastasia`", `区域默认 \`${NEW_REGION}\``);
  rep("本套：eastasia", `本套：${NEW_REGION}`);
  rep("Region：eastasia", `Region：${NEW_REGION}`);

  rep('"AZURE_SPEECH_REGION", "eastasia"', `"AZURE_SPEECH_REGION", "${NEW_REGION}"`);

  // Multiline fallbacks: ||\n  "eastasia"
  repRe(/\|\|\s*\n(\s*)"eastasia"/g, `||\n$1"${NEW_REGION}"`);
  repRe(/\|\|\s*\n(\s*)'eastasia'/g, `||\n$1'${NEW_REGION}'`);

  repRe(
    /\b((?:azure|speech|AZURE_SPEECH_|AZURE_|AZ_)?[Rr]egion)(\s*[:=]\s*)["']eastasia["']/g,
    `$1$2"${NEW_REGION}"`
  );
  repRe(
    /\b((?:azure|speech|AZURE_SPEECH_|AZURE_|AZ_)?[Rr]egion)(\s*[:=]\s*)["']eastus2?["']/g,
    `$1$2"${NEW_REGION}"`
  );

  return { s, n };
}

const files = walk(ROOT);
for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  if (SKIP_FILES.has(rel)) continue;
  const orig = fs.readFileSync(file, "utf8");
  const { s, n } = patchContent(orig);
  if (n > 0 && s !== orig) {
    filesChanged++;
    totalReplacements += n;
    if (!dryRun) fs.writeFileSync(file, s, "utf8");
    console.log(`${dryRun ? "[dry-run] " : ""}${rel} (${n})`);
  }
}

console.log(
  `\n${dryRun ? "Would update" : "Updated"} ${filesChanged} files, ${totalReplacements} replacements.`
);

// Verify: old keys only allowed inside LEGACY_AZURE_KEYS
let remaining = 0;
for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  if (SKIP_FILES.has(rel)) continue;
  let t = fs.readFileSync(file, "utf8");
  t = t.replace(/const LEGACY_AZURE_KEYS\s*=\s*new Set\(\[[\s\S]*?\]\);/g, "");
  for (const old of OLD_KEYS) {
    if (t.includes(old)) {
      remaining++;
      console.warn("STILL HAS OLD KEY:", rel);
      break;
    }
  }
}
if (remaining > 0) {
  console.warn(`WARNING: ${remaining} files still contain old keys outside LEGACY blocks`);
  process.exitCode = 1;
} else {
  console.log("OK: No old API keys outside LEGACY_AZURE_KEYS (except patch scripts).");
}

let newKeyHits = 0;
for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  if (SKIP_FILES.has(rel)) continue;
  const t = fs.readFileSync(file, "utf8");
  if (t.includes(NEW_KEY)) newKeyHits++;
}
console.log(`New key present in ${newKeyHits} files.`);
