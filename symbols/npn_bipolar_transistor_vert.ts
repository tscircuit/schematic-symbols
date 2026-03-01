import svgJson from "assets/generated/npn_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .labelPort("top1", ["1", "collector"])
  .labelPort("bottom1", ["3", "emitter"])
  .labelPort("left1", ["2", "base"])
  .build()
