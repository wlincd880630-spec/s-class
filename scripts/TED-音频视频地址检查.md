# TED 项下 HTML 音频/视频播放地址检查

检查范围：`TED/**/*.html`（4 个文件）

---

## 1. 视频 (Video)

| 课程 | HTML 路径 | 视频地址 | 说明 |
|------|------------|----------|------|
| 兵马俑 | `The_incredible_history_of_Chinas_terracotta_warriors_.../The_Terracotta_Army_of_Emperor_Qin_Shi_Huang.html` | `https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/TED/The_incredible_history_of_Chinas_terracotta_warriors_-_Megan_Campisi_and_Pen-Pen/Video.mp4` | vid1/vid2/vid3 共用，COS 绝对地址 ✅ |
| 火药 | `The_deadly_irony_of_gunpowder_-_Eric_Rosado/The_Explosive_History_of_Gunpowder.html` | `https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/TED/The_deadly_irony_of_gunpowder_-_Eric_Rosado/Video.mp4` | COS 绝对地址 ✅ |
| 学中文 | `Learn_to_read_Chinese_with_ease_ShaoLan/Learn_to_Read_Chinese_with_Ease.html` | `https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/TED/Learn_to_read_Chinese_with_ease_ShaoLan/Video.mp4` | COS 绝对地址 ✅ |
| 长城 | `What_makes_the_Great_Wall_of_China_so_extraordinary_.../The_Great_Wall_of_China_A_Winding_History.html` | `https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/TED/What_makes_the_Great_Wall_of_China_so_extraordinary_-_Megan_Campisi_and_Pen-Pen_/Video.mp4` | COS 绝对地址 ✅ |

结论：**视频全部使用 COS 完整 URL，播放地址正确。**

---

## 2. 段落朗读 (Reading 段落旁喇叭)

| 课程 | 调用方式 | 地址示例 | 说明 |
|------|----------|----------|------|
| 兵马俑 | `onclick="playAudio('audio/para_0.mp3')"` | `audio/para_0.mp3`, `audio/para_1.mp3` | **相对路径**（相对该 HTML 所在目录） |
| 火药 | 同上 | `audio/para_0.mp3`, `audio/para_1.mp3` | **相对路径** |
| 学中文 | 同上 | `audio/para_0.mp3`, `audio/para_1.mp3` | **相对路径** |
| 长城 | 同上 | `audio/para_0.mp3`, `audio/para_1.mp3` | **相对路径** |

结论：**段落 MP3 均为相对路径**。若通过 `file://` 或从其他域名打开页面，会 404；若从站点同源打开（如 `https://xxx/s-class/TED/.../xxx.html`），则请求为 `https://xxx/s-class/TED/.../audio/para_0.mp3`，需确保该路径下确有对应文件或已部署到 COS 且用同一 base path。

---

## 3. 词汇/例句音频 (Vocab 单词与例句)

数据在页面内 `const D = { ..., "reading": [...], "vocab": [...] }` 中：

- **词汇发音**：`vocab[].audio`，如 `audio/w_0.mp3`, `audio/w_1.mp3`, ...
- **例句（视频/生活）**：`vocab[].audio_vid_ex`, `vocab[].audio_life_ex`，如 `audio/w_0_vid.mp3`, `audio/w_0_life.mp3`

四个 HTML 中这些字段均为 **相对路径**（如 `audio/w_0.mp3`），由 `playAudio(url)` 直接播放。

结论：**词汇与例句 MP3 也全是相对路径**，与段落音频一致，依赖页面所在目录下的 `audio/` 文件夹。

---

## 4. 汇总与建议

| 类型 | 当前写法 | 建议 |
|------|----------|------|
| 视频 | COS 完整 URL | 无需改 |
| 段落 MP3 | 相对路径 `audio/para_*.mp3` | 若部署到 COS 或跨域访问，建议改为带 `MEDIA_BASE` 或 COS 前缀的完整 URL |
| 词汇/例句 MP3 | 相对路径 `audio/w_*.mp3` 等 | 同上 |

若希望「任意环境下都能播」，可在页面中统一设置 `MEDIA_BASE`（或 TED 专用 base），将 `playAudio(url)` 改为 `playAudio((window.TED_MEDIA_BASE || '') + url)`，并在发布时把各课程下的 `audio/` 上传到 COS，且设置 `TED_MEDIA_BASE` 为对应 COS 前缀。

---

---

## 5. 无法播放的原因（已确认）

- **项目里没有音频文件**：TED 下各课程目录中**不存在 `audio/` 文件夹**，也没有任何 `para_0.mp3`、`para_1.mp3`、`w_0.mp3` 等文件。页面请求 `audio/para_0.mp3` 时会 404，所以段落朗读和词汇发音都无法播放。
- **视频**：若视频也无法播放，可能是 COS 上该路径没有 `Video.mp4`，或网络/CORS 问题。

**已做修改**：四个 TED HTML 中的 `playAudio` 已改为「相对路径自动加上 base」：base 取自页面内第一个 `<video>` 的 `src` 所在目录（与 COS 路径一致），这样一旦在 COS 对应目录下上传了 `audio/` 里的 mp3，即可正常播放。

**你需要做的**：
1. 在各 TED 课程目录下**准备或生成**音频：`audio/para_0.mp3`、`audio/para_1.mp3`，以及词汇用 `audio/w_0.mp3`、`audio/w_0_vid.mp3`、`audio/w_0_life.mp3` 等（具体以各页 D.reading / D.vocab 中的字段为准）。
2. 若部署在 COS：把上述 `audio/` 文件夹上传到与 Video.mp4 **同一目录**下（例如 `TED/课程文件夹/audio/`），与视频同域即可。
3. 若仅本地：把 `audio/` 放在各课程 HTML 同级目录下，用同一域名/路径打开页面即可。

---

## 6. 四门课 COS 音频 Base 与待确认

`playAudio` 的 base = 页面内第一个 `<video id="vid1">` 的 `src` 去掉文件名后的目录。相对路径如 `audio/para_0.mp3` 会拼成「base + audio/para_0.mp3」。以下为每门课**预期请求的 COS 音频地址**，便于在 COS 控制台或浏览器中逐课核对。

| 课程 | COS 音频 Base（与 Video.mp4 同目录） | 示例：段落 | 示例：词汇/例句 | 确认状态 |
|------|--------------------------------------|------------|-----------------|----------|
| **长城** | `https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/TED/What_makes_the_Great_Wall_of_China_so_extraordinary_-_Megan_Campisi_and_Pen-Pen_/` | `.../audio/para_0.mp3` | `.../audio/w_0_life.mp3` | ✅ 已确认可播 |
| **兵马俑** | `https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/TED/The_incredible_history_of_Chinas_terracotta_warriors_-_Megan_Campisi_and_Pen-Pen/` | `.../audio/para_0.mp3` | `.../audio/w_0_life.mp3` | ⬜ 待确认 |
| **火药** | `https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/TED/The_deadly_irony_of_gunpowder_-_Eric_Rosado/` | `.../audio/para_0.mp3` | `.../audio/w_0_life.mp3` | ⬜ 待确认 |
| **学中文** | `https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/TED/Learn_to_read_Chinese_with_ease_ShaoLan/` | `.../audio/para_0.mp3` | `.../audio/w_0_life.mp3` | ⬜ 待确认 |

**待确认项（兵马俑、火药、学中文）**：在 COS 上该课程目录下是否存在与长城相同的结构——即与 `Video.mp4` 同目录下有 `audio/` 文件夹，且内含 `para_0.mp3`、`para_1.mp3`、`w_0.mp3`、`w_0_vid.mp3`、`w_0_life.mp3` 等（具体以各 HTML 内 `D.reading` / `D.vocab` 中引用为准）。若存在且 CORS 允许当前访问域名，用网址打开对应 HTML 时音频应能正常播放。

---

*检查时间：按当前仓库文件生成。*
