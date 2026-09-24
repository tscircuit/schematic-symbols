import { expect, test } from "bun:test"
import type { SchSymbol } from "../drawing/types"
import symbols from "../generated/symbols-index"

const orientations = [
  "transformer_horz",
  "transformer_vert",
  "transformer_right",
  "transformer_up",
  "transformer_left",
  "transformer_down",
] as const

const getPort = (symbol: SchSymbol, label: string) =>
  symbol.ports.find((port) => port.labels.includes(label))!

test("transformer exposes four numbered ports in every orientation", () => {
  for (const name of orientations) {
    const symbol = symbols[name]
    expect(symbol.ports).toHaveLength(4)
    for (const label of ["1", "2", "3", "4"]) {
      expect(getPort(symbol, label)).toBeDefined()
    }
  }
})

test("transformer keeps primary on pins 1/2 and secondary on pins 3/4", () => {
  for (const name of orientations) {
    const symbol = symbols[name]
    expect(getPort(symbol, "1").labels).toContain("P1")
    expect(getPort(symbol, "2").labels).toContain("P2")
    expect(getPort(symbol, "3").labels).toContain("S1")
    expect(getPort(symbol, "4").labels).toContain("S2")
  }
})

test("transformer places the primary and secondary windings on opposite sides", () => {
  for (const name of orientations) {
    const symbol = symbols[name]
    const primary = [getPort(symbol, "1"), getPort(symbol, "2")]
    const secondary = [getPort(symbol, "3"), getPort(symbol, "4")]

    const splitAlongX = Math.abs(primary[0].x - primary[1].x) < 1e-9
    if (splitAlongX) {
      expect(primary[0].x).toBeCloseTo(primary[1].x)
      expect(secondary[0].x).toBeCloseTo(secondary[1].x)
      expect(Math.sign(primary[0].x)).toBe(-Math.sign(secondary[0].x))
    } else {
      expect(primary[0].y).toBeCloseTo(primary[1].y)
      expect(secondary[0].y).toBeCloseTo(secondary[1].y)
      expect(Math.sign(primary[0].y)).toBe(-Math.sign(secondary[0].y))
    }
  }
})

test("transformer ports stay connected to their winding leads", () => {
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

test("transformer uses a compact grid-aligned envelope", () => {
  expect(symbols.transformer_horz.size.width).toBeCloseTo(0.8)
  expect(symbols.transformer_horz.size.height).toBeCloseTo(1.2)
  expect(symbols.transformer_up.size.width).toBeCloseTo(1.2)
  expect(symbols.transformer_up.size.height).toBeCloseTo(0.8)
})
