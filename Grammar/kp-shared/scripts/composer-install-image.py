#!/usr/bin/env python3
"""Copy a generated image (png/webp) to destination .jpg path."""
from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "-q"])
    from PIL import Image


def main() -> None:
    if len(sys.argv) != 3:
        print("usage: composer-install-image.py <src> <dest.jpg>")
        sys.exit(1)
    src = Path(sys.argv[1])
    dest = Path(sys.argv[2])
    if not src.exists():
        print(f"missing source: {src}")
        sys.exit(1)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img = Image.open(src).convert("RGB")
    img.save(dest, "JPEG", quality=92, optimize=True)
    print(f"OK {dest} ({dest.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
