#!/usr/bin/env python3
"""Original square mark, with a medical plus in place of the T."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SOURCE = Path(__file__).resolve().parent / "logo-source.png"

INK = (49, 49, 49, 255)
WHITE = (255, 255, 255, 255)


def fit_square(image: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    fitted = image.copy()
    fitted.thumbnail((size, size), Image.Resampling.LANCZOS)
    canvas.paste(fitted, ((size - fitted.width) // 2, (size - fitted.height) // 2), fitted)
    return canvas


def outside_transparent(image: Image.Image) -> list[list[bool]]:
    width, height = image.size
    pixels = image.load()
    seen = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque()
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))
    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= width or y >= height or seen[y][x]:
            continue
        if pixels[x, y][3] > 24:
            continue
        seen[y][x] = True
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    return seen


def build() -> Image.Image:
    image = Image.open(SOURCE).convert("RGBA")
    pixels = image.load()
    width, height = image.size
    outside = outside_transparent(image)

    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if x >= 460:
                continue
            hole = alpha <= 24 and not outside[y][x]
            fringe = alpha > 24 and red > 170 and green > 170 and blue > 170 and 70 < x < 450
            if hole or fringe:
                pixels[x, y] = INK

    # The old T left a darker rim. Clear the face, then draw only the plus.
    draw = ImageDraw.Draw(image)
    draw.rectangle((170, 125, 450, 410), fill=INK)
    center_x, center_y = 292, 266
    arm = 92
    thick = 58
    draw.rectangle(
        (center_x - arm, center_y - thick // 2, center_x + arm, center_y + thick // 2),
        fill=WHITE,
    )
    draw.rectangle(
        (center_x - thick // 2, center_y - arm, center_x + thick // 2, center_y + arm),
        fill=WHITE,
    )
    return image


def main() -> None:
    image = build()
    image.save(PUBLIC / "logo.png", optimize=True)
    fit_square(image, 128).save(PUBLIC / "favicon.png", optimize=True)
    mark = image.copy()
    mark.thumbnail((160, 160), Image.Resampling.LANCZOS)
    mark.save(PUBLIC / "logo-mark.png", optimize=True)
    svg = PUBLIC / "logo.svg"
    if svg.exists():
        svg.unlink()
    print(f"logo {image.size} mark {mark.size}")


if __name__ == "__main__":
    main()
