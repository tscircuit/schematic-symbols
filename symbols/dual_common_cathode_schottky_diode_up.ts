import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/dual_common_cathode_schottky_diode.json"

export default modifySymbol(svgJson)
  .labelPort("top1", ["1", "anode1", "a1"])
  .labelPort("bottom1", ["2", "anode2", "a2"])
  .labelPort("right1", ["3", "cathode", "common_cathode", "k"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("up")
  .build()
