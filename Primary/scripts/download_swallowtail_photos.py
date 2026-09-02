#!/usr/bin/env python3
"""Download CC-licensed Papilio machaon photos from Wikimedia Commons."""
from __future__ import annotations

import json
import os
import subprocess
import urllib.parse
import urllib.request

DEST = os.path.join(
    os.path.dirname(__file__),
    "..",
    "Flutter Butterfly",
    "flutter-butterfly-courseware",
    "images",
    "lifecycle",
)
UA = "S-ClassEnglishLearning/1.0 (educational courseware; static site)"

FILES = {
    "egg-yellow.jpg": "File:Papilio machaon new egg.jpg",
    "egg-yellow-b.jpg": "File:Egg of Old World Swallowtail (Papilio machaon) 01.JPG",
    "egg-brown.jpg": "File:Egg of Old World Swallowtail (Papilio machaon) 03.JPG",
    "egg-brown-b.jpg": "File:Egg of Old World Swallowtail (Papilio machaon) 04.JPG",
    "egg-laying.jpg": "File:Papilio machaon laying eggs on Ruta chalepensis.jpg",
    "cat-green.jpg": "File:Papilio Machaon caterpillar.JPG",
    "cat-green-eat.jpg": "File:Papilio machaon - Fressende Schwalbenschwanz-Raupe.jpg",
    "cat-green-side.jpg": "File:Papilio machaon caterpillar (side view) - Keila.jpg",
    "cat-green-dill.jpg": "File:Chenille de Grand porte queue (macaon).jpg",
    "pupa-green.jpg": "File:Papilio machaon green pupa.jpg",
    "pupa-brown.jpg": "File:Papilio machaon chrysalis.jpg",
    "pupa-chrysalis.jpg": "File:Papilio machaon - eclosion A - 01 - chrysalis.jpg",
    "pupa-pupation.jpg": "File:Papilio machaon pupation.jpg",
    "adult-land.jpg": "File:Papilio machaon (feeding nectar).JPG",
    "adult-spread.jpg": "File:Papilio machaon Mitterbach 01.jpg",
    "adult-flying.jpg": "File:Flying Swallowtail (Papilio machaon).jpg",
    "adult-nectar-b.jpg": "File:Schwalbenschwanz (Papilio machaon).jpg",
    "adult-underside.jpg": "File:Old World swallowtail (Papilio machaon gorganus) underside Hungary.jpg",
    "adult-open.jpg": "File:Papilio machaon 02 04102009.jpg",
    "emerge-chrysalis.jpg": "File:Papilio machaon - eclosion A - 01 - chrysalis.jpg",
    "emerge-out.jpg": "File:Papilio machaon - eclosion A - 03 - only just out of the chrysalis.jpg",
    "emerge-ready.jpg": "File:Papilio machaon - eclosion A - 07 - ready to take flight.jpg",
}


def api(titles):
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(
        {
            "action": "query",
            "format": "json",
            "titles": "|".join(titles),
            "prop": "imageinfo",
            "iiprop": "url|extmetadata|size|mime",
            "iiurlwidth": 1600,
        }
    )
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45) as r:
        return json.loads(r.read().decode())


def download(url: str, dest: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    tmp = dest + ".dl"
    with urllib.request.urlopen(req, timeout=90) as r, open(tmp, "wb") as f:
        f.write(r.read())
    subprocess.check_call(
        [
            "ffmpeg",
            "-y",
            "-i",
            tmp,
            "-vf",
            "scale=1280:960:force_original_aspect_ratio=increase,crop=1280:960",
            "-q:v",
            "3",
            dest,
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    os.remove(tmp)


def main():
    os.makedirs(DEST, exist_ok=True)
    titles = list(dict.fromkeys(FILES.values()))
    data = api(titles)
    by_title = {}
    credits = []
    for p in data.get("query", {}).get("pages", {}).values():
        title = p.get("title")
        ii = (p.get("imageinfo") or [{}])[0]
        meta = ii.get("extmetadata", {})
        by_title[title] = {
            "url": ii.get("thumburl") or ii.get("url"),
            "lic": (meta.get("LicenseShortName") or {}).get("value", ""),
            "artist": (meta.get("Artist") or {}).get("value", "")[:180],
            "credit": (meta.get("Credit") or {}).get("value", "")[:120],
        }
    for dest_name, title in FILES.items():
        info = by_title.get(title)
        if not info or not info.get("url"):
            print("MISSING", dest_name, title)
            continue
        dest = os.path.join(DEST, dest_name)
        print("GET", dest_name)
        download(info["url"], dest)
        credits.append(
            {
                "file": dest_name,
                "commons": title,
                "license": info["lic"],
                "artist": info["artist"],
            }
        )
        print(" OK", dest, os.path.getsize(dest) // 1024, "KB")
    with open(os.path.join(DEST, "CREDITS.json"), "w", encoding="utf-8") as f:
        json.dump(credits, f, ensure_ascii=False, indent=2)
        f.write("\n")


if __name__ == "__main__":
    main()
