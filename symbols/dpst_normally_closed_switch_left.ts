import { rotateSymbol } from "drawing/rotateSymbol"
import dpst_normally_closed_switch_down from "./dpst_normally_closed_switch_down"

import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(dpst_normally_closed_switch_down, "left")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.x = 0.34
ref.y += 0.425
val.y -= 0.425
val.x = 0.34

export default rotated
