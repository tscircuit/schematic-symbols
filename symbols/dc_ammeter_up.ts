import { rotateRightFacingSymbol } from "drawing/rotateSymbol"
import dc_ammeter_horz from "./dc_ammeter_horz"

const dc_ammeter_up = structuredClone(dc_ammeter_horz)

dc_ammeter_up.primitives = dc_ammeter_up.primitives.map((primitive) => {
  if (primitive.type !== "text") return primitive

  if (primitive.text === "{REF}") {
    return {
      ...primitive,
      x: 0.16,
      y: -0.3594553499999995,
      anchor: "middle_top",
    }
  }

  if (primitive.text === "{VAL}") {
    return { ...primitive, x: -0.16, y: -0.35, anchor: "middle_top" }
  }

  return primitive
})

export default rotateRightFacingSymbol(dc_ammeter_up, {
  newOrientation: "up",
})
