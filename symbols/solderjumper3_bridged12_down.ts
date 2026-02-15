import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/solderjumper3_bridged12.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .labelPort("bottom1", ["1"])
  .labelPort("left1", ["2"])
  .labelPort("right1", ["3"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
