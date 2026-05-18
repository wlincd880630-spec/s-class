#!/usr/bin/env node
/**
 * L12 Page 03 — Slide 8 故事「快要下雨了」Vertex Veo 分镜 ×8，依次生成后 ffmpeg 拼接为一条长视频。
 * 成片目标路径：TL12/assets/l12p3-rain-story-video.mp4（供 lesson12-page03-reported-speech.html 引用）
 *
 * 依赖：gcloud 登录、gsutil、ffmpeg；环境变量可覆盖默认 GCS 输出前缀。
 * 说明：Veo 对「对白」的实际输出因模型与政策而异；提示词要求无画面内文字。若需更稳的旁白，可在拼接后用 ffmpeg 另行叠加 TTS 音轨。
 */
import fs from "fs";
import path from "path";
import { execFileSync, execSync, spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TL12_ROOT = path.join(__dirname, "..");
const ASSETS_ROOT = path.join(TL12_ROOT, "assets");
const VERTEX_DIR = path.join(ASSETS_ROOT, "vertex", "l12p3-rain-story");

const PROJECT = String(process.env.VERTEX_PROJECT_ID || "project-ec12c6e5-5e03-4771-add").trim();
const LOCATION = String(process.env.VERTEX_LOCATION || "us-central1").trim();
const MODEL = String(process.env.VEO_MODEL_ID || "veo-2.0-generate-001").trim();
const DEFAULT_VEO_GCS_PREFIX =
  "gs://project-ec12c6e5-5e03-4771-add-junior-english-db/vertex-veo/l12p3-rain-story/";
const STORAGE_URI = String(process.env.L12P3_VEO_OUTPUT_GCS_URI || DEFAULT_VEO_GCS_PREFIX).trim();
/** 默认跳过已存在且大于 8KB 的本地分镜，便于断点续跑（设 L12P3_VEO_SKIP_EXISTING=0 可强制全重下） */
const SKIP_EXISTING = String(process.env.L12P3_VEO_SKIP_EXISTING || "1").trim() !== "0";

const STYLE =
  "Soft educational story illustration style, rounded friendly middle-school characters, clean colors, 16:9 landscape, school interior and playground, family-friendly. " +
  "Absolutely NO on-screen text, NO subtitles, NO captions, NO letters, NO watermark, NO logos. " +
  "If characters speak, clear English dialogue only (diegetic speech), lip movement believable.";

const SCENES = [
  {
    file: "l12p3-rain-seq-01-morning-worry.mp4",
    prompt:
      STYLE +
      " SHOT 1 — Morning classroom: teacher Miss Li at window looking out at playground where many students play; dark clouds gathering outside; she looks very worried. " +
      "Optional clear English narrator voice: Many students were playing on the playground in the morning. Dark clouds were gathering in the sky, and Miss Li felt worried.",
  },
  {
    file: "l12p3-rain-seq-02-miss-li-steven.mp4",
    prompt:
      STYLE +
      " SHOT 2 — Same classroom: Miss Li speaks face-to-face to boy Steven; she gestures toward the window. " +
      "She says clearly in English: Please ask the students on the playground to come back to the classroom soon. It is going to rain.",
  },
  {
    file: "l12p3-rain-seq-03-steven-ok-run.mp4",
    prompt:
      STYLE +
      " SHOT 3 — Steven nods eagerly then turns and runs toward classroom door stairs, motion blur slight, urgent helpful mood. " +
      "He says in English: OK, Miss Li! I will tell them right now.",
  },
  {
    file: "l12p3-rain-seq-04-playground-shout.mp4",
    prompt:
      STYLE +
      " SHOT 4 — Outdoor playground, NOT raining yet, overcast sky; Steven shouts with hands cupped to classmates playing. " +
      "He shouts in English: Miss Li wants us to go back to the classroom right away. She thinks it is going to rain soon!",
  },
  {
    file: "l12p3-rain-seq-05-hurry-inside.mp4",
    prompt:
      STYLE +
      " SHOT 5 — Students hurry toward school building entrance and stairs, carrying soccer or basketball, NO backpacks, overcast, urgent body language, NO spoken dialogue, only footsteps and ambient wind if any.",
  },
  {
    file: "l12p3-rain-seq-06-rain-windows.mp4",
    prompt:
      STYLE +
      " SHOT 6 — Classroom interior; heavy rain visible through windows; students just inside, relieved or shaking off wetness. " +
      "Soft English narrator line if voice present: Soon it started to rain outside the classroom windows.",
  },
  {
    file: "l12p3-rain-seq-07-jesse-asks.mp4",
    prompt:
      STYLE +
      " SHOT 7 — Boy Jesse in teal hoodie at desk turns toward doorway where wet classmates enter; Jesse looks puzzled and speaks. " +
      "Jesse asks in English: Why did you all come back so soon?",
  },
  {
    file: "l12p3-rain-seq-08-student-answers.mp4",
    prompt:
      STYLE +
      " SHOT 8 — Continuation: one wet classmate in raincoat at door answers Jesse while rain visible outside. " +
      "Student says clearly in English: Miss Li said it was going to rain.",
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

function isRetryableFetchError(e) {
  const code = e && e.cause && e.cause.code;
  if (code === "ECONNRESET" || code === "ETIMEDOUT" || code === "ECONNREFUSED" || code === "ENOTFOUND") return true;
  if (e && e.name === "TypeError" && String(e.message || "").includes("fetch")) return true;
  return false;
}

async function fetchWithRetry(url, init, label, attempts = 6) {
  let last;
  for (let a = 0; a < attempts; a++) {
    try {
      return await fetch(url, init);
    } catch (e) {
      last = e;
      if (a < attempts - 1 && isRetryableFetchError(e)) {
        const w = Math.min(12000, 1500 * Math.pow(2, a));
        console.warn(new Date().toISOString(), label, "网络异常，", w + "ms 后重试", a + 1 + "/" + attempts, String(e.cause && e.cause.code || e.message));
        await sleep(w);
        continue;
      }
      throw e;
    }
  }
  throw last;
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
        "on-screen text, subtitles, captions, watermark, logo, horror, blood, weapons, photorealistic gore, wrong number of arms, unreadable mouth",
    },
  };
  const res = await fetchWithRetry(
    url,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
        "x-goog-user-project": PROJECT,
      },
      body: JSON.stringify(body),
    },
    "predictLongRunning"
  );
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
  const res = await fetchWithRetry(
    url,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
        "x-goog-user-project": PROJECT,
      },
      body: JSON.stringify({ operationName }),
    },
    "fetchPredictOperation"
  );
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
    let attempt = 0;
    while (true) {
      try {
        last = await fetchOperation(token, opName);
        break;
      } catch (e) {
        attempt++;
        if (attempt >= 5 || !isRetryableFetchError(e)) throw e;
        const w = Math.min(10000, 2000 * attempt);
        console.warn(new Date().toISOString(), "轮询请求失败，", w + "ms 后重试", attempt, String(e.cause && e.cause.code || e.message));
        await sleep(w);
      }
    }
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

function localClipReady(destPath) {
  try {
    const st = fs.statSync(destPath);
    return st.isFile() && st.size > 8192;
  } catch (_) {
    return false;
  }
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
  const listPath = path.join(VERTEX_DIR, ".concat-l12p3-rain.txt");
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
  console.warn("ffmpeg -c copy 拼接失败，尝试 libx264 + aac 重编码…");
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
    "128k",
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
    console.error("L12P3_VEO_OUTPUT_GCS_URI 须为 gs:// 前缀");
    process.exit(1);
  }
  fs.mkdirSync(VERTEX_DIR, { recursive: true });

  const token = getAccessToken();
  const n = SCENES.length;
  console.log("项目:", PROJECT, "区域:", LOCATION, "模型:", MODEL);
  console.log("GCS 前缀:", STORAGE_URI);
  console.log("本地分镜目录:", VERTEX_DIR);
  console.log("断点续跑（跳过已存在分镜）:", SKIP_EXISTING ? "开启" : "关闭");

  const localPaths = [];
  for (let i = 0; i < SCENES.length; i++) {
    const sc = SCENES[i];
    const dest = path.join(VERTEX_DIR, sc.file);
    if (SKIP_EXISTING && localClipReady(dest)) {
      console.log("\n>>> 分镜", i + 1, "/", n, "·", sc.file, "— 已存在，跳过生成与下载");
      localPaths.push(path.resolve(dest));
      continue;
    }
    const gcs = await runOneScene(token, `分镜 ${i + 1}/${n} · ${sc.file}`, sc.prompt);
    if (!tryGsutilCopy(gcs, dest)) {
      console.error("gsutil 下载失败:", gcs, "->", dest);
      process.exit(2);
    }
    console.log("已保存:", dest);
    localPaths.push(path.resolve(dest));
  }

  const mergedLesson = path.join(ASSETS_ROOT, "l12p3-rain-story-video.mp4");
  if (tryConcatFfmpeg(localPaths, mergedLesson)) {
    console.log("\n已写入课件用视频:", mergedLesson);
  } else {
    console.warn("\n未检测到可用 ffmpeg；分镜文件保留在:", VERTEX_DIR);
    process.exit(3);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
