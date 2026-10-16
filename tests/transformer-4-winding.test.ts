import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

test("four-winding transformer orientations preserve winding terminals", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("transformer_4_winding_" +
      orientation) as keyof typeof symbols
    const transformer = symbols[symbolName]
    const windingTerminals = [
      "primary1_start",
      "primary1_end",
      "primary2_start",
      "primary2_end",
      "secondary1_start",
      "secondary1_end",
      "secondary2_start",
      "secondary2_end",
    ] as const

    expect(transformer.ports, symbolName).toHaveLength(8)
    const polarityDots = transformer.primitives.filter(
      (primitive) => primitive.type === "circle" && primitive.fill,
    )
    expect(polarityDots, symbolName).toHaveLength(4)
    for (const terminalAlias of windingTerminals) {
      expect(
        transformer.ports.some((port) => port.labels.includes(terminalAlias)),
        symbolName + " " + terminalAlias,
      ).toBeTrue()
    }
  }
})
