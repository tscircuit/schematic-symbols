import { rotateSymbol } from "drawing/rotateSymbol"
import relay_right from "./relay_right"
import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(relay_right, "left")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && (p as TextPrimitive).text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && (p as TextPrimitive).text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

export default rotated
