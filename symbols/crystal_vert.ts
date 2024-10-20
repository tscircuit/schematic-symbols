import { rotateSymbol } from "drawing/rotateSymbol"
import crystal_horz from "./crystal_horz"

const rotatedSymbol = rotateSymbol(crystal_horz)
const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")
const ref = texts.find((t) => t.text === "{REF}")!
const val = texts.find((t) => t.text === "{VAL}")!
val.x = -0.4
ref.x = 0.35
export default rotatedSymbol
