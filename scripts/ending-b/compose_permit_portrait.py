#!/usr/bin/env python3
"""Compositing proof: use the ACTUAL approved Stephen WebP, never redraw his face.

This is an unapproved illustration proof only, not live gameplay or a change
to the canonical character asset.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageChops

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / "public/assets/generated/game/ending-b-permit-layout-proof-source-v01.webp"
STEPHEN = ROOT / "public/assets/generated/characters/stephen-office-seated-neutral-v01.webp"
OUTPUT = ROOT / "public/assets/generated/game/ending-b-release-permit-canonical-portrait-proof-v01.webp"

with Image.open(BASE) as base_file:
    permit = base_file.convert("RGBA")
with Image.open(STEPHEN) as sprite_file:
    sprite = sprite_file.convert("RGBA")

assert permit.size == (1024, 1536), f"Unexpected permit dimensions {permit.size}"
alpha = sprite.getchannel("A")
bbox = alpha.getbbox()
assert bbox is not None, "Approved Stephen artwork lacks its cutout"

# Crop the exact approved office illustration to the head and shoulders.
# This is a pixel-level crop/resample ONLY: no new eyes, hair, face or features.
x0, y0, x1, y1 = bbox
height = y1 - y0
crop = sprite.crop((x0, y0, x1, y0 + round(height * 0.69)))
# Frame target dimensions. The paper's original photo clip and border remain.
w, h = 395, 443
portrait_area = (95, 356)
inner = Image.new("RGBA", (w, h), (0, 0, 0, 0))
draw = ImageDraw.Draw(inner)
for y in range(h):
    f = y / h
    rgb = (round(90 + 27 * f), round(134 + 18 * f), round(162 + 17 * f))
    draw.line([(0, y), (w, y)], fill=(*rgb, 255))

# Soft, non-geographic institutional backdrop so the portrait isn't pasted over
# a second person's face or distracting architectural details.
draw.rectangle((0, int(h * 0.71), w, h), fill=(101, 120, 119, 255))
cw, ch = crop.size
scale = min((w * 1.16) / cw, (h * 1.06) / ch)
cutout = crop.resize((round(cw * scale), round(ch * scale)), Image.Resampling.LANCZOS)
x = (w - cutout.width) // 2
y = h - cutout.height + 20
inner.paste(cutout, (x, y), cutout.getchannel("A"))

# Clip cleanly inside the existing slightly skewed photograph mount.
mask = Image.new("L", (w, h), 0)
m = ImageDraw.Draw(mask)
m.polygon([(8, 26), (358, 8), (376, 417), (18, 435)], fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(0.6))
inner.putalpha(ImageChops.multiply(inner.getchannel("A"), mask))
permit.alpha_composite(inner, portrait_area)
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
permit.convert("RGB").save(OUTPUT, "WEBP", quality=92, method=6)
with Image.open(OUTPUT) as check:
    check.verify()
print(f"COMPOSITED (not redrawn): {STEPHEN.relative_to(ROOT)} onto {BASE.relative_to(ROOT)} -> {OUTPUT.relative_to(ROOT)}, {OUTPUT.stat().st_size} bytes")

