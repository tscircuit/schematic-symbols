import { rotateSymbol } from "drawing/rotateSymbol"
import dpst_switch_right from "./dpst_switch_right"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(dpst_switch_right, "up")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.x = 0.46
ref.y += 0.315
val.y -= 0.315
val.x = 0.46

export default rotated
