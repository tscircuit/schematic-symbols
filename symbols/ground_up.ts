import svgJson from "../assets/generated/ground.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["1"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
