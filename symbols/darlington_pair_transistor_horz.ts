import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/darlington_pair_transistor.json"
import { Primitive } from "drawing/types"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("right2", ["1"])
  .labelPort("right3", ["2"])
  .labelPort("right1", ["3"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
