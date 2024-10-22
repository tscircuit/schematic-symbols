import { rotateSymbol } from "drawing/rotateSymbol"
import { resizeSymbol } from "drawing/resizeSymbol"
import ground_vert from "./ground_vert.ts"

// Correct resize: Use valid key-value syntax for width and height

// Rotate the symbol by -90 degrees
const symbol = rotateSymbol(ground_vert)

// Rotate again (which effectively becomes 180 degrees from original)
const doublesymbol = rotateSymbol(symbol)

// Rotate a final time (270 degrees or -90 degrees from the double rotated one)
export default rotateSymbol(doublesymbol)
