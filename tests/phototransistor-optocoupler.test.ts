import { expect, test } from "bun:test"
import optocouplerAsset from "../assets/generated/phototransistor_optocoupler.json"
import symbols from "../generated/symbols-index"

const SYMBOL_ENDPOINT_TOLERANCE = 0.000001

test("phototransistor and light arrows use balanced geometry", () => {
  const ledBody = optocouplerAsset.paths["led-body"]
  const ledCathode = optocouplerAsset.paths["led-cathode"]
  const emitter = optocouplerAsset.paths.emitter
  const emitterArrow = optocouplerAsset.paths["emitter-arrow"]
  const transistorBase = optocouplerAsset.paths["transistor-base"]
  const lightRayOne = optocouplerAsset.paths["light-ray-one"]
  const lightRayOneHead = optocouplerAsset.paths["light-ray-one-head"]
  const lightRayTwo = optocouplerAsset.paths["light-ray-two"]
  const lightRayTwoHead = optocouplerAsset.paths["light-ray-two-head"]
  const arrowTip = emitterArrow.points[1]
  const baseConnection = emitter.points[0]
  const emitterBend = emitter.points[1]
  if (!arrowTip || !baseConnection || !emitterBend) {
    throw new Error("Emitter geometry is incomplete")
  }

  expect(emitter.points).toHaveLength(3)
  expect(ledBody.fill).toBe(false)
  expect(ledBody.points.at(-1)).toEqual(ledBody.points[0])
  expect(ledCathode.points).toHaveLength(2)
  expect(emitterArrow.fill).toBe(false)
  expect(emitterArrow.points).toHaveLength(3)
  expect(arrowTip.x).toBeGreaterThan(baseConnection.x)
  expect(arrowTip.x).toBeLessThan(emitterBend.x)
  expect(arrowTip.y).toBeLessThan(baseConnection.y)
  expect(arrowTip.y).toBeGreaterThan(emitterBend.y)
  expect(
    [emitterArrow.points[0], emitterArrow.points[2]].every(
      (point) => point !== undefined && point.x < arrowTip.x,
    ),
  ).toBe(true)
  expect(baseConnection.x).toBe(transistorBase.points[0]?.x)
  expect(baseConnection.y).toBeLessThan(transistorBase.points[0]?.y ?? 0)
  expect(baseConnection.y).toBeGreaterThan(transistorBase.points[1]?.y ?? 0)

  expect(lightRayOneHead.fill).toBe(false)
  expect(lightRayTwoHead.fill).toBe(false)
  expect(lightRayOneHead.points[1]).toEqual(lightRayOne.points.at(-1)!)
  expect(lightRayTwoHead.points[1]).toEqual(lightRayTwo.points.at(-1)!)
  expect(lightRayOne.points[1]!.x - lightRayOne.points[0]!.x).toBeCloseTo(
    lightRayTwo.points[1]!.x - lightRayTwo.points[0]!.x,
  )
  expect(lightRayOne.points[1]!.y - lightRayOne.points[0]!.y).toBeCloseTo(
    lightRayTwo.points[1]!.y - lightRayTwo.points[0]!.y,
  )
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
