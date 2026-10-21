import { rotateRightFacingSymbol } from "../drawing/rotateSymbol"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import schottkyDiode3PinRight from "./schottky_diode_3_pin_right"

const rotated = rotateRightFacingSymbol(schottkyDiode3PinRight, {
  newOrientation: "down",
})

const schottkyDiodeWithTextLayout = setRefValTextLayout({
  symbol: rotated,
  reference: { x: 0.31, y: 0.26, anchor: "middle_left" },
  value: { x: 0.31, y: -0.22, anchor: "middle_left" },
  size: { width: 0.62, height: 1.36 },
})

export default renumberSymbolPortsCounterClockwise({
  symbol: schottkyDiodeWithTextLayout,
  firstPortAlias: "anode1",
})
