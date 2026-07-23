import { rotateSymbol } from "drawing/rotateSymbol"
import testpoint_right from "./testpoint_right"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(testpoint_right, "up")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
) as TextPrimitive | undefined

if (ref) {
  ref.x = 0
  ref.y = 0.125
  ref.anchor = "middle_bottom"
}

export default rotated
