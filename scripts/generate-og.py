#!/usr/bin/env python3
"""Generate the 1200x630 Open Graph image. Brand colors match the product UI."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og.png"
LOGO = ROOT / "public" / "logo.png"

SCALE = 2
W, H = 1200 * SCALE, 630 * SCALE
BG = (250, 250, 249)
INK = (12, 12, 15)
MUTED = (91, 96, 112)
GREEN = (13, 122, 79)
GREEN_SOFT = (238, 248, 243)
LINE = (216, 240, 228)


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size * SCALE)


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, 16 * SCALE, H], fill=GREEN)

    # Abstract connected network on the right
    nodes = [
        (820, 150),
        (980, 110),
        (1120, 190),
        (900, 280),
        (1080, 320),
        (860, 430),
        (1040, 470),
        (1180, 390),
    ]
    links = [(0, 1), (1, 2), (0, 3), (3, 4), (2, 4), (3, 5), (5, 6), (4, 6), (6, 7), (2, 7)]
    for a, b in links:
        x1, y1 = nodes[a]
        x2, y2 = nodes[b]
        draw.line(
            [(x1 * SCALE, y1 * SCALE), (x2 * SCALE, y2 * SCALE)],
            fill=LINE,
            width=3 * SCALE,
        )
    for x, y in nodes:
        r = 9 * SCALE
        draw.ellipse(
            [(x * SCALE - r, y * SCALE - r), (x * SCALE + r, y * SCALE + r)],
            fill=GREEN_SOFT,
            outline=GREEN,
            width=2 * SCALE,
        )

    # Soft wash so text stays readable
    overlay = Image.new("RGBA", (W, H), (250, 250, 249, 0))
    ov = ImageDraw.Draw(overlay)
    for i in range(28):
        alpha = int(18 + i * 3)
        ov.rectangle([0, int(H * (0.55 + i * 0.016)), W, H], fill=(250, 250, 249, min(alpha, 210)))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    bold = font("/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf", 54)
    medium = font("/usr/share/fonts/truetype/ubuntu/Ubuntu-M.ttf", 24)
    regular = font("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf", 22)

    if LOGO.exists():
        logo = Image.open(LOGO).convert("RGBA")
        logo.thumbnail((92 * SCALE, 92 * SCALE), Image.Resampling.LANCZOS)
        img.paste(logo, (64 * SCALE, 78 * SCALE), logo)

    draw.text((64 * SCALE, 188 * SCALE), "Tokenly Health", font=medium, fill=GREEN)
    draw.text(
        (64 * SCALE, 236 * SCALE),
        "Better software.",
        font=bold,
        fill=INK,
    )
    draw.text(
        (64 * SCALE, 308 * SCALE),
        "Smoother everyday work.",
        font=bold,
        fill=INK,
    )
    draw.text(
        (64 * SCALE, 400 * SCALE),
        "Hospital billing  ·  Appointments  ·  Pharmacy inventory",
        font=regular,
        fill=MUTED,
    )
    draw.text((64 * SCALE, 524 * SCALE), "health.tokenly.in", font=medium, fill=MUTED)

    out = img.resize((1200, 630), Image.Resampling.LANCZOS)
    out.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
