import { rotateSymbol } from "drawing/rotateSymbol"
import laser_diode_horz from "./laser_diode_horz"



const rotatedSymbol = rotateSymbol(laser_diode_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")

const ref = texts.find((t) => t.text === "{VAL}")!

ref.x = -0.52
ref.anchor = "middle_right"

export default rotatedSymbol