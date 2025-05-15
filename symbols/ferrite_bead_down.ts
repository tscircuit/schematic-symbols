import { flipSymbolOverXAxis, rotateSymbol } from "drawing/rotateSymbol"
import ferrite_bead_up from "./ferrite_bead_up"
import type { TextPrimitive } from "drawing"

const symbol = flipSymbolOverXAxis(ferrite_bead_up)

const ref = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = symbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_left"

ref.y += 0.4
ref.x = 0.32
val.y -= 0.45
val.x = 0.32

export default symbol
