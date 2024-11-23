import type { Point } from "./types"

export function approximateArc(
  x1: number,
  y1: number,
  rx: number,
  ry: number,
  largeArcFlag: number,
  sweepFlag: number,
  x2: number,
  y2: number,
): Point[] {
  // This is a simplified approximation. For a more accurate representation,
  // you might want to use a dedicated SVG path library.
  const steps = 40
  const points: Point[] = []
  for (let i = 1; i < steps; i++) {
    const t = i / steps
    const x = (1 - t) * x1 + t * x2
    const y = (1 - t) * y1 + t * y2
    // Apply a simple curve to make it non-linear, with reduced height and no center drop
    const curveY =
      0.03 *
      Math.abs(Math.sin(t * Math.PI)) *
      Math.min(rx, ry) *
      (largeArcFlag ? 1 : -1) *
      (sweepFlag ? -1 : 1)
    points.push({ x, y: y + curveY })
  }
  return points
}
