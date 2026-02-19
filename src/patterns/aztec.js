import paper from 'paper';
import { SZ } from '../state.js';
import { sty, ringSegment } from './helpers.js';

// Inspired by the Aztec Sun Stone (Calendar Stone) — featuring a stylised
// solar face, concentric rings of sun rays and calendar symbols, and
// stepped pyramid corner motifs.

export function genAztec() {
  const cx = SZ / 2, cy = SZ / 2;
  sty(new paper.Path.Rectangle([0, 0], [SZ, SZ]));

  // === Stepped pyramid corner motifs ===
  const steps = 4, sw = 22;
  for (let s = 0; s < steps; s++) {
    const off = s * sw;
    [[off, off], [SZ - off - sw, off], [off, SZ - off - sw], [SZ - off - sw, SZ - off - sw]]
      .forEach(pt => sty(new paper.Path.Rectangle(pt, [sw, sw])));
  }

  // === Ring 5: outer decorated band (20 segments) ===
  const r5o = 368, r5i = 312;
  for (let i = 0; i < 20; i++) ringSegment(cx, cy, r5i, r5o, i * 18, (i + 1) * 18);
  // Scalloped outer edge
  for (let i = 0; i < 20; i++) {
    const a = (i * 18 + 9) * Math.PI / 180;
    sty(new paper.Path.Circle([cx + r5o * Math.cos(a), cy + r5o * Math.sin(a)], 10));
  }

  // === Ring 4: 20 calendar day sign symbols ===
  const r4o = 312, r4i = 258;
  for (let i = 0; i < 20; i++) {
    ringSegment(cx, cy, r4i, r4o, i * 18, (i + 1) * 18);
    const a = (i * 18 + 9) * Math.PI / 180;
    const sr = (r4i + r4o) / 2;
    const px = cx + sr * Math.cos(a), py = cy + sr * Math.sin(a);
    const sz = 10;
    // Alternate 4 symbol types across the 20 positions
    if (i % 4 === 0) {
      sty(new paper.Path.Circle([px, py], sz));
    } else if (i % 4 === 1) {
      sty(new paper.Path({
        segments: [[px, py - sz], [px + sz, py + sz], [px - sz, py + sz]], closed: true
      }));
    } else if (i % 4 === 2) {
      sty(new paper.Path.Rectangle([px - sz * 0.7, py - sz * 0.7], [sz * 1.4, sz * 1.4]));
    } else {
      sty(new paper.Path({
        segments: [[px, py - sz], [px + sz, py], [px, py + sz], [px - sz, py]], closed: true
      }));
    }
  }

  // === Ring 3: 20 triangular sun rays ===
  const r3o = 258, r3i = 200;
  for (let i = 0; i < 20; i++) {
    const a1 = i * 18 * Math.PI / 180;
    const a2 = (i + 1) * 18 * Math.PI / 180;
    const am = (i * 18 + 9) * Math.PI / 180;
    // Outer pointed triangle (the sun ray spike)
    sty(new paper.Path({
      segments: [
        [cx + r3i * Math.cos(a1), cy + r3i * Math.sin(a1)],
        [cx + r3o * Math.cos(am), cy + r3o * Math.sin(am)],
        [cx + r3i * Math.cos(a2), cy + r3i * Math.sin(a2)]
      ], closed: true
    }));
    // Inner notch triangle (inward-pointing)
    sty(new paper.Path({
      segments: [
        [cx + r3i * Math.cos(a1), cy + r3i * Math.sin(a1)],
        [cx + (r3i - 22) * Math.cos(am), cy + (r3i - 22) * Math.sin(am)],
        [cx + r3i * Math.cos(a2), cy + r3i * Math.sin(a2)]
      ], closed: true
    }));
  }

  // === Ring 2: inner decorated band (20 segments + dots) ===
  const r2o = 200, r2i = 162;
  for (let i = 0; i < 20; i++) {
    ringSegment(cx, cy, r2i, r2o, i * 18, (i + 1) * 18);
    const a = (i * 18 + 9) * Math.PI / 180;
    const sr = (r2i + r2o) / 2;
    sty(new paper.Path.Circle([cx + sr * Math.cos(a), cy + sr * Math.sin(a)], 7));
  }

  // === Ring 1: inner face border (8 sections) ===
  const r1o = 162, r1i = 126;
  for (let i = 0; i < 8; i++) ringSegment(cx, cy, r1i, r1o, i * 45, (i + 1) * 45);

  // === Sun face (centre) ===
  sty(new paper.Path.Circle([cx, cy], r1i));    // face outline
  sty(new paper.Path.Circle([cx, cy], 88));     // inner face
  sty(new paper.Path.Circle([cx, cy], 48));     // mouth area
  // Eyes
  sty(new paper.Path.Circle([cx - 44, cy - 22], 15));
  sty(new paper.Path.Circle([cx - 44, cy - 22], 6));
  sty(new paper.Path.Circle([cx + 44, cy - 22], 15));
  sty(new paper.Path.Circle([cx + 44, cy - 22], 6));
  // Nose
  sty(new paper.Path.Rectangle([cx - 10, cy - 8], [20, 16]));
  // Mouth tongue (protruding down)
  sty(new paper.Path({
    segments: [[cx - 14, cy + 26], [cx, cy + 50], [cx + 14, cy + 26]], closed: true
  }));
  // Eyebrow / brow ridges (4 small lozenges above eyes)
  [[-60, -56], [-26, -62], [26, -62], [60, -56]].forEach(d => {
    sty(new paper.Path({
      segments: [
        [cx + d[0], cy + d[1] - 7],
        [cx + d[0] + 8, cy + d[1]],
        [cx + d[0], cy + d[1] + 7],
        [cx + d[0] - 8, cy + d[1]]
      ], closed: true
    }));
  });
  // Centre dot
  sty(new paper.Path.Circle([cx, cy], 14));
}
