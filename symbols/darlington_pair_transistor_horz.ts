import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/darlington_pair_transistor.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("right")
  .labelPort("right2", ["1"])
  .labelPort("right3", ["2"])
  .labelPort("right1", ["3"])
  .changeTextAnchor("{VAL}", "middle_right")
  .changeTextAnchor("{REF}", "middle_right")
  .build()
