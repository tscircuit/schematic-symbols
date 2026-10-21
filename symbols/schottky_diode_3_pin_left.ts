import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import schottkyDiode3PinRight from "./schottky_diode_3_pin_right"

export default renumberSymbolPortsCounterClockwise({
  symbol: flipSymbolOverYAxis(schottkyDiode3PinRight),
  firstPortAlias: "anode1",
})
