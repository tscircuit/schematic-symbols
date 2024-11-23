import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/schottky_diode.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1", "pos"])
  .labelPort("right1", ["2", "neg"])
  .changeTextAnchor("{VAL}", "middle_top")
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
