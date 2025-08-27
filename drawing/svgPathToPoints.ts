import type { Point } from "./types"
import { approximateArc } from "./arc"
import { approximateBezier } from "./cubicBezierCurveArc"
import { logger } from "../logger"

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

    switch (type.toUpperCase()) {
      case "M":
        addPoint(args[0], args[1])
        break
      case "L":
        addPoint(args[0], args[1])
        break
      case "H":
        addPoint(args[0], currentY)
        break
      case "V":
        addPoint(currentX, args[0])
        break
      case "C": {
        const [x1, y1, x2, y2, x, y] = args

        // Approximate the cubic Bézier curve
        const bezierPoints = approximateBezier(
          { x: currentX, y: currentY }, // Start point
          { x: x1, y: y1 }, // Control point 1
          { x: x2, y: y2 }, // Control point 2
          { x, y }, // End point
        )

        points.push(...bezierPoints)
        addPoint(x, y) // Update the current position
        break
      }
      case "Q":
        // For Q command, we add both the control point and the end point
        points.push({ x: args[0], y: args[1] }) // Control point
        addPoint(args[2], args[3]) // End point
        break
      case "Z":
        // Close path - no new point
        break
      case "A":
        // For A command, we add the end point and intermediate points to approximate the arc
        const [rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y] = args
        const arcPoints = approximateArc(
          currentX,
          currentY,
          rx,
          ry,
          largeArcFlag,
          sweepFlag,
          x,
          y,
        )
        arcPoints.forEach((point) => points.push(point))
        addPoint(x, y)
        break
      // Add cases for other commands (S, T) if needed
      default:
        logger.warn("Unsupported SVG command", { type })
    }

    // Handle relative commands
    if (type === type.toLowerCase() && type !== "z" && type !== "a") {
      if (type === "c") {
        // For relative c, adjust both control points and end point
        points[points.length - 3].x += currentX
        points[points.length - 3].y += currentY
        points[points.length - 2].x += currentX
        points[points.length - 2].y += currentY
        points[points.length - 1].x += currentX
        points[points.length - 1].y += currentY
      } else if (type === "q") {
        // For relative q, adjust both control point and end point
        points[points.length - 2].x += currentX
        points[points.length - 2].y += currentY
        points[points.length - 1].x += currentX
        points[points.length - 1].y += currentY
      } else {
        points[points.length - 1].x += currentX
        points[points.length - 1].y += currentY
      }
      currentX = points[points.length - 1].x
      currentY = points[points.length - 1].y
    }
  }

  return points
}
