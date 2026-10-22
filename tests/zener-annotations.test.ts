import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

test("Zener annotations keep REF above VAL in every direction", () => {
  for (const direction of ["right", "up", "left", "down"] as const) {
    const symbol = symbols[`zener_diode_${direction}`]
    const texts = symbol.primitives.filter(
      (primitive) => primitive.type === "text",
    )
    const ref = texts.find((text) => text.text === "{REF}")!
    const val = texts.find((text) => text.text === "{VAL}")!

    // Symbol-local coordinates are mm, with +X right and +Y up.
    expect(ref.y).toBeGreaterThan(symbol.center.y)
    expect(val.y).toBeLessThan(symbol.center.y)
    if (direction === "right" || direction === "left") {
      expect(ref.x).toBeCloseTo(symbol.center.x, 1)
      expect(val.x).toBeCloseTo(symbol.center.x, 1)
      expect(ref.anchor).toBe("middle_bottom")
      expect(val.anchor).toBe("middle_top")
    } else {
      expect(ref.x).toBeGreaterThan(symbol.center.x)
      expect(val.x).toBeCloseTo(ref.x)
      expect(ref.anchor).toBe("middle_left")
      expect(val.anchor).toBe("middle_left")
    }
  }
})
