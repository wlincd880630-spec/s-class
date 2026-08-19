#!/usr/bin/env python3
"""Build Moon course Apollo video (Azure TTS + Ken Burns) with bilingual captions.

Content adapted from Learn Bright “Apollo Space Missions for Kids”
(https://www.youtube.com/watch?v=fObYUyyE4Ak) for Lexile ~450 classroom use.
"""
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
COURSE = ROOT / "Primary" / "How many people have been to the Moon" / "how-many-people-have-been-to-the-moon-courseware"
VIDEO_DIR = COURSE / "videos"
BUILD_DIR = VIDEO_DIR / "_build"
COS_BASE = (
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/"
    "How%20many%20people%20have%20been%20to%20the%20Moon/"
    "how-many-people-have-been-to-the-moon-courseware/videos"
)

AZURE_KEY = os.environ.get(
    "AZURE_SPEECH_KEY",
    "8d055d682fcd4af98a51828e04542cd4",
)
AZURE_REGION = os.environ.get("AZURE_SPEECH_REGION", "eastasia")
AZURE_VOICE = "en-GB-RyanNeural"
AZURE_SPEECH_RATE = os.environ.get("MOON_VIDEO_SPEECH_RATE", "0.72")
SLIDE_PAD_SEC = float(os.environ.get("MOON_VIDEO_PAD_SEC", "0.55"))
KEN_BURNS_FPS = 25

SOURCE_NOTE = {
    "youtubeId": "fObYUyyE4Ak",
    "youtubeUrl": "https://www.youtube.com/watch?v=fObYUyyE4Ak",
    "channel": "Learn Bright",
    "title": "Apollo Space Missions for Kids",
}

VIDEOS = [
    {
        "id": "01-apollo-space-missions",
        "file": "01-apollo-space-missions.mp4",
        "title": "Apollo space missions",
        "title_zh": "阿波罗登月任务",
        "vpid": "sclass-moon-apollo-01",
        "sentences": [
            ("The Apollo space missions sent people to the Moon.", "阿波罗任务把人送到了月球。"),
            ("NASA ran these flights in the 1960s and early 1970s.", "NASA在1960年代和1970年代初执行这些飞行。"),
            ("They were part of the space race.", "它们是太空竞赛的一部分。"),
            ("Apollo 7 was the first successful Apollo flight.", "阿波罗7号是第一次成功的阿波罗飞行。"),
            ("It tested the ship in Earth orbit in 1968.", "它在1968年在地球轨道上测试飞船。"),
            ("Apollo 11 made history in 1969.", "阿波罗11号在1969年创造了历史。"),
            ("Neil Armstrong and Buzz Aldrin walked on the Moon.", "尼尔·阿姆斯特朗和巴兹·奥尔德林在月球上行走。"),
            ("Armstrong said it was one giant leap for mankind.", "阿姆斯特朗说，这对人类是一次巨大飞跃。"),
            ("Apollo 13 had a big problem in space.", "阿波罗13号在太空中出了大问题。"),
            ("The crew came home safely. People call it a successful failure.", "机组安全回家。人们称它为成功的失败。"),
            ("Apollo 17 was the last mission to land on the Moon.", "阿波罗17号是最后一次登月任务。"),
            ("Twelve people walked on the Moon in the Apollo years.", "阿波罗年代共有12人走过月球。"),
            ("Today, NASA plans for people to travel there again.", "今天，NASA计划让人们再次前往月球。"),
        ],
        "images": [
            ("local:images/words/apollo.jpg", "apollo"),
            ("local:images/words/nasa.jpg", "nasa"),
            ("local:images/words/rocket.jpg", "rocket"),
            ("local:images/words/apollo-11.jpg", "apollo11"),
            ("local:images/words/orbit.jpg", "orbit"),
            ("local:images/words/apollo11-crew.jpg", "crew"),
            ("local:images/words/neil-armstrong.jpg", "armstrong"),
            ("local:images/words/buzz-aldrin.jpg", "aldrin"),
            ("local:images/words/ship.jpg", "ship"),
            ("local:images/words/return.jpg", "return"),
            ("local:images/words/flag.jpg", "flag"),
            ("local:images/words/footprint.jpg", "footprint"),
            ("local:images/words/moon.jpg", "moon"),
        ],
        "image_map": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
            "User-Agent": "s-class-moon-video",
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
        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", str(out_mp4)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
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
        print(f"  [{spec['id']}] slide {i + 1}/{len(spec['sentences'])} ({dur:.1f}s)")

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
        videos.append(
            {
                "id": spec["id"],
                "file": spec["file"],
                "url": f"videos/{spec['file']}",
                "local": f"videos/{spec['file']}",
                "vtt": f"videos/{spec['file'].replace('.mp4', '.vtt')}",
                "title": spec["title"],
                "titleZh": spec["title_zh"],
                "vpid": spec["vpid"],
                "youtubeId": SOURCE_NOTE["youtubeId"],
                "youtubeUrl": SOURCE_NOTE["youtubeUrl"],
                "source": f"{SOURCE_NOTE['channel']} · {SOURCE_NOTE['title']}",
                "cues": VIDEO_CUES.get(spec["id"], []),
            }
        )
    data = {
        "cosBase": COS_BASE,
        "speechRate": AZURE_SPEECH_RATE,
        "source": SOURCE_NOTE,
        "videos": videos,
    }
    VIDEO_DIR.mkdir(parents=True, exist_ok=True)
    (VIDEO_DIR / "manifest.js").write_text(
        "window.MOON_VIDEO_MANIFEST = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    (VIDEO_DIR / "manifest.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print("manifest written")


def main() -> None:
    if not shutil.which("ffmpeg"):
        sys.exit("需要 ffmpeg")
    VIDEO_DIR.mkdir(parents=True, exist_ok=True)
    (VIDEO_DIR / ".gitignore").write_text("_build/\n", encoding="utf-8")
    for spec in VIDEOS:
        print("Building", spec["id"])
        build_video(spec)
    write_manifest()
    print("DONE")


if __name__ == "__main__":
    main()
