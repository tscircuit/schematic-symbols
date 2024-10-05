import { rotateSymbol } from "drawing/rotateSymbol"
import gunn_horz from "./gunn_horz"

const rotatedSymbol = rotateSymbol(gunn_horz)
const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")
const ref = texts.find((t) => t.text === "{REF}")!
const val = texts.find((t) => t.text === "{VAL}")!
ref.x = 0.25
ref.y = -0.045
val.x = -0.55
val.y = 0
export default rotatedSymbol
