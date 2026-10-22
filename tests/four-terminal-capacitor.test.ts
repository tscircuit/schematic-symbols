import { expect, test } from "bun:test"
import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import type { Point, SchSymbol } from "../drawing/types"
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
  plate1_terminal1: "1",
  plate1_terminal2: "2",
  plate2_terminal2: "3",
  plate2_terminal1: "4",
} as const

test("generated four-terminal capacitor assets preserve both plate terminals", () => {
  const symbolNames = [
    "four_terminal_capacitor_right",
    "four_terminal_capacitor_up",
    "four_terminal_capacitor_left",
    "four_terminal_capacitor_down",
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
      symbol.primitives.filter((primitive) => primitive.type === "path"),
    ).toHaveLength(6)
    expectEveryPortToTouchArtwork(symbol)
  }
})

test("left-facing generated capacitor mirrors the right-facing asset", () => {
  const mirroredRight = flipSymbolOverYAxis(
    symbols.four_terminal_capacitor_right,
  )
  expect(symbols.four_terminal_capacitor_left.primitives).toEqual(
    mirroredRight.primitives,
  )
})
