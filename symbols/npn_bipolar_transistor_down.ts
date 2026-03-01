import svgJson from "../assets/generated/npn_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("right")
  .changeTextAnchor("{REF}", "middle_right")
  .changeTextAnchor("{VAL}", "middle_right")
  .labelPort("top1", ["1", "collector"])
  .labelPort("bottom1", ["3", "emitter"])
  .labelPort("left1", ["2", "base"])
  .build()
