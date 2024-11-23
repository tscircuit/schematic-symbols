import svgJson from "assets/generated/diode.json"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .labelPort("left1", ["1", "pos"])
  .labelPort("right1", ["2", "neg"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
