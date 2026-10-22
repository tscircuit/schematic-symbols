import { rotateRightFacingSymbol } from "../drawing/rotateSymbol"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import fourTerminalCapacitorRight from "./four_terminal_capacitor_right"

const rotatedSymbol = rotateRightFacingSymbol(fourTerminalCapacitorRight, {
  newOrientation: "up",
})
const symbolWithTextLayout = setRefValTextLayout({
  symbol: rotatedSymbol,
  reference: { x: 0.5, y: 0.12, anchor: "middle_left" },
  displayValue: { x: 0.5, y: -0.12, anchor: "middle_left" },
  size: { width: 1.5, height: 1.4 },
})

export default symbolWithTextLayout
