import { rotateSymbol } from "drawing/rotateSymbol"
import resonator_right from "./resonator_right"
import type { TextPrimitive } from "drawing"

const symbol = rotateSymbol(resonator_right, "up")
const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.y += 0.499
ref.x = 0.62
val.y -= 0.29999
val.x += 0.1
export default symbol
