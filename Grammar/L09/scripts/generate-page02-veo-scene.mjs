#!/usr/bin/env node
/**
 * L09 Page 02 — Vertex Veo 分镜 ×5，拼句句意：While he was walking… found an injured bird.
 * 下载到 assets/vertex/；若本机有 ffmpeg，再拼接为 l09-page02-park-loop.mp4（单文件无缝循环）。
 *
 * 分镜顺序：
 * 1 男孩公园走路 · 2 换视角继续走 · 3 受伤小鸟地上挣扎特写 · 4 男孩朝鸟走去 · 5 弯腰捡起鸟
 *
 * 默认同桶：gs://project-ec12c6e5-5e03-4771-add-junior-english-db/vertex-veo/l09-page02/
 */
import fs from "fs";
import path from "path";
import { execFileSync, execSync, spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const L09_ROOT = path.join(__dirname, "..");
const VERTEX_DIR = path.join(L09_ROOT, "assets", "vertex");

const PROJECT = String(process.env.VERTEX_PROJECT_ID || "project-ec12c6e5-5e03-4771-add").trim();
const LOCATION = String(process.env.VERTEX_LOCATION || "us-central1").trim();
const MODEL = String(process.env.VEO_MODEL_ID || "veo-2.0-generate-001").trim();
const DEFAULT_VEO_GCS_PREFIX =
  "gs://project-ec12c6e5-5e03-4771-add-junior-english-db/vertex-veo/l09-page02/";
const STORAGE_URI = String(process.env.L09_VEO_OUTPUT_GCS_URI || DEFAULT_VEO_GCS_PREFIX).trim();

const BOY_STYLE =
  "Cel-shaded cartoon anime style, clean black outlines, soft flat colors, 16:9 landscape. " +
  "Same boy in every boy shot: teenage, short messy brown hair, navy hoodie, khaki shorts, white sneakers. " +
  "Sunny public park: green trees, grass, paved walking path, soft warm daylight, family-friendly. " +
  "No subtitles, no readable text, no logos, no watermark.";

/** 与前后镜衔接的小鸟形象（镜 3 特写为主） */
const BIRD_STYLE =
  "Cel-shaded cartoon anime style, clean outlines, soft flat colors, 16:9 landscape, same park path edge with grass. " +
  "One small sparrow-sized brown bird, slightly ruffled feathers, one wing drooped, looks weak; gently twitching and trying to stand on dirt beside the path—clearly injured but NOT graphic, NO blood spray, NO gore, family-friendly. " +
  "No subtitles, no readable text, no logos.";

const SCENES = [
  {
    file: "l09-page02-seq-1-walk.mp4",
    prompt:
      BOY_STYLE +
      " VIDEO 1 ONLY — the boy walks calmly along the park path at a steady pace, medium-wide from slightly behind. " +
      "No bird visible anywhere.",
  },
  {
    file: "l09-page02-seq-2-perspective-walk.mp4",
    prompt:
      BOY_STYLE +
      " VIDEO 2 ONLY — clearly DIFFERENT camera angle from shot 1 (e.g. mild high angle, front-three-quarter, or tracking from ahead). " +
      "The same boy keeps walking along the path with relaxed motion. Still no bird in frame.",
  },
  {
    file: "l09-page02-seq-3-bird-struggle.mp4",
    prompt:
      BIRD_STYLE +
      " VIDEO 3 ONLY — close-up or medium close-up focused on the injured little bird on the ground near the path; " +
      "subtle struggling motion: weak wing flutter, tiny hops, breathing; emotional but not scary. Do NOT show the boy's face; feet or blurred legs far in background optional.",
  },
  {
    file: "l09-page02-seq-4-boy-approach.mp4",
    prompt:
      BOY_STYLE +
      " VIDEO 4 ONLY — the boy has noticed something ahead; he walks purposefully along the path toward the spot where the small bird lies on the ground ahead of him. " +
      "Show both boy approaching and the tiny bird figure on the path in the same shot (wide or medium). He has NOT picked it up yet.",
  },
  {
    file: "l09-page02-seq-5-pickup.mp4",
    prompt:
      BOY_STYLE +
      " VIDEO 5 ONLY — he reaches the bird, bends at the knees, and gently cups the injured bird in both hands with a worried caring look. " +
      "Medium shot; careful gentle motion. Bird looks weak but not graphic.",
  },
];

function getAccessToken() {
  const env = String(process.env.GOOGLE_ACCESS_TOKEN || "").trim();
  if (env) return env;
  for (const bin of ["gcloud", "gcloud.cmd"]) {
    try {
      return String(execFileSync(bin, ["auth", "print-access-token"], { encoding: "utf8" })).trim();
    } catch (_) {}
  }
  try {
    return String(
      execFileSync(
        "C:\\Users\\wl88i\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd",
        ["auth", "print-access-token"],
        { encoding: "utf8" }
      )
    ).trim();
  } catch (_) {}
  try {
    return String(
      execSync(
        '"C:\\Users\\wl88i\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd" auth print-access-token',
        { encoding: "utf8", shell: true }
      )
    ).trim();
  } catch (_) {}
  console.error("无法取得 access token。请先 gcloud auth login，或设置 GOOGLE_ACCESS_TOKEN。");
  process.exit(1);
}

function veoBaseUrl() {
  return `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}`;
}

async function startGeneration(token, promptText) {
  const url = `${veoBaseUrl()}:predictLongRunning`;
  const body = {
    instances: [{ prompt: String(promptText || "") }],
    parameters: {
      storageUri: STORAGE_URI.endsWith("/") ? STORAGE_URI : `${STORAGE_URI}/`,
      sampleCount: 1,
      aspectRatio: "16:9",
      duration: 6,
      negativePrompt:
        "photorealistic, live action, horror, blood, gore, weapons, readable text, watermark, logo, multiple different boys, wrong outfit, violent pecking",
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
      "x-goog-user-project": PROJECT,
    },
    body: JSON.stringify(body),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error("predictLongRunning " + res.status + " " + JSON.stringify(j));
  }
  const opName = j.name || j.operationName;
  if (!opName) throw new Error("无 operation name: " + JSON.stringify(j));
  return opName;
}

async function fetchOperation(token, operationName) {
  const url = `${veoBaseUrl()}:fetchPredictOperation`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
      "x-goog-user-project": PROJECT,
    },
    body: JSON.stringify({ operationName }),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error("fetchPredictOperation " + res.status + " " + JSON.stringify(j));
  }
  return j;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function pollUntilDone(token, opName) {
  let last = null;
  for (let i = 0; i < 80; i++) {
    await sleep(15000);
    last = await fetchOperation(token, opName);
    if (last.done === true) return last;
    console.log(new Date().toISOString(), "…轮询", i + 1, "done=false");
  }
  throw new Error("Veo 超时: " + JSON.stringify(last));
}

function extractGcsUri(doneBody) {
  const resp = doneBody.response || {};
  const videos = resp.videos || [];
  const u = videos[0] && (videos[0].gcsUri || videos[0].gcs_uri);
  if (!u) throw new Error("无 gcsUri: " + JSON.stringify(doneBody));
  return u;
}

function tryGsutilCopy(gcsUri, destPath) {
  for (const bin of ["gsutil", "gsutil.cmd"]) {
    const r = spawnSync(bin, ["-q", "cp", gcsUri, destPath], { encoding: "utf8" });
    if (!r.error && r.status === 0) return true;
  }
  try {
    execSync(`gsutil -q cp "${gcsUri}" "${destPath}"`, { encoding: "utf8", shell: true });
    return true;
  } catch (_) {}
  return false;
}

function tryConcatFfmpeg(absPaths, outPath) {
  const listPath = path.join(VERTEX_DIR, ".concat-l09-page02.txt");
  const body = absPaths.map((p) => `file '${p.replace(/\\/g, "/")}'`).join("\n");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(listPath, body, "utf8");
  const run = (args) => {
    try {
      execFileSync("ffmpeg", args, { stdio: "inherit" });
      return true;
    } catch (_) {
      return false;
    }
  };
  const commonIn = ["-y", "-f", "concat", "-safe", "0", "-i", listPath];
  if (run([...commonIn, "-c", "copy", outPath])) return true;
  console.warn("ffmpeg -c copy 拼接失败，尝试 libx264 重编码…");
  return run([
    ...commonIn,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "22",
    "-preset",
    "fast",
    "-movflags",
    "+faststart",
    "-c:a",
    "aac",
    "-b:a",
    "96k",
    outPath,
  ]);
}

async function runOneScene(token, label, promptText) {
  console.log("\n>>>", label);
  const op = await startGeneration(token, promptText);
  console.log("Operation:", op);
  const done = await pollUntilDone(token, op);
  if (done.error) throw new Error(JSON.stringify(done.error));
  const gcs = extractGcsUri(done);
  console.log("GCS:", gcs);
  return gcs;
}

async function main() {
  if (!STORAGE_URI.startsWith("gs://")) {
    console.error("L09_VEO_OUTPUT_GCS_URI 无效");
    process.exit(1);
  }
  fs.mkdirSync(VERTEX_DIR, { recursive: true });

  const token = getAccessToken();
  const n = SCENES.length;
  console.log("项目:", PROJECT, "区域:", LOCATION, "模型:", MODEL);
  console.log("GCS 前缀:", STORAGE_URI);

  const localPaths = [];
  for (let i = 0; i < SCENES.length; i++) {
    const sc = SCENES[i];
    const dest = path.join(VERTEX_DIR, sc.file);
    const gcs = await runOneScene(token, `分镜 ${i + 1}/${n} · ${sc.file}`, sc.prompt);
    if (!tryGsutilCopy(gcs, dest)) {
      console.error("gsutil 下载失败:", gcs, "->", dest);
      process.exit(2);
    }
    console.log("已保存:", dest);
    localPaths.push(path.resolve(dest));
  }

  const merged = path.join(VERTEX_DIR, "l09-page02-park-loop.mp4");
  if (tryConcatFfmpeg(localPaths, merged)) {
    console.log("\n已拼接循环片:", merged);
  } else {
    console.warn("\n未检测到可用 ffmpeg；已保留 " + n + " 个分镜文件，课件将用多轨顺序播放。");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
