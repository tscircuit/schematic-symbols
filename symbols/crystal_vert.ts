import { rotateSymbol } from "drawing/rotateSymbol"
import crystal_horz from "./crystal_horz"
import svgJson from "assets/generated/crystal.json"

import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const rotatedSymbol = rotateSymbol(crystal_horz)
const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")
const ref = texts.find((t) => t.text === "{REF}")!
const val = texts.find((t) => t.text === "{VAL}")!
val.x = -0.4
ref.x = 0.35
export default modifySymbol(svgJson)
.rotateRightFacingSymbol("up")
.changeTextAnchor("{VAL}", "middle_right")
.changeTextAnchor("{REF}", "middle_left")
.build()
