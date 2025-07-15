import svgJson from "assets/generated/potentiometer3.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .labelPort("left", ["1"])
  .labelPort("right", ["2"])
  .labelPort("bottom", ["3"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
