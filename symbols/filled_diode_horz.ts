
import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/filled_diode.json"
import { TextPrimitive } from "drawing/types"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol(svgJson)
.changeTextAnchor("{REF}", "middle_bottom")
.changeTextAnchor("{VAL}", "middle_top")
.build()