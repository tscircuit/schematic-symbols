import { rotateSymbol } from "drawing/rotateSymbol"
import potentiometer2_horz from "./potentiometer2_horz"

const rotated = rotateSymbol(potentiometer2_horz)

const texts = rotated.primitives.filter((p) => p.type === "text")!

const val = texts.find((t) => t.text === "{VAL}")!
val.anchor = "middle_right"

const ref = texts.find((t) => t.text === "{REF}")!
ref.anchor = "middle_left"

export default rotated
