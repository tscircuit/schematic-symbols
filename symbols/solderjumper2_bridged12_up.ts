import { rotateSymbol } from "drawing/rotateSymbol"
import solderjumper2_bridged12_right from "./solderjumper2_bridged12_right"

import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(solderjumper2_bridged12_right, "up")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive

ref.anchor = "middle_left"
ref.y += 0
ref.x = 0.2

export default rotated
