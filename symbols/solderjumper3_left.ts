import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/solderjumper3.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["1"])
  .labelPort("bottom1", ["2"])
  .labelPort("right1", ["3"])
  .changeTextAnchor("{REF}", "middle_top")
  .build()
