import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/avalanche_diode.json"

export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left1", ["1", "pos", "anode"])
  .labelPort("right1", ["2", "neg", "cathode"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
