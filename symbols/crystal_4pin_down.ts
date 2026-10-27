import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { rotateRightFacingSymbol } from "../drawing/rotateSymbol"
import crystal4PinRight from "./crystal_4pin_right"

export default modifySymbol(
  rotateRightFacingSymbol(crystal4PinRight, {
    newOrientation: "down",
  }),
)
  .changeTextAnchor("{REF}", "middle_bottom", { x: -0.5, y: 0.7 })
  .changeTextAnchor("{VAL}", "middle_top", { x: 0.5, y: -0.7 })
  .build()
