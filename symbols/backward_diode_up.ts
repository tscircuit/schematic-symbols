import svgJson from "assets/generated/backward_diode.json"
import { defineSymbol } from "drawing/defineSymbol"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

import { rotateSymbol } from "drawing/rotateSymbol"

import type { TextPrimitive } from "drawing"
import tilted_digital_ground_right from "./backward_diode_left"
import backward_diode_left from "./backward_diode_left"

const { paths, texts, bounds, refblocks, circles } = svgJson
const rotated = rotateSymbol(backward_diode_left, "down")

const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_left"

ref.x = 0.25
ref.y += 0.21
val.y -= 0.21
val.x = 0.25

export default rotated
