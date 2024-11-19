import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/constant_current_diode.json"
import modifiedSymbol from "./led_up"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol(svgJson)
.changeTextAnchor("{REF}", "middle_top")
.changeTextAnchor("{VAL}", "middle_bottom")
.build()
