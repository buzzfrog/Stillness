# Stillness 🌿

**Breathe. Click. Color. Let the world dissolve.**

Stillness is a browser-based coloring book designed for the moments when your mind needs a quiet place to land. No accounts. No ads. No noise — just you, a canvas of intricate patterns, and colors that feel like a deep exhale.

Choose from hand-crafted mandalas, flowing florals, ocean dreamscapes, and more. Fill regions with a single click, paint freehand with a soft brush, or layer gentle gradients — all accompanied by ambient chimes, birdsong, or the hush of distant waves.

Built for stillness. Open it when the day feels loud.

> **[✦ Enter Stillness →](https://LadyNaggaga.github.io/Stillness/)**

![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![Paper.js](https://img.shields.io/badge/Paper.js-Vector%20Engine-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🖌️ Tools
| Tool | Shortcut | Description |
|------|----------|-------------|
| **Fill** | `F` | Click any region to flood-fill with the selected color |
| **Brush** | `B` | Freehand drawing with adjustable size and opacity |
| **Gradient** | `G` | Click-drag to apply linear or radial gradient fills |
| **Eraser** | `E` | Reset filled regions or remove brush strokes |
| **Eyedropper** | `I` | Sample any color from the canvas |

### 🧩 6 Coloring Patterns
- **Mandala** — 12-fold symmetry with 200+ fillable regions across 6 concentric rings
- **Floral** — Central flower, corner bouquets, butterflies, and decorative leaves
- **Geometric** — Hexagonal tessellation with nested stars and circles
- **Zentangle** — 4×4 grid with 8 unique tile patterns (spirals, scales, waves, diamonds)
- **Ocean** — Layered waves, tropical fish, shells, starfish, and coral
- **Elephant** — Zentangle-style portrait with mandala forehead and decorative tusks

### 🔍 Zoom & Pan
- **Mouse wheel** — Zoom toward cursor
- **Space + drag** — Pan across the canvas
- **Keyboard**: `+` zoom in, `-` zoom out, `0` fit to screen

### 🎨 Color System
- 25-color curated palette (muted, calming tones)
- HSL sliders for fine-tuning custom shades
- Dual gradient color selector

### 🔊 Ambient Fill Sounds
- **Chimes** — Pentatonic wind-chime arpeggio
- **Wind** — Filtered white noise swell
- **Birds** — Synthesized chirp sequence
- **Ocean** — Low-pass wave wash

### 💾 Save & Export
- **PNG** — Rasterized export at 800×800
- **SVG** — Lossless vector export (editable in Illustrator/Inkscape)
- **Save/Load Progress** — Persist your work to localStorage and resume later

---

## 🚀 Getting Started

### Option 1: Open directly
```bash
git clone https://github.com/LadyNaggaga/Stillness.git
cd Stillness
open index.html
```

### Option 2: Serve locally
```bash
npx serve .
# or
python3 -m http.server 8000
```

### Option 3: GitHub Pages
1. Go to **Settings → Pages**
2. Set source to `main` branch, root `/`
3. Your coloring book is live!

---

## 🏗️ Architecture

Single-file app (`index.html`) — no build step, no dependencies to install.

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Rendering | [Paper.js](http://paperjs.org/) (CDN) | Vector canvas, hit-testing, zoom/pan, SVG export |
| Audio | Web Audio API | Synthesized ambient sounds (no audio files needed) |
| UI | Vanilla CSS + JS | Dark-mode interface, responsive layout |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) | Clean, modern typography |

### How Patterns Work
Each pattern is a generator function that creates **Paper.js closed paths** — every enclosed region is an individually clickable and fillable item. The fill tool uses Paper.js `hitTest()` for precise vector hit-testing (no pixel scanning), which means fills are instant and crisp at any zoom level.

### Undo System
Uses a **command pattern** — each fill/brush operation is recorded as a reversible command object, enabling efficient undo/redo without storing full canvas snapshots.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `F` | Fill tool |
| `B` | Brush tool |
| `G` | Gradient tool |
| `E` | Eraser tool |
| `I` | Eyedropper |
| `Space` + drag | Pan |
| `+` / `-` | Zoom in / out |
| `0` | Fit to screen |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |

---

## 📄 License

MIT — free for personal and commercial use.
