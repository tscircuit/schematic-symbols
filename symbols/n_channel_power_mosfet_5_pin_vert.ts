import { rotateRightFacingSymbol } from "../drawing/rotateSymbol"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import horizontalSymbol from "./n_channel_power_mosfet_5_pin_horz"

const verticalSymbol = rotateRightFacingSymbol(horizontalSymbol, {
  newOrientation: "down",
})
const symbolWithTextLayout = setRefValTextLayout({
  symbol: verticalSymbol,
  reference: { x: 0.34, y: 0.11, anchor: "middle_left" },
  displayValue: { x: 0.34, y: -0.11, anchor: "middle_left" },
  size: { width: 1.2, height: 0.75 },
})

export default symbolWithTextLayout
