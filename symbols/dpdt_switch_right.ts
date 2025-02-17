import svgJson from "assets/generated/dpdt_switch.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1"])
  .labelPort("right1", ["3"])
  .labelPort("right2", ["2"])
  .labelPort("right3", ["6"])
  .labelPort("left2", ["4"])
  .labelPort("right5", ["5"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
