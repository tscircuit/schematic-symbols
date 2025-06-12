import { rotateSymbol } from "drawing/rotateSymbol"
import schottky_diode_right from "./schottky_diode_right"

import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(schottky_diode_right, "down")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_left"
ref.y += 0.3
ref.x = 0.3
val.y -= 0.3
val.x = 0.3

export default rotated
