import { rotateSymbol } from "drawing/rotateSymbol"
import zener_diode_horz from "./zener_diode_horz"
import svgJson from "assets/generated/zener_diode.json"


import type { TextPrimitive } from "drawing"
import modifiedSymbol from "./led_up"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const rotated = rotateSymbol(zener_diode_horz)
const ref = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
)! as TextPrimitive
const val = rotated.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
)! as TextPrimitive

ref.anchor = "middle_left"
val.anchor = "middle_right"

export default modifySymbol(svgJson)
.rotateRightFacingSymbol("down")
.changeTextAnchor("{VAL}", "middle_left")
.changeTextAnchor("{REF}", "middle_right")
.build()
