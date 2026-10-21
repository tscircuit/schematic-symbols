import { createMosfetSymbolVariant } from "./createMosfetSymbolVariant"
import { renumberSymbolPortsCounterClockwise } from "./renumberSymbolPortsCounterClockwise"
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
  const verticalTextX = drainSide === "left" ? -0.35 : 0.35
  const verticalTextAnchor =
    drainSide === "left" ? "middle_right" : "middle_left"
  const horizontalTextAnchor =
    gateSide === "left" ? "middle_right" : "middle_left"
  const symbolWithTextLayout = hasVerticalGate
    ? setRefValTextLayout({
        symbol: orientedSymbol,
        reference: {
          x: verticalTextX,
          y: 0.12,
          anchor: verticalTextAnchor,
        },
        value: {
          x: verticalTextX,
          y: -0.12,
          anchor: verticalTextAnchor,
        },
      })
    : setRefValTextLayout({
        symbol: orientedSymbol,
        reference: { x: 0, y: 0.36, anchor: horizontalTextAnchor },
        value: { x: 0, y: -0.42, anchor: horizontalTextAnchor },
      })

  return renumberSymbolPortsCounterClockwise({
    symbol: symbolWithTextLayout,
    firstPortAlias: "gate",
  })
}
