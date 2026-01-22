import { rotateSymbol } from "drawing/rotateSymbol"
import push_button_normally_open_momentary_right from "./push_button_normally_open_momentary_right"
import type { TextPrimitive } from "drawing"

const symbol = rotateSymbol(push_button_normally_open_momentary_right, "down")
const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.y = 0.4
ref.x = 0.35
val.y = -0.4
val.x = 0.35

export default symbol
