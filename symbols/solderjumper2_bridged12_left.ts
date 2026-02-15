import { rotateSymbol } from "drawing/rotateSymbol"
import solderjumper2_bridged12_right from "./solderjumper2_bridged12_right"

import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(solderjumper2_bridged12_right, "left")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive

ref.anchor = "middle_bottom"
ref.y += 0.4
ref.x = 0

export default rotated
