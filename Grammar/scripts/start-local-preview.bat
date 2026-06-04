@echo off
chcp 65001 >nul
cd /d "%~dp0.."
echo.
echo 正在启动本地预览（http://localhost:8765）...
echo 浏览器打开例如：
echo   http://localhost:8765/L01/lesson01-page02-concept-map.html
echo.
echo 按 Ctrl+C 结束服务。
echo.
where py >nul 2>&1
if %errorlevel%==0 (
  py -3 -m http.server 8765
  goto :eof
)
where python >nul 2>&1
if %errorlevel%==0 (
  python -m http.server 8765
  goto :eof
)
echo 未找到 Python，请安装 Python 3 后重试。
pause
