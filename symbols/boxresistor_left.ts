import svgJson from "assets/generated/boxresistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .changeTextAnchor("{VAL}", "middle_bottom")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_top")
  .build()
