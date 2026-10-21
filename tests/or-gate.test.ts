import { expect, test } from "bun:test"
import orGateAsset from "../assets/generated/or_gate.json"
import symbols from "../generated/symbols-index"
import { expectPortsNumberedCounterClockwise } from "./helpers/expect-ports-numbered-counter-clockwise"
import { expectReferenceAboveValue } from "./helpers/expect-reference-above-value"
import { expectSymbolGeometryToBeYAxisMirror } from "./helpers/expect-symbol-geometry-to-be-y-axis-mirror"

const pointsMatch = (
  firstPoint: { x: number; y: number },
  secondPoint: { x: number; y: number },
): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  0.000001

const expectInputsToMeetBody = (
  symbol: (typeof symbols)[keyof typeof symbols],
) => {
  const body = symbol.primitives.find(
    (primitive) => primitive.type === "path" && primitive.points.length > 20,
  )
  expect(body?.type).toBe("path")
  if (body?.type !== "path") return

  for (const inputAlias of ["a", "b"]) {
    const inputPort = symbol.ports.find((port) =>
      port.labels.includes(inputAlias),
    )
    const inputLead = symbol.primitives.find(
      (primitive) =>
        primitive.type === "path" &&
        inputPort !== undefined &&
        primitive.points.some((point) => pointsMatch(point, inputPort)),
    )
    expect(inputLead?.type).toBe("path")
    if (inputLead?.type !== "path") continue
    expect(
      inputLead.points.some((leadPoint) =>
        body.points.some((bodyPoint) => pointsMatch(leadPoint, bodyPoint)),
      ),
      `input ${inputAlias} meets OR body`,
    ).toBe(true)
  }
}

const expectVerticalTextLayout = (
  symbol: (typeof symbols)[keyof typeof symbols],
) => {
  const reference = symbol.primitives.find(
    (primitive) => primitive.type === "text" && primitive.text === "{REF}",
  )
  const value = symbol.primitives.find(
    (primitive) => primitive.type === "text" && primitive.text === "{VAL}",
  )
  expect(reference).toMatchObject({ anchor: "middle_left" })
  expect(value).toMatchObject({ anchor: "middle_left" })
  expect(reference?.x).toBe(value?.x)
  expect(reference?.y).toBeGreaterThan(value?.y ?? 0)
}

test("OR gate geometry and terminal identities remain correct in every orientation", () => {
  expect(orGateAsset.paths.body.fill).toBe(false)
  expect(orGateAsset.paths.body.points.at(-1)).toEqual(
    orGateAsset.paths.body.points[0],
  )

  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("or_gate_" + orientation) as keyof typeof symbols
    const orGate = symbols[symbolName]
    const inputA = orGate.ports.find((port) => port.labels.includes("a"))
    const inputB = orGate.ports.find((port) => port.labels.includes("b"))
    const outputY = orGate.ports.find((port) => port.labels.includes("y"))

    expect(inputA?.labels, symbolName).toContain("1")
    expect(inputB, symbolName).toBeDefined()
    expect(outputY, symbolName).toBeDefined()
    expectPortsNumberedCounterClockwise({ symbol: orGate, symbolName })
    expectReferenceAboveValue({ symbol: orGate, symbolName })
    expectInputsToMeetBody(orGate)
  }

  expectSymbolGeometryToBeYAxisMirror({
    rightFacingSymbol: symbols.or_gate_right,
    leftFacingSymbol: symbols.or_gate_left,
  })
  expectVerticalTextLayout(symbols.or_gate_up)
  expectVerticalTextLayout(symbols.or_gate_down)
})

test("powered OR gate variants preserve package power and signal terminals", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("or_gate_with_power_" +
      orientation) as keyof typeof symbols
    const orGate = symbols[symbolName]

    for (const terminalAlias of ["a", "b", "gnd", "y", "vcc"] as const) {
      const port = orGate.ports.find((candidate) =>
        candidate.labels.includes(terminalAlias),
      )
      expect(port, `${symbolName} ${terminalAlias}`).toBeDefined()
    }
    expect(
      orGate.ports.find((port) => port.labels.includes("a"))?.labels,
    ).toContain("1")
    expectPortsNumberedCounterClockwise({ symbol: orGate, symbolName })
    expectReferenceAboveValue({ symbol: orGate, symbolName })
    expectInputsToMeetBody(orGate)
  }

  expectSymbolGeometryToBeYAxisMirror({
    rightFacingSymbol: symbols.or_gate_with_power_right,
    leftFacingSymbol: symbols.or_gate_with_power_left,
  })
  expectVerticalTextLayout(symbols.or_gate_with_power_up)
  expectVerticalTextLayout(symbols.or_gate_with_power_down)
})
