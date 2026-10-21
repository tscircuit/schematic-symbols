import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import orGateWithPowerRight from "./or_gate_with_power_right"

export default renumberSymbolPortsCounterClockwise({
  symbol: flipSymbolOverYAxis(orGateWithPowerRight),
  firstPortAlias: "a",
})
