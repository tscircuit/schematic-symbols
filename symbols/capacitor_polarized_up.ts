import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/capacitor_polarized.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["2", "neg"])
  .labelPort("right1", ["1", "pos"])
  .changeTextAnchor("{REF}", "middle_left", { x: -0.12, y: 0.3 })
  .changeTextAnchor("{VAL}", "middle_left", { x: 0.72, y: -0.3 })
  .build()
