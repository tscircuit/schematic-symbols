import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

test("coupled inductor orientations preserve two separate windings", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("coupled_inductor_" +
      orientation) as keyof typeof symbols
    const coupledInductor = symbols[symbolName]

    for (const terminal of [
      ["winding1_start", "1"],
      ["winding1_end", "3"],
      ["winding2_start", "2"],
      ["winding2_end", "4"],
    ] as const) {
      const port = coupledInductor.ports.find((candidate) =>
        candidate.labels.includes(terminal[0]),
      )
      expect(port?.labels, symbolName).toContain(terminal[1])
    }

    expect(
      coupledInductor.primitives.filter(
        (primitive) => primitive.type === "path",
      ),
      symbolName,
    ).toHaveLength(4)
    expect(
      coupledInductor.primitives.filter(
        (primitive) => primitive.type === "circle" && primitive.fill,
      ),
      symbolName,
    ).toHaveLength(2)
  }

  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.coupled_inductor_right,
    leftFacingSymbol: symbols.coupled_inductor_left,
  })
})
