import crystal_4pin_horz from "./crystal_4pin_horz"
import { rotateRightFacingSymbol } from "drawing/rotateSymbol"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/crystal_4pin.json"

export default modifySymbol(crystal_4pin_horz)
  .rotateRightFacingSymbol("up")
  .changeTextAnchor("{REF}", "top_right")
  .changeTextAnchor("{VAL}", "bottom_left")
  .build()
