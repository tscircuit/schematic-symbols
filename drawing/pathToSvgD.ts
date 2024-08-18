import type { Point } from "drawing"

export function pathToSvgD(points: Point[], closed: boolean = false): string {
  const pathCommands = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ")

  return closed ? `${pathCommands} Z` : pathCommands
}
