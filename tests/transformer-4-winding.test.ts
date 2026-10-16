import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

test("four-winding transformer orientations preserve winding terminals", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("transformer_4_winding_" +
      orientation) as keyof typeof symbols
    const transformer = symbols[symbolName]
    const windingTerminals = [
      "primary_start",
      "primary_end",
      "auxiliary_start",
      "auxiliary_end",
      "secondary1_start",
      "secondary1_end",
      "secondary2_start",
      "secondary2_end",
    ] as const

    expect(transformer.ports, symbolName).toHaveLength(8)
    const polarityDots = transformer.primitives.filter(
      (primitive) => primitive.type === "circle" && primitive.fill,
    )
    const windingPaths = transformer.primitives.filter(
      (primitive) => primitive.type === "path" && primitive.points.length > 2,
    )
    expect(polarityDots, symbolName).toHaveLength(4)
    expect(windingPaths, symbolName).toHaveLength(4)
    for (const windingPath of windingPaths) {
      const windingEndpoints = [
        windingPath.points[0],
        windingPath.points[windingPath.points.length - 1],
      ]
      expect(
        windingEndpoints.every((endpoint) =>
          transformer.ports.some(
            (port) =>
              endpoint !== undefined &&
              Math.hypot(port.x - endpoint.x, port.y - endpoint.y) < 0.000001,
          ),
        ),
        symbolName + " continuous winding terminals",
      ).toBe(true)
    }
    for (const terminalAlias of windingTerminals) {
      expect(
        transformer.ports.some((port) => port.labels.includes(terminalAlias)),
        symbolName + " " + terminalAlias,
      ).toBeTrue()
    }
  }
})
