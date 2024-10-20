import { rotateSymbol } from "drawing/rotateSymbol"
import unijunction_transistor_horz from "./unijunction_transistor_horz"

const rotatedSymbol = rotateSymbol(unijunction_transistor_horz)

const texts = rotatedSymbol.primitives.filter(
  (primitive) => primitive.type === "text",
)

const ref = texts.find((text) => text.text === "{REF}")!

ref.y = 0.1

const val = texts.find((text) => text.text === "{VAL}")!

val.y = 0.1
val.x = -0.4

export default rotatedSymbol
