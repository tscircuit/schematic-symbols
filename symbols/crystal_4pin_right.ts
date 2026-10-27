import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/crystal_4pin.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1"])
  .labelPort("left2", ["4", "gnd1"])
  .labelPort("right1", ["2", "gnd2"])
  .labelPort("right2", ["3"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
