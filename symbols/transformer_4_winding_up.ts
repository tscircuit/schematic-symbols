import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/transformer_4_winding.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["4", "primary2_end"])
  .labelPort("left2", ["3", "primary2_start"])
  .labelPort("left3", ["2", "primary1_end"])
  .labelPort("left4", ["1", "primary1_start"])
  .labelPort("right1", ["8", "secondary2_end"])
  .labelPort("right2", ["7", "secondary2_start"])
  .labelPort("right3", ["6", "secondary1_end"])
  .labelPort("right4", ["5", "secondary1_start"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("up")
  .build()
