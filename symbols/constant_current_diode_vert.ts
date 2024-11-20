import { rotateSymbol } from "drawing/rotateSymbol"
import svgJson from "assets/generated/constant_current_diode.json"

import constant_current_diode_horz from "./constant_current_diode_horz"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const rotatedSymbol = rotateSymbol(constant_current_diode_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")!

const val = texts.find((t) => t.text === "{VAL}")!

val.x = -0.35
val.y = 0
val.anchor = "middle_right"

const ref = texts.find((t) => t.text === "{REF}")!

ref.y = 0
ref.x = 0.35
ref.anchor = "middle_left"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .changeTextAnchor("{VAL}", "middle_right")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
