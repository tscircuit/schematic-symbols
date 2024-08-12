import type { BoxPrimitive } from "drawing"

export function box(options: Omit<BoxPrimitive, "type">): BoxPrimitive {
  return { type: "box", ...options }
}
