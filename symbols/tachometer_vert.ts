import { rotateSymbol } from "drawing/rotateSymbol"
import tachometer_horz from "./tachometer_horz"
import { Primitive } from "drawing/types"

const { 5: letter, ...rest } = tachometer_horz.primitives

function isPrimitive(value: any): value is Primitive {
  return typeof value === "object"
}

const rotatedSymbol = rotateSymbol({
  ...tachometer_horz,
  primitives: Object.values(rest).filter(isPrimitive),
})

export default {
  ...rotatedSymbol,
  primitives: [...rotatedSymbol.primitives, letter],
}
