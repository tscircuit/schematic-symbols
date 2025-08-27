import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/square_wave.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["1", "pos"])
  .labelPort("right1", ["2", "neg"])
  .changeTextAnchor("{REF}", "middle_bottom", { x: 0, y: 0.45 })
  .changeTextAnchor("{VAL}", "middle_top", { x: 0, y: -0.55 })
  .build()
