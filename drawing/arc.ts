import type { Point } from "./types"

/** Sample the interior of an SVG endpoint-parameterized elliptical arc. */
export function approximateArc(
  x1: number,
  y1: number,
  rx: number,
  ry: number,
  largeArcFlag: number,
  sweepFlag: number,
  x2: number,
  y2: number,
  xAxisRotation = 0,
): Point[] {
  // SVG treats zero radii as a line and coincident endpoints as no arc.
  // The caller adds the endpoint, so neither case needs interior points.
  rx = Math.abs(rx)
  ry = Math.abs(ry)
  if (rx === 0 || ry === 0 || (x1 === x2 && y1 === y2)) return []

  // SVG 2, Appendix B.2: convert endpoint parameters to a center and angles.
  // https://www.w3.org/TR/SVG/implnote.html#ArcConversionEndpointToCenter
  const phi = ((xAxisRotation % 360) * Math.PI) / 180
  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)
  const dx = (x1 - x2) / 2
  const dy = (y1 - y2) / 2
  const px = cosPhi * dx + sinPhi * dy
  const py = -sinPhi * dx + cosPhi * dy

  // Enlarge radii that cannot span the endpoints, preserving their ratio.
  const radiiScale = Math.hypot(px / rx, py / ry)
  if (radiiScale > 1) {
    rx *= radiiScale
    ry *= radiiScale
  }
  const nx = px / rx
  const ny = py / ry
  const distance = nx * nx + ny * ny
  const direction = Boolean(largeArcFlag) === Boolean(sweepFlag) ? -1 : 1
  const factor = direction * Math.sqrt(Math.max(0, (1 - distance) / distance))
  const cxPrime = factor * rx * ny
  const cyPrime = -factor * ry * nx
  const cx = cosPhi * cxPrime - sinPhi * cyPrime + (x1 + x2) / 2
  const cy = sinPhi * cxPrime + cosPhi * cyPrime + (y1 + y2) / 2

  const ux = (px - cxPrime) / rx
  const uy = (py - cyPrime) / ry
  const vx = (-px - cxPrime) / rx
  const vy = (-py - cyPrime) / ry
  const startAngle = Math.atan2(uy, ux)
  let sweepAngle = Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy)
  if (!sweepFlag && sweepAngle > 0) sweepAngle -= 2 * Math.PI
  if (sweepFlag && sweepAngle < 0) sweepAngle += 2 * Math.PI

  const steps = 40
  const points: Point[] = []
  for (let i = 1; i < steps; i++) {
    const angle = startAngle + (sweepAngle * i) / steps
    const x = rx * Math.cos(angle)
    const y = ry * Math.sin(angle)
    points.push({
      x: cosPhi * x - sinPhi * y + cx,
      y: sinPhi * x + cosPhi * y + cy,
    })
  }
  return points
}
