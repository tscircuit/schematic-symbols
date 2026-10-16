import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

test("AND gate orientations preserve two inputs and one output", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("and_gate_" + orientation) as keyof typeof symbols
    const andGate = symbols[symbolName]
    const inputA = andGate.ports.find((port) => port.labels.includes("a"))
    const inputB = andGate.ports.find((port) => port.labels.includes("b"))
    const outputY = andGate.ports.find((port) => port.labels.includes("y"))

    expect(inputA, symbolName).toBeDefined()
    expect(inputB, symbolName).toBeDefined()
    expect(outputY, symbolName).toBeDefined()
    expect(inputA?.labels, symbolName).toContain("1")
    expect(inputB?.labels, symbolName).toContain("2")
    expect(outputY?.labels, symbolName).toContain("3")
  }
})
