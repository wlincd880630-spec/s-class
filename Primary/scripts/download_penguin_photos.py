#!/usr/bin/env python3
"""Download CC-licensed penguin photos from Wikimedia Commons."""
from __future__ import annotations

import json
import os
import subprocess
import urllib.parse
import urllib.request

DEST = os.path.join(
    os.path.dirname(__file__),
    "..",
    "Hello Penguins",
    "hello-penguins-courseware",
    "images",
    "science",
)
UA = "S-ClassEnglishLearning/1.0 (educational courseware; static site)"

FILES = {
    "emperor-ice.jpg": "File:Emperor Penguin Manchot empereur.jpg",
    "emperor-huddle.jpg": "File:Emperor penguins crowd.jpg",
    "emperor-big.jpg": "File:Emperor penguin with chick.jpg",
    "emperor-walk.jpg": "File:Aptenodytes forsteri -Snow Hill Island.jpg",
    "magellanic-beach.jpg": "File:Spheniscus magellanicus -Magellanic Penguin.jpg",
    "magellanic-nest.jpg": "File:Magellanic penguin, Valdes Peninsula, Argentina.jpg",
    "magellanic-pair.jpg": "File:Magellanic Penguin (Spheniscus magellanicus).jpg",
    "snares-forest.jpg": "File:Snares Penguin.jpg",
    "snares-roots.jpg": "File:Eudyptes robustus -Snares Islands.jpg",
    "snares-crest.jpg": "File:Snares crested penguin.jpg",
    "fairy-small.jpg": "File:Eudyptula minor -Little Penguin -Melbourne Zoo.jpg",
    "fairy-beach.jpg": "File:Little penguin PHD111.jpg",
    "fairy-two.jpg": "File:Little Blue Penguins.jpg",
    "rockhopper-fancy.jpg": "File:Southern Rockhopper Penguin.jpg",
    "rockhopper-crest.jpg": "File:Eudyptes chrysocome -Southern Rockhopper Penguin.jpg",
    "rockhopper-hop.jpg": "File:Rockhopper penguin.jpg",
    "adelie-plain.jpg": "File:Adelie Penguin.jpg",
    "adelie-ice.jpg": "File:Pygoscelis adeliae.jpg",
    "adelie-group.jpg": "File:Adelie penguins in Antarctica.jpg",
    "chinstrap-shuffle.jpg": "File:Chinstrap Penguin.jpg",
    "chinstrap-group.jpg": "File:Pygoscelis antarctica.jpg",
    "chinstrap-close.jpg": "File:Chinstrap Penguin (Pygoscelis antarctica).jpg",
    "humboldt-fish.jpg": "File:Humboldt Penguin.jpg",
    "humboldt-swim.jpg": "File:Spheniscus humboldti -Humboldt Penguin.jpg",
    "humboldt-land.jpg": "File:Humboldt Penguins.jpg",
    "gentoo-land.jpg": "File:Gentoo Penguin.jpg",
    "gentoo-beach.jpg": "File:Pygoscelis papua -Gentoo penguin.jpg",
    "gentoo-jump.jpg": "File:Gentoo penguin jumping.jpg",
    "penguin-slide.jpg": "File:Penguin tobogganing.jpg",
    "penguin-swim.jpg": "File:Penguin underwater.jpg",
    "penguin-splash.jpg": "File:Gentoo penguin porpoising.jpg",
    "penguin-fish.jpg": "File:Penguin with fish.jpg",
    "penguin-waddle.jpg": "File:Penguin walking.jpg",
    "king-plain.jpg": "File:King Penguin.jpg",
    "galapagos.jpg": "File:Galapagos Penguin.jpg",
    "african.jpg": "File:African Penguin.jpg",
    "macaroni.jpg": "File:Macaroni Penguin.jpg",
    "yellow-eyed.jpg": "File:Yellow-eyed Penguin.jpg",
    "fiordland.jpg": "File:Fiordland Penguin.jpg",
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


def search(q):
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(
        {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": q,
            "srnamespace": 6,
            "srlimit": 8,
        }
    )
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45) as r:
        data = json.loads(r.read().decode())
    return [h["title"] for h in data.get("query", {}).get("search", [])]


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
            # Top-center crop keeps penguin heads visible in 4:3 frames.
            "scale=1280:960:force_original_aspect_ratio=increase,crop=1280:960:(iw-1280)/2:0",
            "-q:v",
            "3",
            dest,
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    os.remove(tmp)


FALLBACK_QUERY = {
    "emperor-ice.jpg": "Emperor penguin Antarctica",
    "emperor-huddle.jpg": "Emperor penguin huddle",
    "emperor-big.jpg": "Emperor penguin adult",
    "emperor-walk.jpg": "Aptenodytes forsteri",
    "magellanic-beach.jpg": "Magellanic penguin beach",
    "magellanic-nest.jpg": "Magellanic penguin nest",
    "magellanic-pair.jpg": "Spheniscus magellanicus",
    "snares-forest.jpg": "Snares penguin",
    "snares-roots.jpg": "Eudyptes robustus",
    "snares-crest.jpg": "Snares crested penguin",
    "fairy-small.jpg": "Little penguin Eudyptula minor",
    "fairy-beach.jpg": "Little blue penguin",
    "fairy-two.jpg": "Fairy penguin",
    "rockhopper-fancy.jpg": "Southern rockhopper penguin",
    "rockhopper-crest.jpg": "Eudyptes chrysocome",
    "rockhopper-hop.jpg": "Rockhopper penguin crest",
    "adelie-plain.jpg": "Adelie penguin",
    "adelie-ice.jpg": "Pygoscelis adeliae",
    "adelie-group.jpg": "Adelie penguins colony",
    "chinstrap-shuffle.jpg": "Chinstrap penguin",
    "chinstrap-group.jpg": "Pygoscelis antarcticus",
    "chinstrap-close.jpg": "Chinstrap penguin close",
    "humboldt-fish.jpg": "Humboldt penguin",
    "humboldt-swim.jpg": "Spheniscus humboldti",
    "humboldt-land.jpg": "Humboldt penguin land",
    "gentoo-land.jpg": "Gentoo penguin",
    "gentoo-beach.jpg": "Pygoscelis papua",
    "gentoo-jump.jpg": "Gentoo penguin jumping",
    "penguin-slide.jpg": "penguin tobogganing slide ice",
    "penguin-swim.jpg": "penguin swimming underwater",
    "penguin-splash.jpg": "penguin porpoising splash",
    "penguin-fish.jpg": "penguin eating fish",
    "penguin-waddle.jpg": "penguin walking waddle",
    "king-plain.jpg": "King penguin",
    "galapagos.jpg": "Galapagos penguin",
    "african.jpg": "African penguin",
    "macaroni.jpg": "Macaroni penguin",
    "yellow-eyed.jpg": "Yellow-eyed penguin",
    "fiordland.jpg": "Fiordland penguin forest",
}


def resolve_title(dest_name, preferred, cache):
    if preferred in cache and cache[preferred].get("url"):
        return preferred
    q = FALLBACK_QUERY.get(dest_name)
    if not q:
        return preferred
    for title in search(q):
        if title not in cache:
            try:
                data = api([title])
                for p in data.get("query", {}).get("pages", {}).values():
                    t = p.get("title")
                    ii = (p.get("imageinfo") or [{}])[0]
                    meta = ii.get("extmetadata", {})
                    cache[t] = {
                        "url": ii.get("thumburl") or ii.get("url"),
                        "lic": (meta.get("LicenseShortName") or {}).get("value", ""),
                        "artist": (meta.get("Artist") or {}).get("value", "")[:180],
                    }
            except Exception as e:
                print("search api fail", title, e)
                continue
        if cache.get(title, {}).get("url"):
            print("FALLBACK", dest_name, "->", title)
            return title
    return preferred


def main():
    os.makedirs(DEST, exist_ok=True)
    titles = list(dict.fromkeys(FILES.values()))
    cache = {}
    # chunk titles 40
    for i in range(0, len(titles), 40):
        chunk = titles[i : i + 40]
        try:
            data = api(chunk)
        except Exception as e:
            print("API batch fail", e)
            continue
        for p in data.get("query", {}).get("pages", {}).values():
            title = p.get("title")
            ii = (p.get("imageinfo") or [{}])[0]
            meta = ii.get("extmetadata", {})
            cache[title] = {
                "url": ii.get("thumburl") or ii.get("url"),
                "lic": (meta.get("LicenseShortName") or {}).get("value", ""),
                "artist": (meta.get("Artist") or {}).get("value", "")[:180],
            }
    credits = {
        "note": "Most photos are real penguins from Wikimedia Commons under their stated licenses. Missing stages may be photoreal educational stills.",
        "files": [],
        "extra": [],
    }
    for dest_name, title in FILES.items():
        title = resolve_title(dest_name, title, cache)
        info = cache.get(title) or {}
        if not info.get("url"):
            print("MISSING", dest_name, title)
            continue
        dest = os.path.join(DEST, dest_name)
        print("GET", dest_name)
        try:
            download(info["url"], dest)
        except Exception as e:
            print("FAIL", dest_name, e)
            continue
        credits["files"].append(dest_name)
        credits["extra"].append(
            {
                "file": dest_name,
                "commons": title,
                "license": info.get("lic", ""),
                "artist": info.get("artist", ""),
            }
        )
        print(" OK", dest, os.path.getsize(dest) // 1024, "KB")
    with open(os.path.join(DEST, "CREDITS.json"), "w", encoding="utf-8") as f:
        json.dump(credits, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("got", len(credits["files"]), "photos")


if __name__ == "__main__":
    main()
