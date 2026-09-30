import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

const galvanometerVariants = [
  symbols.galvanometer_right,
  symbols.galvanometer_up,
  symbols.galvanometer_left,
  symbols.galvanometer_down,
]

test("galvanometer has two labeled ports in every orientation", () => {
  for (const symbol of galvanometerVariants) {
    expect(symbol.ports).toHaveLength(2)
    const labels = symbol.ports.map((port) => port.labels[0])
    expect(labels).toContain("1")
    expect(labels).toContain("2")
  }
})

test("galvanometer ports face opposite directions along the orientation axis", () => {
  const rightPorts = symbols.galvanometer_right.ports
  expect(Math.min(...rightPorts.map((p) => p.x))).toBeLessThan(
    symbols.galvanometer_right.center.x,
  )
  expect(Math.max(...rightPorts.map((p) => p.x))).toBeGreaterThan(
    symbols.galvanometer_right.center.x,
  )
  expect(rightPorts[0].y).toBeCloseTo(rightPorts[1].y)

  const upPorts = symbols.galvanometer_up.ports
  expect(Math.min(...upPorts.map((p) => p.y))).toBeLessThan(
    symbols.galvanometer_up.center.y,
  )
  expect(Math.max(...upPorts.map((p) => p.y))).toBeGreaterThan(
    symbols.galvanometer_up.center.y,
  )
  expect(upPorts[0].x).toBeCloseTo(upPorts[1].x)
})

test("galvanometer leads coincide with their ports in every orientation", () => {
  for (const symbol of galvanometerVariants) {
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

test("galvanometer body is a circle with the G glyph inside it", () => {
  const symbol = symbols.galvanometer_right
  const circle = symbol.primitives.find(
    (primitive) => primitive.type === "circle",
  )
  expect(circle).toBeDefined()
  expect(circle!.type === "circle" && circle!.radius).toBeCloseTo(0.26)

  const glyph = symbol.primitives.find(
    (primitive) => primitive.type === "path" && primitive.points.length > 4,
  )
  expect(glyph).toBeDefined()
  const points = glyph!.type === "path" ? glyph!.points : []
  for (const point of points) {
    const distanceFromCenter = Math.hypot(
      point.x - (circle!.type === "circle" ? circle!.x : 0),
      point.y - (circle!.type === "circle" ? circle!.y : 0),
    )
    expect(distanceFromCenter).toBeLessThan(
      circle!.type === "circle" ? circle!.radius : 0,
    )
  }
})
