import svgJson from "assets/generated/icled.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
    .labelPort("left1", ["1", "power"])
    .labelPort("left2", ["2", "dout"])
    .labelPort("right1", ["3", "din"])
    .labelPort("right2", ["4", "gnd"])
    .changeTextAnchor("{REF}", "middle_bottom")
    .changeTextAnchor("{VAL}", "middle_top")
    .build()
