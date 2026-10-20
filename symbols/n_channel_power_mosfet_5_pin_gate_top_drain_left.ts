import { createMosfetSymbolVariant } from "drawing/createMosfetSymbolVariant"
import horizontalSymbol from "./n_channel_power_mosfet_5_pin_horz"
import verticalSymbol from "./n_channel_power_mosfet_5_pin_vert"

export default createMosfetSymbolVariant({
  horizontalSymbol,
  verticalSymbol,
  gateSide: "top",
  drainSide: "left",
})
