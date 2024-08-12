import { rotate, applyToPoint } from "transformation-matrix"
import type { SchSymbol } from "drawing"

export const rotateSymbol = (
  symbol: SchSymbol,
  overrides?: Partial<SchSymbol>,
): SchSymbol => {
  const transform = rotate(Math.PI / 2, symbol.center.x, symbol.center.y)

  const { primitives, center, size, ports } = symbol

  // TODO
}
