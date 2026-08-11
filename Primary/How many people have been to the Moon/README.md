# How many people have been to the Moon?

S-Class 科学考察营课件 · 内容改编自 [Encyclopaedia Britannica](https://www.britannica.com/story/how-many-people-have-been-to-the-moon) 与 NASA 公开资料。

- **Lexile**：约 450（小学三至四年级）
- **关键答案**：阿波罗年代 24 人到达月球，其中 12 人走过月面
- **配图**：优先 NASA / 公有领域真实照片；词义图与主体图双呈现
- **视频**：根据 Learn Bright [Apollo Space Missions for Kids](https://www.youtube.com/watch?v=fObYUyyE4Ak) 改编的 S-Class 教学片（慢速英音 + 中英字幕）

## 打开方式

用 HTTP 服务仓库根目录后访问：

`Primary/How many people have been to the Moon/index.html`

视频站：

`how-many-people-have-been-to-the-moon-courseware/activities.html`

## 视频说明

课程内默认播放：

`how-many-people-have-been-to-the-moon-courseware/videos/01-apollo-space-missions.mp4`

重新生成教学片：

```bash
python3 Primary/scripts/build_moon_apollo_video.py
```

若要在本机下载 YouTube 原片（云主机 IP 常被拦截）：

```bash
python3 Primary/scripts/download_moon_apollo_youtube.py
# 或
python3 Primary/scripts/download_moon_apollo_youtube.py --import /path/to/local.mp4
```
