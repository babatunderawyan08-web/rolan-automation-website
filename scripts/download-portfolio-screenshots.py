#!/usr/bin/env python3
"""Download authentic official/public product screenshots for portfolio cards.

Reads scripts/screenshot-sources.json and writes public/projects/*.png.
Never generates or draws UI mockups.
"""

from __future__ import annotations

import io
import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow required: pip install Pillow", file=sys.stderr)
    raise

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects"
SOURCES_PATH = ROOT / "scripts" / "screenshot-sources.json"

MIN_BYTES = 8000
MAX_WIDTH = 1600

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/122.0.0.0 Safari/537.36 RolanPortfolioAssetFetcher/1.0"
)


def looks_like_html(data: bytes, content_type: str) -> bool:
    ctype = (content_type or "").lower()
    if "html" in ctype:
        return True
    head = data[:512].lstrip().lower()
    if head.startswith(b"<!doctype html") or head.startswith(b"<html"):
        return True
    if b"<head" in head and b"<body" in data[:4096].lower():
        return True
    return False


def fetch(url: str, timeout: int = 60) -> bytes:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            "Referer": "https://www.google.com/",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        data = resp.read()
        ctype = resp.headers.get("Content-Type") or ""
        if looks_like_html(data, ctype):
            raise ValueError(f"Got HTML instead of image from {url}")
        if len(data) < MIN_BYTES:
            raise ValueError(f"Image too small ({len(data)} bytes): {url}")
        return data


def to_png(data: bytes, max_width: int = MAX_WIDTH) -> bytes:
    img = Image.open(io.BytesIO(data))
    if img.mode in ("RGBA", "P"):
        background = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "P":
            img = img.convert("RGBA")
        background.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
        img = background
    elif img.mode != "RGB":
        img = img.convert("RGB")
    if img.width > max_width:
        ratio = max_width / img.width
        img = img.resize((max_width, int(img.height * ratio)), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="PNG", optimize=True)
    return buf.getvalue()


def load_sources() -> dict[str, list[str]]:
    if not SOURCES_PATH.is_file():
        raise FileNotFoundError(f"Missing {SOURCES_PATH}")
    raw = json.loads(SOURCES_PATH.read_text(encoding="utf-8"))
    return {name: list(urls) for name, urls in raw.items()}


def download_one(filename: str, urls: list[str]) -> tuple[bool, str | None, int]:
    OUT.mkdir(parents=True, exist_ok=True)
    last_err = ""
    for url in urls:
        if not url or not url.strip():
            continue
        try:
            print(f"  try {filename} <- {url[:100]}...")
            data = fetch(url.strip())
            png = to_png(data)
            if len(png) < MIN_BYTES:
                raise ValueError(f"PNG too small after conversion ({len(png)} bytes)")
            path = OUT / filename
            path.write_bytes(png)
            print(f"  OK  {filename} ({len(png)} bytes) via {url}")
            return True, url, len(png)
        except Exception as exc:  # noqa: BLE001
            last_err = str(exc)
            print(f"  FAIL {exc}")
    print(f"  GAVE UP {filename}: {last_err}")
    return False, None, 0


def main() -> int:
    sources = load_sources()
    results: dict[str, dict] = {}
    failed: list[str] = []

    for name in sorted(sources.keys()):
        urls = sources[name]
        print(f"\n== {name} ==")
        ok, used_url, size = download_one(name, urls)
        results[name] = {"ok": ok, "url": used_url, "bytes": size}
        if not ok:
            failed.append(name)

    print("\n--- summary ---")
    for name in sorted(results):
        r = results[name]
        status = "OK" if r["ok"] else "FAIL"
        print(f"{status}\t{name}\t{r['bytes']}\t{r['url'] or ''}")

    if failed:
        print("\nFAILED:", ", ".join(failed))
        return 1
    print("\nAll portfolio screenshots downloaded.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
