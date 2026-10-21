import { expect } from "bun:test"
import type { SchSymbol, TextPrimitive } from "../../drawing/types"

const getTextPrimitive = ({
  symbol,
  text,
}: {
  symbol: SchSymbol
  text: string
}): TextPrimitive | undefined =>
  symbol.primitives.find(
    (primitive): primitive is TextPrimitive =>
      primitive.type === "text" && primitive.text === text,
  )

export const expectReferenceAboveValue = ({
  symbol,
  symbolName,
}: {
  symbol: SchSymbol
  symbolName: string
}) => {
  const referenceText = getTextPrimitive({ symbol, text: "{REF}" })
  const valueText = getTextPrimitive({ symbol, text: "{VAL}" })

  expect(referenceText, `${symbolName} reference text`).toBeDefined()
  expect(valueText, `${symbolName} value text`).toBeDefined()
  expect(
    referenceText?.y,
    `${symbolName} reference above value`,
  ).toBeGreaterThan(valueText?.y ?? Number.POSITIVE_INFINITY)
}
