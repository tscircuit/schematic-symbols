import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/silicon_controlled_rectifier.json"
import { TextPrimitive } from "drawing/types"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .labelPort("bottom1", ["3"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
