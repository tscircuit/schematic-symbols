import { rotateSymbol } from "drawing/rotateSymbol"
import dc_ammeter_horz from "./dc_ammeter_horz"
import svgJson from "assets/generated/dc_ammeter.json"

import { PathPrimitive, Primitive, TextPrimitive } from "drawing/types"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

function isPathPrimitive(value: any): value is PathPrimitive {
  return (
    typeof value === "object" &&
    value !== null &&
    value.type === "path" &&
    Array.isArray(value.points) &&
    typeof value.color === "string"
  )
}

function isTextPrimitive(value: any): value is TextPrimitive {
  return (
    typeof value === "object" &&
    value !== null &&
    value.type === "text" &&
    typeof value.text === "string" &&
    typeof value.x === "number" &&
    typeof value.y === "number" &&
    typeof value.anchor === "string"
  )
}

const { 6: letter, 2: underline, ...rest } = dc_ammeter_horz.primitives

if (isPathPrimitive(underline)) {
  underline.points.map((p) => {
    p.y += 0.05
  })
}

if (isTextPrimitive(letter)) {
  letter.y += 0.025
}

function isPrimitive(value: any): value is Primitive {
  return typeof value === "object"
}

const rotatedSymbol = rotateSymbol({
  ...dc_ammeter_horz,
  primitives: Object.values(rest).filter(isPrimitive),
})
export default modifySymbol(svgJson)
.rotateRightFacingSymbol("down")
.build()

// export default {
//   ...rotatedSymbol,
//   primitives: [...rotatedSymbol.primitives, letter, underline],
// }
