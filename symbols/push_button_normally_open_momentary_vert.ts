import { rotateSymbol } from "drawing/rotateSymbol"
import push_button_normally_open_momentary_horz from "./push_button_normally_open_momentary_horz"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(push_button_normally_open_momentary_horz)

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_right"

ref.x = ref.x + 0.1
ref.y = ref.y

val.x = val.x
val.y = 0

export default rotated
