#!/usr/bin/env bash
# 临时活动清理：北京时间 2026-07-31 16:00 后删除顺序抽取页与首页入口。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

LOG="/tmp/temp-lottery-cleanup.log"
exec >>"$LOG" 2>&1

echo "==== $(date -u) / TZ=$(TZ=Asia/Shanghai date) ===="

EXPIRE_EPOCH=$(TZ=Asia/Shanghai date -d '2026-07-31 16:00:00' +%s 2>/dev/null \
  || date -d '2026-07-31T16:00:00+08:00' +%s)
NOW_EPOCH=$(date +%s)

if [ "$NOW_EPOCH" -lt "$EXPIRE_EPOCH" ]; then
  WAIT=$((EXPIRE_EPOCH - NOW_EPOCH + 45))
  echo "[temp-lottery-cleanup] waiting ${WAIT}s until after 16:00 CST..."
  sleep "$WAIT"
fi

strip_files() {
  local changed=0

  if [ -f temp-order-lottery.html ]; then
    git rm -f temp-order-lottery.html
    changed=1
  fi

  if grep -q 'temp-lottery-banner' index.html 2>/dev/null; then
    python3 - <<'PY'
from pathlib import Path
path = Path('index.html')
text = path.read_text(encoding='utf-8')
start = text.find('    <!-- 临时活动：顺序抽取')
end = text.find('    <section class="exam-spotlight" id="exam-2026">')
if start != -1 and end != -1 and start < end:
    path.write_text(text[:start] + text[end:], encoding='utf-8')
    print('removed homepage banner block')
else:
    raise SystemExit('homepage banner markers not found')
PY
    git add index.html
    changed=1
  fi

  if grep -q 'temp-lottery-banner' styles/s-class-home.css 2>/dev/null; then
    python3 - <<'PY'
from pathlib import Path
path = Path('styles/s-class-home.css')
text = path.read_text(encoding='utf-8')
start = text.find('/* 临时：课堂顺序抽取入口')
end = text.find('.exam-spotlight {')
if start != -1 and end != -1 and start < end:
    path.write_text(text[:start] + text[end:], encoding='utf-8')
    print('removed homepage banner css')
else:
    raise SystemExit('css markers not found')
PY
    git add styles/s-class-home.css
    changed=1
  fi

  if [ -f scripts/temp-lottery-cleanup.sh ]; then
    git rm -f scripts/temp-lottery-cleanup.sh || true
    changed=1
  fi

  echo "$changed"
}

push_with_retry() {
  local branch="$1"
  local delay
  for delay in 4 8 16 32; do
    if git push -u origin "$branch"; then
      echo "[temp-lottery-cleanup] pushed $branch"
      return 0
    fi
    echo "[temp-lottery-cleanup] push $branch failed, retry in ${delay}s"
    sleep "$delay"
  done
  return 1
}

clean_branch() {
  local branch="$1"
  echo "[temp-lottery-cleanup] cleaning on $branch"
  git fetch origin "$branch" 2>/dev/null || true
  git checkout -B "$branch" "origin/$branch" 2>/dev/null \
    || git checkout -B "$branch" "$branch" 2>/dev/null \
    || return 0

  local changed
  changed="$(strip_files)"
  if [ "$changed" = "0" ]; then
    echo "[temp-lottery-cleanup] nothing to clean on $branch"
    return 0
  fi
  if git diff --cached --quiet; then
    echo "[temp-lottery-cleanup] no staged changes on $branch"
    return 0
  fi
  git commit -m "$(cat <<'EOF'
chore: auto-remove temporary order lottery after 16:00

Remove the classroom order-draw page, homepage banner, and cleanup
script now that the 2026-07-31 16:00 Asia/Shanghai window has passed.
EOF
)"
  push_with_retry "$branch" || true
}

# 先清功能分支，再清 main（若已合并）
clean_branch cursor/temp-order-lottery-09ef
clean_branch main

echo "[temp-lottery-cleanup] finished"
