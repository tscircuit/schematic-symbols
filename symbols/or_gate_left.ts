import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import orGateRight from "./or_gate_right"

export default renumberSymbolPortsCounterClockwise({
  symbol: flipSymbolOverYAxis(orGateRight),
  firstPortAlias: "a",
})
