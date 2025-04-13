import svgJson from "assets/generated/pnp_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import { flipSymbolOverXAxis } from "drawing/rotateSymbol"

const pnp_bipolar_transistor_horz = modifySymbol(svgJson)
  .labelPort("left1", ["3"])
  .labelPort("bottom1", ["2"])
  .labelPort("top1", ["1"])
  .changeTextAnchor("{VAL}", "middle_right")
  .changeTextAnchor("{REF}", "middle_right")
  .build()

export default flipSymbolOverXAxis(pnp_bipolar_transistor_horz)
