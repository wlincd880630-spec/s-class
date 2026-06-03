# -*- coding: utf-8 -*-
"""Post-process index.html: truncate junk, clean link cards, fix markup."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
html_path = ROOT / "index.html"
text = html_path.read_text(encoding="utf-8")

# 1. Keep only through first </html>
end = text.lower().find("</html>")
if end >= 0:
    text = text[: end + len("</html>")]

# 2. Fix stage-extra closing tag
text = text.replace(
    """            </div>
        </section>
        </div>
    </section>

    <footer class="site-footer" id="contact">""",
    """            </div>
            </div>
        </section>
        </div>
    </section>

    <footer class="site-footer" id="contact">""",
    1,
)

# 3. Transform phonics link cards (strip all inline styles)
def transform_phonics(m):
    href = m.group(1)
    badge = re.sub(r'\s+style="[^"]*"', '', m.group(2))
    title = re.sub(r'\s+style="[^"]*"', '', m.group(3))
    desc = re.sub(r'\s+style="[^"]*"', '', m.group(4))
    return (
        f'<a href="{href}" class="card-base unit-card card-link card-teal">\n'
        f'                    <div class="link-card-body">\n'
        f'                        <div class="unit-number">{badge.strip()}</div>\n'
        f'                        <div class="unit-title">{title.strip()}</div>\n'
        f'                        <div class="unit-desc">{desc.strip()}</div>\n'
        f'                    </div>\n'
        f'                    <i class="fas fa-arrow-right"></i>\n'
        f'                </a>'
    )


text = re.sub(
    r'<a href="(P/语音课/[^"]+)" class="card-base unit-card"(?:\s+style="[^"]*")?>\s*'
    r'<div><div class="unit-number"(?:\s+style="[^"]*")?>([^<]+)</div>'
    r'<div class="unit-title"(?:\s+style="[^"]*")?>([^<]+)</div>'
    r'<div class="unit-desc"(?:\s+style="[^"]*")?>([^<]+)</div></div>\s*'
    r'<i class="fas fa-arrow-right"(?:\s+style="[^"]*")?></i>\s*'
    r'</a>',
    transform_phonics,
    text,
)

# 4. Strip remaining inline styles on other link unit-cards
text = re.sub(
    r'(<a href="[^"]+" class="card-base unit-card(?: card-link card-teal)?)\s+style="[^"]*"',
    r'\1',
    text,
)

html_path.write_text(text + "\n", encoding="utf-8")
n_teal = text.count("card-teal")
print(f"Post-processed index.html — {n_teal} teal link cards")
