import { rotateSymbol } from "drawing/rotateSymbol"
import potentiometer2_right from "./potentiometer2_right"
import type { TextPrimitive } from "drawing"

const symbol = rotateSymbol(potentiometer2_right, "up")

const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_left"

ref.y += 0.21
ref.x = 0.34
val.y -= 0.21
val.x = 0.34

export default symbol
