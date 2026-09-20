import svgJson from "assets/generated/opamp_no_power.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

// Operational amplifier with inverting input on top
export default modifySymbol(svgJson)
  .labelPort("left1", ["2", "inp2", "in_neg", "inv", "-"])
  .labelPort("left2", ["1", "inp1", "in_pos", "noninv", "+"])
  .labelPort("right1", ["3", "out"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
