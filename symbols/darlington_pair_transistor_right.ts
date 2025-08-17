import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/darlington_pair_transistor.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("right")
  .labelPort("right1", ["1"])
  .labelPort("right2", ["3"])
  .labelPort("right3", ["2"])
  .changeTextAnchor("{VAL}", "middle_right")
  .changeTextAnchor("{REF}", "middle_right")
  .build()
