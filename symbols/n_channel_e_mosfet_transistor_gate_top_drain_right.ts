import { createMosfetSymbolVariant } from "drawing/createMosfetSymbolVariant"
import horizontalSymbol from "./n_channel_e_mosfet_transistor_horz"
import verticalSymbol from "./n_channel_e_mosfet_transistor_vert"

export default createMosfetSymbolVariant({
  horizontalSymbol,
  verticalSymbol,
  gateSide: "top",
  drainSide: "right",
})
