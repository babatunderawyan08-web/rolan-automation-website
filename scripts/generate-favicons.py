from PIL import Image
from pathlib import Path

src = Path(
    r"C:\Users\babat\.cursor\projects\c-Users-babat-Projects-Rolan-Website\assets\c__Users_babat_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_discord_image-609fa73c-4192-4577-9938-95a99d24bf40.png"
)
root = Path(r"C:\Users\babat\Projects\Rolan Website")
app = root / "src" / "app"
public = root / "public"
images = public / "images"
icons_dir = public / "icons"

images.mkdir(parents=True, exist_ok=True)
icons_dir.mkdir(parents=True, exist_ok=True)
app.mkdir(parents=True, exist_ok=True)

if not src.exists():
    raise SystemExit(f"Source not found: {src}")

img = Image.open(src).convert("RGBA")
w, h = img.size
side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2
img = img.crop((left, top, left + side, top + side))


def resize(size: int) -> Image.Image:
    return img.resize((size, size), Image.Resampling.LANCZOS)


created = []


def save_png(path: Path, size: int) -> None:
    resize(size).save(path, format="PNG", optimize=True)
    created.append(path)


def save_ico(path: Path) -> None:
    # Save from full-res square so Pillow can downscale each requested size
    img.save(
        path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    created.append(path)


# App Router
save_ico(app / "favicon.ico")
save_png(app / "icon.png", 512)
save_png(app / "apple-icon.png", 180)

# Public
save_ico(public / "favicon.ico")
save_png(public / "icon.png", 512)
save_png(public / "apple-icon.png", 180)
save_png(public / "logo.png", 512)
save_png(images / "rolan-logo.png", 512)

# Icons set
for size in (16, 32, 48, 64, 128, 192, 256, 512):
    save_png(icons_dir / f"icon-{size}.png", size)
save_png(icons_dir / "apple-touch-icon.png", 180)

print(f"SOURCE: {src}")
print(f"SOURCE_SIZE: {w}x{h} cropped_to={side}x{side}")
print("---")
for p in created:
    exists = p.exists()
    nbytes = p.stat().st_size if exists else 0
    with Image.open(p) as im:
        dims = f"{im.size[0]}x{im.size[1]}"
        fmt = im.format
        ico_sizes = im.info.get("sizes") if fmt == "ICO" else None
    print(f"{'OK' if exists else 'MISSING'} {nbytes:8d} bytes  {dims:10s} {fmt:4s}  sizes={ico_sizes}  {p.relative_to(root)}")
print("---")
print(f"created={len(created)}")
