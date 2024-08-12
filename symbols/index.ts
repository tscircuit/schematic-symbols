import { boxresistor } from "./boxresistor"
import { boxresistor2 } from "./boxresistor2"
import { resizeSymbol } from "drawing/resizeSymbol"
import { getSvg } from "drawing/getSvg"
import { varistor } from "./varistor"

export const symbols = {
  boxresistor,
  boxresistor2,
  varistor,
  // Add other symbols here as they are created
}

export { getSvg, resizeSymbol as resize }
