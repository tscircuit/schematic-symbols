import { rotateSymbol } from "drawing/rotateSymbol"
import dc_voltmeter_horz from "./dc_voltmeter_horz"
import { Primitive } from "drawing/types"
import svgJson from "assets/generated/dc_voltmeter.json"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"


const { 2: letter, 3: underline, ...rest } = dc_voltmeter_horz.primitives

function isPrimitive(value: any): value is Primitive {
  return typeof value === "object"
}

const rotatedSymbol = rotateSymbol({
  ...dc_voltmeter_horz,
  primitives: Object.values(rest).filter(isPrimitive),
})

// export default {
//   ...rotatedSymbol,
//   primitives: [...rotatedSymbol.primitives, letter, underline],
// }


export default modifySymbol(svgJson)
.rotateRightFacingSymbol("down")
.build()