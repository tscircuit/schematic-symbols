import { rotateSymbol } from "drawing/rotateSymbol"
import ground_horz from "./ground_horz"
import type { TextPrimitive } from "drawing"

const symbol = rotateSymbol(ground_horz, "down")

const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_left"

ref.y += 0.16
ref.x = 0.31
val.y -= 0.25
val.x = 0.31

export default symbol
