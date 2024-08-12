import type { PathPrimitive } from "drawing"

export function path(options: Omit<PathPrimitive, "type">): PathPrimitive {
  return { type: "path", ...options }
}
