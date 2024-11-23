import svgJson from "assets/generated/illuminated_push_button_normally_open.json"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
