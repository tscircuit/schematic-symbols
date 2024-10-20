import { rotateSymbol } from "drawing/rotateSymbol"
import mushroom_head_normally_open_momentary_horz from "./mushroom_head_normally_open_momentary_horz"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(mushroom_head_normally_open_momentary_horz)

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_right"

ref.x = ref.x - 0.03
ref.y = ref.y

val.x = val.x
val.y = 0

export default rotated
