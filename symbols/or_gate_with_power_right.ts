import { createOrGateWithPower } from "drawing/createOrGateWithPower"
import { renumberSymbolPortsCounterClockwise } from "drawing/renumberSymbolPortsCounterClockwise"
import orGateRight from "./or_gate_right"

export default renumberSymbolPortsCounterClockwise({
  symbol: createOrGateWithPower(orGateRight),
  firstPortAlias: "a",
})
