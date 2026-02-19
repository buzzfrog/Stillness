import paper from 'paper';
import { SZ } from '../state.js';
import { sty, ringSegment } from './helpers.js';

// Inspired by Celtic illuminated manuscripts and high crosses — featuring a
// Celtic ringed cross, triquetra corner knots, and a step-key border.

export function genCeltic() {
  const cx = SZ / 2, cy = SZ / 2;
  sty(new paper.Path.Rectangle([0, 0], [SZ, SZ]));

  // === Step-key border ===
  const margin = 16, bw = 18, n = 21;
  const inner = SZ - margin * 2;
  const cell = inner / n;
  for (let i = 0; i < n; i++) {
    const t = margin + i * cell;
    sty(new paper.Path.Rectangle([t, margin], [cell - 1, bw]));
    sty(new paper.Path.Rectangle([t, SZ - margin - bw], [cell - 1, bw]));
    sty(new paper.Path.Rectangle([margin, t], [bw, cell - 1]));
    sty(new paper.Path.Rectangle([SZ - margin - bw, t], [bw, cell - 1]));
  }
  const mb = margin + bw + 4;
  sty(new paper.Path.Rectangle([mb, mb], [SZ - mb * 2, SZ - mb * 2]));

  // === Celtic High Cross ===
  const armW = 72, ringR = 108;
  const pad = mb + 10;
  const halfSpan = SZ / 2 - pad;
  // Full-length cross arms (vertical and horizontal bars)
  sty(new paper.Path.Rectangle([cx - armW / 2, pad], [armW, halfSpan * 2]));
  sty(new paper.Path.Rectangle([pad, cy - armW / 2], [halfSpan * 2, armW]));
  // Arm tip decorative roundels
  [[cx, pad], [cx, SZ - pad], [pad, cy], [SZ - pad, cy]]
    .forEach(pt => sty(new paper.Path.Circle(pt, armW / 2)));
  // Mid-arm knotwork circles
  const midOff = ringR + halfSpan / 2;
  [[cx, cy - midOff], [cx, cy + midOff], [cx - midOff, cy], [cx + midOff, cy]]
    .forEach(pt => { sty(new paper.Path.Circle(pt, 14)); sty(new paper.Path.Circle(pt, 5)); });

  // === Knotwork ring (drawn over the cross) ===
  // Outer annulus (16 arc segments)
  for (let i = 0; i < 16; i++) ringSegment(cx, cy, ringR - 22, ringR, i * 22.5, (i + 1) * 22.5);
  // Inner fan (8 sections between inner ring edge and center medallion)
  for (let i = 0; i < 8; i++) ringSegment(cx, cy, 38, ringR - 22, i * 45, (i + 1) * 45);
  // Center medallion
  sty(new paper.Path.Circle([cx, cy], 38));
  sty(new paper.Path.Circle([cx, cy], 20));
  sty(new paper.Path.Circle([cx, cy], 7));

  // === Triquetra corner ornaments ===
  function triquetra(ox, oy, r) {
    sty(new paper.Path.Circle([ox, oy], r));
    for (let i = 0; i < 3; i++) {
      const a = (i * 120 - 90) * Math.PI / 180;
      const ex = ox + r * 0.3 * Math.cos(a), ey = oy + r * 0.3 * Math.sin(a);
      const e = new paper.Path.Ellipse({ center: [ex, ey], size: [r * 0.38, r * 0.78] });
      e.rotate(i * 120, [ox, oy]);
      sty(e);
    }
    sty(new paper.Path.Circle([ox, oy], r * 0.16));
  }
  const tR = 54, cOff = mb + tR + 8;
  [[cOff, cOff], [SZ - cOff, cOff], [cOff, SZ - cOff], [SZ - cOff, SZ - cOff]]
    .forEach(c => triquetra(c[0], c[1], tR));

  // === Interlocking circles in the quadrants between cross arms ===
  const qDist = (ringR + 58) / Math.SQRT2;
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(d => {
    const px = cx + d[0] * qDist, py = cy + d[1] * qDist;
    sty(new paper.Path.Circle([px, py], 26));
    sty(new paper.Path.Circle([px, py], 13));
    sty(new paper.Path.Circle([px, py], 5));
  });
}
