import { rotateSymbol } from "drawing/rotateSymbol"
import watt_hour_meter_horz from "./watt_hour_meter_horz"
import { Primitive } from "drawing/types"

const { 5: letter, ...rest } = watt_hour_meter_horz.primitives

function isPrimitive(value: any): value is Primitive {
  return typeof value === "object"
}

const rotatedSymbol = rotateSymbol({
  ...watt_hour_meter_horz,
  primitives: Object.values(rest).filter(isPrimitive),
})

export default {
  ...rotatedSymbol,
  primitives: [...rotatedSymbol.primitives, letter],
}
