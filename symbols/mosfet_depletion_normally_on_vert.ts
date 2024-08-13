import { rotateSymbol } from "drawing/rotateSymbol"
import mosfet_depletion_normally_on_horz from "./mosfet_depletion_normally_on_horz"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(mosfet_depletion_normally_on_horz)

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_top"
val.anchor = "middle_top"

ref.x = val.x

val.y += 0.15

export default rotated
