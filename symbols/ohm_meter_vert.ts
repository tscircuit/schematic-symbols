import { rotateSymbol } from "drawing/rotateSymbol"
import ohm_meter_horz from "./ohm_meter_horz"
import { Primitive } from "drawing/types"

const { 2: ohm, ...rest } = ohm_meter_horz.primitives

function isPrimitive(value: any): value is Primitive {
  return typeof value === "object"
}

const rotatedSymbol = rotateSymbol({
  ...ohm_meter_horz,
  primitives: Object.values(rest).filter(isPrimitive),
})

export default {
  ...rotatedSymbol,
  primitives: [...rotatedSymbol.primitives, ohm],
}
