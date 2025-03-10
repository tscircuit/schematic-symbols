import { flipSymbolOverXAxis } from "drawing/rotateSymbol"
import tilted_ground_up from "./tilted_ground_up"
import type { TextPrimitive } from "drawing"

const rotated = flipSymbolOverXAxis(tilted_ground_up)

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.x = 0.35
ref.y += 0.4
val.y -= 0.4
val.x = 0.35

export default rotated
