import { rotateSymbol } from "drawing/rotateSymbol"
import potentiometer2_right from "./potentiometer2_right"
import type { TextPrimitive } from "drawing"

const symbol = rotateSymbol(potentiometer2_right, "left")

const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.y += 0.73
ref.x = 0
val.y -= 0.7
val.x = 0

export default symbol
