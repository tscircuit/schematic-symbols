import type { TextPrimitive } from "drawing"
import { rotateSymbol } from "drawing/rotateSymbol"
import rectifier_diode_horz from "./rectifier_diode_horz"

const rotated = rotateSymbol(rectifier_diode_horz)
const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_right"

export default rotated
