import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/rotary_switch_1x3.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["4", "common", "pole1", "c1"])
  .labelPort("right1", ["3", "pos3", "throw3", "p1_t3"])
  .labelPort("right2", ["2", "pos2", "throw2", "p1_t2"])
  .labelPort("right3", ["1", "pos1", "throw1", "p1_t1"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("up")
  .build()
