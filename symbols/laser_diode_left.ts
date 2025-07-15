import { rotateSymbol } from "drawing/rotateSymbol"
import laser_diode_right from "./laser_diode_right"
import type { TextPrimitive } from "drawing"

const symbol = rotateSymbol(laser_diode_right, "left")

const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_left"

ref.y += 0.71
ref.x = 0.44
val.y -= 0.71
val.x = 0.44

export default symbol
