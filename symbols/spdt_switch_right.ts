import svgJson from "assets/generated/spdt_switch.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left1", ["1"])
  .labelPort("right3", ["2"])
  .labelPort("right1", ["3"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
