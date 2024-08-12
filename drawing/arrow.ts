import { Point, Primitive } from "drawing"
import { path } from "./path"

export const arrow = (
  start: Point,
  end: Point,
  color: string = "black",
  headSize: number = 10,
): Primitive[] => {
  // Calculate the angle and length of the arrow
  const dx = end.x - start.x
  const dy = end.y - start.y
  const angle = Math.atan2(dy, dx)
  const length = Math.sqrt(dx * dx + dy * dy)

  // Calculate the points for the arrow head
  const headAngle = Math.PI / 6 // 30 degrees
  const headPoint1 = {
    x: end.x - headSize * Math.cos(angle - headAngle),
    y: end.y - headSize * Math.sin(angle - headAngle),
  }
  const headPoint2 = {
    x: end.x - headSize * Math.cos(angle + headAngle),
    y: end.y - headSize * Math.sin(angle + headAngle),
  }

  return [
    // Arrow body
    path({
      points: [start, end],
      color: color,
    }),
    // Arrow head
    path({
      points: [headPoint1, end, headPoint2],
      color: color,
      fill: true,
    }),
  ]
}
