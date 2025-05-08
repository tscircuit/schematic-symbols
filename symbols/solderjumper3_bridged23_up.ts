import svgJson from "../assets/generated/solderjumper3_bridged23.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["1"])
  .labelPort("bottom1", ["2"])
  .labelPort("right1", ["3"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()
