import { createMosfetSymbolVariant } from "drawing/createMosfetSymbolVariant"
import horizontalSymbol from "./p_channel_e_mosfet_transistor_horz"
import verticalSymbol from "./p_channel_e_mosfet_transistor_vert"

export default createMosfetSymbolVariant({
  horizontalSymbol,
  verticalSymbol,
  gateSide: "left",
  drainSide: "top",
})
