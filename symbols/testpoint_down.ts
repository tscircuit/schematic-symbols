import { rotateSymbol } from "drawing/rotateSymbol"
import type { TextPrimitive } from "drawing"
import testpoint_right from "./testpoint_right"

const rotated = rotateSymbol(testpoint_right, "down")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
) as TextPrimitive | undefined

if (ref) {
  ref.anchor = "middle_top"
}

export default rotated
