import svgJson from "assets/generated/npn_bipolar_transistor.json"
import { defineSymbol } from "drawing/defineSymbol"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_right")
  .labelPort("left1", ["3"])
  .labelPort("top1", ["2"])
  .labelPort("bottom1", ["1"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()
