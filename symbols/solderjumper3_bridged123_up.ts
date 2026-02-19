import { rotateSymbol } from "drawing/rotateSymbol"
import solderjumper3_bridged123_right from "./solderjumper3_bridged123_right"

import type { TextPrimitive } from "drawing"

const rotated = rotateSymbol(solderjumper3_bridged123_right, "up")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive

ref.anchor = "middle_left"
ref.y += 0.4
ref.x = 0.2

export default rotated
