# 人教版初中教材词汇 · Word Park

仿照小学外研版 `Primary/School_textbook/Courseware` 结构重建：

- 单词学习（双图 + 音标 + 用法搭配 + 例句 + 跟读评估 + 描红）
- 抄写作业 / 听写纸
- 九大复习游戏 + 纸质练习
- 综合测试

## 配图（Composer 2.5 全量重绘）

全部 **2368** 词（含 G9 后补词双图）均已用 Composer 2.5 生成「达意、精美、无文字」释义配图（JPEG）：

| 册别 | 词数 | 路径 |
|------|------|------|
| G7_B1 七年级上 | 313 | `junior_vocab/G7_B1/UnitN/images/*_1.jpg` |
| G7_B2 七年级下 | 475 | `junior_vocab/G7_B2/UnitN/images/*_1.jpg` |
| G8_B1 八年级上 | 549 | `junior_vocab/G8_B1/UnitN/images/*_1.jpg` |
| G8_B2 八年级下 | 606 | `junior_vocab/G8_B2/UnitN/images/*_1.jpg` |
| G9 九年级（旧全一册） | 563 | `junior_vocab/G9/UnitN/images/*_{1,2}.jpg` |
| G9_B1 九年级上（2024 新版） | 453 | 新词复用已有配图；缺图由课件 SVG 词卡兜底 |

构建：`node scripts/build-junior-wordpark.mjs`  
压缩：`python3 scripts/compress-junior-vocab-images.py`
