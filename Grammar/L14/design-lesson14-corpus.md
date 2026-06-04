# Lesson 14 · 被动语态 · 语料整合报告

**版本**：v3.2（将来/完成被动拓展 + Page 12 专讲）  
**整合日期**：2026-05  
**实现文件**：`l14-corpus-pool.js?v=5` + `L14Corpus.enrichPageQuizzes` / `getPage10` / `getPage12`

**来源目录**：`2026暑期/初中教材` · `2026暑期/成都中考真题` · `2026暑期/初中英语教学纲要`

---

## 一、v3.1 扩充原则

| 原则 | 说明 |
|------|------|
| **去重复** | 拉链、茶叶、杭州种茶不再每页反复；每页 ≤1 次作「锚点」 |
| **主题轮转** | Unit 5 手工艺 · Unit 6 发明 · Unit 7 规则 · Unit 13 环保 · 学校/考试场景 |
| **六层难度** | `TIER_A`～`D` + **`TIER_E`（将来）** + **`TIER_F`（完成）** |
| **各页测验池** | `PAGE_QUIZZES.page02`～`page08`、`page12` 经 `enrichPageQuizzes` / `getPage12` 注入 |
| **当堂测** | `getPage10()`：64 题核心 + 将来 10 + 完成 8 = **82 题** |
| **拓展讲练** | `lesson14-page12-future-perfect.html`：17 屏 · 六测验 + 抢答竞赛 |

---

## 二、教学纲要（人教版九年级全）

### 2.1 课标定位

- 与宾语从句、定语从句、过去完成时等并列为九年级核心语法。
- **难点**：漏 `be`；主谓一致；时态与情态被动转换；语境（强调承受者、施事不明）。
- **中考**：语法填空常考动词形式（含语态）；完形亦涉被动结构。

### 2.2 分单元地图（L14 课件对应）

| 单元 | 被动类型 | 教材典型句（v2 轮换） | L14 页面 |
|------|----------|----------------------|----------|
| Unit 5 | 一般现在 `am/is/are + done` | Sky lanterns **are made of** bamboo. / Ring **was made in** Thailand. | 01, 02, 07, 08① |
| Unit 6 | 一般过去 `was/were + done` | Telephone **was invented** in 1876. / Chips **were invented** by mistake. | 03, 05, 08② |
| Unit 7 | 情态 `should/may be allowed to` | **may be allowed to** take photos… / **should not be allowed to** drive | 01, 06, 08③ |
| Unit 13 | 综合运用 | The air **is badly polluted**. / Trees **should be planted**. | 08③, 11 |

---

## 三、扩充语料库编号（`l14-corpus-pool.js`）

### 3.1 Unit 5 · 手工艺与产地（15 条）

| # | 英文 | 中文 | 用途页 |
|---|------|------|--------|
| U5-01 | Sky lanterns are made of bamboo and paper. | 天灯竹纸制成 | 01, 08 |
| U5-02 | Paper is folded before it is cut. | 纸折后剪 | 01, 03, 08 |
| U5-03 | Clay is shaped by hand. | 泥塑手工塑形 | 01, 03 |
| U5-04 | This ring is made of silver; it was made in Thailand. | 银戒泰国造 | 01, 04, 05 |
| U5-05 | Mobile phones are made in factories. | 手机工厂造 | 01, 03, 09 |
| U5-06 | Kites are made by hand in Weifang. | 潍坊风筝 | 03, 04 |
| U5-07 | The model plane is made of wood and glass. | 模型飞机材料 | 07, 10 |
| U5-08 | Wine is produced from grapes. | 葡萄酒 from | 07 |
| U5-09 | Tea leaves are picked by hand. | 茶手工采（锚点） | 02 提及 |
| U5-10 | Many toys are made in China. | 玩具中国造 | 08 旧版保留概念 |

### 3.2 Unit 6 · 发明史（12 条）

| # | 英文 | 中文 | 用途页 |
|---|------|------|--------|
| U6-01 | The telephone was invented by Bell in 1876. | 电话 1876 | 01, 04, 05, 08 |
| U6-02 | Potato chips were invented by mistake in 1853. | 薯片偶然 | 01, 03, 05, 08 |
| U6-03 | Basketball was invented by Naismith in 1891. | 篮球 | 03, 05 |
| U6-04 | Printing was invented in China. | 印刷术 | 04, 05, 08 |
| U6-05 | The bridge was built last year. | 桥去年 | 03, 05 |
| U6-06 | This pen was invented by Liu Jie. | 刘杰钢笔 | 03, 05 |
| U6-07 | The zipper was invented by Judson in 1893. | 拉链（锚点） | 02 教材原句 |
| U6-08 | Tea was discovered by accident. | 茶偶然发现 | 05 锚点 |

### 3.3 Unit 7 + Unit 13 + 中考（12 条）

| # | 英文 | 中文 |
|---|------|------|
| U7-01 | Teenagers should be allowed to choose clothes. | 应允许选衣 |
| U7-02 | Sixteen-year-olds should not be allowed to drive. | 不应允许开车 |
| U7-03 | We may be allowed to take photos in the museum. | 或许可拍照 |
| U7-04 | Peter should be allowed to take the test later. | Peter 补考 |
| U13-01 | The air is badly polluted. | 空气被污染 |
| U13-02 | Trees should be planted. | 应植树 |
| U13-03 | Public transportation should be used more. | 多用公交 |
| EX-01 | Eyes may be hurt by strong light. | 2021 成都 |
| EX-02 | Houses are made of wood. | 2021 成都 |

---

## 四、转换题（Page 03 · 13 题 · v2）

| # | 主动 | 被动答案 |
|---|------|----------|
| 1 | They make kites by hand in Weifang. | Kites are made by hand in Weifang. |
| 2 | People fold paper before they cut it. | Paper is folded before it is cut. |
| 3 | They make mobile phones in factories. | Mobile phones are made in factories. |
| 4 | George Crum invented potato chips. | Potato chips were invented by George Crum. |
| 5 | Bell invented the telephone. | The telephone was invented by Bell. |
| 6 | They built the bridge last year. | The bridge was built last year. |
| 7 | Naismith invented basketball. | Basketball was invented by Naismith. |
| 8 | Students should finish homework on time. | Homework should be finished on time. |
| 9 | The teacher allows Peter to take the test later. | Peter should be allowed to take the test later. |
| 10 | Workers shape clay by hand. | Clay is shaped by hand. |
| 11 | Liu Jie invented this pen. | This pen was invented by Liu Jie. |
| 12 | People pollute the air in big cities. | The air is polluted in big cities. |
| 13 | They made this ring in Thailand. | This ring was made in Thailand. |

---

## 五、三篇语篇（Page 08 · v2）

| 篇名 | 主题 | 核心被动块 |
|------|------|------------|
| 传统手工艺 | 天灯/剪纸/泥塑 | are made of · is folded · is shaped · are sent |
| 发明馆 | 电话/薯片/篮球/印刷 | was invented by · were invented by mistake · was invented for · was invented in China |
| 规则与环保 | Unit 7 + 13 | should not be allowed · may be allowed · is polluted · should be planted |

---

## 六、分层练习 / 当堂测（Page 09–10）

- **Page 09**（5 屏）：A 12 · B 12 · C 8 · D 6 = **38 题**（`sliceTier`）
- **Page 10**（6 节）：`L14Corpus.getPage10()` 共 **64 题**，无重复选项/拼写错误

### 6.1 接入方式（Page 02–08）

```javascript
const P14 = L14Corpus.enrichPageQuizzes("page02", {
  goals: [ /* 本页非测验数据 */ ],
  // quizBe / quizPp … 由语料池覆盖
});
```

### 6.2 测验引擎（Page 01–08）

- 共用 `l14-quiz-engine.js`：**仅进入测验屏时** `onEnter()` 才启动 8 秒计时，离开屏 `onLeave()` 清除，避免后台误标「已做」。
- 进度键：`localStorage` · `l14-progress:lesson14-page0X` · `progress.quizzes` 保存每题作答。
- Page 05 模式 E 支持听音/4c 切换：`reloadItems()` 换题池并重置圆点。

### 6.3 题库规模（`l14-corpus-pool.js`）

| 池 | 约题量 | 用途 |
|----|--------|------|
| TIER_A | 24 | 构成 · Page 09 A / Page 10 第一节 |
| TIER_B | 20 | 转换 · Page 09 B / Page 10 第二节 |
| TIER_C | 14 | 汉译英 · Page 09 C |
| TIER_D | 10 | 易错 · Page 09 D |
| QUIZ_MIX | 28 | 跨单元综合 |
| PAGE_QUIZZES | 各页 5～12 题/模式 | Page 02–08 五种测验 |

---

## 七、成都中考 HTML（2018–2025）

**检索**：全文无「被动语态」语法专题标注。

**可改编为语篇/选项的被动结构（非专项考点）**

| 文件 | 摘录 | 用途 |
|------|------|------|
| 2021成都中考.html | may **be hurt** badly by the strong light | TIER_A / QUIZ_MIX |
| 2021 | houses **made of** wood | made of 词汇 |
| 2019 | unless you **are allowed to** | 情态+被动含义 |
| 2020 | wish to **be done** to you | 名言译文 |

---

## 八、主题与难度校验

| 维度 | 标准 | L14 v2 符合 |
|------|------|-------------|
| 语法范围 | 一般现在/过去被动 + 情态被动 | ✓ |
| 词汇 | 九年级 Unit 5～7 词表 + 拓展 | ✓ |
| 语料多样性 | 每页主题错开，锚点例 ≤1 | ✓ |
| 拓展（预习） | 一般将来被动 `will be + done`、现在完成被动 `have/has been + done` | Page 01 闸门 · 12 · 09 E/F · 10 · 11 |
| 课时 | 3 小时核心 + 可选 0.5～1h Page 12 | ✓ |

---

## 九、v3.2 · 将来 & 完成被动分布

| 页面 | 内容 |
|------|------|
| **Page 01** | `passiveFormMatrix` 五种时态（含 future / present-perfect）；对比句 2 条 |
| **Page 02** | 朗读预习 2 句；小结芯片 |
| **Page 08** | 第四篇语篇「将来与完成」+ 配对 4 组 |
| **Page 12** | 17 屏专讲：时间轴、苏格拉底、拼装、When will、朗读、测验 A–F、抢答、易错 |
| **Page 09** | E 层 8 题（`TIER_E`）· F 层 8 题（`TIER_F`） |
| **Page 10** | 将来专节 10 题 · 完成专节 8 题 |
| **Page 11** | 讲义 ⑧⑨ 节 + 故事 D + 默写 2 句 |

**学习路径**：Page 08 → **Page 12** → Page 09 → Page 10 → Page 11

---

*本文件为教研归档；课件实现以 `l14-corpus-pool.js` 与各页 HTML 内 `P14` 为准。*
