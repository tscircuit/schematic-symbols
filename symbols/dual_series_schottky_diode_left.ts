import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/dual_series_schottky_diode.json"

export default modifySymbol(svgJson)
  .labelPort("bottom1", ["3", "junction", "common"])
  .labelPort("left1", ["1", "anode"])
  .labelPort("right1", ["2", "cathode"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("left")
  .build()
