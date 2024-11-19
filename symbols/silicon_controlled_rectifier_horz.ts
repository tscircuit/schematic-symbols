import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/silicon_controlled_rectifier.json"
import { TextPrimitive } from "drawing/types"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol(svgJson)
.changeTextAnchor("{VAL}", "middle_bottom")
.changeTextAnchor("{REF}", "middle_top")
.build()