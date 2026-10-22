import { createMosfetSymbolVariant } from "./createMosfetSymbolVariant"
import { setRefValTextLayout } from "./setRefValTextLayout"
import type { SchSymbol } from "./types"

type SymbolSide = "left" | "right" | "top" | "bottom"

export const createFiveTerminalPowerMosfetVariant = ({
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
  const orientedSymbol = createMosfetSymbolVariant({
    horizontalSymbol,
    verticalSymbol,
    gateSide,
    drainSide,
  })
  const hasVerticalGate = gateSide === "top" || gateSide === "bottom"
  const textX = hasVerticalGate
    ? drainSide === "left"
      ? -0.34
      : 0.34
    : gateSide === "left"
      ? -0.08
      : 0.08
  const textAnchor =
    drainSide === "left" || gateSide === "left" ? "middle_right" : "middle_left"
  const referenceY = hasVerticalGate ? 0.11 : 0.385
  const displayValueY = hasVerticalGate ? -0.11 : -0.395
  const size = hasVerticalGate
    ? { width: 1.2, height: 0.75 }
    : { width: 1.2, height: 1.05 }
  const symbolWithTextLayout = setRefValTextLayout({
    symbol: orientedSymbol,
    reference: { x: textX, y: referenceY, anchor: textAnchor },
    displayValue: { x: textX, y: displayValueY, anchor: textAnchor },
    size,
  })

  return symbolWithTextLayout
}
