import svgJson from "assets/generated/crystal_4pin.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .labelPort("top1", ["4", "gnd1"])
  .labelPort("bottom1", ["2", "gnd2"])
  .labelPort("left1", ["3"])
  .labelPort("right1", ["1"])
  .changeTextAnchor("{REF}", "bottom_left")
  .changeTextAnchor("{VAL}", "top_left")
  .build()
