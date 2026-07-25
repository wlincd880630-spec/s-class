# 人教版初中教材词汇 · Word Park

仿照小学外研版 `Primary/School_textbook/Courseware` 结构重建：

- 单词学习（双图 + 音标 + 用法搭配 + 例句 + 跟读评估 + 描红）
- 抄写作业 / 听写纸
- 九大复习游戏 + 纸质练习
- 综合测试（朗读 / 英译中 / 中译英 / 拼写）

## 数据来源

由 `scripts/build-junior-wordpark.mjs` 从 `junior_vocab/{G7_B1|G7_B2|G8_B1|G8_B2|G9}/Unit*/Unit*.json` 生成各册 `assets/data/data.js`。

## 配图

- **G8_B1（八年级上）**：已用 Composer 2.5 全量重绘 **549** 张「达意、无文字、精美」释义配图，存放于 `junior_vocab/G8_B1/UnitN/images/*_1.jpg`
- 其他册：优先腾讯云 COS 已有配图；缺失时学习页自动生成 SVG 词卡兜底
- 构建脚本会优先使用本地 `images/` 文件，再回退 COS

重新生成课件数据：`node scripts/build-junior-wordpark.mjs`
