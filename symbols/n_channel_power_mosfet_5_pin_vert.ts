import { rotateSymbol } from "drawing/rotateSymbol"
import { renumberSymbolPortsCounterClockwise } from "drawing/renumberSymbolPortsCounterClockwise"
import { setRefValTextLayout } from "drawing/setRefValTextLayout"
import nChannelPowerMosfetHorizontal from "./n_channel_power_mosfet_5_pin_horz"

const verticalSymbol = rotateSymbol(nChannelPowerMosfetHorizontal)

const verticalMosfetWithTextLayout = setRefValTextLayout({
  symbol: verticalSymbol,
  reference: { x: 0.35, y: 0.18, anchor: "middle_left" },
  value: { x: 0.35, y: -0.18, anchor: "middle_left" },
  size: { width: 1.2, height: 0.87 },
})

export default renumberSymbolPortsCounterClockwise({
  symbol: verticalMosfetWithTextLayout,
  firstPortAlias: "gate",
})
