import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

const antennaVariants = [
  symbols.antenna_right,
  symbols.antenna_up,
  symbols.antenna_left,
  symbols.antenna_down,
]

test("antenna has a single feed port in every orientation", () => {
  for (const symbol of antennaVariants) {
    expect(symbol.ports).toHaveLength(1)
    expect(symbol.ports[0].labels).toContain("1")
    expect(symbol.ports[0].labels).toContain("feed")
  }
})

test("antenna feed port faces away from the dipole in every orientation", () => {
  expect(symbols.antenna_right.ports[0].x).toBeLessThan(
    symbols.antenna_right.center.x,
  )
  expect(symbols.antenna_left.ports[0].x).toBeGreaterThan(
    symbols.antenna_left.center.x,
  )
  expect(symbols.antenna_up.ports[0].y).toBeLessThan(
    symbols.antenna_up.center.y,
  )
  expect(symbols.antenna_down.ports[0].y).toBeGreaterThan(
    symbols.antenna_down.center.y,
  )
})

test("antenna mast endpoint coincides with the feed port", () => {
  for (const symbol of antennaVariants) {
    const pathPoints = symbol.primitives.flatMap((primitive) =>
      primitive.type === "path" ? primitive.points : [],
    )

    for (const port of symbol.ports) {
      const leadReachesPort = pathPoints.some(
        (point) =>
          Math.abs(point.x - port.x) < Number.EPSILON &&
          Math.abs(point.y - port.y) < Number.EPSILON,
      )

      expect(leadReachesPort).toBe(true)
    }
  }
})
