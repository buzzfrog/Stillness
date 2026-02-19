import paper from 'paper';
import { SZ } from '../state.js';
import { sty, ringSegment, makePetal } from './helpers.js';

// Inspired by Native American dreamcatchers — a circular hoop with an
// intricate radial web, hanging feathers, and decorative beads.

export function genDreamcatcher() {
  // Shift the hoop up to leave room for hanging feathers at the bottom
  const cx = SZ / 2, cy = SZ / 2 - 55;
  sty(new paper.Path.Rectangle([0, 0], [SZ, SZ]));

  // === Hoop (outer ring) ===
  const hoopR = 235, hoopW = 20;
  for (let i = 0; i < 24; i++) {
    ringSegment(cx, cy, hoopR, hoopR + hoopW, i * 15, (i + 1) * 15);
  }
  // Decorative bead circles along the inner hoop edge
  for (let i = 0; i < 12; i++) {
    const a = i * 30 * Math.PI / 180;
    sty(new paper.Path.Circle([cx + hoopR * Math.cos(a), cy + hoopR * Math.sin(a)], 7));
  }
  // Small flowers at 6 points on the hoop
  for (let i = 0; i < 6; i++) {
    const a = (i * 60 + 15) * Math.PI / 180;
    const fx = cx + (hoopR + hoopW * 0.5) * Math.cos(a);
    const fy = cy + (hoopR + hoopW * 0.5) * Math.sin(a);
    for (let p = 0; p < 5; p++) makePetal(fx, fy, 0, p * 72, 5, 10);
    sty(new paper.Path.Circle([fx, fy], 4));
  }

  // === Web (spokes × concentric rings of segments) ===
  const spokes = 8, webRings = 5;
  const innerR = 16, webR = hoopR - 2;
  for (let ring = 0; ring < webRings; ring++) {
    const r1 = innerR + ring * (webR - innerR) / webRings;
    const r2 = innerR + (ring + 1) * (webR - innerR) / webRings;
    for (let s = 0; s < spokes; s++) {
      ringSegment(cx, cy, r1, r2, s * (360 / spokes), (s + 1) * (360 / spokes));
    }
    // Small bead at each spoke / ring intersection
    for (let s = 0; s < spokes; s++) {
      const a = s * (360 / spokes) * Math.PI / 180;
      sty(new paper.Path.Circle([cx + r2 * Math.cos(a), cy + r2 * Math.sin(a)], 5));
    }
  }

  // === Centre gem ===
  sty(new paper.Path.Circle([cx, cy], innerR));
  sty(new paper.Path.Circle([cx, cy], innerR * 0.5));

  // === Hanging feathers (5 below the hoop) ===
  function feather(fx, fy, len, angle) {
    const ctr = [fx, fy - len / 2];
    // Outer vane
    const vane = new paper.Path.Ellipse({ center: ctr, size: [len * 0.38, len] });
    vane.rotate(angle, [fx, fy]);
    sty(vane);
    // Inner shaft / spine (narrower ellipse for detail)
    const shaft = new paper.Path.Ellipse({ center: ctr, size: [len * 0.09, len * 0.88] });
    shaft.rotate(angle, [fx, fy]);
    sty(shaft);
    // Left-side barbs (3 small ellipses)
    for (let b = 1; b <= 3; b++) {
      const t = b / 4;
      const rad = angle * Math.PI / 180;
      const bx = fx - len * t * Math.sin(rad);
      const by = fy - len * t * Math.cos(rad);
      const bLen = len * 0.16 * (1.3 - t);
      const lb = new paper.Path.Ellipse({ center: [bx, by], size: [bLen, 3.5] });
      lb.rotate(angle + 28, [bx, by]);
      sty(lb);
      const rb = new paper.Path.Ellipse({ center: [bx, by], size: [bLen, 3.5] });
      rb.rotate(angle - 28, [bx, by]);
      sty(rb);
    }
    // Quill bead at attachment point
    sty(new paper.Path.Circle([fx, fy], 5));
  }

  const hoopBottom = cy + hoopR + hoopW;
  const nFeathers = 5;
  const spread = 130;
  const featherLen = 110;
  for (let f = 0; f < nFeathers; f++) {
    const offset = (f - (nFeathers - 1) / 2) * spread / (nFeathers - 1);
    const tilt = offset / 6;   // slight tilt proportional to horizontal offset
    const fx = cx + offset;
    // String beads (3 small circles from hoop bottom to feather)
    const stringLen = 12 + Math.abs(f - 2) * 8;
    for (let b = 0; b < 3; b++) {
      sty(new paper.Path.Circle([fx, hoopBottom + 10 + b * 12], 5));
    }
    const fy = hoopBottom + 10 + 3 * 12 + stringLen;
    feather(fx, fy, featherLen, tilt);
  }
}
