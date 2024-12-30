import svgJson from "assets/generated/opamp.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1", "inp1"])
  .labelPort("left2", ["2", "inp2"])
  .labelPort("right1", ["3", "out"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
