import { rotateSymbol } from "drawing/rotateSymbol"
import p_jfet_transistor_horz from "./p_jfet_transistor_horz"

const rotatedSymbol = rotateSymbol(p_jfet_transistor_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")!

const val = texts.find((t) => t.text === "{VAL}")!

val.x = -0.35
val.y = 0
val.anchor = "middle_right"

const ref = texts.find((t) => t.text === "{REF}")!

ref.y = 0
ref.x = 0.35
ref.anchor = "middle_left"

export default rotatedSymbol
