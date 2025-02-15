import { rotateSymbol } from "drawing/rotateSymbol"
import spdt_normally_closed_switch_horz from "./spdt_normally_closed_switch_horz"

const rotatedSymbol = rotateSymbol(spdt_normally_closed_switch_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")!

const val = texts.find((t) => t.text === "{VAL}")!

val.anchor = "middle_right"
val.x = -0.3
val.y = 0

const ref = texts.find((t) => t.text === "{REF}")!

ref.anchor = "middle_left"
ref.x = 0.3
ref.y = 0

export default rotatedSymbol
