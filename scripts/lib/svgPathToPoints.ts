import { parseSVG, makeAbsolute } from "svg-path-parser"

export function svgPathToPoints(d: string): Array<{ x: number; y: number }> {
  const parsedPath = parseSVG(d)
  const absolutePath = makeAbsolute(parsedPath)

  const points: Array<{ x: number; y: number }> = []
  let firstPoint: { x: number; y: number } | null = null

  for (const command of absolutePath) {
    switch (command.code) {
      case "M":
        if (!firstPoint) {
          firstPoint = { x: command.x, y: command.y }
        }
        points.push({ x: command.x, y: command.y })
        break
      case "L":
      case "H":
      case "V":
        points.push({ x: command.x, y: command.y })
        break
      case "C":
        points.push(
          { x: command.x1, y: command.y1 },
          { x: command.x2, y: command.y2 },
          { x: command.x, y: command.y },
        )
        break
      case "S":
      case "Q":
        points.push(
          { x: command.x0, y: command.y0 },
          { x: command.x, y: command.y },
        )
        break
      case "T":
      case "A":
        points.push({ x: command.x, y: command.y })
        break
      case "Z":
        if (firstPoint) {
          points.push(firstPoint)
        }
        break
    }
  }

  return points
}
