import { rotateSymbol } from "drawing/rotateSymbol"
import solderjumper2_right from "./solderjumper2_right"

import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(solderjumper2_right, "up")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive

ref.anchor = "middle_left"
ref.y += 0.05
ref.x = 0.2

export default rotated
