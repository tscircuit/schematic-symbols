import { rotateSymbol } from "drawing/rotateSymbol"
import spdt_switch_right from "./spdt_switch_right"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(spdt_switch_right, "left")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.x = 0
ref.y += 0.625
val.y -= 0.695
val.x = 0

export default rotated
