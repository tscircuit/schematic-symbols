import svgJson from "../assets/generated/vcc.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["1"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()
