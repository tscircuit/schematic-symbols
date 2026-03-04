import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/mushroom_head_normally_open_momentary.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left", { x: 0, y: 0.25 })
  .changeTextAnchor("{VAL}", "middle_left", { x: 0.53, y: -0.43 })
  .build()
