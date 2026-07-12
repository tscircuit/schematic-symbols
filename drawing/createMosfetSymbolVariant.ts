import { flipSymbolOverXAxis, flipSymbolOverYAxis } from "./rotateSymbol"
import type { SchSymbol } from "./types"

type SymbolSide = "left" | "right" | "top" | "bottom"

export const createMosfetSymbolVariant = ({
  horizontalSymbol,
  verticalSymbol,
  gateSide,
  drainSide,
}: {
  horizontalSymbol: SchSymbol
  verticalSymbol: SchSymbol
  gateSide: SymbolSide
  drainSide: SymbolSide
}): SchSymbol => {
  const isHorizontalGate = gateSide === "left" || gateSide === "right"
  const isHorizontalDrain = drainSide === "left" || drainSide === "right"
  if (isHorizontalGate === isHorizontalDrain) {
    throw new Error(
      `Invalid MOSFET orientation: gate ${gateSide}, drain ${drainSide}. Gate and drain must be perpendicular.`,
    )
  }

  let symbol = isHorizontalGate ? horizontalSymbol : verticalSymbol

  if (gateSide === "right" || (isHorizontalDrain && drainSide === "left")) {
    symbol = flipSymbolOverYAxis(symbol)
  }
  if (gateSide === "bottom" || (!isHorizontalDrain && drainSide === "bottom")) {
    symbol = flipSymbolOverXAxis(symbol)
  }

  return symbol
}
