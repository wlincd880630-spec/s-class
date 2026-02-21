# S-Class | English Learning with Steven

面向学生的英语学习站点，统一登录、统一学习报告邮件与媒体托管。包含 AEIS 词汇、PET 词汇实验室、剑桥雅思/PET 模考、FU2/FU3 专题、TED 与百科等模块。

---

## 目录

- [功能概览](#功能概览)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [脚本说明](#脚本说明)
- [登录与鉴权](#登录与鉴权)
- [媒体与腾讯云 COS](#媒体与腾讯云-cos)
- [学习报告邮件](#学习报告邮件)
- [管理员模式](#管理员模式)
- [部署](#部署)
- [更多文档](#更多文档)

---

## 功能概览

| 模块 | 路径 | 说明 |
|------|------|------|
| **首页** | `index.html` | 登录门 + 各板块入口，右上角显示「Hi, 用户名 · 欢迎回来」 |
| **AEIS** | `AEIS/P01/` ~ `P34/` | 新加坡政府学校备考词汇（P6 词汇练习 + 测验 + 苏格拉底问答），每套含 `index.html` + `review.html` |
| **PET 词汇实验室** | `PET/01/` ~ `36/` | 每课 Vocabulary → Phrases → Grammar 多步骤任务；另有 `Unit*_passage`、`Unit*_summary`（Unit1–18） |
| **PET 模考** | `PET-exam/` | 剑桥 Preliminary 模考入口，Listening/Reading 独立 player |
| **雅思模考** | `IELTS-exam/` | 剑桥雅思听力等资源（含 11–19 系列） |
| **FU2** | `FU2/` | 二年级单元：词汇学习、Fitz Cahall 访谈专题（视频任务、词汇复习等） |
| **FU3** | `FU3/` | 三年级单元：多周主题（Tower Bridge、Boston、三星堆、Italy 等）、Unit 3 词汇、作业 Week15–18 |
| **TED** | `TED/` | TED 视频课程页，词汇/阅读/视频与报告 |
| **百科** | `encyclopedia/` | 学生百科 Quiz，完成时发报告 |

- **登录**：Authing OIDC 托管登录，用户名写入 `localStorage`（`authing-user` / `current-user`），全站子页面共用。
- **报告**：各子页面完成/提交时通过 **S-Class Tracker** 发送统一格式邮件（EmailJS 模板 `template_zso8ebh`）。
- **媒体**：图片/音视频不提交 Git，统一上传腾讯云 COS，HTML 内使用 COS 地址（可通过 pre-commit 脚本改写）。

---

## 技术栈

- **前端**：纯静态 HTML/CSS/JS，无构建步骤；字体与图标使用 CDN（Google Fonts、Font Awesome）。
- **登录**：Authing OIDC 托管登录页，回调后解析 id_token 写入用户名。
- **报告**：EmailJS（模板 `template_zso8ebh`），由 `s-class-tracker.js` 统一调用。
- **媒体**：腾讯云 COS；本地脚本依赖 Node.js + `cos-nodejs-sdk-v5`（仅用于上传/校验/清理）。

---

## 项目结构

```
s-class/
├── index.html              # 站点首页（登录门 + 板块入口）
├── package.json            # 仅依赖 cos-nodejs-sdk-v5
├── .gitignore              # 媒体扩展名 + .cos-config.json + node_modules
├── .cos-config.json        # 腾讯云 COS 配置（本地创建，不提交）
│
├── scripts/                # 公共脚本与文档
│   ├── auth-check.js       # 全站登录检查，未登录跳转首页
│   ├── s-class-tracker.js  # 统一报告 SClass.sendReport()、用户名等
│   ├── rewrite-html-media.js    # 将 HTML 内相对媒体路径改为 COS 地址
│   ├── upload-media-to-cos.js   # 上传本地媒体到腾讯云 COS
│   ├── verify-cos-media.js     # 校验 HTML 引用的 COS 媒体是否存在
│   ├── clean-cos-non-media.js  # 列出/删除 COS 桶内非媒体文件
│   ├── emailjs-template-guide.html  # 邮件模板变量说明
│   └── template_sclass_report-使用页面清单.md  # 使用 SClass.sendReport 的页面清单
│
├── AEIS/                   # P01–P34 词汇练习（每单元 index.html + review.html + database.json + 题图）
├── PET/                    # 01–36 词汇实验室 + Unit1–18 passage/summary（含 audio_cache）
├── PET-exam/               # 剑桥 PET 模考（Listening/Reading）
├── IELTS-exam/             # 雅思听力等（css、Listening/assets、data、scripts）
├── FU2/                    # 二年级单元与访谈专题
├── FU3/                    # 三年级单元与周作业（FU301–FU312、FU3HW/Week15–18）
├── TED/                    # TED 课程与 generated_images
├── encyclopedia/           # 百科 data
├── js/                     # 前端脚本
└── node_modules/           # npm 依赖（仅 cos-nodejs-sdk-v5 等）
```

---

## 快速开始

### 1. 克隆与安装

```bash
git clone <repo-url>
cd s-class
npm install
```

### 2. 本地访问

- 用浏览器直接打开 `index.html`，或使用任意静态服务器（如 `npx serve .`）。
- 登录依赖 Authing 回调，需可访问的 URL（本地可用 `http://localhost:xxxx` 并在 Authing 控制台配置回调地址）。

### 3. 媒体与 COS（可选）

- 编辑 HTML 时可用**相对路径**引用图片/音视频。
- 发布前：
  1. 在项目根目录创建 `.cos-config.json`（格式见下），**不要提交到 Git**。
  2. 运行 `node scripts/rewrite-html-media.js` 将相对路径改为 COS 地址。
  3. 运行 `node scripts/upload-media-to-cos.js` 上传媒体到 COS。

**.cos-config.json 示例**（需自行填写，且已列入 .gitignore）：

```json
{
  "SecretId": "你的 SecretId",
  "SecretKey": "你的 SecretKey",
  "Bucket": "s-class-1403296481",
  "Region": "ap-chengdu",
  "CosPrefix": "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/"
}
```

---

## 脚本说明

| 脚本 | 说明 |
|------|------|
| `auth-check.js` | 在除首页外的子页面 `<head>` 中引入；无 `authing-user` / `current-user` 时跳转根目录 `index.html`。 |
| `s-class-tracker.js` | 提供 `SClass.sendReport()`、`SClass.log()` 等；从 localStorage 取用户名；用 EmailJS 发统一报告。 |
| `rewrite-html-media.js` | 将 HTML 内相对媒体路径改为 COS 地址，建议在 pre-commit 或发布前执行。 |
| `upload-media-to-cos.js` | 按 `.cos-config.json` 上传本地媒体到腾讯云 COS。 |
| `verify-cos-media.js` | 校验当前 HTML 与 Git 中引用的 COS 媒体是否均存在于 COS 桶。 |
| `clean-cos-non-media.js` | 列出或删除 COS 桶内非媒体类型文件。 |
| `emailjs-template-guide.html` | 邮件模板变量说明（如 `{{student_name}}`、`{{content_name}}`）。 |

更多脚本与「使用 SClass.sendReport 的页面清单」见 **scripts/** 目录及 [read_me.md](read_me.md)。

---

## 登录与鉴权

- **首页**：点击「用户名密码登录」跳转 Authing 托管页，回调后从 id_token 解析用户名，写入 `authing-user`、`current-user`，并显示「Hi, 用户名 · 欢迎回来」。
- **子页面**：每个子页面在 `<head>` 中引入 `scripts/auth-check.js`，未登录时会自动跳转首页；需要姓名处统一使用上述 localStorage 或 `SClass.user` 预填。

---

## 媒体与腾讯云 COS

- **规则**：`.gitignore` 已忽略常见图片/音视频扩展名，不推送到 Git；发布前将媒体上传到腾讯云 COS，HTML 中使用 COS 地址。
- **COS 根地址**：`https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/`
- **流程**：编辑时用相对路径 → 提交前执行 `rewrite-html-media.js` 改写为 COS URL → 执行 `upload-media-to-cos.js` 上传新增/变更媒体。

---

## 学习报告邮件

- **模板 ID**：EmailJS 模板 `template_zso8ebh`。
- **调用方式**：页面引入 `s-class-tracker.js` 后，在完成/提交时调用：
  ```js
  SClass.sendReport({ contentName: '页面名称', score: 得分, total: 总分 });
  ```
  可选带 `extra` 等字段，详见 `scripts/emailjs-template-guide.html`。
- **覆盖**：AEIS P01–P34、PET 01–36 与 Unit 总结/阅读、PET-exam、TED、FU2/FU3 部分页、Encyclopedia 等，详见 `scripts/template_sclass_report-使用页面清单.md`。

---

## 管理员模式

- **AEIS P01–P34**：在页面标题区**连续点击 5 次** → 弹出「Admin Password:」→ 输入 `888123` 或 `123888` → 解锁全部步骤，顶部显示 ADMIN 栏。
- **PET 01–36**：**右下角齿轮连续点击 5 次**并输入上述密码，或打开 Admin Console 后点击「Unlock All」并输入密码，即可解锁所有步骤。

---

## 部署

- 可部署到 **Vercel**、**GitHub Pages** 等静态托管；媒体由 COS 提供，无需放在仓库内。
- 页面为纯前端，无服务端要求；仅上传/校验/清理脚本需要 Node 与 `cos-nodejs-sdk-v5`。
- 登录依赖 Authing 回调，需在 Authing 控制台将部署域名（及本地调试用的 localhost）配置为允许的回调地址。

---

## 更多文档

- **[read_me.md](read_me.md)**：更细的目录与功能说明、脚本与配置列表、登录/媒体/报告/管理员逻辑、本次检查与修正记录等。
- **scripts/template_sclass_report-使用页面清单.md**：使用统一报告（SClass.sendReport）的页面清单。
- **scripts/非必要文件排查清单.md**：已删除的一次性/冗余脚本记录。

---

*S-Class | English Learning with Steven — 文档与代码保持一致，具体页面数以仓库为准。*
