# 定语从句（L13-定语从句）· 课程说明

## 教学思路（不变）

**主线课件** `课件Demo_Lesson_Relative_Clause_01~03.html` 保持原有设计：

1. **引导**：`guide-hidden` 分步呈现，学生先观察再命名  
2. **思考**：苏格拉底式提问（问题 → 显示答案）  
3. **对比**：中英文语序、两组句子对比、宾语/状语辨析  
4. **教师演示**：融合四/八步、播放、显示答案、重播本页引导  

每页按钮：**显示下一步** · **重播本页引导** · **上一页 / 下一页**（朗读需点句旁「朗读」）

## 目录结构

| 序号 | 类型 | 说明 |
|------|------|------|
| 01–06 | 课件 + 练习 | 原主线（who/whom → which → prep+when/where） |
| 07–08 | 讲义 | 课堂全面讲义、背诵讲义 |
| + | 分层练习场 / 综合测验 | **课后拓展**，不替代上课流程 |

## 本次升级（在原思路上的增补）

### 课件 Demo 末尾拓展屏（同风格）

- **Demo01 · Page 9**：who / whom 对比思考 + whose 预习演示  
- **Demo02 · Page 9**：whose、that、非限制性从句思考  
- **Demo03 · Page 7–8**：the reason **why**；宾语 which vs 状语 when/where 对比表  

### 练习 Demo

- Part 5–6 分层拓展题（whom 宾语、whose、when/where/why）  
- 导航仍接 **课件 → 练习 → 下一讲课件**

### 课后工具（可选）

- `lesson13rc-page05-tiered-practice.html` · A–F 分层选择题  
- `lesson13rc-page06-quiz.html` · 四节复习测验 + **三篇语篇理解**（先行词与定语从句修饰）  
- `l13rc-corpus-pool.js` · 语料与题库数据源  

## 全设备自适应

- `assets/l13rc-responsive.css`：手机 / 平板 / 桌面 / 横屏 / 安全区 / 触控按钮（44px）统一断点。
- `assets/l13rc-demo-screen.css`：舞台铺满视口（扣底栏）。
- `assets/l13rc-no-scrollbar.css` + `assets/l13rc-scrollable.css` + `assets/l13rc-fit-viewport.js`：禁止整页滚动；能放下则缩放，仍超出则在区内显示滚动条（课件 / 练习 / 拓展 / 目录 / 讲义）。
- 所有 HTML 使用统一 viewport：`width=device-width, initial-scale=1, viewport-fit=cover`。

## 巩固练习（一题一页）

- 三份 `练习Demo_Lesson_Relative_Clause_*.html`：每道 `.exercise-item` 单独一屏，顶栏显示 Part 标题与说明，底部 **上一题 / 下一题**（支持键盘 ← →）。
- 大屏字号：`l13rc-practice-one-page.css` + `l13rc-practice-answers.css`。
- 每题可展开 **参考答案与句法分析**（`l13rc-practice-answers-01~03.js` + `l13rc-practice-answers-ui.js`）；含主从句拆分、关系词成分、教师提示；选择题点击会标对错。
- 打印：`l13rc-practice-print.js` 按 **Part 一页** 输出 PDF（同一 Part 内多道题在同一页）；屏幕仍为一题一页。未点「开始练习」也可直接打印。

## 语音朗读（手动）

- 三份 `课件Demo_*` 已启用 `assets/l13rc-manual-tts.js`：**取消自动朗读**（引导步骤、显示下一步、开始按钮等均不再自动播放）。
- 点击各句旁的 **「朗读」** 按钮（`.tts-btn`）才播放；`page0PlayS1` 等「播放」按钮仍可手动触发朗读。

## 使用建议

1. **上课**：严格按目录 01→06 走原版课件与练习，用每页「显示下一步」控节奏；需要朗读时点句旁「朗读」。投影/教室大屏建议全屏浏览器（F11）。
2. **练习课**：点「开始练习」后按题翻页；单题内容过高可在题区内滚动。  
3. **拓展屏**：每讲课件最后一屏后继续点「下一页」进入 Page 9（或 Demo03 的 7–8）。  
4. **课后**：分层练习场 / 综合测验 / 讲义默写。
