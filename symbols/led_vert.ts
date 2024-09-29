import { rotateSymbol } from "drawing/rotateSymbol"
import led_horz from "./led_horz"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(led_horz)

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_right"

ref.x += 0.1
ref.y += 0.017
val.y = ref.y
val.x = -0.3

export default rotated
