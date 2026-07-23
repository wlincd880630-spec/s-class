#!/usr/bin/env python3
"""
下载 BBC Bitesize 配图 + 用官方文稿 + Azure 英音合成视频，并上传到腾讯 COS。

说明：BBC iPlayer 视频在英国境外受地理限制，无法直接抓取原片。
本脚本使用 BBC 页面嵌入的官方 transcript 与 holding images 生成课程视频（内容与 BBC 一致）。

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
    "3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc",
)
AZURE_REGION = os.environ.get("AZURE_SPEECH_REGION", "eastasia")
AZURE_VOICE = "en-GB-RyanNeural"
# 小学四年级：放慢语速
AZURE_SPEECH_RATE = os.environ.get("REPTILE_VIDEO_SPEECH_RATE", "0.68")
# 每句结束后留白，更接近 BBC 原片节奏
SLIDE_PAD_SEC = float(os.environ.get("REPTILE_VIDEO_PAD_SEC", "0.55"))
KEN_BURNS_FPS = 25

VIDEOS = [
    {
        "id": "01-what-are-reptiles",
        "file": "01-what-are-reptiles.mp4",
        "title": "What are reptiles?",
        "title_zh": "什么是爬行动物？",
        "vpid": "p0k5jtcx",
        "sentences": [
            ("Hi I'm Tyler and this is Marion, a Sulcata tortoise.", "我是 Tyler，这是苏卡达陆龟 Marion。"),
            ("She has dry, scaly skin making her a reptile just like crocodiles, lizards, turtles and snakes.", "她有干燥、有鳞片的皮肤，是爬行动物，就像鳄鱼、蜥蜴、海龟和蛇一样。"),
            ("The grass snake is the UK's longest snake and having scaly skin protects it when moving across rough ground.", "草蛇是英国最长的蛇，鳞片皮肤能保护它爬过粗糙的地面。"),
            ("The adder has brown zigzags running along its skin.", "蝰蛇的皮肤上有棕色之字形花纹。"),
            ("They're also shy and hard to find.", "它们也很害羞，很难被发现。"),
            ("Some reptiles like snakes haven't got any legs whilst other reptiles like sand lizards have four.", "有些爬行动物如蛇没有腿，而有些如沙蜥有四条腿。"),
            ("The common lizard, smooth snake and slow worm can also be found living in the UK and reptiles are found living all over the world.", "普通蜥蜴、滑蛇和慢蠕虫也生活在英国，爬行动物遍布世界各地。"),
            ("The Komodo dragon is the heaviest lizard on earth.", "科莫多龙是地球上最重的蜥蜴。"),
            ("It lives on land.", "它生活在陆地上。"),
            ("Reptiles can also live in the water like turtles.", "爬行动物也能像海龟一样生活在水中。"),
            ("And sometimes both like the green anaconda.", "有时两者兼具，比如绿水蟒。"),
            ("Nearly all reptiles lay eggs.", "几乎所有爬行动物都产卵。"),
            ("They also breathe air like we do, so those who live in water must come up for air.", "它们也像我们一样呼吸空气，生活在水中的必须上来换气。"),
            ("As reptiles are cold-blooded they need to bask in the sun to warm themselves up and be ready for action.", "爬行动物是冷血动物，需要在阳光下取暖才能活动。"),
            ("And if you think reptiles look a bit like dinosaurs that's because dinosaurs were reptiles!", "如果你觉得爬行动物有点像恐龙，那是因为恐龙就是爬行动物！"),
            ("So because Marion is a reptile, that means that she lays eggs, has dry scaly skin, is cold blooded and breathes air.", "所以 Marion 是爬行动物：她产卵、有干燥鳞片皮肤、冷血并且呼吸空气。"),
            ("Oh and there she goes starting to walk off to have a sunbathe and keep warm.", "哦，她走开去晒太阳保暖了。"),
        ],
        "images": [
            ("https://ichef.bbci.co.uk/images/ic/1200xn/p0k5kbmq.jpg", "tyler_marion"),
            ("https://ichef.bbci.co.uk/images/ic/1200xn/p0jqtwdd.png", "reptiles_group"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg", "snake"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg", "lizard"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dvr.jpg", "tortoise"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dzp.jpg", "chameleon"),
            ("https://ichef.bbci.co.uk/images/ic/1200xn/p0k7026l.png", "komodo"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0k0xcxl.png", "basking"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0nyj7m7.jpg", "fossil"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0k5sd9f.png", "eggs"),
        ],
        # 每句对应配图（BBC 页面素材），避免轮播错位
        "image_map": [0, 1, 2, 2, 3, 4, 6, 6, 5, 5, 9, 2, 7, 8, 0, 0],
    },
    {
        "id": "02-reptiles-around-the-world",
        "file": "02-reptiles-around-the-world.mp4",
        "title": "Reptiles around the world",
        "title_zh": "世界各地的爬行动物",
        "vpid": "p02n9s9t",
        "sentences": [
            ("Reptiles are found on all the continents of the world except Antarctica.", "除南极洲外，世界各地都有爬行动物。"),
            ("There are four main types of reptiles: lizards and snakes, crocodiles and alligators, turtles and tortoises, and tuatara, which are only found in New Zealand.", "爬行动物主要有四类：蜥蜴和蛇、鳄鱼和短吻鳄、海龟和陆龟，以及仅生活在新西兰的喙头蜥。"),
            ("Each reptile has its own distinct features.", "每种爬行动物都有自己独特的特征。"),
            ("Snakes are reptiles which do not have limbs.", "蛇是没有四肢的爬行动物。"),
            ("The shell of a tortoise is part of its skeleton on the outside of its body.", "陆龟的壳是长在体外的骨骼的一部分。"),
            ("It is called an exoskeleton.", "这叫做外骨骼。"),
            ("A veiled chameleon has its own distinct features.", "高冠变色龙也有自己独特的特征。"),
            ("Some species of lizard drop their tails to escape predators.", "有些蜥蜴会断尾逃跑，躲避捕食者。"),
            ("Some reptiles live on land, while others like crocodiles spend much of their time in the water.", "有些生活在陆地，有些如鳄鱼大部分时间在水里。"),
            ("All reptiles have lungs and need air to breathe.", "所有爬行动物都有肺，需要空气才能呼吸。"),
            ("Reptiles are cold-blooded, which means they cannot control their body temperature.", "爬行动物是冷血动物，不能自己调节体温。"),
            ("Most reptiles lay eggs, but some reptiles such as skinks give birth to live young.", "大多数产卵，但有些石龙子直接生下幼崽。"),
            ("Most reptiles are carnivores and eat meat.", "大多数爬行动物是食肉动物。"),
            ("Turtles and tortoises are mostly herbivores.", "海龟和陆龟大多是食草动物。"),
        ],
        "images": [
            ("https://ichef.bbci.co.uk/images/ic/1200xn/p0b1sszy.jpg", "world"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dp2.jpg", "snake"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dvr.jpg", "tortoise"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74dzp.jpg", "chameleon"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0j74f2g.jpg", "lizard"),
            ("https://ichef.bbci.co.uk/images/ic/1200xn/p0jqtwdd.png", "crocodile"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0ksfnbg.jpg", "tuatara"),
            ("https://ichef.bbci.co.uk/images/ic/800xn/p0ksfqyf.jpg", "skink"),
        ],
        "image_map": [0, 0, 1, 2, 2, 3, 4, 5, 5, 1, 2, 3, 6, 7, 2],
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


def has_bbc_original(spec: dict) -> bool:
    out = VIDEO_DIR / spec["file"]
    if not out.exists() or out.stat().st_size < 500_000:
        return False
    # 合成版通常 < 8MB；BBC 原片一般明显更大
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
            f"生成 BBC 课程视频（语速 {AZURE_SPEECH_RATE} · 句间留白 {SLIDE_PAD_SEC}s · Ken Burns + 字幕）…"
        )
        for spec in VIDEOS:
            if not args.force_synthetic and has_bbc_original(spec):
                print(f"  跳过合成（已存在疑似 BBC 原片）: {spec['file']}")
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
