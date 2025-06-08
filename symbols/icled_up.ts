import { rotateSymbol } from "drawing/rotateSymbol"
import icled_right from "./icled_right"
import type { TextPrimitive } from "drawing"

const symbol = rotateSymbol(icled_right, "up")

const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_left"

ref.y += 0.21
ref.x = 0.44
val.y -= 0.21
val.x = 0.44

export default symbol
