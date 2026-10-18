import { expect, test } from "bun:test"
import type { SchSymbol, TextPrimitive } from "drawing/types"
import capacitorDown from "symbols/capacitor_down"
import capacitorUp from "symbols/capacitor_up"

const REFERENCE_DESIGNATOR_HEIGHT_MM = 0.18

const getTextBounds = ({
  textPrimitive,
}: {
  textPrimitive: TextPrimitive
}) => {
  let minY = textPrimitive.y - REFERENCE_DESIGNATOR_HEIGHT_MM / 2
  let maxY = textPrimitive.y + REFERENCE_DESIGNATOR_HEIGHT_MM / 2

  if (textPrimitive.anchor.includes("top")) {
    minY = textPrimitive.y - REFERENCE_DESIGNATOR_HEIGHT_MM
    maxY = textPrimitive.y
  } else if (textPrimitive.anchor.includes("bottom")) {
    minY = textPrimitive.y
    maxY = textPrimitive.y + REFERENCE_DESIGNATOR_HEIGHT_MM
  }

  return { minY, maxY }
}

const expectTextWithinVerticalPorts = (symbol: SchSymbol) => {
  const minPortY = Math.min(...symbol.ports.map((port) => port.y))
  const maxPortY = Math.max(...symbol.ports.map((port) => port.y))
  const textPrimitives = symbol.primitives.filter(
    (primitive) => primitive.type === "text",
  )

  expect(textPrimitives).toHaveLength(2)
  for (const textPrimitive of textPrimitives) {
    const textBounds = getTextBounds({ textPrimitive })
    expect(textPrimitive.anchor).toBe("middle_left")
    expect(textBounds.minY).toBeGreaterThanOrEqual(minPortY)
    expect(textBounds.maxY).toBeLessThanOrEqual(maxPortY)
  }
}

test("vertical capacitor labels stay within the port y bounds", () => {
  expectTextWithinVerticalPorts(capacitorUp)
  expectTextWithinVerticalPorts(capacitorDown)
})
