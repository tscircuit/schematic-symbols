import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/avalanche_diode.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .changeTextAnchor("{VAL}", "middle_left")
  .labelPort("left1", ["1", "neg"])
  .labelPort("right1", ["2", "pos"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()
