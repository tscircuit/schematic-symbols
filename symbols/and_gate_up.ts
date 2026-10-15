import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/and_gate.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["2", "in2", "input2", "b"])
  .labelPort("left2", ["1", "in1", "input1", "a"])
  .labelPort("right1", ["3", "out", "output", "y"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("up")
  .build()
