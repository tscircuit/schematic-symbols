import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/dpst_switch.json"
import { Primitive } from "drawing/types"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol(svgJson)
.changeTextAnchor("{VAL}", "middle_bottom")
.changeTextAnchor("{REF}", "middle_top")
.build()