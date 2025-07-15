import { rotateSymbol } from "drawing/rotateSymbol"
import potentiometer3_right from "./potentiometer3_right"
import type { TextPrimitive } from "drawing"

const symbol = rotateSymbol(potentiometer3_right, "up")

const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"
ref.y += 0
ref.x = 0.35
val.y -= 0.6
val.x = 0.35

export default symbol
