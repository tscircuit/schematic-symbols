import svgJson from "assets/generated/crystal.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"


export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .changeTextAnchor("{VAL}", "middle_left")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()
