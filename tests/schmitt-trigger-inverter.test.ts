import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

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
