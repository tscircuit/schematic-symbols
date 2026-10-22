import type { NinePointAnchor, Point, SchSymbol } from "./types"

interface SymbolTextPosition extends Point {
  anchor: NinePointAnchor
}

export const setRefValTextLayout = ({
  symbol,
  reference,
  displayValue,
  size,
}: {
  symbol: SchSymbol
  reference: SymbolTextPosition
  displayValue: SymbolTextPosition
  size?: SchSymbol["size"]
}): SchSymbol => ({
  ...symbol,
  primitives: symbol.primitives.map((primitive) => {
    if (primitive.type !== "text") return primitive
    if (primitive.text === "{REF}") return { ...primitive, ...reference }
    if (primitive.text === "{VAL}") return { ...primitive, ...displayValue }
    return primitive
  }),
  size: size ?? symbol.size,
})
