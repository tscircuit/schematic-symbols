import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/inductor.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("right")
  .labelPort("right1", ["1"])
  .labelPort("left1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
