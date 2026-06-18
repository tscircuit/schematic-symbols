import { rotateRightFacingSymbol } from "drawing/rotateSymbol"
import dc_ammeter_horz from "./dc_ammeter_horz"

const dc_ammeter_left = structuredClone(dc_ammeter_horz)

dc_ammeter_left.primitives = dc_ammeter_left.primitives.map((primitive) => {
  if (primitive.type !== "text") return primitive

  if (primitive.text === "{REF}") {
    return { ...primitive, y: 0.35, anchor: "middle_bottom" }
  }

  if (primitive.text === "{VAL}") {
    return { ...primitive, y: -0.3594553499999995, anchor: "middle_top" }
  }

  return primitive
})

export default rotateRightFacingSymbol(dc_ammeter_left, {
  newOrientation: "left",
})
