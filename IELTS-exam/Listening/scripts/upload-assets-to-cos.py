#!/usr/bin/env python3
"""
将 IELTS-exam/Listening/assets 下的媒体文件上传到腾讯云 COS。

使用前：
  1. 安装：pip install cos-python-sdk-v5
  2. 配置环境变量（不要提交到 git）：
     COS_SECRET_ID   = 腾讯云 SecretId
     COS_SECRET_KEY  = 腾讯云 SecretKey
  3. 本地目录：脚本所在目录的上一级下的 assets，即 IELTS-exam/Listening/assets
  4. COS 路径：s-class/IELTS-exam/Listening/assets/

运行：
  cd IELTS-exam/Listening/scripts
  python upload-assets-to-cos.py

  或从项目根目录：
  python IELTS-exam/Listening/scripts/upload-assets-to-cos.py
"""

import os
import sys

# COS 配置（与 player.html 中一致）
BUCKET = "s-class-1403296481"
REGION = "ap-chengdu"
COS_PREFIX = "s-class/IELTS-exam/Listening/assets"


def main():
    try:
        from qcloud_cos import CosConfig, CosS3Client
    except ImportError:
        print("请先安装: pip install cos-python-sdk-v5")
        sys.exit(1)

    secret_id = os.environ.get("COS_SECRET_ID") or os.environ.get("TENCENT_SECRET_ID")
    secret_key = os.environ.get("COS_SECRET_KEY") or os.environ.get("TENCENT_SECRET_KEY")
    if not secret_id or not secret_key:
        print("请设置环境变量: COS_SECRET_ID, COS_SECRET_KEY")
        print("  Windows: set COS_SECRET_ID=xxx && set COS_SECRET_KEY=xxx")
        print("  Linux/Mac: export COS_SECRET_ID=xxx COS_SECRET_KEY=xxx")
        sys.exit(1)

    # 脚本在 Listening/scripts/，assets 在 Listening/assets/
    script_dir = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.join(script_dir, "..", "assets")
    assets_dir = os.path.normpath(assets_dir)
    if not os.path.isdir(assets_dir):
        print("未找到目录:", assets_dir)
        print("请确保存在 IELTS-exam/Listening/assets 并放入音频/图片后再运行。")
        sys.exit(1)

    config = CosConfig(Region=REGION, SecretId=secret_id, SecretKey=secret_key)
    client = CosS3Client(config)

    uploaded = 0
    for root, _, files in os.walk(assets_dir):
        for name in files:
            local_path = os.path.join(root, name)
            rel = os.path.relpath(local_path, assets_dir)
            rel = rel.replace("\\", "/")
            cos_key = COS_PREFIX.rstrip("/") + "/" + rel
            try:
                with open(local_path, "rb") as f:
                    client.put_object(
                        Bucket=BUCKET,
                        Body=f,
                        Key=cos_key,
                        ContentType=None,  # COS 会按后缀推断
                    )
                print("OK", cos_key)
                uploaded += 1
            except Exception as e:
                print("FAIL", cos_key, e)

    print("\n上传完成，共", uploaded, "个文件。")
    print("播放器默认已指向 COS，无需改链接。")


if __name__ == "__main__":
    main()
