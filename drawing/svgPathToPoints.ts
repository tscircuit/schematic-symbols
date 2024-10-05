import { Point } from "./types"

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
      case "C":
        // For C command, we add both control points and the end point
        points.push({ x: args[0], y: args[1] }) // First control point
        points.push({ x: args[2], y: args[3] }) // Second control point
        addPoint(args[4], args[5]) // End point
        break
      case "Q":
        // For Q command, we add both the control point and the end point
        points.push({ x: args[0], y: args[1] }) // Control point
        addPoint(args[2], args[3]) // End point
        break
      case "Z":
        // Close path - no new point
        break
      // Add cases for other commands (S, T, A) if needed
      default:
        console.warn(`Unsupported SVG command: ${type}`)
    }

    // Handle relative commands
    if (type === type.toLowerCase() && type !== "z") {
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