import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/inductor.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left", { x: 0.6, y: 0.25 })
  .changeTextAnchor("{VAL}", "middle_left", { x: 0.15, y: -0.2 })
  .build()
