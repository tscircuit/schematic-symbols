import { rotateSymbol } from "drawing/rotateSymbol"
import led_right from "./led_right"

const baseSymbol = rotateSymbol(led_right, "up")

// Flip path25-0 and path78 over X axis
const modifiedSymbol = {
  ...baseSymbol,
  primitives: baseSymbol.primitives.map((primitive) => {
    if (
      primitive.type === "path" &&
      (primitive.points.length === 3 || primitive.points.length === 4)
    ) {
      // This matches both the triangle shape (path25-0) and path78
      return {
        ...primitive,
        points: primitive.points.map((point) => ({
          x: point.x,
          y: -point.y + 2 * baseSymbol.center.y,
        })),
      }
    }
    return primitive
  }),
}

export default modifiedSymbol
