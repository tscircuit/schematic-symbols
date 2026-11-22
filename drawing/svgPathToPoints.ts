import { makeAbsolute, parseSVG } from "svg-path-parser"
import type { Point } from "./types"
import { approximateArc } from "./arc"
import { approximateBezier } from "./cubicBezierCurveArc"

export function svgPathToPoints(pathString: string): Point[] {
  const points: Point[] = []
  // Normalize relative coordinates and expand repeated command arguments before
  // sampling. SVG numbers may be adjacent (10-2) or use scientific notation.
  const commands = makeAbsolute(parseSVG(pathString))

  for (const command of commands) {
    switch (command.code) {
      case "M":
      case "L":
      case "H":
      case "V":
        points.push({ x: command.x, y: command.y })
        break
      case "C":
        points.push(
          ...approximateBezier(
            { x: command.x0, y: command.y0 },
            { x: command.x1, y: command.y1 },
            { x: command.x2, y: command.y2 },
            { x: command.x, y: command.y },
          ),
          { x: command.x, y: command.y },
        )
        break
      case "Q":
        points.push(
          { x: command.x1, y: command.y1 },
          { x: command.x, y: command.y },
        )
        break
      case "A":
        points.push(
          ...approximateArc(
            command.x0,
            command.y0,
            command.rx,
            command.ry,
            Number(command.largeArc),
            Number(command.sweep),
            command.x,
            command.y,
          ),
          { x: command.x, y: command.y },
        )
        break
      case "Z":
        break
      default:
        console.warn(`Unsupported SVG command: ${command.code}`)
    }
  }

  return points
}
