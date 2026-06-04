@echo off

chcp 65001 >nul

cd /d "%~dp0"

echo 正在用默认浏览器打开 page02（请在新标签页中操作，勿用 IDE 内嵌预览）

start "" "%~dp0lesson01-page02-concept-map.html"

pause


