import { expect, test } from "bun:test"
import type { PathPrimitive, SchSymbol } from "../drawing/types"
import symbols from "../generated/symbols-index"

const getPort = (symbol: SchSymbol, label: string) =>
  symbol.ports.find((port) => port.labels.includes(label))!

const getPathEndpoints = (symbol: SchSymbol) =>
  symbol.primitives.flatMap((primitive) =>
    primitive.type === "path"
      ? [primitive.points[0]!, primitive.points.at(-1)!]
      : [],
  )

const getShortVerticalPaths = (symbol: SchSymbol) =>
  symbol.primitives.filter(
    (primitive): primitive is PathPrimitive =>
      primitive.type === "path" &&
      primitive.points.length === 2 &&
      primitive.points[0]!.x === primitive.points[1]!.x &&
      Math.abs(primitive.points[1]!.y - primitive.points[0]!.y) < 0.1,
  )

test("right-facing inverting-top op-amps place - above +", () => {
  for (const name of [
    "opamp_with_power_inverting_top_right",
    "opamp_no_power_inverting_top_right",
  ] as const) {
    const symbol = symbols[name]
    const nonInvertingInput = getPort(symbol, "inp1")
    const invertingInput = getPort(symbol, "inp2")

    expect(invertingInput.y).toBeGreaterThan(nonInvertingInput.y)
    expect(invertingInput.labels).toContain("2")
    expect(nonInvertingInput.labels).toContain("1")

    const plusStroke = getShortVerticalPaths(symbol)[0]!
    const plusStrokeMidpoint =
      (plusStroke.points[0]!.y + plusStroke.points[1]!.y) / 2
    expect(plusStrokeMidpoint).toBeCloseTo(nonInvertingInput.y)
  }
})

test("inverting-top op-amp variants preserve facing and connected ports", () => {
  const expectedOutputDirection = {
    right: { axis: "x", comparison: "greater" },
    left: { axis: "x", comparison: "less" },
    up: { axis: "y", comparison: "greater" },
    down: { axis: "y", comparison: "less" },
  } as const

  for (const family of [
    "opamp_with_power_inverting_top",
    "opamp_no_power_inverting_top",
  ] as const) {
    for (const orientation of ["right", "left", "up", "down"] as const) {
      const name = `${family}_${orientation}` as keyof typeof symbols
      const symbol = symbols[name]
      const output = getPort(symbol, "out")
      const expected = expectedOutputDirection[orientation]
      const outputCoordinate = output[expected.axis]
      const centerCoordinate = symbol.center[expected.axis]

      if (expected.comparison === "greater") {
        expect(outputCoordinate, name).toBeGreaterThan(centerCoordinate)
      } else {
        expect(outputCoordinate, name).toBeLessThan(centerCoordinate)
      }

      const endpoints = getPathEndpoints(symbol)
      for (const port of symbol.ports) {
        expect(
          endpoints.some(
            (endpoint) => endpoint.x === port.x && endpoint.y === port.y,
          ),
          `${name}: ${port.labels.join("/")}`,
        ).toBe(true)
      }
    }
  }
})

test("powered inverting-top variants preserve the supply aliases", () => {
  const right = symbols.opamp_with_power_inverting_top_right
  expect(getPort(right, "V+").y).toBeGreaterThan(getPort(right, "V-").y)

  for (const orientation of ["right", "left", "up", "down"] as const) {
    const symbol = symbols[`opamp_with_power_inverting_top_${orientation}`]
    expect(getPort(symbol, "V+").labels).toContain("5")
    expect(getPort(symbol, "V-").labels).toContain("3")
  }
})
