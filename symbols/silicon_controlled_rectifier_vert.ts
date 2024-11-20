import { rotateSymbol } from "drawing/rotateSymbol"
import silicon_controlled_rectifier_horz from "./silicon_controlled_rectifier_horz"

const rotatedSymbol = rotateSymbol(silicon_controlled_rectifier_horz)

const texts = rotatedSymbol.primitives.filter(
  (primitive) => primitive.type === "text",
)

const ref = texts.find((text) => text.text === "{REF}")!

ref.y = 0
ref.anchor = "middle_left"

export default rotatedSymbol
