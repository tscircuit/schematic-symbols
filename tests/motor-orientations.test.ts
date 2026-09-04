import { expect, test } from "bun:test"
import type { SchSymbol } from "../drawing/types"
import symbols from "../generated/symbols-index"

const orientations = [
  "motor_horz",
  "motor_vert",
  "motor_right",
  "motor_up",
  "motor_left",
  "motor_down",
] as const

const getPort = (symbol: SchSymbol, label: string) =>
  symbol.ports.find((port) => port.labels.includes(label))!

test("motor exposes two ports in every orientation", () => {
  for (const name of orientations) {
    const symbol = symbols[name]
    expect(symbol.ports).toHaveLength(2)
    expect(getPort(symbol, "1")).toBeDefined()
    expect(getPort(symbol, "2")).toBeDefined()
  }
})

test("motor ports sit opposite each other across the body", () => {
  for (const name of orientations) {
    const symbol = symbols[name]
    const p1 = getPort(symbol, "1")
    const p2 = getPort(symbol, "2")
    expect(p1.x).toBeCloseTo(-p2.x)
    expect(p1.y).toBeCloseTo(-p2.y)
  }
})

test("motor numbers pin 1 first along the symbol's direction", () => {
  // right / horz point right -> pin 1 on the left
  expect(getPort(symbols.motor_right, "1").x).toBeLessThan(0)
  expect(getPort(symbols.motor_horz, "1").x).toBeLessThan(0)
  // left points left -> pin 1 on the right
  expect(getPort(symbols.motor_left, "1").x).toBeGreaterThan(0)
  // up / vert point up -> pin 1 on the bottom
  expect(getPort(symbols.motor_up, "1").y).toBeLessThan(0)
  expect(getPort(symbols.motor_vert, "1").y).toBeLessThan(0)
  // down points down -> pin 1 on the top
  expect(getPort(symbols.motor_down, "1").y).toBeGreaterThan(0)
})

test("motor ports stay connected to their leads", () => {
  for (const name of orientations) {
    const symbol = symbols[name]
    const pathPoints = symbol.primitives.flatMap((primitive) =>
      primitive.type === "path" ? primitive.points : [],
    )
    for (const port of symbol.ports) {
      expect(
        pathPoints.some(
          (point) =>
            Math.abs(point.x - port.x) < 1e-9 &&
            Math.abs(point.y - port.y) < 1e-9,
        ),
      ).toBe(true)
    }
  }
})

test("motor keeps a centered 'M' label and a round body in every orientation", () => {
  for (const name of orientations) {
    const symbol = symbols[name]

    const label = symbol.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "M",
    )
    expect(label).toBeDefined()
    expect(label!.type === "text" && label!.x).toBeCloseTo(0)
    expect(label!.type === "text" && label!.y).toBeCloseTo(0)

    const body = symbol.primitives.find(
      (primitive) => primitive.type === "circle",
    )
    expect(body).toBeDefined()
  }
})

test("motor uses a compact grid-aligned envelope", () => {
  expect(symbols.motor_horz.size.width).toBeCloseTo(1)
  expect(symbols.motor_horz.size.height).toBeCloseTo(0.9)
  expect(symbols.motor_up.size.width).toBeCloseTo(1)
  expect(symbols.motor_up.size.height).toBeCloseTo(1)
})
