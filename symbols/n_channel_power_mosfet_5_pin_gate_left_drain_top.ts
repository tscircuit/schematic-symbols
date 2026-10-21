import { createFiveTerminalPowerMosfetVariant } from "drawing/createFiveTerminalPowerMosfetVariant"
import horizontalSymbol from "./n_channel_power_mosfet_5_pin_horz"
import verticalSymbol from "./n_channel_power_mosfet_5_pin_vert"

export default createFiveTerminalPowerMosfetVariant({
  horizontalSymbol,
  verticalSymbol,
  gateSide: "left",
  drainSide: "top",
})
