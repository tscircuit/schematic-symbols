import { rotateSymbol } from "drawing/rotateSymbol"
import pin_diode_horz from "./pin_diode_horz"

const rotatedSymbol = rotateSymbol(pin_diode_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")

const ref = texts.find((t) => t.text === "{VAL}")!

ref.anchor = "middle_right"

export default rotatedSymbol
