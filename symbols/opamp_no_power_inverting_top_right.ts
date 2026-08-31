import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import { flipSymbolOverXAxis } from "drawing/rotateSymbol"
import opamp_no_power_right from "./opamp_no_power_right"

// Right-facing op-amp with the inverting input ("-") on top and the
// non-inverting input ("+") on the bottom (TIDA-01421 style).
export default modifySymbol(flipSymbolOverXAxis(opamp_no_power_right))
  .changeTextAnchor("{REF}", "middle_bottom", { x: 0, y: 0.64 })
  .changeTextAnchor("{VAL}", "middle_top", { x: 0, y: -0.7 })
  .build()
