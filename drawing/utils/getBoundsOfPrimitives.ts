import { Primitive, Point } from "../types"

export function getBoundsOfPrimitives(primitives: Primitive[]): {
  minX: number
  maxX: number
  minY: number
  maxY: number
} {
  if (primitives.length === 0) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  }

  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  const updateBounds = (point: Point) => {
    minX = Math.min(minX, point.x)
    maxX = Math.max(maxX, point.x)
    minY = Math.min(minY, point.y)
    maxY = Math.max(maxY, point.y)
  }

  primitives.forEach((primitive) => {
    switch (primitive.type) {
      case "path":
        primitive.points.forEach(updateBounds)
        break
      case "text":
        updateBounds({ x: primitive.x, y: primitive.y })
        break
      case "circle": {
        const { x, y, radius } = primitive
        updateBounds({ x: x - radius, y: y - radius })
        updateBounds({ x: x + radius, y: y + radius })
        break
      }
      case "box": {
        const { x, y, width, height } = primitive
        const halfWidth = width / 2
        const halfHeight = height / 2
        updateBounds({ x: x - halfWidth, y: y - halfHeight })
        updateBounds({ x: x + halfWidth, y: y + halfHeight })
        break
      }
    }
  })

  return { minX, maxX, minY, maxY }
}
