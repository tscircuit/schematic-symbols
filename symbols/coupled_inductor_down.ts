import { rotateRightFacingSymbol } from "../drawing/rotateSymbol"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import coupledInductorRight from "./coupled_inductor_right"

const rotated = rotateRightFacingSymbol(coupledInductorRight, {
  newOrientation: "down",
})

const coupledInductorWithTextLayout = setRefValTextLayout({
  symbol: rotated,
  reference: { x: 0.5, y: 0.12, anchor: "middle_left" },
  value: { x: 0.5, y: -0.12, anchor: "middle_left" },
  size: { width: 1.8, height: 1 },
})

export default renumberSymbolPortsCounterClockwise({
  symbol: coupledInductorWithTextLayout,
  firstPortAlias: "winding1_start",
})
