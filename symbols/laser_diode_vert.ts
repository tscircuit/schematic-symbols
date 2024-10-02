import { rotateSymbol } from "drawing/rotateSymbol"
import laser_diode_horz from "./laser_diode_horz"
import { TextPrimitive } from "drawing/types"

const rotated = rotateSymbol(laser_diode_horz)

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.x = 0.22
ref.y = 0.48
val.y = 0.08
val.x = -0.3
export default rotated
