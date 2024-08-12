import type { CirclePrimitive } from "drawing"

export function circle(
  options: Omit<CirclePrimitive, "type">,
): CirclePrimitive {
  return { type: "circle", ...options }
}
