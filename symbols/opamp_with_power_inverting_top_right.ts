import svgJson from "assets/generated/opamp_with_power_inverting_top.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .labelPort("left1", ["2", "inp2"])
  .labelPort("left2", ["1", "inp1"])
  .labelPort("right1", ["4", "out"])
  .labelPort("top2", ["5", "V+"])
  .labelPort("bottom1", ["3", "V-"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
