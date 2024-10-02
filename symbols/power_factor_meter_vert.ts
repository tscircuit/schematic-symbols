import { rotateSymbol } from "drawing/rotateSymbol"
import power_factor_meter_horz from "./power_factor_meter_horz"
import { text } from "drawing/text"

const rotatedSymbol = rotateSymbol(power_factor_meter_horz)
const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")
const ref = texts.find((t) => t.text === "{REF}")!
const val = texts.find((t) => t.text === "{VAL}")!
const text_cos = texts.find((t) => t.text === "COS φ")!
ref.x = 0.35
ref.y = 0
val.x = -0.6
val.y = 0
text_cos.x = -0.1
text_cos.y = 0
export default rotatedSymbol
