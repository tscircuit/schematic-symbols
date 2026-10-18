import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/transformer_4_winding.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1", "primary_end"])
  .labelPort("left2", ["2", "primary_start"])
  .labelPort("left3", ["3", "auxiliary_end"])
  .labelPort("left4", ["4", "auxiliary_start"])
  .labelPort("right1", ["8", "secondary1_end"])
  .labelPort("right2", ["7", "secondary1_start"])
  .labelPort("right3", ["6", "secondary2_end"])
  .labelPort("right4", ["5", "secondary2_start"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("up")
  .build()
