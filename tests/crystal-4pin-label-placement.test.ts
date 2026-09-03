import { expect, test } from "bun:test"
import type { SchSymbol } from "../drawing/types"
import symbols from "../generated/symbols-index"

const getText = (symbol: SchSymbol, text: "{REF}" | "{VAL}") => {
  for (const primitive of symbol.primitives) {
    if (primitive.type === "text" && primitive.text === text) return primitive
  }

  throw new Error(`Missing ${text} primitive`)
}

test("four-pin crystal labels are stacked above the right pin", () => {
  const crystalVariants = [
    symbols.crystal_4pin_right,
    symbols.crystal_4pin_left,
    symbols.crystal_4pin_up,
    symbols.crystal_4pin_down,
  ]

  for (const symbol of crystalVariants) {
    const referenceText = getText(symbol, "{REF}")
    const valueText = getText(symbol, "{VAL}")
    const rightPin = symbol.ports.reduce((rightmostPort, port) => {
      if (port.x > rightmostPort.x) return port
      return rightmostPort
    })

    expect(referenceText.x).toBeCloseTo(valueText.x)
    expect(valueText.x).toBeCloseTo(0.4)
    expect(valueText.x).toBeLessThan(rightPin.x)
    expect(referenceText.y).toBeGreaterThan(valueText.y)
    expect(valueText.y).toBeGreaterThan(rightPin.y)
  }
})
