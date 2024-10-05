import { rotateSymbol } from "drawing/rotateSymbol"
import varmeter_horz from "./varmeter_horz"
import { Primitive } from "drawing/types"

const { 5: letter, ...rest } = varmeter_horz.primitives

function isPrimitive(value: any): value is Primitive {
  return typeof value === "object"
}

const rotatedSymbol = rotateSymbol({
  ...varmeter_horz,
  primitives: Object.values(rest).filter(isPrimitive),
})

export default {
  ...rotatedSymbol,
  primitives: [...rotatedSymbol.primitives, letter],
}
