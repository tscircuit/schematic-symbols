import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

const POINT_TOLERANCE = 0.000001

const pointsMatch = (
  firstPoint: { x: number; y: number },
  secondPoint: { x: number; y: number },
): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  POINT_TOLERANCE

test("three-pin Schottky preserves one junction and two package anode leads", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = `schottky_diode_3_pin_${orientation}` as const
    const diode = symbols[symbolName]
    const anode1 = diode.ports.find((port) => port.labels.includes("anode1"))
    const anode2 = diode.ports.find((port) => port.labels.includes("anode2"))
    const cathode = diode.ports.find((port) => port.labels.includes("cathode"))

    expect(anode1?.labels, symbolName).toContain("1")
    expect(anode2?.labels, symbolName).toContain("2")
    expect(cathode?.labels, symbolName).toContain("3")
    expect(diode.ports, symbolName).toHaveLength(3)

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

  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.schottky_diode_3_pin_right,
    leftFacingSymbol: symbols.schottky_diode_3_pin_left,
  })
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
