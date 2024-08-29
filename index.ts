import symbols from "./generated/symbols-index"

export type {
  SchSymbol,
  BoxPrimitive,
  CirclePrimitive,
  PathPrimitive,
  TextPrimitive,
} from "./drawing/types"
import { getSvg, getInnerSvg, resizeSymbol } from "./drawing"

import { BaseSymbolName } from "./generated/base-symbol-names"

/**
 * Utility for easier autocomplete:
 *
 * ```ts
 * BASE_SYMBOLS.boxresistor // "boxresistor"
 * ```
 */
export const BASE_SYMBOLS: Record<BaseSymbolName, BaseSymbolName> =
  Object.fromEntries(Object.keys(symbols).map((k) => [k, k])) as any

export { symbols, getSvg, getInnerSvg, resizeSymbol, BaseSymbolName }
