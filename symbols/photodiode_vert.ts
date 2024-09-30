import { rotateSymbol } from "drawing/rotateSymbol"
import photodiode_horz from "./photodiode_horz"

const rotatedSymbol = rotateSymbol(photodiode_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")

const ref = texts.find((t) => t.text === "{REF}")!

ref.y = 0
ref.anchor = "middle_left"

export default rotatedSymbol
