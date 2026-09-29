import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

const buzzerVariants = [
  symbols.buzzer_right,
  symbols.buzzer_up,
  symbols.buzzer_left,
  symbols.buzzer_down,
]

test("buzzer has two labeled ports in every orientation", () => {
  for (const symbol of buzzerVariants) {
    expect(symbol.ports).toHaveLength(2)
    const labels = symbol.ports.map((port) => port.labels[0])
    expect(labels).toContain("1")
    expect(labels).toContain("2")
  }
})

test("buzzer ports sit on the opposite side of the dome in every orientation", () => {
  const getDome = (symbol: (typeof buzzerVariants)[number]) => {
    const paths = symbol.primitives.filter(
      (primitive) => primitive.type === "path",
    )
    const dome = paths.find((path) => path.points.length === 7)
    expect(dome).toBeDefined()
    return dome!
  }

  const rightDome = getDome(symbols.buzzer_right)
  expect(Math.max(...rightDome.points.map((p) => p.x))).toBeGreaterThan(
    symbols.buzzer_right.center.x,
  )
  for (const port of symbols.buzzer_right.ports) {
    expect(port.x).toBeLessThan(symbols.buzzer_right.center.x)
  }

  const leftDome = getDome(symbols.buzzer_left)
  expect(Math.min(...leftDome.points.map((p) => p.x))).toBeLessThan(
    symbols.buzzer_left.center.x,
  )
  for (const port of symbols.buzzer_left.ports) {
    expect(port.x).toBeGreaterThan(symbols.buzzer_left.center.x)
  }

  const upDome = getDome(symbols.buzzer_up)
  expect(Math.max(...upDome.points.map((p) => p.y))).toBeGreaterThan(
    symbols.buzzer_up.center.y,
  )
  for (const port of symbols.buzzer_up.ports) {
    expect(port.y).toBeLessThan(symbols.buzzer_up.center.y)
  }

  const downDome = getDome(symbols.buzzer_down)
  expect(Math.min(...downDome.points.map((p) => p.y))).toBeLessThan(
    symbols.buzzer_down.center.y,
  )
  for (const port of symbols.buzzer_down.ports) {
    expect(port.y).toBeGreaterThan(symbols.buzzer_down.center.y)
  }
})

test("buzzer leads coincide with their ports in every orientation", () => {
  for (const symbol of buzzerVariants) {
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

test("buzzer dome is a semicircle closed by the plate", () => {
  const paths = symbols.buzzer_right.primitives.filter(
    (primitive) => primitive.type === "path",
  )

  const dome = paths.find((path) => path.points.length === 7)
  const plate = paths.find(
    (path) =>
      path.points.length === 2 &&
      Math.abs(path.points[0].x - path.points[1].x) < Number.EPSILON,
  )
  expect(dome).toBeDefined()
  expect(plate).toBeDefined()

  // Dome endpoints coincide with plate endpoints (closed half-disc)
  const domeFirst = dome!.points[0]
  const domeLast = dome!.points[dome!.points.length - 1]
  const plateFirst = plate!.points[0]
  const plateLast = plate!.points[plate!.points.length - 1]
  expect(domeFirst.x).toBeCloseTo(plateFirst.x)
  expect(domeFirst.y).toBeCloseTo(plateFirst.y)
  expect(domeLast.x).toBeCloseTo(plateLast.x)
  expect(domeLast.y).toBeCloseTo(plateLast.y)

  // Dome radius equals half the plate length (true semicircle)
  const plateLength = Math.abs(plateLast.y - plateFirst.y)
  const domeBulge = Math.max(...dome!.points.map((p) => p.x)) - plateFirst.x
  expect(domeBulge).toBeCloseTo(plateLength / 2)
})
