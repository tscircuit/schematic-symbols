import { expect, test } from "bun:test"
import optocouplerAsset from "../assets/generated/phototransistor_optocoupler.json"
import symbols from "../generated/symbols-index"

const SYMBOL_ENDPOINT_TOLERANCE = 0.000001

test("phototransistor emitter branch reaches the transistor base", () => {
  const emitter = optocouplerAsset.paths.emitter
  const emitterArrow = optocouplerAsset.paths["emitter-arrow"]
  const transistorBase = optocouplerAsset.paths["transistor-base"]
  const emitterTip = emitter.points[1]
  const baseConnection = emitter.points.at(-1)

  expect(emitter.points).toHaveLength(3)
  expect(emitterTip).toEqual(emitterArrow.points[0])
  expect(baseConnection?.x).toBe(transistorBase.points[0]?.x)
  expect(baseConnection?.y).toBeLessThan(transistorBase.points[0]?.y ?? 0)
  expect(baseConnection?.y).toBeGreaterThan(transistorBase.points[1]?.y ?? 0)
})

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
