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
  const pathCommands = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"}${point.x},${makeYUpPositive(point.y, yUpPositive)}`,
    )
    .join(" ")

  return closed ? `${pathCommands} Z` : pathCommands
}
