import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/coupled_inductor.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1", "winding2_start"])
  .labelPort("left2", ["2", "winding1_start"])
  .labelPort("right1", ["4", "winding2_end"])
  .labelPort("right2", ["3", "winding1_end"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("down")
  .build()
