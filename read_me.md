# S-Class | English Learning with Steven

面向学生的英语学习站点，包含 AEIS 词汇、PET 词汇实验室、剑桥模考、FU2/FU3 专题、TED 与百科等模块；统一登录、统一报告邮件与媒体托管。

---

## 一、项目概览

- **入口**：`index.html`（需登录后进入首页，点击各板块进入子模块）
- **登录**：Authing OIDC 托管登录页，登录后用户名写入 `localStorage`（`authing-user` / `current-user`），全站子页面共用
- **报告**：各子页面完成学习/提交时通过 **S-Class Tracker** 发送统一格式邮件（EmailJS 模板 `template_zso8ebh`）
- **媒体**：图片/音视频不提交到 Git，统一上传至腾讯云 COS，HTML 内使用 COS 地址（通过 pre-commit 脚本改写）

---

## 二、目录与功能

### 1. 根目录

| 文件/目录     | 说明 |
|---------------|------|
| `index.html`  | 站点首页。登录门 + 各板块入口（AEIS、PET、PET-exam、FU2、FU3、TED、Encyclopedia）。右上角显示「Hi, 用户名 · 欢迎回来」，退出清除登录态。 |
| `scripts/`    | 公共脚本与文档（见下） |
| `package.json`| 仅依赖 `cos-nodejs-sdk-v5`，用于上传/校验 COS |

### 2. AEIS（新加坡政府学校备考）

- **路径**：`AEIS/P01/` ~ `AEIS/P34/`
- **内容**：P01–P34 为词汇练习（单词学习 + 测验 + 苏格拉底问答），每套含 `index.html`（主练）+ `review.html`（复习）
- **功能**：输入姓名（可预填登录名）、按步骤解锁、发送报告给老师。**管理员模式**：点击标题区 5 次 → 输入密码 `888123` 或 `123888` → 解锁全部步骤；顶部出现 ADMIN 栏可切换组/下一组

### 3. PET Practice（词汇实验室 01–36）

- **路径**：`PET/01/01.html` ~ `PET/36/36.html`，以及 `PET/Unit*_passage/`、`PET/Unit*_summary/`
- **内容**：每课为「Vocabulary → Phrases → Grammar」多步骤任务，含跟读、拼写、选择等；Unit1–18 配有 Passage（阅读）与 Summary（词汇总结 Quiz）
- **功能**：姓名预填登录名；进度可保存/恢复；完成或到达 Mission Complete 时发送报告。**管理员模式**：右下角齿轮 → 连续点击 5 次弹出密码，或打开面板后点「Unlock All」，输入 `888123` 或 `123888` 解锁全部步骤

### 4. PET-exam（剑桥 Preliminary 模考）

- **路径**：`PET-exam/index.html`（模考入口）、`Listening/player.html`、`Reading/player.html`
- **说明**：入口页检测 `current-user` / `authing-user`，无则跳回首页。听力/阅读在独立 player 中做题，提交时发报告

### 5. FU2（二年级单元）

- **路径**：`FU2/Unit 2 words study V1.html`、`FU2/An Interview with Fitz Cahall/` 下各子页
- **内容**：单元 2 词汇学习、Fitz Cahall 访谈专题（视频任务、词汇复习等）
- **功能**：部分页面接入 S-Class 发报告，姓名可来自登录名

### 6. FU3（三年级单元）

- **路径**：`FU3/FU301/` ~ `FU312/`、`FU303/`（国家/目的地）、`FU3HW/Week15` ~ `Week18`、`Unit 3 words study V1.html` 等
- **内容**：多周主题（Tower Bridge、Boston、三星堆、Italy、Verona 等）、Unit 3 词汇、FU303 目的地/登机牌等
- **功能**：作业页多会预填登录名，完成时发送报告

### 7. TED Library

- **路径**：`TED/The_machine_that_changed_our_understanding_of_human_history_-_Max_G_Levy/The_Worlds_First_Computer.html`
- **内容**：TED 视频课程页，词汇、阅读、视频与报告
- **功能**：姓名输入可预填登录名；生成报告时发邮件

### 8. Encyclopedia（百科）

- **路径**：`encyclopedia/index.html`
- **内容**：学生百科 Quiz 等
- **功能**：完成时通过 S-Class 发报告

---

## 三、脚本与配置（`scripts/`）

| 文件 | 说明 |
|------|------|
| `s-class-tracker.js` | **核心**。提供 `SClass.sendReport()`、`SClass.log()` 等；从 `authing-user` / `current-user` 取用户名；用 EmailJS 模板 `template_zso8ebh` 发统一报告邮件。各子页面通过 `<script src=".../s-class-tracker.js"></script>` 引入。 |
| `rewrite-html-media.js` | 将 HTML 内相对媒体路径改为 COS 地址。建议在 pre-commit 中执行（或手动 `node scripts/rewrite-html-media.js`）。 |
| `upload-media-to-cos.js` | 按配置上传本地媒体到腾讯云 COS（需 `.cos-config.json`，不提交到 Git）。 |
| `verify-cos-media.js` | 校验当前 HTML 与 Git 中引用的 COS 媒体是否均存在于 COS 桶中。 |
| `clean-cos-non-media.js` | 列出或删除 COS 桶内非媒体类型文件，避免垃圾对象。 |
| `emailjs-template-guide.html` | 邮件模板变量说明（如 `{{student_name}}`、`{{content_name}}`）。 |
| `template_sclass_report-使用页面清单.md` | 使用统一报告（SClass.sendReport）的页面清单。 |
| `非必要文件排查清单.md` | 已删除的一次性/冗余脚本记录。 |

---

## 四、登录与用户名

- **首页登录**：点击「用户名密码登录」跳转 Authing 托管页，回调后从 id_token 解析用户名并显示「Hi, 用户名 · 欢迎回来」，同时写入 `authing-user`、`current-user`（不写入占位符「用户」）。
- **子页面**：需要姓名处统一使用 `localStorage.getItem('authing-user') || localStorage.getItem('current-user')` 或通过 `SClass.user` 预填；未登录时部分页面会跳回首页或显示 Guest。

---

## 五、媒体与 COS

- **规则**：图片、音视频等扩展名已在 `.gitignore` 中，不推送到 GitHub；发布前将媒体上传到腾讯云 COS，HTML 中使用 COS 地址。
- **COS 根地址**：`https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/`
- **本地配置**：在项目根目录创建 `.cos-config.json`（已 gitignore），填写 `SecretId`、`SecretKey`、`Bucket`、`Region`、`CosPrefix`。  
- **流程**：编辑 HTML 时可用相对路径；提交前运行 `rewrite-html-media.js` 将相对路径改为 COS URL；运行 `upload-media-to-cos.js` 上传新增/变更媒体。

---

## 六、报告邮件（EmailJS）

- **模板 ID**：`template_zso8ebh`（在 EmailJS 后台配置）
- **调用方式**：页面内引入 `s-class-tracker.js` 后，在完成/提交时调用  
  `SClass.sendReport({ contentName: '页面名称', score: 得分, total: 总分 });`  
  可选带 `extra` 等字段，详见脚本与 `emailjs-template-guide.html`。
- **覆盖范围**：AEIS P01–P34、PET 01–36 与 Unit 总结/阅读、PET-exam、TED、FU2/FU3 部分页、Encyclopedia 等约 200+ 页面，详见 `scripts/template_sclass_report-使用页面清单.md`。

---

## 七、管理员模式

- **AEIS P01–P34**：在页面标题区连续点击 5 次 → 弹出「Admin Password:」→ 输入 `888123` 或 `123888` → 解锁全部步骤，顶部显示 ADMIN 栏。
- **PET 01–36**：右下角齿轮连续点击 5 次并输入上述密码，或点击齿轮打开 Admin Console 后点击「Unlock All」并输入密码，即可解锁所有步骤（无需逐步完成）。

---

## 八、本次检查与修正

- **死链**：已从首页移除不存在的入口：AEIS P35、PET 37–40、PET Unit19/Unit20 的 Passage/Summary（当前仅存在 P01–P34、PET 01–36 与 Unit1–18）。
- **非必要文件**：已按《非必要文件排查清单》完成历史清理；本次未发现新增可删的非必要文件。
- **逻辑与显示**：各子页面姓名来源统一为登录名；报告统一走 SClass.sendReport；管理员密码为 888123 或 123888，且「Unlock All」也需输入密码。

---

## 九、本地与部署

- **本地**：直接用浏览器打开 `index.html` 或通过静态服务器访问；登录依赖 Authing 回调，需可访问的 URL（本地可用 localhost）。
- **部署**：可部署到 Vercel / GitHub Pages 等静态托管；媒体由 COS 提供，无需放在仓库内。
- **环境**：仅上传/校验脚本需要 Node 与 `cos-nodejs-sdk-v5`；页面为纯前端，无服务端要求。

---

*文档最后更新：与当前代码与入口一致；具体页面数以仓库为准。*
