# 三年级上册英语单词互动课件

外研版小学英语（三年级起点）三年级上册 · 新版

## 文件结构

```
Courseware/3GA/
├── index.html          # 导航主页
├── learn.html          # 单词学习
├── review-game1~6.html # 六个复习游戏
├── test.html           # 综合测试
├── assets/data/data.js # 207 个单词数据
└── scripts/            # 数据生成脚本
```

## 使用方式

用浏览器直接打开 `index.html`（推荐 Chrome / Edge）

## 单元说明

| 单元 | 主题 | 词数 |
|------|------|------|
| Welcome | 走进校园 | 28 |
| Unit 1 | 交朋友 | 40 |
| Unit 2 | 我的学习用品 | 29 |
| Unit 3 | 多彩世界 | 28 |
| Unit 4 | 数字乐趣 | 28 |
| Unit 5 | 一家人 | 21 |
| Unit 6 | 甜蜜的家 | 33 |

## 数据更新

```bash
python Courseware/3GA/scripts/generate_textbook_sentences.py
python Courseware/3GA/scripts/generate_context_sentences.py
python Courseware/3GA/scripts/generate_phonemes.py
python Courseware/3GA/scripts/generate_data.py
```
