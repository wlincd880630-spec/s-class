# TED 音频与四课确认 — 给后续 AI 的摘要

## 背景

- **s-class** 里有 4 个 TED 课程 HTML：兵马俑、火药、学中文、长城。每个页面有视频（COS 的 `Video.mp4`）和段落/词汇音频（相对路径如 `audio/para_0.mp3`、`audio/w_0_life.mp3`）。
- 音频通过 `playAudio(url)` 播放。为实现「用网址访问时也能播」，已改为：**base 取自页面内第一个 `<video id="vid1">` 的 `src` 所在目录**（即 COS 上该课程目录），再拼上相对路径，例如 `base + 'audio/para_0.mp3'`。

## 已确认

- **长城**：用户已确认 COS 上该目录下有 `audio/` 且可播放；逻辑与代码一致。

## 待你确认（用户说的「其他的也要再次确认」）

对**另外 3 门课**（兵马俑、火药、学中文）做与长城相同的确认：

1. **COS 上是否有对应 audio/**  
   每门课在 COS 的路径与 HTML 里 `<video src="...">` 的目录一致，例如：  
   - 兵马俑：`.../TED/The_incredible_history_of_Chinas_terracotta_warriors_-_Megan_Campisi_and_Pen-Pen/`  
   - 火药：`.../TED/The_deadly_irony_of_gunpowder_-_Eric_Rosado/`  
   - 学中文：`.../TED/Learn_to_read_Chinese_with_ease_ShaoLan/`  
   需确认这些目录下存在 `audio/`，且内有 `para_0.mp3`、`para_1.mp3`、`w_0.mp3`、`w_0_vid.mp3`、`w_0_life.mp3` 等（以各 HTML 内 `D.reading` / `D.vocab` 引用为准）。

2. **若尚未上传**  
   需按各页 `D.reading`、`D.vocab` 中的 `audio` / `audio_vid_ex` / `audio_life_ex` 路径，在对应课程目录下生成并上传到 COS 的 `audio/`，与 `Video.mp4` 同目录。

3. **CORS**  
   若页面从其他域名打开，需在 COS 桶配置 CORS 允许该域名，否则浏览器会拦截音频请求。

## 文档与代码位置

- **检查清单（含四课 base 与示例 URL）**：`scripts/TED-音频视频地址检查.md` 第 6 节「四门课 COS 音频 Base 与待确认」。
- **4 个 TED HTML**：`TED/.../xxx.html`，`playAudio` 已统一为「从 video src 取 base，再拼相对路径」。

完成上述确认并保证 COS 上有对应 `audio/` 后，四门课在网址访问下应都能正常播放段落与词汇音频。
