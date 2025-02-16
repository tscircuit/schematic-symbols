import { rotateSymbol } from "drawing/rotateSymbol"
import spst_normally_closed_switch_right from "./spst_normally_closed_switch_right"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(spst_normally_closed_switch_right, "down")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.x = 0.45
ref.y += 0.465
val.y -= 0.465
val.x = 0.45

export default rotated
