import { rotateRightFacingSymbol } from "../drawing/rotateSymbol"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import orGateWithPowerRight from "./or_gate_with_power_right"

const rotatedOrGate = rotateRightFacingSymbol(orGateWithPowerRight, {
  newOrientation: "up",
})

const orGateWithTextLayout = setRefValTextLayout({
  symbol: rotatedOrGate,
  reference: { x: 0.82, y: 0.18, anchor: "middle_left" },
  value: { x: 0.82, y: -0.18, anchor: "middle_left" },
  size: { width: 2.4, height: 2.1 },
})

export default renumberSymbolPortsCounterClockwise({
  symbol: orGateWithTextLayout,
  firstPortAlias: "a",
})
