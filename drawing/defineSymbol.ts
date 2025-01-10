import type { SchSymbol } from "./types"
import { getBoundsOfPrimitives } from "./utils/getBoundsOfPrimitives"

export function defineSymbol(
  symbol: Omit<SchSymbol, "size"> & Partial<Pick<SchSymbol, "size">>,
): SchSymbol {
  let size = symbol.size
  if (!size) {
    const bounds = getBoundsOfPrimitives(symbol.primitives)
    size = {
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
    }
  }
  return { ...symbol, size }
}
