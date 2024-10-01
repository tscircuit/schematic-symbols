import { rotateSymbol } from "drawing/rotateSymbol"
import varactor_diode_horz from "./varactor_diode_horz"

import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(varactor_diode_horz)

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_right"

export default rotated
