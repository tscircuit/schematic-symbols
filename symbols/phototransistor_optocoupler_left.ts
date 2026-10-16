import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/phototransistor_optocoupler.json"

export default modifySymbol(svgJson)
  .labelPort("left1", ["2", "cathode", "input_cathode"])
  .labelPort("left2", ["1", "anode", "input_anode"])
  .labelPort("right1", ["3", "emitter", "output_emitter"])
  .labelPort("right2", ["4", "collector", "output_collector"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("left")
  .build()
