import { rotateSymbol } from "drawing/rotateSymbol"
import wattmeter_horz from "./wattmeter_horz"
import { Primitive } from "drawing/types"

const { 5: letter, ...rest } = wattmeter_horz.primitives

function isPrimitive(value: any): value is Primitive {
  return typeof value === "object"
}

const rotatedSymbol = rotateSymbol({
  ...wattmeter_horz,
  primitives: Object.values(rest).filter(isPrimitive),
})

export default {
  ...rotatedSymbol,
  primitives: [...rotatedSymbol.primitives, letter],
}
