import { rotateRightFacingSymbol, rotateSymbol } from "drawing/rotateSymbol"
import avalanche_diode_horz from "./avalanche_diode_horz"

import type { TextPrimitive } from "drawing"

const rotated = rotateRightFacingSymbol(avalanche_diode_horz, {
  newOrientation: "down",
})

export default rotated
