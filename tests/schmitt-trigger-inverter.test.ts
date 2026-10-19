import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

test("Schmitt-trigger inverter orientations preserve input and output aliases", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("schmitt_trigger_inverter_" +
      orientation) as keyof typeof symbols
    const inverter = symbols[symbolName]
    const input = inverter.ports.find((port) => port.labels.includes("input"))
    const output = inverter.ports.find((port) => port.labels.includes("output"))

    expect(input, symbolName).toBeDefined()
    expect(output, symbolName).toBeDefined()
    expect(input?.labels, symbolName).toContain("1")
    expect(output?.labels, symbolName).toContain("2")
  }
})

test("left-facing Schmitt inverter mirrors its hysteresis mark", () => {
  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.schmitt_trigger_inverter_right,
    leftFacingSymbol: symbols.schmitt_trigger_inverter_left,
  })
})
