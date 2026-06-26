import svgJson from "assets/generated/capacitor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import { resizeSymbol } from "drawing/resizeSymbol"

const symbol = modifySymbol(svgJson)
  .rotateRightFacingSymbol("right")
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left1", ["1", "pos"])
  .labelPort("right1", ["2", "neg"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()

export default resizeSymbol(symbol, { width: 1.3, height: 0.4 })
