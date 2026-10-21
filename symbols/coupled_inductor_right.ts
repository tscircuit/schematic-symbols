import { createCoupledInductorRight } from "../drawing/createCoupledInductorRight"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"

export default renumberSymbolPortsCounterClockwise({
  symbol: createCoupledInductorRight(),
  firstPortAlias: "winding1_start",
})
