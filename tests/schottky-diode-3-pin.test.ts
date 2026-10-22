import { expect, test } from "bun:test"
import type { Point, SchSymbol } from "../drawing/types"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

const pointTouchesPort = ({
  point,
  port,
}: {
  point: Point
  port: Point
}): boolean => Math.hypot(point.x - port.x, point.y - port.y) < 0.000001

const expectEveryPortToTouchArtwork = (symbol: SchSymbol): void => {
  const pathPoints = symbol.primitives.flatMap((primitive) =>
    primitive.type === "path" ? primitive.points : [],
  )
  for (const port of symbol.ports) {
    expect(pathPoints.some((point) => pointTouchesPort({ point, port }))).toBe(
      true,
    )
  }
}

test("generated three-pin Schottky assets preserve one junction", () => {
  const symbolNames = [
    "schottky_diode_3_pin_right",
    "schottky_diode_3_pin_up",
    "schottky_diode_3_pin_left",
    "schottky_diode_3_pin_down",
  ] as const

  for (const symbolName of symbolNames) {
    const symbol = symbols[symbolName]
    expect(symbol.ports).toHaveLength(3)
    expect(
      symbol.ports.find((port) => port.labels.includes("anode1"))?.labels,
    ).toContain("1")
    expect(
      symbol.ports.find((port) => port.labels.includes("anode2"))?.labels,
    ).toContain("2")
    expect(
      symbol.ports.find((port) => port.labels.includes("cathode"))?.labels,
    ).toContain("3")
    expectEveryPortToTouchArtwork(symbol)
  }
})

test("right-facing package leads match the drawn SS10P4 proportions", () => {
  const symbol = symbols.schottky_diode_3_pin_right
  const anode1 = symbol.ports.find((port) => port.labels.includes("anode1"))
  const anode2 = symbol.ports.find((port) => port.labels.includes("anode2"))
  const cathode = symbol.ports.find((port) => port.labels.includes("cathode"))

  expect(anode1?.x).toBeCloseTo(-0.7)
  expect(anode1?.y).toBeCloseTo(0.15)
  expect(anode2?.x).toBeCloseTo(-0.7)
  expect(anode2?.y).toBeCloseTo(-0.15)
  expect(cathode?.x).toBeCloseTo(0.7)
  expect(cathode?.y).toBeCloseTo(0)
})

test("left-facing generated Schottky mirrors the right-facing asset", () => {
  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.schottky_diode_3_pin_right,
    leftFacingSymbol: symbols.schottky_diode_3_pin_left,
  })
})

test("vertical Schottky labels stay together on the right", () => {
  const symbolNames = [
    "schottky_diode_3_pin_up",
    "schottky_diode_3_pin_down",
  ] as const

  for (const symbolName of symbolNames) {
    const symbol = symbols[symbolName]
    const reference = symbol.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "{REF}",
    )
    const displayValue = symbol.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "{VAL}",
    )

    expect(reference?.type, symbolName).toBe("text")
    expect(displayValue?.type, symbolName).toBe("text")
    if (reference?.type !== "text" || displayValue?.type !== "text") continue

    expect(reference.x, symbolName).toBe(displayValue.x)
    expect(reference.y, symbolName).toBeGreaterThan(displayValue.y)
    expect(reference.anchor, symbolName).toBe("middle_left")
    expect(displayValue.anchor, symbolName).toBe("middle_left")
  }
})
