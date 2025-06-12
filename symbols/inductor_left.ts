import { rotateSymbol } from "drawing/rotateSymbol"
import inductor_right from "./inductor_right"

import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(inductor_right, "left")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"
ref.y += 0.41
ref.x = 0
val.y -= 0.44
val.x = 0.0

export default rotated
