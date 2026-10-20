import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

test("dual common-cathode Schottky diode preserves both anodes and its shared cathode", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("dual_common_cathode_schottky_diode_" +
      orientation) as keyof typeof symbols
    const diodePair = symbols[symbolName]
    const anode1 = diodePair.ports.find((port) =>
      port.labels.includes("anode1"),
    )
    const anode2 = diodePair.ports.find((port) =>
      port.labels.includes("anode2"),
    )
    const cathode = diodePair.ports.find((port) =>
      port.labels.includes("common_cathode"),
    )

    expect(anode1?.labels, symbolName).toContain("1")
    expect(anode2?.labels, symbolName).toContain("2")
    expect(cathode?.labels, symbolName).toContain("3")
    expect(
      diodePair.primitives.filter(
        (primitive) => primitive.type === "circle" && primitive.fill,
      ),
      symbolName,
    ).toHaveLength(1)
  }

  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.dual_common_cathode_schottky_diode_right,
    leftFacingSymbol: symbols.dual_common_cathode_schottky_diode_left,
  })
})
