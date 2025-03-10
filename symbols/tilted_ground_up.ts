import { rotateSymbol } from "drawing/rotateSymbol"
import tilted_ground_right from "./tilted_ground_right"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(tilted_ground_right, "up")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.x = 0.4
ref.y += 0.2
val.y -= 0.3
val.x = 0.4

export default rotated
