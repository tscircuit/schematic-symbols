import { rotateSymbol } from "drawing/rotateSymbol"
import gunn_diode_horz from "./gunn_diode_horz"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"
import svgJson from "assets/generated/gunn_diode.json"

const rotatedSymbol = rotateSymbol(gunn_diode_horz)
const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")
const ref = texts.find((t) => t.text === "{REF}")!
const val = texts.find((t) => t.text === "{VAL}")!
ref.x = 0.25
ref.y = -0.045
val.x = -0.55
val.y = 0
export default modifySymbol(svgJson)
.rotateRightFacingSymbol("down")
.build()
