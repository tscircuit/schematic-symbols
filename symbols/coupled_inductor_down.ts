import { rotateRightFacingSymbol } from "../drawing/rotateSymbol"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import coupledInductorRight from "./coupled_inductor_right"

const rotatedSymbol = rotateRightFacingSymbol(coupledInductorRight, {
  newOrientation: "down",
})
const symbolWithTextLayout = setRefValTextLayout({
  symbol: rotatedSymbol,
  reference: { x: 0.5, y: 0.12, anchor: "middle_left" },
  displayValue: { x: 0.5, y: -0.12, anchor: "middle_left" },
  size: { width: 1.8, height: 1 },
})

export default symbolWithTextLayout
