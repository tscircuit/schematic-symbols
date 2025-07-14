import svgJson from "assets/generated/laser_diode.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

svgJson.bounds.width += 0.2
export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
