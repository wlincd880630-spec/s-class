# World's Largest Deserts · 世界最大的沙漠

面向**小学五年级**的英语科学阅读课件，语言难度约 **Lexile 600**。

## 来源

- 事实依据：[Encyclopaedia Britannica — World's largest deserts](https://www.britannica.com/topic/worlds-largest-deserts-2225895)
- 课文与活动文案按蓝思约 600、五年级可读性改写（DeepSeek 校验约 450–600L）

## 模块结构（对齐爬行动物课）

| 模块 | 路径 |
|------|------|
| 课程入口 | `index.html` |
| 互动课件 / 单词 / 活动 | `worlds-largest-deserts-courseware/` |
| 复习游戏（9 款） | `worlds-largest-deserts-review-games/` |
| 听写 / 抄写 | `worlds-largest-deserts-homework/` |
| 全彩单词卡 | `worlds-largest-deserts-coloring/` |

## 本地打开

在仓库根目录：

```bash
python3 -m http.server 8080
```

打开：`http://localhost:8080/Primary/Worlds%20Largest%20Deserts/index.html`

若被鉴权拦截，在控制台执行：

```js
localStorage.setItem('authing-user','TestStudent');
localStorage.setItem('current-user','TestStudent');
location.reload();
```

## 配图

词图 / 课文图由 **Composer 2.5** 生成（写实教育插画风格），压缩为 JPG 置于 `worlds-largest-deserts-courseware/images/`。
