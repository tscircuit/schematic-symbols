import { rotateSymbol } from "drawing/rotateSymbol"
import varistor_horz from "./varistor_horz"

const varistorVert = rotateSymbol(varistor_horz)
const textPrimitives = varistorVert.primitives.filter(
  (primitive) => primitive.type === "text",
)
const referenceText = textPrimitives.find(
  (primitive) => primitive.text === "{REF}",
)!
const ratingText = textPrimitives.find(
  (primitive) => primitive.text === "{VAL}",
)!

referenceText.x = 0.3
referenceText.y = 0.15
referenceText.anchor = "middle_left"

ratingText.x = 0.3
ratingText.y = -0.15
ratingText.anchor = "middle_left"

export default varistorVert
