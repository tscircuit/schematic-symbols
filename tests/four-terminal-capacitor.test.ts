import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectPortsNumberedCounterClockwise } from "./helpers/expect-ports-numbered-counter-clockwise"
import { expectReferenceAboveValue } from "./helpers/expect-reference-above-value"
import { expectSymbolGeometryToBeYAxisMirror } from "./helpers/expect-symbol-geometry-to-be-y-axis-mirror"

test("four-terminal capacitor preserves two terminals on each plate", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("four_terminal_capacitor_" +
      orientation) as keyof typeof symbols
    const capacitor = symbols[symbolName]

    for (const terminalAlias of [
      "plate1_terminal1",
      "plate1_terminal2",
      "plate2_terminal2",
      "plate2_terminal1",
    ] as const) {
      const port = capacitor.ports.find((candidate) =>
        candidate.labels.includes(terminalAlias),
      )
      expect(port, `${symbolName} ${terminalAlias}`).toBeDefined()
    }
    expect(
      capacitor.ports.find((port) => port.labels.includes("plate1_terminal1"))
        ?.labels,
      symbolName,
    ).toContain("1")
    expectPortsNumberedCounterClockwise({ symbol: capacitor, symbolName })
    expectReferenceAboveValue({ symbol: capacitor, symbolName })

    expect(
      capacitor.primitives.filter((primitive) => primitive.type === "path"),
      symbolName,
    ).toHaveLength(6)
  }

  expectSymbolGeometryToBeYAxisMirror({
    rightFacingSymbol: symbols.four_terminal_capacitor_right,
    leftFacingSymbol: symbols.four_terminal_capacitor_left,
  })
})
