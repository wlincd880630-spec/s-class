#!/usr/bin/env node
/**
 * 修复 junior_vocab/G8_B1 发音按钮与朗读评分：
 * - 更新 Azure 密钥与区域（与 G7_B1 / G8_B2 一致）
 * - 合成器绑定扬声器输出
 * - 本地 MP3 → COS → Azure TTS → 浏览器朗读 多级回退
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const G8_B1 = path.join(ROOT, "junior_vocab", "G8_B1");

const OLD_KEY = "43gMKIlSRVGT9PnAFgWkdXyogwXfudT33O2Zk6QtfTKuY1nm01BdJQQJ99BLACHYHv6XJ3w3AAAYACOGts5S";
const NEW_KEY = "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu";

const OLD_INIT = `async function initSpeech() {
  try {
  speechConfig = SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
  speechConfig.speechRecognitionLanguage = "en-US";
  synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
  } catch(e) { console.warn("Speech init:", e); }
}`;

const NEW_INIT = `async function initSpeech() {
  try {
    if (typeof SpeechSDK === "undefined") throw new Error("Speech SDK 未加载，请检查网络");
    speechConfig = SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
    speechConfig.speechRecognitionLanguage = "en-US";
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
    if (SpeechSDK.SpeechSynthesisOutputFormat && SpeechSDK.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3 != null)
      speechConfig.speechSynthesisOutputFormat = SpeechSDK.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;
    var audioConfig = null;
    if (typeof SpeechSDK.SpeakerAudioDestination !== "undefined") {
      var player = new SpeechSDK.SpeakerAudioDestination();
      audioConfig = SpeechSDK.AudioConfig.fromSpeakerOutput(player);
    } else if (SpeechSDK.AudioConfig && SpeechSDK.AudioConfig.fromDefaultSpeakerOutput) {
      audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    }
    synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
  } catch (e) {
    console.warn("Speech init:", e);
    alert("语音服务初始化失败，朗读评分不可用：" + (e.message || e));
  }
}`;

const PLAY_AUDIO_HELPER = `function playAudioPath(path, fallbackText) {
  if (!path && fallbackText) { speakWord(fallbackText); return; }
  const urls = [];
  if (path) {
    if (path.startsWith("http")) urls.push(path);
    else {
      const rel = path.replace(/^Unit\\d+\\/?/, "");
      if (rel) urls.push(rel);
      const cos = mediaUrl(path);
      if (cos && urls.indexOf(cos) < 0) urls.push(cos);
    }
  }
  let i = 0;
  function tryNext() {
    if (i >= urls.length) { if (fallbackText) speakWord(fallbackText); return; }
    const a = new Audio(urls[i++]);
    a.play().catch(tryNext);
  }
  tryNext();
}
`;

const OLD_PLAY_WORD = `function playWord() {
  const w = allWords[wordIndex];
  if (!w) return;
  if (w.audio) { new Audio(mediaUrl(w.audio)).play().catch(()=>{}); return; }
  synthesizer?.speakTextAsync(w.word, ()=>{}, e=>console.error(e));
}`;

const NEW_PLAY_WORD = `function playWord() {
  const w = allWords[wordIndex];
  if (!w) return;
  playAudioPath(w.audio, w.word);
}`;

const OLD_SPEAK_WORD = `function speakWord(word) {
  if (!synthesizer) { alert("语音服务未初始化"); return; }
  const w = String(word || "").trim();
  if (!w) return;
  synthesizer.speakTextAsync(w, ()=>{}, e=>console.error("TTS:", e));
}`;

const NEW_SPEAK_WORD = `function speakWord(word) {
  const w = String(word || "").trim();
  if (!w) return;
  function fallbackWebSpeech() {
    if ("speechSynthesis" in window) {
      var u = new SpeechSynthesisUtterance(w);
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    }
  }
  if (!synthesizer) { fallbackWebSpeech(); return; }
  synthesizer.speakTextAsync(w, function(result) {
    if (result && SpeechSDK.ResultReason.Canceled === result.reason && SpeechSDK.CancellationDetails) {
      var d = SpeechSDK.CancellationDetails.fromResult(result);
      if (d.reason === SpeechSDK.CancellationReason.Error) { console.warn("TTS Error:", d.errorDetails); fallbackWebSpeech(); }
    }
  }, function(e) { console.error("TTS:", e); fallbackWebSpeech(); });
}`;

const OLD_PLAY_EX = `  window.playExample=(i)=>{
    const ww=allWords[wordIndex];
    const aud=i===0?ww.audio_ex0:ww.audio_ex1;
    if(aud){new Audio(mediaUrl(aud)).play().catch(()=>{}); return;}
    const en=(ww.examples||[])[i]?.en||"";
    if(en&&synthesizer) synthesizer.speakTextAsync(en,()=>{},e=>console.error(e));
  };`;

const NEW_PLAY_EX = `  window.playExample=(i)=>{
    const ww=allWords[wordIndex];
    const aud=i===0?ww.audio_ex0:ww.audio_ex1;
    const en=(ww.examples||[])[i]?.en||"";
    playAudioPath(aud, en);
  };`;

const OLD_P1_REC_ERR = `  rec.startContinuousRecognitionAsync(()=>{}, err=>{
    isRecording=false; btn.classList.remove("recording"); btn.innerHTML='<i class="fas fa-microphone"></i> 朗读评分';
    console.error(err);
  });`;

const NEW_P1_REC_ERR = `  rec.startContinuousRecognitionAsync(()=>{}, err=>{
    isRecording=false; btn.classList.remove("recording"); btn.innerHTML='<i class="fas fa-microphone"></i> 朗读评分';
    console.error(err);
    alert("无法启动英语语音识别：" + (err?.message || err));
  });`;

const OLD_EX_REC_ERR = `    rec.startContinuousRecognitionAsync(()=>{}, (err)=>{
      btn.dataset.rec="0"; btn.innerHTML='<i class="fas fa-microphone"></i>';
      if(window._exRec) delete window._exRec[j];
      console.error(err);
    });`;

const NEW_EX_REC_ERR = `    rec.startContinuousRecognitionAsync(()=>{}, (err)=>{
      btn.dataset.rec="0"; btn.innerHTML='<i class="fas fa-microphone"></i>';
      if(window._exRec) delete window._exRec[j];
      console.error(err);
      alert("无法启动例句朗读评分：" + (err?.message || err));
    });`;

function patchFile(fp) {
  let s = fs.readFileSync(fp, "utf8");
  const orig = s;
  s = s.replace(new RegExp(`const AZURE_KEY\\s*=\\s*"${OLD_KEY.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}";`), `const AZURE_KEY    = "${NEW_KEY}";`);
  s = s.replace(/const AZURE_REGION\s*=\s*"eastus2";/, 'const AZURE_REGION = "southeastasia";');
  if (!s.includes("SpeakerAudioDestination")) {
    s = s.replace(
      /async function initSpeech\(\)\s*\{[\s\S]*?\n\}/,
      NEW_INIT
    );
  }
  if (!s.includes("function playAudioPath(")) {
    s = s.replace(
      /function playWord\(\)\s*\{[\s\S]*?synthesizer\?\.speakTextAsync\(w\.word[\s\S]*?\n\}/,
      PLAY_AUDIO_HELPER + NEW_PLAY_WORD
    );
  }
  if (!s.includes("fallbackWebSpeech")) {
    s = s.replace(
      /function speakWord\(word\)\s*\{[\s\S]*?\n\}/,
      NEW_SPEAK_WORD
    );
  }
  s = s.replace(
    /window\.playExample=\(i\)=>\{[\s\S]*?if\(en&&synthesizer\) synthesizer\.speakTextAsync\(en[\s\S]*?\};/,
    NEW_PLAY_EX
  );
  if (!s.includes("无法启动英语语音识别")) {
    s = s.replace(
      /rec\.startContinuousRecognitionAsync\(\(\)=>\{\}, err=>\{[\s\S]*?console\.error\(err\);\s*\}\);/,
      NEW_P1_REC_ERR
    );
  }
  if (!s.includes("无法启动例句朗读评分")) {
    s = s.replace(
      /rec\.startContinuousRecognitionAsync\(\(\)=>\{\}, \(err\)=>\{[\s\S]*?console\.error\(err\);\s*\}\);/,
      NEW_EX_REC_ERR
    );
  }
  if (s !== orig) {
    fs.writeFileSync(fp, s, "utf8");
    return true;
  }
  return false;
}

function main() {
  let n = 0;
  const files = [path.join(G8_B1, "pep_vocab_learn.html")];
  for (let u = 1; u <= 8; u++) files.push(path.join(G8_B1, `Unit${u}`, `Unit${u}.html`));
  for (const fp of files) {
    if (!fs.existsSync(fp)) continue;
    if (patchFile(fp)) {
      console.log("patched:", path.relative(ROOT, fp));
      n++;
    }
  }
  console.log(`Done. ${n} file(s) updated.`);
}

main();
