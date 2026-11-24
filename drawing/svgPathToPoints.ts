import type { Point } from "./types"
import { approximateArc } from "./arc"
import { approximateBezier } from "./cubicBezierCurveArc"

export function svgPathToPoints(pathString: string): Point[] {
  const points: Point[] = []
  const commands =
    pathString.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) || []
  let currentX = 0
  let currentY = 0

  function addPoint(x: number, y: number) {
    points.push({ x, y })
    currentX = x
    currentY = y
  }

  for (const command of commands) {
    const type = command[0]
    const args = command
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(Number.parseFloat)
    const isRelative = type === type.toLowerCase() && type !== "z"

    switch (type.toUpperCase()) {
      case "M":
      case "L":
        addPoint(
          isRelative ? currentX + args[0] : args[0],
          isRelative ? currentY + args[1] : args[1],
        )
        break
      case "H":
        addPoint(isRelative ? currentX + args[0] : args[0], currentY)
        break
      case "V":
        addPoint(currentX, isRelative ? currentY + args[0] : args[0])
        break
      case "C": {
        const [x1, y1, x2, y2, x, y] = args
        const start = { x: currentX, y: currentY }
        const toAbsolute = (px: number, py: number): Point =>
          isRelative ? { x: currentX + px, y: currentY + py } : { x: px, y: py }
        const end = toAbsolute(x, y)

        // Approximate the cubic Bézier curve
        const bezierPoints = approximateBezier(
          start, // Start point
          toAbsolute(x1, y1), // Control point 1
          toAbsolute(x2, y2), // Control point 2
          end, // End point
        )

        points.push(...bezierPoints)
        addPoint(end.x, end.y) // Update the current position
        break
      }
      case "Q": {
        // For Q command, we add both the control point and the end point
        const toAbsolute = (px: number, py: number): Point =>
          isRelative ? { x: currentX + px, y: currentY + py } : { x: px, y: py }
        points.push(toAbsolute(args[0], args[1])) // Control point
        const end = toAbsolute(args[2], args[3])
        addPoint(end.x, end.y) // End point
        break
      }
      case "Z":
        // Close path - no new point
        break
      case "A": {
        // For A command, we add the end point and intermediate points to approximate the arc
        const [rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y] = args
        const end = isRelative ? { x: currentX + x, y: currentY + y } : { x, y }
        const arcPoints = approximateArc(
          currentX,
          currentY,
          rx,
          ry,
          largeArcFlag,
          sweepFlag,
          end.x,
          end.y,
        )
        arcPoints.forEach((point) => points.push(point))
        addPoint(end.x, end.y)
        break
      }
      // Add cases for other commands (S, T) if needed
      default:
        console.warn(`Unsupported SVG command: ${type}`)
    }
  }

  return points
}
