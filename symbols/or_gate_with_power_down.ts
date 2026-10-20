import { rotateRightFacingSymbol } from "../drawing/rotateSymbol"
import orGateWithPowerRight from "./or_gate_with_power_right"

export default rotateRightFacingSymbol(orGateWithPowerRight, {
  newOrientation: "down",
  overrides: { size: { width: 1.8, height: 2.1 } },
})
