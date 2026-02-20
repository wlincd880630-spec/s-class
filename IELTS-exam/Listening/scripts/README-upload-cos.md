# 把听力媒体上传到腾讯云 COS

播放器已支持从 COS 加载音频和图片（见 `player.html` 中的 `IELTS_MEDIA_BASE`）。  
**上传必须在你本机或服务器上执行**（需要你的腾讯云密钥），按下面任选一种方式即可。

## 方式一：Python 脚本（推荐）

1. **安装依赖**
   ```bash
   pip install cos-python-sdk-v5
   ```

2. **准备媒体目录**  
   把每个 Test 的音频、地图图放到对应目录，例如：
   ```
   IELTS-exam/Listening/assets/
   ├── 剑桥雅思真题11_Test1/
   │   ├── Section1.mp3
   │   ├── Section2.mp3
   │   ├── Section3.mp3
   │   ├── Section4.mp3
   │   └── （题目里 image_path 用到的图片）
   ├── 剑桥雅思真题11_Test2/
   ...
   ```

3. **配置密钥（不要提交到 git）**  
   - Windows CMD：
     ```cmd
     set COS_SECRET_ID=你的SecretId
     set COS_SECRET_KEY=你的SecretKey
     ```
   - PowerShell：
     ```powershell
     $env:COS_SECRET_ID="你的SecretId"
     $env:COS_SECRET_KEY="你的SecretKey"
     ```
   - Linux/Mac：
     ```bash
     export COS_SECRET_ID=你的SecretId
     export COS_SECRET_KEY=你的SecretKey
     ```

4. **执行上传**
   ```bash
   cd IELTS-exam/Listening/scripts
   python upload-assets-to-cos.py
   ```

脚本会把 `assets/` 下所有文件上传到 COS 路径：  
`s-class/IELTS-exam/Listening/assets/`  
与播放器中的默认基地址一致，无需改链接。

---

## 方式二：coscmd 命令行

1. **安装与配置**
   ```bash
   pip install coscmd
   coscmd config -a <SecretId> -s <SecretKey> -b s-class-1403296481 -r ap-chengdu
   ```

2. **上传整个 assets 目录**
   ```bash
   cd IELTS-exam/Listening
   coscmd upload -r assets/ s-class/IELTS-exam/Listening/assets/
   ```

---

## 方式三：腾讯云控制台

1. 登录 [腾讯云 COS 控制台](https://console.cloud.tencent.com/cos)。
2. 进入存储桶 `s-class-1403296481`，区域 `成都`。
3. 进入路径 `s-class/IELTS-exam/Listening/`，新建文件夹 `assets`（若没有）。
4. 进入 `assets`，按 Test 建子文件夹（如 `剑桥雅思真题11_Test1`），再上传对应 mp3 和图片。

---

密钥在 [腾讯云控制台 - 访问管理 - API 密钥](https://console.cloud.tencent.com/cam/capi) 创建。  
上传完成后，播放器在不加 `?media=local` 时会自动从 COS 拉取媒体。
