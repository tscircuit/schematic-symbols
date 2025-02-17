import { rotateSymbol } from "drawing/rotateSymbol"
import dpdt_normally_closed_switch_right from "./dpdt_normally_closed_switch_right"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(dpdt_normally_closed_switch_right, "up")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.x = 0
ref.y += 0.537
val.y -= 0.5375
val.x = 0

export default rotated
