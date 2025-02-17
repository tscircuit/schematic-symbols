import svgJson from "assets/generated/dpst_normally_closed_switch.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .labelPort("right3", ["4"])
  .labelPort("left3", ["3"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
