import svgJson from "assets/generated/npn_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_right")
  .labelPort("left1", ["3"])
  .labelPort("top1", ["1"])
  .labelPort("bottom1", ["2"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()
