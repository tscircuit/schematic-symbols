import { rotateSymbol } from "drawing/rotateSymbol"
import solderjumper2_right from "./solderjumper2_right"

import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(solderjumper2_right, "left")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
ref.y += 0.4
ref.x = 0

export default rotated
