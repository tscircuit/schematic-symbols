import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

const thermistorVariants = [
  symbols.thermistor_right,
  symbols.thermistor_up,
  symbols.thermistor_left,
  symbols.thermistor_down,
]

test("thermistor has two labeled ports in every orientation", () => {
  for (const symbol of thermistorVariants) {
    expect(symbol.ports).toHaveLength(2)
    const labels = symbol.ports.map((port) => port.labels[0])
    expect(labels).toContain("1")
    expect(labels).toContain("2")
  }
})

test("thermistor ports face opposite directions along the orientation axis", () => {
  const rightPorts = symbols.thermistor_right.ports
  expect(Math.min(...rightPorts.map((p) => p.x))).toBeLessThan(
    symbols.thermistor_right.center.x,
  )
  expect(Math.max(...rightPorts.map((p) => p.x))).toBeGreaterThan(
    symbols.thermistor_right.center.x,
  )
  expect(rightPorts[0].y).toBeCloseTo(rightPorts[1].y)

  const upPorts = symbols.thermistor_up.ports
  expect(Math.min(...upPorts.map((p) => p.y))).toBeLessThan(
    symbols.thermistor_up.center.y,
  )
  expect(Math.max(...upPorts.map((p) => p.y))).toBeGreaterThan(
    symbols.thermistor_up.center.y,
  )
  expect(upPorts[0].x).toBeCloseTo(upPorts[1].x)
})

test("thermistor leads coincide with their ports in every orientation", () => {
  for (const symbol of thermistorVariants) {
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

test("thermistor body is a closed box crossed by the temperature diagonal", () => {
  const paths = symbols.thermistor_right.primitives.filter(
    (primitive) => primitive.type === "path",
  )

  const body = paths.find((path) => path.points.length === 5)
  expect(body).toBeDefined()
  const first = body!.points[0]
  const last = body!.points[body!.points.length - 1]
  expect(last.x).toBeCloseTo(first.x)
  expect(last.y).toBeCloseTo(first.y)

  const diagonal = paths.find(
    (path) => path.points.length === 4 && path !== body,
  )
  expect(diagonal).toBeDefined()
  const xs = diagonal!.points.map((point) => point.x)
  const ys = diagonal!.points.map((point) => point.y)
  expect(Math.min(...xs)).toBeLessThan(-0.2646)
  expect(Math.max(...xs)).toBeGreaterThan(0.2646)
  expect(Math.min(...ys)).toBeLessThan(-0.1323)
  expect(Math.max(...ys)).toBeGreaterThan(0.1323)
})
