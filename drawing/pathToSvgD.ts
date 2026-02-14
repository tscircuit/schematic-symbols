import type { Point } from "drawing"
import { makeYUpPositive } from "./utils/makeYUpPositive"

export function pathToSvgD(
  points: Point[],
  {
    closed = false,
    yUpPositive = true,
  }: {
    closed?: boolean
    yUpPositive?: boolean
  },
): string {
  if (points.length === 0) return ""
  if (points.length === 1) {
    return `M${points[0].x},${makeYUpPositive(points[0].y, yUpPositive)}`
  }

  const pathCommands: string[] = []

  // Move to the first point
  pathCommands.push(
    `M${points[0].x},${makeYUpPositive(points[0].y, yUpPositive)}`,
  )

  // Use cubic bezier curves for smooth rendering
  for (let i = 1; i < points.length; i++) {
    const current = points[i]
    const prev = points[i - 1]
    const next = i + 1 < points.length ? points[i + 1] : current

    // Calculate control points for smooth cubic bezier
    const cp1x = prev.x + (current.x - prev.x) * 0.5
    const cp1y = prev.y + (current.y - prev.y) * 0.5
    const cp2x = current.x + (next.x - current.x) * 0.5
    const cp2y = current.y + (next.y - current.y) * 0.5

    pathCommands.push(
      `C${cp1x},${makeYUpPositive(cp1y, yUpPositive)} ${cp2x},${makeYUpPositive(cp2y, yUpPositive)} ${current.x},${makeYUpPositive(current.y, yUpPositive)}`,
    )
  }

  return closed ? `${pathCommands.join(" ")} Z` : pathCommands.join(" ")
}
