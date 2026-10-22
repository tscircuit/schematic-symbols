import { expect, test } from "bun:test"
import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import type { PathPrimitive, Point, SchSymbol } from "../drawing/types"
import symbols from "../generated/symbols-index"

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

const expectedPinNumberByAlias = {
  winding1_start: "1",
  winding1_end: "2",
  winding2_end: "3",
  winding2_start: "4",
} as const

test("generated coupled-inductor assets preserve two separate windings", () => {
  const symbolNames = [
    "coupled_inductor_right",
    "coupled_inductor_up",
    "coupled_inductor_left",
    "coupled_inductor_down",
  ] as const

  for (const symbolName of symbolNames) {
    const symbol = symbols[symbolName]
    expect(symbol.ports).toHaveLength(4)
    for (const [alias, expectedPinNumber] of Object.entries(
      expectedPinNumberByAlias,
    )) {
      const port = symbol.ports.find((port) => port.labels.includes(alias))
      expect(port, `${symbolName} is missing ${alias}`).toBeDefined()
      expect(
        port?.labels,
        `${symbolName} changed ${alias}'s pin number`,
      ).toContain(expectedPinNumber)
    }
    expect(
      symbol.primitives.filter(
        (primitive) => primitive.type === "circle" && primitive.fill,
      ),
    ).toHaveLength(2)
    expectEveryPortToTouchArtwork(symbol)
  }
})

test("source drawing keeps four smooth lobes facing the core", () => {
  const windingPaths = symbols.coupled_inductor_right.primitives.filter(
    (primitive): primitive is PathPrimitive =>
      primitive.type === "path" && primitive.points.length > 50,
  )
  expect(windingPaths).toHaveLength(2)

  const upperWinding = windingPaths.find((windingPath) =>
    windingPath.points.some((point) => point.y > 0.18),
  )
  const lowerWinding = windingPaths.find((windingPath) =>
    windingPath.points.some((point) => point.y < -0.18),
  )
  expect(upperWinding?.points.some((point) => point.y < 0.1)).toBe(true)
  expect(lowerWinding?.points.some((point) => point.y > -0.1)).toBe(true)
})

test("left-facing artwork mirrors the right-facing generated asset", () => {
  const mirroredRight = flipSymbolOverYAxis(symbols.coupled_inductor_right)
  expect(symbols.coupled_inductor_left.primitives).toEqual(
    mirroredRight.primitives,
  )
})
