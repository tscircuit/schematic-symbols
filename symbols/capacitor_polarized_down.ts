import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { resizeSymbol } from "drawing/resizeSymbol"
import svgJson from "assets/generated/capacitor_polarized.json"

const symbol = modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["2", "neg"])
  .labelPort("right1", ["1", "pos"])
  .changeTextAnchor("{REF}", "middle_left", { x: 0.7, y: 0.3 })
  .changeTextAnchor("{VAL}", "middle_left", { x: -0.12, y: -0.3 })
  .build()

export default resizeSymbol(symbol, { width: 0.45, height: 1.3 })
