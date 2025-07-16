import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/diac.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom", { x: 0, y: 0.8 })
  .changeTextAnchor("{VAL}", "middle_top", { x: 0, y: -0.9 })
  .build()
