import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/crystal.json"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_bottom")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_top")
  .build()
