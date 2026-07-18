"""Generate circular favicons and app icons from the ROLAN logo."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent

SOURCE_CANDIDATES = [
    ROOT / "public" / "images" / "rolan-logo.png",
    ROOT / "public" / "logo.png",
    Path(
        r"C:\Users\babat\.cursor\projects\c-Users-babat-Projects-Rolan-Website"
        r"\assets\c__Users_babat_AppData_Roaming_Cursor_User_workspaceStorage_"
        r"empty-window_images_discord_image-609fa73c-4192-4577-9938-95a99d24bf40.png"
    ),
]

ICON_SIZES = (16, 32, 48, 64, 128, 192, 256, 512)


def resolve_source() -> Path:
    for path in SOURCE_CANDIDATES:
        if path.is_file():
            return path
    raise FileNotFoundError("No logo source found among candidates")


def center_square_crop(img: Image.Image) -> Image.Image:
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    return img.crop((left, top, left + side, top + side))


def apply_circular_mask(img: Image.Image) -> Image.Image:
    """Fully transparent outside the inscribed circle; preserve logo colors."""
    size = img.size[0]
    assert img.size[0] == img.size[1]
    out = img.convert("RGBA")
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)
    r, g, b, a = out.split()
    a = Image.composite(a, Image.new("L", (size, size), 0), mask)
    return Image.merge("RGBA", (r, g, b, a))


def make_circular(img: Image.Image, size: int) -> Image.Image:
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    return apply_circular_mask(resized)


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", optimize=True)
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size} bytes, {img.size[0]}x{img.size[1]})")


def save_ico(images: list[Image.Image], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    # Pillow skips sizes larger than the primary image — use largest as primary
    frames = sorted(images, key=lambda im: im.size[0])
    primary = frames[-1]
    primary.save(
        path,
        format="ICO",
        sizes=[(im.size[0], im.size[1]) for im in frames],
        append_images=frames[:-1],
    )
    with Image.open(path) as ico:
        embedded = sorted(s[0] for s in ico.ico.sizes()) if hasattr(ico, "ico") else [ico.size[0]]
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size} bytes, sizes={embedded})")


def main() -> None:
    source = resolve_source()
    print(f"Source: {source}")
    # Fully load pixels before any overwrite of the same path
    base = Image.open(source).convert("RGBA")
    base.load()
    print(f"  opened {base.size[0]}x{base.size[1]} RGBA")
    square = center_square_crop(base)
    print(f"  center-cropped to {square.size[0]}x{square.size[1]}")

    needed = sorted(set(ICON_SIZES) | {180, 512})
    circular = {s: make_circular(square, s) for s in needed}

    ico_imgs = [circular[16], circular[32], circular[48]]

    print("\nGenerating outputs:")
    save_ico(ico_imgs, ROOT / "src" / "app" / "favicon.ico")
    save_png(circular[512], ROOT / "src" / "app" / "icon.png")
    save_png(circular[180], ROOT / "src" / "app" / "apple-icon.png")

    save_ico(ico_imgs, ROOT / "public" / "favicon.ico")
    save_png(circular[512], ROOT / "public" / "icon.png")
    save_png(circular[180], ROOT / "public" / "apple-icon.png")
    save_png(circular[512], ROOT / "public" / "logo.png")

    save_png(circular[512], ROOT / "public" / "images" / "rolan-logo.png")

    for s in ICON_SIZES:
        save_png(circular[s], ROOT / "public" / "icons" / f"icon-{s}.png")
    save_png(circular[180], ROOT / "public" / "icons" / "apple-touch-icon.png")

    print("\nVerification (file sizes):")
    verify_paths = [
        ROOT / "src" / "app" / "favicon.ico",
        ROOT / "src" / "app" / "icon.png",
        ROOT / "src" / "app" / "apple-icon.png",
        ROOT / "public" / "favicon.ico",
        ROOT / "public" / "icon.png",
        ROOT / "public" / "apple-icon.png",
        ROOT / "public" / "logo.png",
        ROOT / "public" / "images" / "rolan-logo.png",
        *[ROOT / "public" / "icons" / f"icon-{s}.png" for s in ICON_SIZES],
        ROOT / "public" / "icons" / "apple-touch-icon.png",
    ]
    for p in verify_paths:
        exists = p.is_file()
        size = p.stat().st_size if exists else 0
        extra = ""
        if exists and p.suffix.lower() == ".png":
            with Image.open(p) as im:
                im = im.convert("RGBA")
                px = im.getpixel((0, 0))
                mid = im.getpixel((im.size[0] // 2, im.size[1] // 2))
                extra = f" | corner_alpha={px[3]} center_alpha={mid[3]} {im.size[0]}x{im.size[1]}"
        elif exists and p.suffix.lower() == ".ico":
            with Image.open(p) as ico:
                embedded = sorted(s[0] for s in ico.ico.sizes()) if hasattr(ico, "ico") else [ico.size[0]]
                extra = f" | ico_sizes={embedded}"
        status = "OK" if exists and size > 0 else "MISSING"
        print(f"  {status} {p.relative_to(ROOT)}: {size} bytes{extra}")


if __name__ == "__main__":
    main()
