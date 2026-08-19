import glob
import os
import urllib.request

KEY = "9wqQjcwatmfHXVoMv9nO6I2teZBS6LSZL6ROW85tO6fL4ahKjsIaJQQJ99CHACqBBLyXJ3w3AAAYACOGvelV"
REGION = "southeastasia"

url = f"https://{REGION}.tts.speech.microsoft.com/cognitiveservices/v1"
ssml = (
    '<speak version="1.0" xml:lang="en-GB">'
    '<voice name="en-GB-RyanNeural">Hello test</voice></speak>'
)
req = urllib.request.Request(url, data=ssml.encode("utf-8"), method="POST")
req.add_header("Ocp-Apim-Subscription-Key", KEY)
req.add_header("Content-Type", "application/ssml+xml; charset=utf-8")
req.add_header("X-Microsoft-OutputFormat", "audio-16khz-128kbitrate-mono-mp3")
with urllib.request.urlopen(req, timeout=20) as r:
    data = r.read()
    print("azure", r.status, "bytes", len(data))

mp3s = glob.glob(r"D:\s-class\Grammar\L05\assets\tts-mp3\*.mp3")[:1]
if mp3s:
    name = os.path.basename(mp3s[0])
    cos = (
        "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com"
        f"/s-class/Grammar/L05/assets/tts-mp3/{name}"
    )
    req2 = urllib.request.Request(cos, method="HEAD")
    with urllib.request.urlopen(req2, timeout=15) as r2:
        print("cos", name, r2.status)

site = "https://www.s-class.top/Grammar/shared/play-local-mp3.js"
with urllib.request.urlopen(site, timeout=15) as r3:
    t = r3.read().decode("utf-8", "replace")
    print("prod COS support:", "cosUrlForLessonAsset" in t, "cosUrlFromPageAbs" in t)
