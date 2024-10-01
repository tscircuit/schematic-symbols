import { rotateSymbol } from "drawing/rotateSymbol"
import ac_ammeter_horz from "./ac_ammeter_horz"
import { Primitive } from "drawing/types"

const {
  0: path1,
  1: path2,
  2: path3,
  3: path4,
  9: letter,
  ...rest
} = ac_ammeter_horz.primitives

function isPrimitive(value: any): value is Primitive {
  return typeof value === "object"
}

const rotatedSymbol = rotateSymbol({
  ...ac_ammeter_horz,
  primitives: Object.values(rest).filter(isPrimitive),
})

export default {
  ...rotatedSymbol,
  primitives: [...rotatedSymbol.primitives, letter, path1, path2, path3, path4],
}
