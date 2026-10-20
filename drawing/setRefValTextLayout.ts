import type { NinePointAnchor, Point, SchSymbol } from "./types"

interface SymbolTextPosition extends Point {
  anchor: NinePointAnchor
}

export const setRefValTextLayout = ({
  symbol,
  reference,
  value,
  size,
}: {
  symbol: SchSymbol
  reference: SymbolTextPosition
  value: SymbolTextPosition
  size?: SchSymbol["size"]
}): SchSymbol => ({
  ...symbol,
  primitives: symbol.primitives.map((primitive) => {
    if (primitive.type !== "text") return primitive
    if (primitive.text === "{REF}") return { ...primitive, ...reference }
    if (primitive.text === "{VAL}") return { ...primitive, ...value }
    return primitive
  }),
  size: size ?? symbol.size,
})
