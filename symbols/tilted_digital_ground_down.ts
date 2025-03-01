import { rotateSymbol } from "drawing/rotateSymbol"
import tilted_digital_ground_right from "./tilted_digital_ground_right"

const rotatedSymbol = rotateSymbol(tilted_digital_ground_right)
const texts = rotatedSymbol.primitives.filter(
  (primitive) => primitive.type === "text",
)

const ref = texts.find((text) => text.text === "{REF}")!
const val = texts.find((text) => text.text === "{VAL}")!

ref.y = 0
val.y = 0

export default rotateSymbol(tilted_digital_ground_right, "down")
