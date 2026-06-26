import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { resizeSymbol } from "drawing/resizeSymbol"
import svgJson from "assets/generated/capacitor_polarized.json"

const symbol = modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["2", "neg"])
  .labelPort("right1", ["1", "pos"])
  .changeTextAnchor("{REF}", "middle_bottom", { x: 0, y: 0.78 })
  .changeTextAnchor("{VAL}", "middle_top", { x: 0, y: -0.78 })
  .build()

export default resizeSymbol(symbol, { width: 1.3, height: 0.45 })
