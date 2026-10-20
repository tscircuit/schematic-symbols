import { rotateSymbol } from "drawing/rotateSymbol"
import { setRefValTextLayout } from "drawing/setRefValTextLayout"
import nChannelPowerMosfetHorizontal from "./n_channel_power_mosfet_5_pin_horz"

const verticalSymbol = rotateSymbol(nChannelPowerMosfetHorizontal)

export default setRefValTextLayout({
  symbol: verticalSymbol,
  reference: { x: 0.35, y: 0, anchor: "middle_left" },
  value: { x: -0.35, y: 0, anchor: "middle_right" },
  size: { width: 1.2, height: 0.87 },
})
