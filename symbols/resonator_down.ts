import { rotateSymbol } from "drawing/rotateSymbol"
import resonator_right from "./resonator_right"
import type { TextPrimitive } from "drawing"

const symbol = rotateSymbol(resonator_right, "down")

const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.y += 0.3
ref.x += 0.101
val.y -= 0.49999
val.x += 1.19999

export default symbol
