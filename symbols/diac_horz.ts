import svgJson from "assets/generated/diac.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
