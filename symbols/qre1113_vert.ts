import { rotateSymbol } from "drawing/rotateSymbol"
import qre1113_horz from "./qre1113_horz"

const rotatedSymbol = rotateSymbol(qre1113_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")!

const val = texts.find((t) => t.text === "{VAL}")!
val.x = -0.7
val.y = 0
val.anchor = "middle_right"

const ref = texts.find((t) => t.text === "{REF}")!
ref.x = 0.7
ref.y = 0
ref.anchor = "middle_left"

export default rotatedSymbol
