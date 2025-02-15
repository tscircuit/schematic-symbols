import { rotateSymbol } from "drawing/rotateSymbol"
import dpdt_normally_closed_switch_horz from "./dpdt_normally_closed_switch_horz"

const rotatedSymbol = rotateSymbol(dpdt_normally_closed_switch_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")!

const val = texts.find((t) => t.text === "{VAL}")!

val.anchor = "middle_right"
val.x = -0.37
val.y = 0.12

const ref = texts.find((t) => t.text === "{REF}")!

ref.anchor = "middle_left"
ref.x = 0.37
ref.y = 0.12

export default rotatedSymbol
