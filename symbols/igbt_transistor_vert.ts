import { rotateSymbol } from "drawing/rotateSymbol"
import igbt_transistor_horz from "./igbt_transistor_horz"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(igbt_transistor_horz)

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_right"

ref.x = 0.45
ref.y += 0.065
val.y += 0.065

export default rotated
