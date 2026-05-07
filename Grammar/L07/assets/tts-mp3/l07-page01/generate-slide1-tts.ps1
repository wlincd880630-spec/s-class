# 使用 Google Cloud Text-to-Speech（与 Vertex 同属 GCP，项目 project-ec12c6e5-5e03-4771-add）
# 需已执行: gcloud auth login 且对项目有 TTS 权限
$ErrorActionPreference = "Stop"
$outDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$token = gcloud auth print-access-token
$uri = "https://texttospeech.googleapis.com/v1/text:synthesize"
$headers = @{
  Authorization = "Bearer $token"
  "Content-Type" = "application/json"
  "x-goog-user-project" = "project-ec12c6e5-5e03-4771-add"
}

$payloads = @(
  @{ file = "slide1-intro.mp3"; text = "Welcome to the warm-up before the giant arena. Look at the four ideas around you: speed, height, weight, and power. Each idea needs two opposite adjectives. Drag them into the glowing stone slots. Let us start with speed." }
  @{ file = "p1-mentor-speed.mp3"; text = "Before we enter the arena, let's unlock the power words. What adjectives do we use to describe SPEED?" }
  @{ file = "p1-mentor-weight.mp3"; text = "Wonderful focus. Now think carefully—what adjectives do we use to describe WEIGHT?" }
  @{ file = "p1-mentor-height.mp3"; text = "Great work. Let's reach higher—what adjectives do we use to describe HEIGHT?" }
  @{ file = "p1-mentor-power.mp3"; text = "Almost there—which adjectives do we use to describe POWER or strength?" }
)

foreach ($p in $payloads) {
  $bodyObj = @{
    input       = @{ text = $p.text }
    voice       = @{ languageCode = "en-US"; name = "en-US-Neural2-J" }
    audioConfig = @{ audioEncoding = "MP3"; speakingRate = 0.92 }
  }
  $body = $bodyObj | ConvertTo-Json -Depth 5 -Compress
  $res = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body
  $bytes = [Convert]::FromBase64String($res.audioContent)
  $dest = Join-Path $outDir $p.file
  [IO.File]::WriteAllBytes($dest, $bytes)
  Write-Host "Wrote $dest"
}
