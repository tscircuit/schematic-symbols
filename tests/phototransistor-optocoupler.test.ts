import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

const SYMBOL_ENDPOINT_TOLERANCE = 0.000001

test("phototransistor optocoupler orientations preserve terminal aliases", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("phototransistor_optocoupler_" +
      orientation) as keyof typeof symbols
    const optocoupler = symbols[symbolName]
    const enclosure = optocoupler.primitives[0]
    const expectedTerminals = [
      ["anode", "1"],
      ["cathode", "2"],
      ["emitter", "3"],
      ["collector", "4"],
    ] as const

    expect(enclosure.type, symbolName).toBe("path")
    if (enclosure.type === "path") {
      expect(enclosure.points[0], symbolName).toEqual(
        enclosure.points[enclosure.points.length - 1],
      )
    }

    for (const [terminalAlias, terminalNumber] of expectedTerminals) {
      const terminal = optocoupler.ports.find((port) =>
        port.labels.includes(terminalAlias),
      )
      const assertionLabel = symbolName + " " + terminalAlias
      expect(terminal, assertionLabel).toBeDefined()
      expect(terminal?.labels, assertionLabel).toContain(terminalNumber)
      expect(
        optocoupler.primitives.some(
          (primitive) =>
            primitive.type === "path" &&
            primitive.points.length === 2 &&
            primitive.points.some(
              (point) =>
                terminal !== undefined &&
                Math.hypot(point.x - terminal.x, point.y - terminal.y) <
                  SYMBOL_ENDPOINT_TOLERANCE,
            ),
        ),
        assertionLabel + " straight lead",
      ).toBe(true)
    }
  }
})
