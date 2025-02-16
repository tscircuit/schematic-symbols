import { rotateSymbol } from "drawing/rotateSymbol"
import dpst_switch_right from "./dpst_switch_right"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(dpst_switch_right, "down")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.x = 0.42
ref.y += 0.515
val.y -= 0.515
val.x = 0.42
export default rotated
