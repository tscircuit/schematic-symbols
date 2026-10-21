import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import fourTerminalCapacitorRight from "./four_terminal_capacitor_right"

export default renumberSymbolPortsCounterClockwise({
  symbol: flipSymbolOverYAxis(fourTerminalCapacitorRight),
  firstPortAlias: "plate1_terminal1",
})
