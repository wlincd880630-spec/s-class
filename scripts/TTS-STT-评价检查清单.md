# TTS / STT / 翻译·发音评价 检查清单

本文档记录 s-class 项目中 **Azure TTS、Azure STT、翻译与发音 AI 评价** 的接入状态与回退策略，便于后续维护与扩展。

---

## 1. 公共脚本

| 脚本 | 用途 | 说明 |
|------|------|------|
| `scripts/pet-speech-helper.js` | PET 词汇课 01–08 | 提供 `PetSpeech.playTTS(key, region, text)`、`PetSpeech.createRecognizer(key, region, text, onScore)`；Azure 不可用时回退到浏览器 TTS/STT。 |
| `scripts/pet-passage-speech.js` | PET Unit*_passage | 提供 `window.azureSpeak(text, opts)`、`window.azureRecognizeOnce(locale, onResult, onError, opts)`；Azure 失败时自动用浏览器 TTS/STT。 |
| `js/api-config.js` | 可选 | 提供基于 DeepSeek 的 `callAI()`，供需要统一 AI 调用的页面使用。 |

**密钥约定**（可被 `window` 覆盖）：

- PET 词汇课：页面内 `AZURE_KEY`、`AZURE_REGION`（如 southeastasia）。
- PET passage：`pet-passage-speech.js` 内默认 Azure 密钥，或 `window.PET_AZURE_KEY`、`window.PET_AZURE_REGION`；评价用 `window.PET_DEEPSEEK_KEY` 或页面内 `DEEPSEEK_KEY`。

---

## 2. PET 词汇实验室（01–36）

| 范围 | TTS/STT | 评价 | 备注 |
|------|---------|------|------|
| **01–08** | ✅ 已接 `pet-speech-helper.js`（PetSpeech + 浏览器回退） | 无 AI 评价（仅发音分） | 变量统一为 `recInstance`，无裸 `synthesizer`/`recognizer`。 |
| **09–36** | ⚠️ 仍为裸 Azure SpeechSDK | 无 AI 评价 | 未接 PetSpeech，无浏览器回退；可按 01–08 方式逐步替换。 |

---

## 3. PET Unit*_passage（Unit1–Unit18）

| 范围 | TTS/STT | 评价 | 备注 |
|------|---------|------|------|
| **Unit1–Unit18** | ✅ 已接 `pet-passage-speech.js`（azureSpeak / azureRecognizeOnce + 浏览器回退） | ✅ 页面内直接请求 DeepSeek（`evaluate()` 用 `fetch("https://api.deepseek.com/chat/completions", ...)`） | 不依赖 `window.callAI`，带 `DEEPSEEK_KEY`。 |

---

## 4. 其他模块（当前未统一回退）

以下模块仍使用 **裸 Azure SpeechSDK** 或自有逻辑，未接入上述 helper，错误或网络问题时无浏览器 TTS/STT 回退：

- **AEIS** P01–P34：词汇页 TTS/STT
- **TED**：部分页 TTS/STT
- **FU2 / FU3**：部分页 TTS/STT
- **CEE**（cloze/wordform）：仅 TTS/STT，报告已含点读查词与朗读翻译评价（DeepSeek）
- **PET-exam** Reading player 等

后续若需「全站可用」体验，可对上述模块按需接入 `pet-speech-helper.js` 或 `pet-passage-speech.js`，或至少增加错误提示与重试。

---

## 5. 快速核对命令

在项目根目录下可快速确认接入情况：

```bash
# 已接 pet-speech-helper 的 PET 词汇课
rg -l "pet-speech-helper" PET/

# 已接 pet-passage-speech 的 Unit*_passage
rg -l "pet-passage-speech" PET/

# 仍使用裸 SpeechSDK 的 passage（应无结果，已全部接入）
rg "SpeechSDK\.SpeechConfig" PET/Unit*_passage/
```

---

## 6. 更新记录

- **2025-02**：PET 05–08 接入 `pet-speech-helper.js`；Unit9–Unit18 passage 接入 `pet-passage-speech.js`，TTS/STT 与 Unit1–8 一致并带浏览器回退；本文档初版。
