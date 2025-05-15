import { rotateSymbol } from "drawing/rotateSymbol"
import led_right from "./led_right"
import type { TextPrimitive } from "drawing"

const symbol = rotateSymbol(led_right, "up")

const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.y += 0.337
ref.x = 0.4
val.y -= 0.337
val.x = 0.4

export default symbol
