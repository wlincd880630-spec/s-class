# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is
`S-Class | English Learning` is a **100% static** front-end site (plain HTML/CSS/vanilla JS). There is **no backend, no build step, no bundler, and no automated lint/test suite**. "Running the app" means serving the repo over HTTP and opening pages in a browser. See `README.md` for the module map and feature details.

### Running the site (dev)
- Serve the repo root over HTTP, then open pages in a browser:
  - `python3 -m http.server 8080` → open `http://localhost:8080/index.html`
  - (`npx serve .` also works, per `README.md`.)
- Use HTTP, **not** `file://`: data-driven modules (e.g. `AEIS/*/database.json`, `CEE/enriched_questions/*.json`) load JSON via `fetch()` which fails on `file://`.
- No fixed port is required; docs also reference `8080` and `8765`.

### Login bypass for local testing (important, non-obvious)
- Sub-pages are guarded by `scripts/auth-check.js`, which redirects to the site's `index.html` unless a user is present in `localStorage`. Production login uses Authing OIDC (external SaaS, needs a whitelisted callback URL).
- To test any sub-page locally without Authing, set both keys in the browser DevTools console, then reload:
  ```js
  localStorage.setItem('authing-user','TestStudent'); localStorage.setItem('current-user','TestStudent'); location.reload();
  ```
  The home page then shows `Hi, <name> · 欢迎回来`. If a sub-page bounces you back to the home page, the bypass keys are missing.

### External services (all client-side, graceful/optional)
API keys for these are hard-coded / injected via `window.*` inside the HTML/JS, not env vars. None run locally and none are needed to serve/interact with most content:
- **Azure Speech** (TTS/STT) — falls back to the browser Web Speech API when unavailable.
- **DeepSeek** (AI feedback / word lookup), **EmailJS** (learning-report emails), **Authing** (login) — feature-specific; pages degrade or just show an error if unreachable.
- **Tencent Cloud COS** hosts all media. Media files (`*.png/jpg/mp3/mp4/...`) are git-ignored (see `.gitignore`), so they are **absent from the repo** and load from COS URLs (or are simply missing) when served locally. Missing media is expected, not an environment failure.

### Optional dev tooling (not needed to run the site)
- Root `package.json` only pulls `cos-nodejs-sdk-v5` for the COS media scripts in `scripts/` (upload/verify/rewrite). These require a git-ignored `.cos-config.json` with Tencent credentials.
- `Grammar/scripts/` (`puppeteer-core`, `html-to-docx`) is a separate npm project for exporting Grammar handouts to PDF/DOCX; run `npm install` inside that folder only if you need it.

### Known content bugs (not environment issues)
- Some content pages have pre-existing JS errors (e.g. `AEIS/P01/index.html` flashcard navigation throws `hasSlve is not defined`). These are bugs in the page code, not setup problems. The interactive quiz flow is fully functional on other pages (e.g. `Grammar/L03/lesson03-page09-quiz.html`).
