import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/coupled_inductor.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["3", "winding2_end"])
  .labelPort("left2", ["2", "winding1_end"])
  .labelPort("right1", ["4", "winding2_start"])
  .labelPort("right2", ["1", "winding1_start"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("right")
  .build()
