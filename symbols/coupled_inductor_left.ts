import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import coupledInductorRight from "./coupled_inductor_right"

export default renumberSymbolPortsCounterClockwise({
  symbol: flipSymbolOverYAxis(coupledInductorRight),
  firstPortAlias: "winding1_start",
})
