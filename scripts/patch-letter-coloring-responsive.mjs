import fs from "fs";
import path from "path";

const dir = path.resolve("Primary/Alphabet/coloring-cards");
const letters = "GHIJKLMNOPQRSTUVWXYZ".split("");

const styleBlock = `    <style>
        html {
            -webkit-text-size-adjust: 100%;
            text-size-adjust: 100%;
        }
        body.coloring-body {
            min-height: 100dvh;
            overflow-x: clip;
            -webkit-tap-highlight-color: rgba(126, 87, 194, 0.12);
            padding-bottom: max(48px, env(safe-area-inset-bottom));
        }
        .coloring-toolbar {
            padding-top: max(14px, env(safe-area-inset-top));
            padding-left: max(20px, env(safe-area-inset-left));
            padding-right: max(20px, env(safe-area-inset-right));
        }
        .coloring-toolbar a,
        .coloring-toolbar button {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            touch-action: manipulation;
        }
        .page-viewport {
            width: min(210mm, calc(100vw - 24px));
            margin: 16px auto;
            overflow: hidden;
        }
        .page-viewport .coloring-sheet {
            margin: 0;
        }
        @media screen and (max-width: 720px) {
            .coloring-toolbar {
                flex-direction: column;
                align-items: stretch;
            }
            .coloring-toolbar a,
            .coloring-toolbar button {
                width: 100%;
            }
            .page-viewport {
                width: calc(100vw - 16px);
                margin: 12px auto;
            }
        }
        @media (hover: none) and (pointer: coarse) {
            .coloring-toolbar a:hover,
            .coloring-toolbar button:hover { transform: none; }
        }
        @media print {
            body.coloring-body { padding-bottom: 0; }
            .page-viewport {
                width: auto;
                height: auto;
                overflow: visible;
                margin: 0;
            }
            .page-viewport .coloring-sheet {
                transform: none !important;
                margin: 20px 0;
            }
        }
    </style>`;

const scriptBlock = `
    <script>
    (function () {
        var sheet = document.querySelector('.coloring-sheet');
        if (sheet) {
            var vp = document.createElement('div');
            vp.className = 'page-viewport';
            sheet.parentNode.insertBefore(vp, sheet);
            vp.appendChild(sheet);
        }

        function fitPageViewports() {
            if (window.matchMedia('print').matches) return;
            document.querySelectorAll('.page-viewport').forEach(function (vp) {
                var el = vp.querySelector('.coloring-sheet');
                if (!el) return;
                el.style.transform = 'none';
                el.style.transformOrigin = 'top left';
                var naturalW = el.offsetWidth;
                var targetW = vp.clientWidth;
                if (!naturalW || !targetW) return;
                var scale = Math.min(1, targetW / naturalW);
                el.style.transform = scale < 1 ? 'scale(' + scale + ')' : 'none';
                vp.style.height = scale < 1 ? el.offsetHeight * scale + 'px' : 'auto';
            });
        }

        var fitTimer;
        window.addEventListener('resize', function () {
            clearTimeout(fitTimer);
            fitTimer = setTimeout(fitPageViewports, 120);
        });
        window.addEventListener('orientationchange', fitPageViewports);
        window.addEventListener('load', fitPageViewports);
    })();
    </script>`;

const updated = [];
const skipped = [];

for (const L of letters) {
  const file = path.join(dir, `Letter-${L}.html`);
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("fitPageViewports")) {
    skipped.push(L);
    continue;
  }
  if (!html.includes("<style>")) {
    html = html.replace(
      /(\s*<link rel="stylesheet" href="coloring-shared\.css">)\s*<\/head>/,
      `$1\n${styleBlock}\n</head>`
    );
  }
  if (!html.includes("viewport-fit=cover")) {
    html = html.replace(
      /<meta name="viewport" content="width=device-width, initial-scale=1\.0[^"]*"\s*\/?>/,
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />'
    );
  }
  if (!html.includes("fitPageViewports")) {
    html = html.replace(/\s*<\/body>\s*<\/html>\s*$/, `${scriptBlock}\n</body>\n</html>`);
  }
  fs.writeFileSync(file, html, "utf8");
  updated.push(L);
}

console.log("Updated:", updated.join(", "));
console.log("Skipped:", skipped.length ? skipped.join(", ") : "(none)");
