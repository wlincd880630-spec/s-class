# 人教版初中教材词汇 · Word Park

仿照小学外研版 `Primary/School_textbook/Courseware` 结构重建：

- 单词学习（双图 + 音标 + 用法搭配 + 例句 + 跟读评估 + 描红）
- 抄写作业 / 听写纸
- 九大复习游戏 + 纸质练习
- 综合测试（朗读 / 英译中 / 中译英 / 拼写）

## 数据来源

由 `scripts/build-junior-wordpark.mjs` 从 `junior_vocab/{G7_B1|G7_B2|G8_B1|G8_B2|G9}/Unit*/Unit*.json` 生成各册 `assets/data/data.js`。

## 配图

- 已有 COS 图：沿用 `junior_vocab/{册}/UnitN/images/{slug}_1.png` 等链接
- 缺失配图（如八年级上）：页面运行时自动生成 SVG 词卡，保证学习/游戏可用
- 重新生成课件：`node scripts/build-junior-wordpark.mjs`
