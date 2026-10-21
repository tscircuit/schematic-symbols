import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectPortsNumberedCounterClockwise } from "./helpers/expect-ports-numbered-counter-clockwise"
import { expectReferenceAboveValue } from "./helpers/expect-reference-above-value"
import { expectSymbolGeometryToBeYAxisMirror } from "./helpers/expect-symbol-geometry-to-be-y-axis-mirror"

const POINT_TOLERANCE = 0.000001

const pointsMatch = (
  firstPoint: { x: number; y: number },
  secondPoint: { x: number; y: number },
): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  POINT_TOLERANCE

const expectPortsWithinSymbolSize = ({
  symbolName,
}: {
  symbolName: keyof typeof symbols
}) => {
  const symbol = symbols[symbolName]
  const halfWidth = symbol.size.width / 2
  const halfHeight = symbol.size.height / 2

  for (const port of symbol.ports) {
    expect(
      Math.abs(port.x - symbol.center.x),
      `${symbolName} port x`,
    ).toBeLessThanOrEqual(halfWidth)
    expect(
      Math.abs(port.y - symbol.center.y),
      `${symbolName} port y`,
    ).toBeLessThanOrEqual(halfHeight)
  }
}

test("three-pin Schottky preserves one junction and two package anode leads", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = `schottky_diode_3_pin_${orientation}` as const
    const diode = symbols[symbolName]
    const anode1 = diode.ports.find((port) => port.labels.includes("anode1"))
    const anode2 = diode.ports.find((port) => port.labels.includes("anode2"))
    const cathode = diode.ports.find((port) => port.labels.includes("cathode"))

    expect(anode1?.labels, symbolName).toContain("1")
    expect(anode2, symbolName).toBeDefined()
    expect(cathode, symbolName).toBeDefined()
    expect(diode.ports, symbolName).toHaveLength(3)
    expectPortsNumberedCounterClockwise({ symbol: diode, symbolName })
    expectReferenceAboveValue({ symbol: diode, symbolName })
    expectPortsWithinSymbolSize({ symbolName })

    for (const port of diode.ports) {
      expect(
        diode.primitives.some(
          (primitive) =>
            primitive.type === "path" &&
            primitive.points.some((point) => pointsMatch(point, port)),
        ),
        `${symbolName} connects package pin ${port.labels[0]}`,
      ).toBe(true)
    }
  }

  expectSymbolGeometryToBeYAxisMirror({
    rightFacingSymbol: symbols.schottky_diode_3_pin_right,
    leftFacingSymbol: symbols.schottky_diode_3_pin_left,
  })
})

test("vertical three-pin Schottky labels remain horizontal and separated", () => {
  for (const orientation of ["up", "down"] as const) {
    const diode = symbols[`schottky_diode_3_pin_${orientation}`]
    const reference = diode.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "{REF}",
    )
    const value = diode.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "{VAL}",
    )

    expect(reference).toMatchObject({ anchor: "middle_left", x: 0.31 })
    expect(value).toMatchObject({ anchor: "middle_left", x: 0.31 })
    expect(reference?.y).toBeGreaterThan(value?.y ?? Number.POSITIVE_INFINITY)
  }
})

test("right-facing package ports match the SS10P4 pinout proportions", () => {
  const diode = symbols.schottky_diode_3_pin_right
  const anode1 = diode.ports.find((port) => port.labels.includes("anode1"))
  const anode2 = diode.ports.find((port) => port.labels.includes("anode2"))
  const cathode = diode.ports.find((port) => port.labels.includes("cathode"))

  expect(anode1).toMatchObject({ x: -0.68, y: 0.19 })
  expect(anode2).toMatchObject({ x: -0.68, y: -0.11 })
  expect(cathode).toMatchObject({ x: 0.52, y: 0.04 })
})
