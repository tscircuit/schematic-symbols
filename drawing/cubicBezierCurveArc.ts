import type { Point } from "./types"

export function approximateBezier(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
): Point[] {
  const points: Point[] = []
  const steps = 500
  for (let t = 0; t <= 1; t += 1 / steps) {
    const x =
      Math.pow(1 - t, 3) * p0.x +
      3 * Math.pow(1 - t, 2) * t * p1.x +
      3 * (1 - t) * Math.pow(t, 2) * p2.x +
      Math.pow(t, 3) * p3.x

    const y =
      Math.pow(1 - t, 3) * p0.y +
      3 * Math.pow(1 - t, 2) * t * p1.y +
      3 * (1 - t) * Math.pow(t, 2) * p2.y +
      Math.pow(t, 3) * p3.y

    points.push({ x, y })
  }

  return points
}
