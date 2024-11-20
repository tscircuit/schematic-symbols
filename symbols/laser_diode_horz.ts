import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/laser_diode.json"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

svgJson.bounds.width += 0.2
const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
