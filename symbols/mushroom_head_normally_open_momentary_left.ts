import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/mushroom_head_normally_open_momentary.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom", {x: 0, y: 0.7})
  .changeTextAnchor("{VAL}", "middle_top", {x: -0.17, y: -0.55})
  .build()
