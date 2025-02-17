import { rotateSymbol } from "drawing/rotateSymbol"
import dpdt_switch_right from "./dpdt_switch_right"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(dpdt_switch_right, "up")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.x = 0.0
ref.y += 0.565
val.y -= 0.555
val.x = 0.0

export default rotated
