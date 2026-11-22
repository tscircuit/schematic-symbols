import { makeAbsolute, parseSVG } from "svg-path-parser"
import type { Point } from "./types"
import { approximateArc } from "./arc"
import { approximateBezier } from "./cubicBezierCurveArc"

function approximateQuadratic(
  start: Point,
  control: Point,
  end: Point,
): Point[] {
  // A quadratic is a cubic whose controls lie two thirds of the way from
  // each endpoint to the quadratic control point.
  return approximateBezier(
    start,
    {
      x: start.x + (2 / 3) * (control.x - start.x),
      y: start.y + (2 / 3) * (control.y - start.y),
    },
    {
      x: end.x + (2 / 3) * (control.x - end.x),
      y: end.y + (2 / 3) * (control.y - end.y),
    },
    end,
  )
}

export function svgPathToPoints(pathString: string): Point[] {
  const points: Point[] = []
  // Normalize relative coordinates and expand repeated command arguments before
  // sampling. SVG numbers may be adjacent (10-2) or use scientific notation.
  const commands = makeAbsolute(parseSVG(pathString))
  let cubicControl: Point | undefined
  let quadraticControl: Point | undefined

  for (const command of commands) {
    if (command.code !== "C" && command.code !== "S") cubicControl = undefined
    if (command.code !== "Q" && command.code !== "T")
      quadraticControl = undefined
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
        cubicControl = { x: command.x2, y: command.y2 }
        break
      case "S": {
        const start = { x: command.x0, y: command.y0 }
        const reflected = cubicControl
          ? { x: 2 * start.x - cubicControl.x, y: 2 * start.y - cubicControl.y }
          : start
        points.push(
          ...approximateBezier(
            start,
            reflected,
            { x: command.x2, y: command.y2 },
            { x: command.x, y: command.y },
          ),
          { x: command.x, y: command.y },
        )
        cubicControl = { x: command.x2, y: command.y2 }
        break
      }
      case "Q":
        points.push(
          ...approximateQuadratic(
            { x: command.x0, y: command.y0 },
            { x: command.x1, y: command.y1 },
            { x: command.x, y: command.y },
          ),
          { x: command.x, y: command.y },
        )
        quadraticControl = { x: command.x1, y: command.y1 }
        break
      case "T": {
        const start = { x: command.x0, y: command.y0 }
        const control = quadraticControl
          ? {
              x: 2 * start.x - quadraticControl.x,
              y: 2 * start.y - quadraticControl.y,
            }
          : start
        points.push(
          ...approximateQuadratic(start, control, {
            x: command.x,
            y: command.y,
          }),
          { x: command.x, y: command.y },
        )
        quadraticControl = control
        break
      }
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
