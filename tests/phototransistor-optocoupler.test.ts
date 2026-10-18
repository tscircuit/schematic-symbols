import { expect, test } from "bun:test"
import optocouplerAsset from "../assets/generated/phototransistor_optocoupler.json"
import symbols from "../generated/symbols-index"

const SYMBOL_ENDPOINT_TOLERANCE = 0.000001

test("phototransistor emitter arrow separates the lead and diagonal leg", () => {
  const emitterLead = optocouplerAsset.paths.emitter
  const emitterArrow = optocouplerAsset.paths["emitter-arrow"]
  const emitterLeg = optocouplerAsset.paths["emitter-leg"]
  const transistorBase = optocouplerAsset.paths["transistor-base"]
  const emitterBend = emitterLead.points.at(-1)
  const arrowTip = emitterArrow.points[0]
  const innerLegStart = emitterLeg.points[0]
  const baseConnection = emitterLeg.points.at(-1)
  if (!emitterBend || !arrowTip || !innerLegStart) {
    throw new Error("Emitter geometry is incomplete")
  }
  const gapBetweenLeadAndInnerLeg = Math.hypot(
    emitterBend.x - innerLegStart.x,
    emitterBend.y - innerLegStart.y,
  )

  expect(emitterLead.points).toHaveLength(2)
  expect(emitterLeg.points).toHaveLength(2)
  expect(arrowTip).toEqual(emitterBend)
  expect(gapBetweenLeadAndInnerLeg).toBeGreaterThan(SYMBOL_ENDPOINT_TOLERANCE)
  expect(baseConnection?.x).toBe(transistorBase.points[0]?.x)
  expect(baseConnection?.y).toBeLessThan(transistorBase.points[0]?.y ?? 0)
  expect(baseConnection?.y).toBeGreaterThan(transistorBase.points[1]?.y ?? 0)
  expect(emitterArrow.points.every((point) => point.x <= arrowTip.x)).toBe(true)
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
