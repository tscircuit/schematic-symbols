import svgJson from "assets/generated/icled.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1", "DIN"])
  .labelPort("left2", ["2", "POWER"])
  .labelPort("right1", ["3", "GND"])
  .labelPort("right2", ["4", "DOUT"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
