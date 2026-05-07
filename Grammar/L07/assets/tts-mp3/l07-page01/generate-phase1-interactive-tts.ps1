# Google Cloud Text-to-Speech（与 Vertex 同属 GCP 项目，用于预生成课堂 MP3）
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
  @{ file = "p1-lead-en.mp3";   text = "Think of a word for each picture. What does this picture talk about?" }
  @{ file = "p1-kw-speed.mp3";   text = "speed" }
  @{ file = "p1-kw-weight.mp3";  text = "weight" }
  @{ file = "p1-kw-height.mp3";  text = "height" }
  @{ file = "p1-kw-power.mp3";   text = "power" }
  @{ file = "p1-q-speed.mp3";    text = "How do you describe speed? Think of two adjectives to talk about speed." }
  @{ file = "p1-q-weight.mp3";   text = "How do you describe weight? Think of two adjectives to talk about weight." }
  @{ file = "p1-q-height.mp3";   text = "How do you describe height? Think of two adjectives to talk about height." }
  @{ file = "p1-q-power.mp3";    text = "How do you describe power? Think of two adjectives to talk about power." }
)
foreach ($p in $payloads) {
  $bodyObj = @{
    input       = @{ text = $p.text }
    voice       = @{ languageCode = "en-US"; name = "en-US-Neural2-J" }
    audioConfig = @{ audioEncoding = "MP3"; speakingRate = 0.9 }
  }
  $body = $bodyObj | ConvertTo-Json -Depth 5 -Compress
  $res = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body
  $bytes = [Convert]::FromBase64String($res.audioContent)
  $dest = Join-Path $outDir $p.file
  [IO.File]::WriteAllBytes($dest, $bytes)
  Write-Host "Wrote $dest"
}
