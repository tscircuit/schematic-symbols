import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/diac.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left", { x: 0.7, y: 0.2 })
  .changeTextAnchor("{VAL}", "middle_left", { x: -0.13, y: -0.2 })
  .build()
