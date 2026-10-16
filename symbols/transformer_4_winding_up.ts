import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/transformer_4_winding.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1", "auxiliary_end"])
  .labelPort("left2", ["2", "auxiliary_start"])
  .labelPort("left3", ["5", "primary_end"])
  .labelPort("left4", ["3", "primary_start"])
  .labelPort("right1", ["9", "secondary2_end"])
  .labelPort("right2", ["10", "secondary2_start"])
  .labelPort("right3", ["6", "secondary1_end"])
  .labelPort("right4", ["7", "secondary1_start"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("up")
  .build()
