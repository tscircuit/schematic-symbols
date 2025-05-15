import { flipSymbolOverXAxis, rotateSymbol } from "drawing/rotateSymbol"
import led_up from "./led_up"
import type { TextPrimitive } from "drawing"

const symbol = flipSymbolOverXAxis(led_up)

const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
val.anchor = "middle_top"

ref.x = 0.4
ref.y += 0.537
val.y -= 0.337
val.x = 0.4

export default symbol
