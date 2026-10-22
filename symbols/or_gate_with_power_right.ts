import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/or_gate_with_power.json"

export default modifySymbol(svgJson)
  .labelPort("top1", ["5", "vcc", "power"])
  .labelPort("bottom1", ["3", "gnd", "ground"])
  .labelPort("left1", ["2", "in2", "input2", "b"])
  .labelPort("left2", ["1", "in1", "input1", "a"])
  .labelPort("right1", ["4", "out", "output", "y"])
  .changeTextAnchor("{REF}", "bottom_left")
  .changeTextAnchor("{VAL}", "top_left")
  .rotateRightFacingSymbol("right")
  .build()
