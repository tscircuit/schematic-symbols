import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/SPST_switch.json"
import { Primitive } from "drawing/types"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"


delete svgJson.refblocks.left1
delete svgJson.refblocks.right1
svgJson.bounds.width += 0.2
const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left2", ["1"])
  .labelPort("right2", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
