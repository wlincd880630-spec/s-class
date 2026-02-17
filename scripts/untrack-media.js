/**
 * 从 Git 跟踪中移除所有媒体文件（不删除本地文件），减轻 GitHub 仓库体积。
 * 执行后需 commit + push，媒体文件将不再出现在 GitHub 上；.gitignore 已忽略这些类型，不会再次被加入。
 *
 * 用法：node scripts/untrack-media.js [--dry]
 *   --dry  仅列出将要移除跟踪的文件，不执行 git rm --cached
 */

const path = require('path');
const { execSync, spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry');

const MEDIA_EXT_SET = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.ico',
  '.mp4', '.webm', '.mov', '.avi', '.mkv', '.flv', '.wmv',
  '.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'
]);

const out = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
const all = out.split(/\r?\n/).filter(Boolean);
const mediaFiles = all.filter(rel => MEDIA_EXT_SET.has(path.extname(rel).toLowerCase()));

if (mediaFiles.length === 0) {
  console.log('当前没有已跟踪的媒体文件，无需操作。');
  process.exit(0);
}

console.log('已跟踪的媒体文件数量：', mediaFiles.length);
if (DRY) {
  console.log('--dry：仅预览，不执行移除。将移除跟踪的文件（前 20 个示例）：');
  mediaFiles.slice(0, 20).forEach(f => console.log('  ', f));
  if (mediaFiles.length > 20) console.log('  ... 共', mediaFiles.length, '个');
  process.exit(0);
}

// 分批执行 git rm --cached，避免命令行过长（Windows 命令行限制较严）
const BATCH = 80;
let done = 0;
for (let i = 0; i < mediaFiles.length; i += BATCH) {
  const batch = mediaFiles.slice(i, i + BATCH);
  const r = spawnSync('git', ['rm', '--cached', '--ignore-unmatch', ...batch], { cwd: ROOT, stdio: 'inherit' });
  if (r.status !== 0) {
    console.error('本批失败，已处理:', done, '/', mediaFiles.length);
    throw new Error('git rm --cached 执行失败');
  }
  done += batch.length;
  console.log('已移除跟踪:', done, '/', mediaFiles.length);
}

console.log('\n完成。共从 Git 跟踪中移除了', mediaFiles.length, '个媒体文件（本地文件未删除）。');
console.log('请执行 git status 查看变更，然后 git commit -m "chore: 停止跟踪媒体文件，改由 COS 托管" 并 push。');
