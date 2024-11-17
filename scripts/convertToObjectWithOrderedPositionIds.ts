/**
 * Convert an array of points to an object with ordered position ids.
 *
 * NOTE: Assumes Y-up is POSITIVE
 *
 * Example:
 *
 * [
 *   { x: 0, y: 0 },
 *   { x: 1, y: 1 },
 *   { x: 2, y: 2 },
 * ]
 *
 * Becomes:
 *
 * {
 *   top1: { x: 0, y: 0 },
 *   right1: { x: 1, y: 1 },
 *   bottom1: { x: 0, y: -2 },
 * }
 */
export const convertToObjectWithOrderedPositionIds = <
  T extends { x: number; y: number },
>(
  points: T[],
): Record<string, T> => {
  const result: Record<string, T> = {}

  const sides = {
    top: [] as T[],
    bottom: [] as T[],
    left: [] as T[],
    right: [] as T[],
    unknown: [] as T[],
  }

  for (const point of points) {
    const dx = point.x
    const dy = point.y

    const dominantSide = Math.abs(dx) > Math.abs(dy) ? "x" : "y"

    let side: "top" | "bottom" | "left" | "right" | "unknown"
    if (dominantSide === "x" && dx > 0) {
      side = "right"
    } else if (dominantSide === "x" && dx < 0) {
      side = "left"
    } else if (dominantSide === "y" && dy > 0) {
      side = "top"
    } else if (dominantSide === "y" && dy < 0) {
      side = "bottom"
    } else {
      side = "unknown"
    }

    sides[side].push(point)
  }

  // Sort each side according to x or y
  sides.top.sort((a, b) => a.x - b.x)
  sides.bottom.sort((a, b) => a.x - b.x)
  sides.left.sort((a, b) => a.y - b.y)
  sides.right.sort((a, b) => a.y - b.y)

  // Assign position ids to each point
  for (const side of Object.keys(sides)) {
    for (let i = 0; i < sides[side as keyof typeof sides].length; i++) {
      result[`${side}${i + 1}`] = sides[side as keyof typeof sides][i]
    }
  }

  return result
}
