import { rotateSymbol } from "drawing/rotateSymbol"
import ac_ammeter_horz from "./ac_ammeter_horz"
import { TextPrimitive } from "drawing/types"

const rotated = rotateSymbol(ac_ammeter_horz)

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

val.x = -0.35

export default rotated
