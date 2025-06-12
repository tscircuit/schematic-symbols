import { rotateSymbol } from "drawing/rotateSymbol"
import schottky_diode_right from "./schottky_diode_right"

import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(schottky_diode_right, "left")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"
ref.y += 0.5
ref.x = 0
val.y -= 0.55
val.x = 0.0

export default rotated
