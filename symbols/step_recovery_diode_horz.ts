import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/step_recovery_diode.json"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol(svgJson)
.changeTextAnchor("{VAL}", "middle_bottom")
.changeTextAnchor("{REF}", "middle_top")
.build()