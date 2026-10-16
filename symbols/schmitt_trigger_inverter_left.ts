import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/schmitt_trigger_inverter.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1", "in", "input", "a"])
  .labelPort("right1", ["2", "out", "output", "y"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("left")
  .build()
