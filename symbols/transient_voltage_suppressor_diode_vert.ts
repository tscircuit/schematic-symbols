import { rotateSymbol } from "drawing/rotateSymbol"
import transient_voltage_suppressor_diode_horz from "./transient_voltage_suppressor_diode_horz"

const rotatedSymbol = rotateSymbol(transient_voltage_suppressor_diode_horz)
const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")
const ref = texts.find((t) => t.text === "{REF}")!
const val = texts.find((t) => t.text === "{VAL}")!

ref.x = 0.35
ref.y = 0
val.x = -0.6
val.y = 0
export default rotatedSymbol
