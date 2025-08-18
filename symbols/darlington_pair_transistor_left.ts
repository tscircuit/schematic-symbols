import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/darlington_pair_transistor.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .labelPort("right2", ["1"])
  .labelPort("right1", ["2"])
  .labelPort("right3", ["3"])
  .changeTextAnchor("{VAL}", "middle_left", { x: 0, y: -0.8 })
  .changeTextAnchor("{REF}", "middle_left", { x: 0, y: 0.8 })
  .build()
