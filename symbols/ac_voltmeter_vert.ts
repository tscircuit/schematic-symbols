import { rotateSymbol } from "drawing/rotateSymbol"
import dc_voltmeter_horz from "./ac_voltmeter_horz"
import { Primitive } from "drawing/types"

const {
  2: letter,
  3: path1,
  4: path2,
  5: path3,
  6: path4,
  ...rest
} = dc_voltmeter_horz.primitives

function isPrimitive(value: any): value is Primitive {
  return typeof value === "object"
}

const rotatedSymbol = rotateSymbol({
  ...dc_voltmeter_horz,
  primitives: Object.values(rest).filter(isPrimitive),
})

export default {
  ...rotatedSymbol,
  primitives: [...rotatedSymbol.primitives, letter, path1, path2, path3, path4],
}
