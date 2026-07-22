import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

const orientationPairs = [
  [symbols.capacitor_polarized_right, symbols.capacitor_right],
  [symbols.capacitor_polarized_left, symbols.capacitor_left],
  [symbols.capacitor_polarized_up, symbols.capacitor_up],
  [symbols.capacitor_polarized_down, symbols.capacitor_down],
] as const

const getTerminalDistance = (symbol: (typeof orientationPairs)[number][0]) =>
  Math.hypot(
    symbol.ports[1].x - symbol.ports[0].x,
    symbol.ports[1].y - symbol.ports[0].y,
  )

const getPathSize = (symbol: (typeof orientationPairs)[number][0]) => {
  const points = symbol.primitives.flatMap((primitive) =>
    primitive.type === "path" ? primitive.points : [],
  )
  const xCoordinates = points.map(({ x }) => x)
  const yCoordinates = points.map(({ y }) => y)

  return {
    width: Math.max(...xCoordinates) - Math.min(...xCoordinates),
    height: Math.max(...yCoordinates) - Math.min(...yCoordinates),
  }
}

test("polarized capacitors exactly match non-polarized capacitor sizes", () => {
  for (const [polarized, nonPolarized] of orientationPairs) {
    expect(polarized.size).toEqual(nonPolarized.size)
    expect(getTerminalDistance(polarized)).toBe(
      getTerminalDistance(nonPolarized),
    )
    expect(getPathSize(polarized)).toEqual(getPathSize(nonPolarized))
  }
})
