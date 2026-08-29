import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import { flipSymbolOverXAxis } from "drawing/rotateSymbol"
import opamp_with_power_right from "./opamp_with_power_right"

// Right-facing op-amp with the inverting input ("-") on top and the
// non-inverting input ("+") on the bottom (TIDA-01421 style). The flip moves
// the supply pins too, so relabel them to keep V+ above and V- below.
export default modifySymbol(flipSymbolOverXAxis(opamp_with_power_right))
  .labelPort("5", ["tmp"])
  .labelPort("3", ["5", "V+"])
  .labelPort("tmp", ["3", "V-"])
  .changeTextAnchor("{REF}", "middle_bottom", { x: 0, y: 0.54 })
  .changeTextAnchor("{VAL}", "middle_top", { x: 0, y: -0.58 })
  .build()
