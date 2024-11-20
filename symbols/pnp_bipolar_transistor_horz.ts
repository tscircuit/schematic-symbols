import svgJson from "assets/generated/pnp_bipolar_transistor.json"
import { defineSymbol } from "drawing/defineSymbol"
import { Primitive } from "drawing/types"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_right")
  .labelPort("left1", ["3"])
  .labelPort("bottom1", ["2"])
  .labelPort("top1", ["1"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()
