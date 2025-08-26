import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/square_wave.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{VAL}", "middle_left", { x: 0.02, y: -0.2 })
  .changeTextAnchor("{REF}", "middle_left", { x: 0.5, y: 0.2 })
  .build()
