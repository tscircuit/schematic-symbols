import svgJson from "assets/generated/SPST_switch.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

delete (svgJson.refblocks as any).left1
delete (svgJson.refblocks as any).right1
svgJson.bounds.width += 0.2
export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left2", ["1"])
  .labelPort("right2", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
