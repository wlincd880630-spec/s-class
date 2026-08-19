#!/usr/bin/env node
/**
 * 全站 Azure Speech API → southeastasia 新密钥
 * 用法: node scripts/patch-azure-api-southeastasia.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const dryRun = process.argv.includes("--dry-run");

const NEW_KEY = "8d055d682fcd4af98a51828e04542cd4";
const NEW_REGION = "southeastasia";

const OLD_KEYS = [
  "3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc",
  "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu",
  "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdExx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu",
  "43gMKIlSRVGT9PnAFgWkdXyogwXfudT33O2Zk6QtfTKuY1nm01BdJQQJ99BLACHYHv6XJ3w3AAAYACOGts5S",
  "DKRXk8ueSfo5NdIOMqFRTCAfpeGDezJ3Snf5K8gGgtyqxiWdugLzJQQJ99BLACHYHv6XJ3w3AAAYACOGUYP9",
];

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

  for (const old of OLD_KEYS) rep(old, NEW_KEY);

  // Region: eastasia / eastus2 → southeastasia (Azure Speech only patterns)
  rep("azureRegion: 'eastasia'", `azureRegion: '${NEW_REGION}'`);
  rep('azureRegion: "eastasia"', `azureRegion: "${NEW_REGION}"`);
  rep("azureRegion: 'eastus2'", `azureRegion: '${NEW_REGION}'`);
  rep('azureRegion: "eastus2"', `azureRegion: "${NEW_REGION}"`);
  rep("azureRegion: 'eastus'", `azureRegion: '${NEW_REGION}'`);
  rep('azureRegion: "eastus"', `azureRegion: "${NEW_REGION}"`);

  rep("AZURE_REGION = \"eastasia\"", `AZURE_REGION = "${NEW_REGION}"`);
  rep("AZURE_REGION = 'eastasia'", `AZURE_REGION = '${NEW_REGION}'`);
  rep('AZURE_SPEECH_REGION = "eastasia"', `AZURE_SPEECH_REGION = "${NEW_REGION}"`);
  rep("AZURE_SPEECH_REGION = 'eastasia'", `AZURE_SPEECH_REGION = '${NEW_REGION}'`);
  rep('AZURE_SPEECH_REGION = "eastus2"', `AZURE_SPEECH_REGION = "${NEW_REGION}"`);
  rep("AZURE_SPEECH_REGION = 'eastus2'", `AZURE_SPEECH_REGION = '${NEW_REGION}'`);
  rep('const AZURE_REGION = "eastasia"', `const AZURE_REGION = "${NEW_REGION}"`);
  rep("const AZURE_REGION = 'eastasia'", `const AZURE_REGION = '${NEW_REGION}'`);

  rep('__AZURE_SPEECH_REGION__ = "eastasia"', `__AZURE_SPEECH_REGION__ = "${NEW_REGION}"`);
  rep("__AZURE_SPEECH_REGION__ = 'eastasia'", `__AZURE_SPEECH_REGION__ = '${NEW_REGION}'`);
  rep('region: "eastasia"', `region: "${NEW_REGION}"`);
  rep("region: 'eastasia'", `azureRegion: '${NEW_REGION}'`.replace("azureRegion", "region"));

  // AEIS / JSON style
  rep('"speechRegion": "eastasia"', `"speechRegion": "${NEW_REGION}"`);
  rep("'speechRegion': 'eastasia'", `'speechRegion': '${NEW_REGION}'`);
  rep('"azureRegion": "eastasia"', `"azureRegion": "${NEW_REGION}"`);
  rep('"region": "eastasia"', `"region": "${NEW_REGION}"`);

  // Default fallbacks that still say eastasia for Azure Speech
  rep('|| "eastasia"', `|| "${NEW_REGION}"`);
  rep("|| 'eastasia'", `|| '${NEW_REGION}'`);
  rep('|| "eastus2"', `|| "${NEW_REGION}"`);
  rep("|| 'eastus2'", `|| '${NEW_REGION}'`);

  // Common SpeechConfig / fromSubscription second args already covered via key;
  // also patch bare defaults in config objects
  rep("DEFAULT_REGION = 'eastasia'", `DEFAULT_REGION = '${NEW_REGION}'`);
  rep('DEFAULT_REGION = "eastasia"', `DEFAULT_REGION = "${NEW_REGION}"`);

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

// Verify old keys gone (except patch scripts)
let remaining = 0;
for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  if (SKIP_FILES.has(rel)) continue;
  const t = fs.readFileSync(file, "utf8");
  for (const old of OLD_KEYS) {
    if (t.includes(old)) {
      remaining++;
      console.warn("STILL HAS OLD KEY:", rel);
      break;
    }
  }
}
if (remaining > 0) {
  console.warn(`WARNING: ${remaining} files still contain old keys`);
  process.exitCode = 1;
} else {
  console.log("OK: No old API keys remaining (except patch scripts).");
}
