import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/capacitor_polarized.json"

export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("right")
  .labelPort("left1", ["1", "neg"])
  .labelPort("right1", ["2", "pos"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
