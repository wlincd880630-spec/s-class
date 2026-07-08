# 删除 School_textbook 中与 courseware HTML 运行无关的文件
$base = "D:\s-class\Primary\School_textbook"

# 根目录生成脚本与数据
@(
  "scripts",
  "__pycache__",
  "word_units_config.py",
  "3-6年级英语单词表.json",
  "word_image_progress.json",
  "word_images_pending.json",
  "word_image_batch_progress.json",
  "_deploy_sync_report.json"
) | ForEach-Object {
  $p = Join-Path $base $_
  if (Test-Path $p) { Remove-Item $p -Recurse -Force; Write-Host "已删除: $_" }
}

Get-ChildItem $base -Filter "_upload_batch*.js" -ErrorAction SilentlyContinue | Remove-Item -Force

# Courseware 生成脚本
$cw = Join-Path $base "Courseware"
if (Test-Path (Join-Path $cw "scripts")) {
  Remove-Item (Join-Path $cw "scripts") -Recurse -Force
  Write-Host "已删除: Courseware/scripts"
}

# 各册 scripts 与非运行时 data json
foreach ($g in @("3GA","3GB","4GA","4GB","5GA","5GB","6GA")) {
  $scripts = Join-Path $cw "$g\scripts"
  if (Test-Path $scripts) { Remove-Item $scripts -Recurse -Force; Write-Host "已删除: $g/scripts" }
  $dataDir = Join-Path $cw "$g\assets\data"
  if (Test-Path $dataDir) {
    Get-ChildItem $dataDir -Filter "*.json" | Where-Object { $_.Name -ne "data.js" } | Remove-Item -Force
  }
  Get-ChildItem (Join-Path $cw $g) -Filter "README.md" -ErrorAction SilentlyContinue | Remove-Item -Force
}

Write-Host "清理完成"
