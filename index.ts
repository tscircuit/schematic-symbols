import symbols from "./symbols"

export type {
  SchSymbol,
  BoxPrimitive,
  CirclePrimitive,
  PathPrimitive,
  TextPrimitive,
} from "./drawing/types"
import { getSvg, getInnerSvg, resizeSymbol } from "./drawing"

export type BaseSymbolName =
  keyof typeof symbols extends `${infer T}_${infer U}` ? `${T}` : never

/**
 * Utility for easier autocomplete:
 *
 * BASE_SYMBOLS.boxresistor
 * // "boxresistor"
 */
export const BASE_SYMBOLS: Record<BaseSymbolName, BaseSymbolName> =
  Object.fromEntries(Object.keys(symbols).map((k) => [k, k])) as any

export { symbols, getSvg, getInnerSvg, resizeSymbol }
