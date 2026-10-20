import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

test("four-terminal capacitor preserves two terminals on each plate", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("four_terminal_capacitor_" +
      orientation) as keyof typeof symbols
    const capacitor = symbols[symbolName]

    for (const terminal of [
      ["plate1_terminal1", "1"],
      ["plate1_terminal2", "3"],
      ["plate2_terminal1", "2"],
      ["plate2_terminal2", "4"],
    ] as const) {
      const port = capacitor.ports.find((candidate) =>
        candidate.labels.includes(terminal[0]),
      )
      expect(port?.labels, symbolName).toContain(terminal[1])
    }

    expect(
      capacitor.primitives.filter((primitive) => primitive.type === "path"),
      symbolName,
    ).toHaveLength(6)
  }

  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.four_terminal_capacitor_right,
    leftFacingSymbol: symbols.four_terminal_capacitor_left,
  })
})
