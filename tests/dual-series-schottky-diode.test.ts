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
    const diodeBodies = diodePair.primitives.filter((primitive) => {
      if (primitive.type !== "path" || primitive.points.length !== 4) {
        return false
      }
      const firstPoint = primitive.points[0]
      const lastPoint = primitive.points[primitive.points.length - 1]
      return firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y
    })

    expect(anode?.labels, symbolName).toContain("1")
    expect(cathode?.labels, symbolName).toContain("2")
    expect(junction?.labels, symbolName).toContain("3")
    expect(junction?.labels, symbolName).toContain("common")
    expect(diodeBodies, symbolName).toHaveLength(2)
    for (const diodeBody of diodeBodies) {
      if (diodeBody.type !== "path") continue
      expect(diodeBody.points[0], symbolName).toEqual(
        diodeBody.points[diodeBody.points.length - 1],
      )
    }
  }
})
