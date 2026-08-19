#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""统一 G7_B1 各 Unit 页的 Azure 语音配置（与 G7_B2 一致）。"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
G7 = ROOT / "junior_vocab" / "G7_B1"

OLD_KEY = "9wqQjcwatmfHXVoMv9nO6I2teZBS6LSZL6ROW85tO6fL4ahKjsIaJQQJ99CHACqBBLyXJ3w3AAAYACOGvelV"
NEW_KEY = "9wqQjcwatmfHXVoMv9nO6I2teZBS6LSZL6ROW85tO6fL4ahKjsIaJQQJ99CHACqBBLyXJ3w3AAAYACOGvelV"

OLD_INIT = """async function initSpeech() {
  try {
  speechConfig = SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
  speechConfig.speechRecognitionLanguage = "en-GB";
  synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
  } catch(e) { console.warn("Speech init:", e); }
}"""

NEW_INIT = """async function initSpeech() {
  try {
    if (typeof SpeechSDK === "undefined") throw new Error("Speech SDK 未加载，请检查网络");
    speechConfig = SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
    speechConfig.speechRecognitionLanguage = "en-GB";
    synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
  } catch (e) {
    console.warn("Speech init:", e);
    alert("语音服务初始化失败，朗读评分不可用：" + (e.message || e));
  }
}"""

OLD_REC_ERR = """  rec.startContinuousRecognitionAsync(()=>{}, err=>{
    isRecording=false; btn.classList.remove("recording"); btn.innerHTML='<i class="fas fa-microphone"></i> 朗读评分';
    console.error(err);
  });"""

NEW_REC_ERR = """  rec.startContinuousRecognitionAsync(()=>{}, err=>{
    isRecording=false; btn.classList.remove("recording"); btn.innerHTML='<i class="fas fa-microphone"></i> 朗读评分';
    console.error(err);
    alert("无法启动英语语音识别：" + (err?.message || err));
  });"""

OLD_TRANS_ERR = """  rec.startContinuousRecognitionAsync(
    () => {},
    e => {
      transRecording = false;
      btn.innerHTML = '<i class="fas fa-microphone"></i> 朗读中文翻译';
      btn.classList.remove("recording");
      console.error("start err:", e);
    }
  );"""

NEW_TRANS_ERR = """  rec.startContinuousRecognitionAsync(
    () => {},
    e => {
      transRecording = false;
      btn.innerHTML = '<i class="fas fa-microphone"></i> 朗读中文翻译';
      btn.classList.remove("recording");
      console.error("start err:", e);
      alert("无法启动中文语音识别：" + (e?.message || e));
    }
  );"""


def patch_file(fp: Path) -> bool:
    text = fp.read_text(encoding="utf-8")
    orig = text
    text = text.replace(f'const AZURE_KEY    = "{OLD_KEY}";', f'const AZURE_KEY    = "{NEW_KEY}";')
    text = text.replace('const AZURE_REGION = "southeastasia";', 'const AZURE_REGION = "southeastasia";')
    text = text.replace(OLD_INIT, NEW_INIT)
    text = text.replace(OLD_REC_ERR, NEW_REC_ERR)
    text = text.replace(OLD_TRANS_ERR, NEW_TRANS_ERR)
    if text != orig:
        fp.write_text(text, encoding="utf-8", newline="\n")
        return True
    return False


def main() -> None:
    n = 0
    for i in range(1, 8):
        fp = G7 / f"Unit{i}" / f"Unit{i}.html"
        if fp.exists() and patch_file(fp):
            print("patched", fp.relative_to(ROOT))
            n += 1
    print(f"Done. {n} file(s) updated.")


if __name__ == "__main__":
    main()
