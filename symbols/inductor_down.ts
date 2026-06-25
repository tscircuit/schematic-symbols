import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/inductor.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_right", { x: -0.5, y: 0 })
  .changeTextAnchor("{VAL}", "middle_left", { x: 0.5, y: 0 })
  .build()
