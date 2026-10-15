import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

test("dual series Schottky diode orientations preserve the exposed junction", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("dual_series_schottky_diode_" +
      orientation) as keyof typeof symbols
    const diodePair = symbols[symbolName]
    const anode = diodePair.ports.find((port) => port.labels.includes("anode"))
    const cathode = diodePair.ports.find((port) =>
      port.labels.includes("cathode"),
    )
    const junction = diodePair.ports.find((port) =>
      port.labels.includes("junction"),
    )
    const symbolPaths = diodePair.primitives.filter(
      (primitive) => primitive.type === "path",
    )
    const filledDiodeBodies = symbolPaths.filter((path) => path.fill)
    const symbolCircles = diodePair.primitives.filter(
      (primitive) => primitive.type === "circle",
    )
    const terminalCircles = symbolCircles.filter((circle) => !circle.fill)
    const junctionDots = symbolCircles.filter((circle) => circle.fill)

    expect(anode?.labels, symbolName).toContain("1")
    expect(cathode?.labels, symbolName).toContain("2")
    expect(junction?.labels, symbolName).toContain("3")
    expect(junction?.labels, symbolName).toContain("common")
    expect(filledDiodeBodies, symbolName).toHaveLength(2)
    expect(terminalCircles, symbolName).toHaveLength(3)
    expect(junctionDots, symbolName).toHaveLength(1)

    for (const terminal of [anode, cathode, junction]) {
      expect(
        terminalCircles.some(
          (circle) => circle.x === terminal?.x && circle.y === terminal?.y,
        ),
        symbolName,
      ).toBe(true)
    }
  }
})
