import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/rotary_switch_1x4.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["5", "common", "pole1", "c1"])
  .labelPort("right1", ["4", "pos4", "throw4", "p1_t4"])
  .labelPort("right2", ["3", "pos3", "throw3", "p1_t3"])
  .labelPort("right3", ["2", "pos2", "throw2", "p1_t2"])
  .labelPort("right4", ["1", "pos1", "throw1", "p1_t1"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("right")
  .build()
