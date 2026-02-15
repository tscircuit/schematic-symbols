import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/solderjumper2.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
