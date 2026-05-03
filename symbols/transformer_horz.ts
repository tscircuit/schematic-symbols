import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/transformer.json"

export default modifySymbol(svgJson)
  .labelPort("top1", ["p1", "1"])
  .labelPort("bottom1", ["p2", "2"])
  .labelPort("top2", ["s1", "3"])
  .labelPort("bottom2", ["s2", "4"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
