import { rotateSymbol } from "drawing/rotateSymbol"
import dc_ammeter_horz from "./dc_ammeter_horz"
import { Primitive } from "drawing/types"

const {
  6: letterLeft,
  7: letterCrossbar,
  2: underline,
  ...rest
} = structuredClone(dc_ammeter_horz.primitives)

function isPrimitive(value: any): value is Primitive {
  return typeof value === "object"
}

const rotatedSymbol = rotateSymbol({
  ...dc_ammeter_horz,
  primitives: Object.values(rest).filter(isPrimitive),
})

export default {
  ...rotatedSymbol,
  primitives: [
    ...rotatedSymbol.primitives,
    letterLeft,
    letterCrossbar,
    underline,
  ],
}
