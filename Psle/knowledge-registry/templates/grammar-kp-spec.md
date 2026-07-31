# 语法知识点课件规范（Wave 1）

## 单知识点交付清单
- `index.html` + `p01.html` … `p08.html`（8 页标准结构）
- `assets/kp-data.js` · `kp-corpus.js` · `kp-scenes.js` · `kp-img.js`
- 每知识点：≥8 条例句（daily_use + writing_use 各 ≥3）
- 互动：sound-first · socratic · discover/spelling · classify/be-match · quiz · listen-order · summary
- Azure TTS：`en-GB-RyanNeural`，rate `-20%`
- 真题溯源：`psle_refs` ≥1

## 页面类型
| 页 | type | 用途 |
|----|------|------|
| p01 | sound-first | 听音先行 |
| p02 | socratic | 苏格拉底提问 |
| p03 | discover | 规则发现 |
| p04 | classify / be-match | 分类/配对游戏 |
| p05 | spelling | 规则卡 |
| p06 | quiz | 限时快选 |
| p07 | listen-order | 听音排序 |
| p08 | summary | 写作句框 |

## 生成命令
```bash
node Grammar/kp-shared/gen-lesson.mjs Psle/knowledge-registry/wave1/lessons/G-comparative-than.json
```
