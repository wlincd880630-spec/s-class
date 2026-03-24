/**
 * 静态资源根地址（腾讯 COS 等 CDN）。
 * - 本地直接打开 HTML：保持 ""（空字符串），图片使用相对路径 asset/…
 * - 推送到 COS 后：改为桶上本课程目录的 URL，不要末尾 /
 *   例：https://your-bucket.cos.ap-guangzhou.myqcloud.com/主系表和非谓语
 *
 * 可复制 cos-config.example.js 改名覆盖；或仅在部署流水线里注入本文件。
 */
window.LINKING_ASSET_BASE = "";
