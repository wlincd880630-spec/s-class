#!/usr/bin/env python3
"""Build World's Largest Deserts course videos (Azure TTS + Ken Burns)."""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import textwrap
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COURSE = ROOT / "Primary" / "Worlds Largest Deserts" / "worlds-largest-deserts-courseware"
VIDEO_DIR = COURSE / "videos"
BUILD_DIR = VIDEO_DIR / "_build"
COS_BASE = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Worlds%20Largest%20Deserts/worlds-largest-deserts-courseware/videos"

AZURE_KEY = os.environ.get(
    "AZURE_SPEECH_KEY",
    "3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc",
)
AZURE_REGION = os.environ.get("AZURE_SPEECH_REGION", "eastasia")
AZURE_VOICE = "en-GB-RyanNeural"
AZURE_SPEECH_RATE = os.environ.get("DESERT_VIDEO_SPEECH_RATE", "0.72")
SLIDE_PAD_SEC = float(os.environ.get("DESERT_VIDEO_PAD_SEC", "0.55"))
KEN_BURNS_FPS = 25

VIDEOS = [
    {
        "id": "01-what-is-a-desert",
        "file": "01-what-is-a-desert.mp4",
        "title": "What is a desert?",
        "title_zh": "什么是沙漠？",
        "vpid": "sclass-desert-01",
        "sentences": [
            ("A desert is a very dry place.", "沙漠是非常干燥的地方。"),
            ("It gets little rain.", "雨水很少。"),
            ("Some deserts are hot. Some deserts are cold.", "有些沙漠很热。有些沙漠很冷。"),
            ("True deserts often get 25 centimeters of rain or less in a year.", "真正的沙漠一年降雨常常不超过25厘米。"),
            ("That is less than the length of a school ruler!", "那比一把尺子还短！"),
            ("The largest desert on Earth is not hot.", "地球上最大的沙漠并不热。"),
            ("It is the Antarctic Ice Sheet.", "它是南极冰盖。"),
            ("Polar deserts sit near the North and South Poles.", "极地沙漠靠近南北两极。"),
        ],
        "images": [
            ("local:images/words/desert.jpg", "desert"),
            ("local:images/words/dry.jpg", "dry"),
            ("local:images/words/hot.jpg", "hot"),
            ("local:images/words/rain.jpg", "rain"),
            ("local:images/words/largest.jpg", "largest"),
            ("local:images/words/antarctic.jpg", "antarctic"),
            ("local:images/words/polar.jpg", "polar"),
        ],
        "image_map": [0, 1, 2, 3, 3, 4, 5, 6],
    },
    {
        "id": "02-largest-deserts",
        "file": "02-largest-deserts.mp4",
        "title": "The largest deserts",
        "title_zh": "世界最大的沙漠",
        "vpid": "sclass-desert-02",
        "sentences": [
            ("The Antarctic Ice Sheet is the largest desert on Earth.", "南极冰盖是地球上最大的沙漠。"),
            ("The Arctic is the second largest desert.", "北极是第二大沙漠。"),
            ("The Sahara is the largest hot desert.", "撒哈拉是最大的热沙漠。"),
            ("It covers a vast part of northern Africa.", "它覆盖非洲北部的广阔地区。"),
            ("The Arabian Desert is in southwestern Asia.", "阿拉伯沙漠在亚洲西南部。"),
            ("The Gobi Desert is in Mongolia and China.", "戈壁沙漠在蒙古和中国。"),
            ("Tall mountains can block rain and make a rain shadow.", "高山会挡住雨水，形成雨影。"),
            ("More huge deserts wait around the world.", "世界各地还有更多大沙漠。"),
            ("Deserts are vast, dry, and often harsh.", "沙漠广阔、干燥，常常严酷。"),
            ("Next time you hear desert, think hot sand—and cold ice too!", "下次听到沙漠，想想热沙子——还有冷冰！"),
        ],
        "images": [
            ("local:images/words/antarctic.jpg", "antarctic"),
            ("local:images/words/arctic.jpg", "arctic"),
            ("local:images/words/sahara.jpg", "sahara"),
            ("local:images/words/africa.jpg", "africa"),
            ("local:images/words/arabian.jpg", "arabian"),
            ("local:images/words/gobi.jpg", "gobi"),
            ("local:images/words/shadow.jpg", "shadow"),
            ("local:images/words/worldmap.jpg", "worldmap"),
            ("local:images/words/harsh.jpg", "harsh"),
            ("local:images/words/cover.jpg", "cover"),
        ],
        "image_map": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
]

VIDEO_CUES: dict[str, list[dict]] = {}


def azure_tts(text: str, out_mp3: Path) -> None:
    import ssl
    esc = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
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
            "User-Agent": "s-class-desert-video",
        },
        method="POST",
    )
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
        out_mp3.write_bytes(resp.read())


def probe_duration(path: Path) -> float:
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        text=True,
    ).strip()
    return max(float(out), 0.5)


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


def ass_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("{", "\\{").replace("}", "\\}").replace("\n", "\\N")


def wrap_lines(text: str, width: int) -> str:
    return "\\N".join(textwrap.wrap(text, width=width)) if text else ""


def write_ass_caption(path: Path, en: str, zh: str, duration: float) -> None:
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
Dialogue: 0,0:00:00.00,{fmt_ass_time(duration)},EN,,0,0,0,,{ass_escape(wrap_lines(en, 46))}
Dialogue: 0,0:00:00.00,{fmt_ass_time(duration)},ZH,,0,0,0,,{ass_escape(wrap_lines(zh, 24))}
"""
    path.write_text(content, encoding="utf-8")


def pad_audio(audio: Path, out_audio: Path, pad_sec: float) -> float:
    dur = probe_duration(audio)
    total = dur + pad_sec
    subprocess.run(
        ["ffmpeg", "-y", "-i", str(audio), "-af", f"apad=pad_dur={pad_sec:.3f}",
         "-t", f"{total:.3f}", "-c:a", "aac", "-b:a", "128k", str(out_audio)],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
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
        ["ffmpeg", "-y", "-loop", "1", "-i", str(image), "-i", str(padded),
         "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p",
         "-vf", vf, "-c:a", "aac", "-b:a", "128k", "-t", f"{dur:.3f}",
         "-shortest", str(out_mp4)],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    padded.unlink(missing_ok=True)
    return dur


def concat_videos(parts: list[Path], out_mp4: Path) -> None:
    lst = out_mp4.with_suffix(".txt")
    lst.write_text("".join(f"file '{p.resolve()}'\n" for p in parts), encoding="utf-8")
    subprocess.run(
        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", str(out_mp4)],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    lst.unlink(missing_ok=True)


def write_vtt(cues: list[dict], path: Path) -> None:
    lines = ["WEBVTT", ""]
    for i, cue in enumerate(cues, 1):
        lines.append(str(i))
        lines.append(f"{fmt_vtt_time(cue['start'])} --> {fmt_vtt_time(cue['end'])}")
        lines.append(cue["en"])
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
        ext = Path(url).suffix or ".jpg"
        p = work / f"img_{i:02d}_{name}{ext}"
        source = COURSE / url.removeprefix("local:")
        if not source.exists():
            raise FileNotFoundError(source)
        shutil.copy2(source, p)
        images.append(p)

    slides: list[Path] = []
    cues: list[dict] = []
    t = 0.0
    image_map = spec.get("image_map") or list(range(len(spec["sentences"])))
    for i, (en, zh) in enumerate(spec["sentences"]):
        mp3 = work / f"audio_{i:03d}.mp3"
        azure_tts(en, mp3)
        img_idx = image_map[i] if i < len(image_map) else i % len(images)
        img = images[min(img_idx, len(images) - 1)]
        seg = work / f"slide_{i:03d}.mp4"
        ass = work / f"caption_{i:03d}.ass"
        dur = make_slide(img, mp3, seg, en, zh, ass)
        cues.append({"start": round(t, 3), "end": round(t + dur, 3), "en": en, "zh": zh})
        t += dur
        slides.append(seg)
        print(f"  [{spec['id']}] slide {i+1}/{len(spec['sentences'])} ({dur:.1f}s)")

    out = VIDEO_DIR / spec["file"]
    concat_videos(slides, out)
    vtt = VIDEO_DIR / spec["file"].replace(".mp4", ".vtt")
    write_vtt(cues, vtt)
    VIDEO_CUES[spec["id"]] = cues
    print(f"  ✓ {out.name} ({out.stat().st_size // 1024} KB)")
    return out


def write_manifest() -> None:
    videos = []
    for spec in VIDEOS:
        videos.append({
            "id": spec["id"],
            "file": spec["file"],
            "url": f"{COS_BASE}/{spec['file']}",
            "local": f"videos/{spec['file']}",
            "vtt": f"{COS_BASE}/{spec['file'].replace('.mp4', '.vtt')}",
            "title": spec["title"],
            "titleZh": spec["title_zh"],
            "vpid": spec["vpid"],
            "cues": VIDEO_CUES.get(spec["id"], []),
        })
    # Prefer local URL in browser when COS may 404
    for v in videos:
        v["url"] = v["local"]
    data = {"cosBase": COS_BASE, "speechRate": AZURE_SPEECH_RATE, "videos": videos}
    VIDEO_DIR.mkdir(parents=True, exist_ok=True)
    (VIDEO_DIR / "manifest.js").write_text(
        "window.DESERT_VIDEO_MANIFEST = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    (VIDEO_DIR / "manifest.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print("manifest written")


def main() -> None:
    VIDEO_DIR.mkdir(parents=True, exist_ok=True)
    (VIDEO_DIR / ".gitignore").write_text("_build/\n", encoding="utf-8")
    for spec in VIDEOS:
        print("Building", spec["id"])
        build_video(spec)
    write_manifest()
    print("DONE")


if __name__ == "__main__":
    main()
