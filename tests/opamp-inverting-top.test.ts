import { expect, test } from "bun:test"
import type { PathPrimitive, SchSymbol } from "../drawing/types"
import symbols from "../generated/symbols-index"

const getPort = (symbol: SchSymbol, label: string) =>
  symbol.ports.find((port) => port.labels.includes(label))!

const getPlusSignVerticalStroke = (symbol: SchSymbol) =>
  symbol.primitives.find(
    (primitive): primitive is PathPrimitive =>
      primitive.type === "path" &&
      Boolean(primitive.fill) &&
      primitive.points.length === 2 &&
      Math.abs(primitive.points[0]!.x - primitive.points[1]!.x) < 1e-6 &&
      Math.abs(primitive.points[0]!.y - primitive.points[1]!.y) > 0.05,
  )!

test("right-facing inverting-top op-amp variants place inverting (-) input above non-inverting (+) input", () => {
  for (const name of [
    "opamp_no_power_inverting_top_right",
    "opamp_with_power_inverting_top_right",
  ] as const) {
    const symbol = symbols[name]
    const invertingPort = getPort(symbol, "inp2")
    const nonInvertingPort = getPort(symbol, "inp1")
    const outputPort = getPort(symbol, "out")
    const plusVerticalStroke = getPlusSignVerticalStroke(symbol)
    const plusCenterY =
      (plusVerticalStroke.points[0]!.y + plusVerticalStroke.points[1]!.y) / 2

    expect(invertingPort.labels, name).toContain("2")
    expect(nonInvertingPort.labels, name).toContain("1")
    expect(invertingPort.y, name).toBeGreaterThan(nonInvertingPort.y)
    expect(plusCenterY, name).toBeCloseTo(nonInvertingPort.y)
    expect(outputPort.x, name).toBeGreaterThan(invertingPort.x)
  }
})

test("powered inverting-top op-amp keeps V+ above and V- below", () => {
  for (const name of [
    "opamp_with_power_inverting_top_right",
    "opamp_with_power_inverting_top_left",
  ] as const) {
    const symbol = symbols[name]
    const vPlus = getPort(symbol, "V+")
    const vMinus = getPort(symbol, "V-")

    expect(vPlus.labels, name).toContain("5")
    expect(vMinus.labels, name).toContain("3")
    expect(vPlus.y, name).toBeGreaterThan(vMinus.y)
  }
})

test("all directional inverting-top op-amp variants are exported and preserve port labels", () => {
  for (const family of [
    "opamp_no_power_inverting_top",
    "opamp_with_power_inverting_top",
  ] as const) {
    for (const orientation of ["right", "down", "left", "up"] as const) {
      const symbolName = `${family}_${orientation}` as keyof typeof symbols
      const symbol = symbols[symbolName]

      expect(symbol, symbolName).toBeDefined()
      expect(getPort(symbol, "inp1").labels, symbolName).toContain("1")
      expect(getPort(symbol, "inp2").labels, symbolName).toContain("2")
      expect(getPort(symbol, "out"), symbolName).toBeDefined()
    }
  }
})
