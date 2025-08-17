import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/darlington_pair_transistor.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .labelPort("right1", ["1"])
  .labelPort("right2", ["3"])
  .labelPort("right3", ["2"])
  .changeTextAnchor("{VAL}", "middle_left", { x: 0, y: -0.8 })
  .changeTextAnchor("{REF}", "middle_left", { x: 0, y: 0.8 })
  .build()
