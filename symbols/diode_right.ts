import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/diode.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1", "pos"])
  .labelPort("right1", ["2", "neg"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
