#!/usr/bin/env python3
"""
用科学审校脚本、S-Class 写实配图和 Azure 英音合成课程视频，并上传腾讯 COS。

视频为 S-Class 原创课程内容，不是 BBC 原片或逐字文稿。

用法：
  python3 Primary/scripts/build_reptile_bbc_videos.py
  python3 Primary/scripts/build_reptile_bbc_videos.py --upload-only
  python3 Primary/scripts/build_reptile_bbc_videos.py --skip-upload

需配置（任选其一）：
  - 项目根目录 .cos-config.json
  - 环境变量 COS_SECRET_ID / COS_SECRET_KEY
"""
from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import textwrap
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COURSE = ROOT / "Primary" / "What are reptiles" / "what-are-reptiles-courseware"
VIDEO_DIR = COURSE / "videos"
BUILD_DIR = VIDEO_DIR / "_build"
COS_BASE = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/What%20are%20reptiles/what-are-reptiles-courseware/videos"

AZURE_KEY = os.environ.get(
    "AZURE_SPEECH_KEY",
    "9wqQjcwatmfHXVoMv9nO6I2teZBS6LSZL6ROW85tO6fL4ahKjsIaJQQJ99CHACqBBLyXJ3w3AAAYACOGvelV",
)
AZURE_REGION = os.environ.get("AZURE_SPEECH_REGION", "southeastasia")
AZURE_VOICE = "en-GB-RyanNeural"
# 小学四年级：放慢语速
AZURE_SPEECH_RATE = os.environ.get("REPTILE_VIDEO_SPEECH_RATE", "0.68")
# 每句结束后留白，给小学生留出理解时间
SLIDE_PAD_SEC = float(os.environ.get("REPTILE_VIDEO_PAD_SEC", "0.55"))
KEN_BURNS_FPS = 25

VIDEOS = [
    {
        "id": "01-what-are-reptiles",
        "file": "01-what-are-reptiles.mp4",
        "title": "Reptile body toolkit",
        "title_zh": "爬行动物的身体工具箱",
        "vpid": "sclass-reptile-01",
        "sentences": [
            ("Reptiles are vertebrates, so they have a backbone.", "爬行动物是脊椎动物，所以体内有脊柱。"),
            ("Their skin is dry and tough, and is usually covered with scales or scutes.", "它们的皮肤干燥而坚韧，通常覆盖着鳞片或盾片。"),
            ("All living reptiles breathe with lungs.", "所有现生爬行动物都用肺呼吸。"),
            ("Aquatic reptiles usually need to surface for air.", "水生爬行动物通常需要浮到水面呼吸。"),
            ("Most living non-bird reptiles are ectothermic.", "大多数现生非鸟类爬行动物是变温动物。"),
            ("They move between warm and cool places to adjust their temperature.", "它们会在温暖和凉爽的地方之间移动来调节体温。"),
            ("Most reptiles lay eggs.", "大多数爬行动物产卵。"),
            ("Some snakes and lizards, including some skinks, give birth to live young.", "部分蛇和蜥蜴——包括一些石龙子——会直接产下幼体。"),
            ("A turtle's shell is part of its skeleton, not an exoskeleton.", "龟壳是龟自身骨骼的一部分，并不是外骨骼。"),
        ],
        "images": [
            ("local:images/story/01.png", "reptile_groups"),
            ("local:images/story/02.png", "scales"),
            ("local:images/story/06.png", "lungs"),
            ("local:images/story/07.png", "surface_air"),
            ("local:images/story/04.png", "ectothermy"),
            ("local:images/story/08.png", "eggs"),
            ("local:images/story/09.png", "live_young"),
            ("local:images/story/13.png", "shell_skeleton"),
        ],
        "image_map": [0, 1, 2, 3, 4, 4, 5, 6, 7],
    },
    {
        "id": "02-reptiles-around-the-world",
        "file": "02-reptiles-around-the-world.mp4",
        "title": "Reptile diversity and habitats",
        "title_zh": "爬行动物的多样性与栖息地",
        "vpid": "sclass-reptile-02",
        "sentences": [
            ("Living non-bird reptiles include squamates, turtles, crocodilians, and tuatara.", "现生非鸟类爬行动物主要包括有鳞类、龟类、鳄类和喙头蜥。"),
            ("Squamates include lizards, snakes, and worm lizards.", "有鳞类包括蜥蜴、蛇和蚓蜥。"),
            ("Crocodiles and alligators are both crocodilians.", "鳄和短吻鳄都属于鳄类。"),
            ("Tuatara look like lizards, but belong to a different ancient group.", "喙头蜥看起来像蜥蜴，但属于另一个古老类群。"),
            ("Reptiles live in forests, deserts, grasslands, wetlands, rivers, and seas.", "爬行动物生活在森林、沙漠、草原、湿地、河流和海洋等多种环境中。"),
            ("Native reptiles occur on every continent except Antarctica.", "除南极洲外，各大洲都有本土爬行动物。"),
            ("Reptile diets vary from species to species.", "不同种类爬行动物的食性各不相同。"),
            ("Some eat animals, some are omnivores, and some mainly eat plants.", "有的吃动物，有的杂食，还有的主要吃植物。"),
            ("Dinosaurs are part of the reptile family tree, and birds are living dinosaurs.", "恐龙属于爬行动物演化家族树，鸟类是仍然存活的恐龙。"),
            ("Watch wild reptiles from a safe distance and never touch a wild snake.", "请与野生爬行动物保持安全距离，绝不要触摸野生蛇类。"),
        ],
        "images": [
            ("local:images/story/05.png", "living_groups"),
            ("local:images/words/snake.png", "squamates"),
            ("local:images/story/14.png", "crocodilians"),
            ("local:images/story/15.png", "tuatara"),
            ("local:images/story/10.png", "habitats"),
            ("local:images/story/11.png", "continents"),
            ("local:images/story/12.png", "diets"),
            ("local:images/story/17.png", "dinosaurs"),
            ("local:images/story/18.png", "safety"),
        ],
        "image_map": [0, 1, 2, 3, 4, 5, 6, 6, 7, 8],
    },
]

# 构建后写入 manifest 的字幕时间轴
VIDEO_CUES: dict[str, list[dict]] = {}


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 1000:
        return
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        dest.write_bytes(resp.read())


def azure_tts(text: str, out_mp3: Path) -> None:
    import ssl

    esc = (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )
    ssml = (
        f'<speak version="1.0" xml:lang="en-GB">'
        f'<voice name="{AZURE_VOICE}"><prosody rate="{AZURE_SPEECH_RATE}">{esc}</prosody></voice></speak>'
    )
    req = urllib.request.Request(
        f"https://{AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1",
        data=ssml.encode("utf-8"),
        headers={
            "Ocp-Apim-Subscription-Key": AZURE_KEY,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
            "User-Agent": "s-class-reptile-video",
        },
        method="POST",
    )
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
        out_mp3.write_bytes(resp.read())


def probe_duration(path: Path) -> float:
    out = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        text=True,
    ).strip()
    return max(float(out), 0.5)


def ass_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("{", "\\{").replace("}", "\\}").replace("\n", "\\N")


def wrap_lines(text: str, width: int) -> str:
    return "\\N".join(textwrap.wrap(text, width=width)) if text else ""


def write_ass_caption(path: Path, en: str, zh: str, duration: float) -> None:
    end = duration
    en_lines = wrap_lines(en, 46)
    zh_lines = wrap_lines(zh, 24)
    content = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1280
PlayResY: 720

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: EN,Arial,30,&H00FFFFFF,&H00FFFFFF,&H00000000,&H96000000,1,0,0,0,100,100,0,0,1,2,0,2,24,24,92,1
Style: ZH,Microsoft YaHei,26,&H0000E6FF,&H0000E6FF,&H00000000,&H96000000,1,0,0,0,100,100,0,0,1,2,0,2,24,24,24,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,{fmt_ass_time(end)},EN,,0,0,0,,{ass_escape(en_lines)}
Dialogue: 0,0:00:00.00,{fmt_ass_time(end)},ZH,,0,0,0,,{ass_escape(zh_lines)}
"""
    path.write_text(content, encoding="utf-8")


def fmt_ass_time(seconds: float) -> str:
    cs = int(round(seconds * 100))
    s, cent = divmod(cs, 100)
    m, s = divmod(s, 60)
    h, m = divmod(m, 60)
    return f"{h}:{m:02d}:{s:02d}.{cent:02d}"


def fmt_vtt_time(seconds: float) -> str:
    ms = int(round(seconds * 1000))
    s, ms = divmod(ms, 1000)
    m, s = divmod(s, 60)
    h, m = divmod(m, 60)
    return f"{h:02d}:{m:02d}:{s:02d}.{ms:03d}"


def pad_audio(audio: Path, out_audio: Path, pad_sec: float) -> float:
    dur = probe_duration(audio)
    total = dur + pad_sec
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(audio),
            "-af",
            f"apad=pad_dur={pad_sec:.3f}",
            "-t",
            f"{total:.3f}",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            str(out_audio),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    return total


def make_slide(image: Path, audio: Path, out_mp4: Path, en: str, zh: str, ass_path: Path) -> float:
    padded = out_mp4.with_suffix(".pad.m4a")
    dur = pad_audio(audio, padded, SLIDE_PAD_SEC)
    write_ass_caption(ass_path, en, zh, dur)
    ass_escaped = str(ass_path.resolve()).replace("\\", "/").replace(":", "\\:")
    frames = max(int(dur * KEN_BURNS_FPS), 1)
    vf = (
        "scale=1920:1080:force_original_aspect_ratio=increase,"
        "crop=1920:1080,"
        f"zoompan=z='min(1+0.00035*on,1.14)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
        f"d={frames}:s=1280x720:fps={KEN_BURNS_FPS},"
        f"subtitles={ass_escaped}"
    )
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-loop",
            "1",
            "-i",
            str(image),
            "-i",
            str(padded),
            "-c:v",
            "libx264",
            "-tune",
            "stillimage",
            "-pix_fmt",
            "yuv420p",
            "-vf",
            vf,
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-t",
            f"{dur:.3f}",
            "-shortest",
            str(out_mp4),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    padded.unlink(missing_ok=True)
    return dur


def concat_videos(parts: list[Path], out_mp4: Path) -> None:
    lst = out_mp4.with_suffix(".txt")
    lst.write_text("".join(f"file '{p.resolve()}'\n" for p in parts), encoding="utf-8")
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(lst),
            "-c",
            "copy",
            str(out_mp4),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    lst.unlink(missing_ok=True)


def write_vtt(spec_id: str, cues: list[dict], path: Path) -> None:
    lines = ["WEBVTT", ""]
    for i, cue in enumerate(cues, 1):
        lines.append(str(i))
        lines.append(f"{fmt_vtt_time(cue['start'])} --> {fmt_vtt_time(cue['end'])}")
        lines.append(f"{cue['en']}")
        if cue.get("zh"):
            lines.append(cue["zh"])
        lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def build_video(spec: dict) -> Path:
    work = BUILD_DIR / spec["id"]
    if work.exists():
        shutil.rmtree(work)
    work.mkdir(parents=True)

    images: list[Path] = []
    for i, (url, name) in enumerate(spec["images"]):
        ext = ".png" if url.endswith(".png") else ".jpg"
        p = work / f"img_{i:02d}_{name}{ext}"
        if url.startswith("local:"):
            source = COURSE / url.removeprefix("local:")
            if not source.exists():
                raise FileNotFoundError(f"缺少课程配图: {source}")
            shutil.copy2(source, p)
        else:
            download(url, p)
        images.append(p)

    sentences: list[tuple[str, str]] = spec["sentences"]
    slides: list[Path] = []
    cues: list[dict] = []
    t = 0.0

    image_map = spec.get("image_map") or list(range(len(sentences)))

    for i, (en, zh) in enumerate(sentences):
        mp3 = work / f"audio_{i:03d}.mp3"
        azure_tts(en, mp3)
        img_idx = image_map[i] if i < len(image_map) else i % len(images)
        img = images[min(img_idx, len(images) - 1)]
        seg = work / f"slide_{i:03d}.mp4"
        ass = work / f"caption_{i:03d}.ass"
        dur = make_slide(img, mp3, seg, en, zh, ass)
        cues.append({"start": t, "end": t + dur, "en": en, "zh": zh})
        t += dur
        slides.append(seg)
        print(f"  [{spec['id']}] slide {i+1}/{len(sentences)} ({dur:.1f}s)")

    out = VIDEO_DIR / spec["file"]
    concat_videos(slides, out)
    vtt = VIDEO_DIR / spec["file"].replace(".mp4", ".vtt")
    write_vtt(spec["id"], cues, vtt)
    VIDEO_CUES[spec["id"]] = cues
    print(f"  ✓ {out} ({out.stat().st_size // 1024} KB) + {vtt.name}")
    return out


def get_cos_config() -> dict | None:
    cfg_path = ROOT / ".cos-config.json"
    if cfg_path.exists():
        cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
        if cfg.get("SecretId") and cfg.get("SecretKey") and "填" not in str(cfg.get("SecretId")):
            return cfg
    sid = os.environ.get("COS_SECRET_ID") or os.environ.get("TENCENT_SECRET_ID")
    sk = os.environ.get("COS_SECRET_KEY") or os.environ.get("TENCENT_SECRET_KEY")
    if sid and sk:
        return {
            "SecretId": sid,
            "SecretKey": sk,
            "Bucket": os.environ.get("COS_BUCKET", "s-class-1403296481"),
            "Region": os.environ.get("COS_REGION", "ap-chengdu"),
            "CosPrefix": os.environ.get("COS_PREFIX", "s-class/"),
        }
    return None


def upload_videos() -> None:
    cfg = get_cos_config()
    if not cfg:
        print("⚠ 未找到 COS 凭证（.cos-config.json 或 COS_SECRET_ID/KEY），跳过上传。")
        return

    try:
        from qcloud_cos import CosConfig, CosS3Client
    except ImportError:
        subprocess.run([sys.executable, "-m", "pip", "install", "cos-python-sdk-v5", "-q"], check=True)
        from qcloud_cos import CosConfig, CosS3Client

    prefix = cfg.get("CosPrefix", "s-class/").rstrip("/") + "/"
    client = CosS3Client(
        CosConfig(Region=cfg["Region"], SecretId=cfg["SecretId"], SecretKey=cfg["SecretKey"])
    )
    rel_base = "Primary/What are reptiles/what-are-reptiles-courseware/videos"

    for spec in VIDEOS:
        for fname, ctype in (
            (spec["file"], "video/mp4"),
            (spec["file"].replace(".mp4", ".vtt"), "text/vtt"),
        ):
            local = VIDEO_DIR / fname
            if not local.exists():
                print(f"  跳过（不存在）: {local}")
                continue
            key = prefix + rel_base + "/" + fname
            print(f"  上传 COS: {key} ({local.stat().st_size // 1024} KB)")
            for attempt in range(1, 5):
                try:
                    if local.stat().st_size > 2_000_000:
                        client.upload_file(
                            Bucket=cfg["Bucket"],
                            LocalFilePath=str(local),
                            Key=key,
                            PartSize=2,
                            MAXThread=4,
                            EnableMD5=False,
                            ContentType=ctype,
                        )
                    else:
                        with open(local, "rb") as f:
                            client.put_object(
                                Bucket=cfg["Bucket"], Body=f, Key=key, ContentType=ctype
                            )
                    print(f"  ✓ https://{cfg['Bucket']}.cos.{cfg['Region']}.myqcloud.com/{key}")
                    break
                except Exception as e:
                    if attempt == 4:
                        raise
                    wait = 4 * attempt
                    print(f"  ⚠ 上传失败 ({e})，{wait}s 后重试…")
                    import time

                    time.sleep(wait)


def parse_vtt_cues(path: Path) -> list[dict]:
    cues: list[dict] = []
    if not path.exists():
        return cues
    text = path.read_text(encoding="utf-8")

    def parse_ts(ts: str) -> float:
        h, m, s = ts.strip().split(":")
        sec, ms = s.split(".")
        return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000

    for block in re.split(r"\n\n+", text.strip()):
        lines = block.strip().split("\n")
        if len(lines) < 3 or "-->" not in lines[1]:
            continue
        start_s, end_s = [x.strip() for x in lines[1].split("-->")]
        en = lines[2]
        zh = lines[3] if len(lines) > 3 else ""
        cues.append({"start": parse_ts(start_s), "end": parse_ts(end_s), "en": en, "zh": zh})
    return cues


def write_manifest() -> None:
    manifest = {
        "cosBase": COS_BASE,
        "speechRate": AZURE_SPEECH_RATE,
        "videos": [
            {
                "id": v["id"],
                "file": v["file"],
                "url": f"{COS_BASE}/{v['file']}",
                "vtt": f"{COS_BASE}/{v['file'].replace('.mp4', '.vtt')}",
                "title": v["title"],
                "titleZh": v["title_zh"],
                "vpid": v["vpid"],
                "cues": VIDEO_CUES.get(v["id"])
                or parse_vtt_cues(VIDEO_DIR / v["file"].replace(".mp4", ".vtt")),
            }
            for v in VIDEOS
        ],
    }
    out = VIDEO_DIR / "manifest.json"
    out.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    js = "window.REPTILE_VIDEO_MANIFEST = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n"
    (VIDEO_DIR / "manifest.js").write_text(js, encoding="utf-8")
    print(f"  ✓ manifest → {out}")


def has_existing_course_video(spec: dict) -> bool:
    out = VIDEO_DIR / spec["file"]
    if not out.exists() or out.stat().st_size < 500_000:
        return False
    # 较大的已生成 MP4 默认保留，需 --force-synthetic 才覆盖
    return out.stat().st_size > 8_000_000


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--upload-only", action="store_true")
    parser.add_argument("--skip-upload", action="store_true")
    parser.add_argument("--force-synthetic", action="store_true", help="即使已有较大 MP4 也重新合成")
    args = parser.parse_args()

    VIDEO_DIR.mkdir(parents=True, exist_ok=True)

    if not args.upload_only:
        if not shutil.which("ffmpeg"):
            sys.exit("需要 ffmpeg")
        print(
            f"生成 S-Class 科学课程视频（语速 {AZURE_SPEECH_RATE} · 句间留白 {SLIDE_PAD_SEC}s · Ken Burns + 字幕）…"
        )
        for spec in VIDEOS:
            if not args.force_synthetic and has_existing_course_video(spec):
                print(f"  跳过合成（已存在课程视频）: {spec['file']}")
                continue
            build_video(spec)
        write_manifest()

    if not args.skip_upload:
        print("上传到腾讯 COS…")
        upload_videos()
        if args.upload_only:
            write_manifest()


if __name__ == "__main__":
    main()
