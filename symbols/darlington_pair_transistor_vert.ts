import svgJson from "assets/generated/darlington_pair_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"


svgJson.bounds.width += 0.3
export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .changeTextAnchor("{VAL}", "middle_right")
  .labelPort("right2", ["1"])
  .labelPort("right3", ["2"])
  .labelPort("right1", ["3"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
