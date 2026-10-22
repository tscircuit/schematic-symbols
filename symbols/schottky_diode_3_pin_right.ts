import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/schottky_diode_3_pin.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["2", "anode2", "a2", "anode", "a"])
  .labelPort("left2", ["1", "anode1", "a1", "anode", "a"])
  .labelPort("right1", ["3", "cathode", "k"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("right")
  .build()
