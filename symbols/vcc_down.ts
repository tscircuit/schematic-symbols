import svgJson from "../assets/generated/vcc.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .changeTextAnchor("{REF}", "middle_top")
  .build()
