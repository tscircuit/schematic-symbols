import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/transformer.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("right")
  .labelPort("left2", ["1", "P1"])
  .labelPort("left1", ["2", "P2"])
  .labelPort("right2", ["3", "S1"])
  .labelPort("right1", ["4", "S2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
