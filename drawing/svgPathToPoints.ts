import { Point } from "./types"

export function svgPathToPoints(pathString: string): Point[] {
  const points: Point[] = []
  const commands =
    pathString.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) || []

  let currentX = 0
  let currentY = 0

  for (const command of commands) {
    const type = command[0]
    const args = command
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(Number.parseFloat)

    switch (type.toUpperCase()) {
      case "M":
        currentX = args[0]
        currentY = args[1]
        points.push({ x: currentX, y: currentY })
        break
      case "L":
        currentX = args[0]
        currentY = args[1]
        points.push({ x: currentX, y: currentY })
        break
      case "H":
        currentX = args[0]
        points.push({ x: currentX, y: currentY })
        break
      case "V":
        currentY = args[0]
        points.push({ x: currentX, y: currentY })
        break
      case "Z":
        // Close path - no new point
        break
      // Add cases for other commands (C, S, Q, T, A) if needed
      default:
        console.warn(`Unsupported SVG command: ${type}`)
    }

    // Handle relative commands
    if (type === type.toLowerCase() && type !== "z") {
      currentX = points[points.length - 1].x
      currentY = points[points.length - 1].y
    }
  }

  return points
}
