import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import type { TextPrimitive } from "../drawing/types"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

const SYMBOL_ENDPOINT_TOLERANCE = 0.000001

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
    const closedDiodeBodies = symbolPaths.filter(
      (path) =>
        !path.fill &&
        path.points.length === 4 &&
        path.points[0]?.x === path.points.at(-1)?.x &&
        path.points[0]?.y === path.points.at(-1)?.y,
    )
    const symbolCircles = diodePair.primitives.filter(
      (primitive) => primitive.type === "circle",
    )
    const junctionDots = symbolCircles.filter((circle) => circle.fill)

    expect(anode?.labels, symbolName).toContain("1")
    expect(junction?.labels, symbolName).toContain("2")
    expect(cathode?.labels, symbolName).toContain("3")
    expect(junction?.labels, symbolName).toContain("common")
    expect(closedDiodeBodies, symbolName).toHaveLength(2)
    expect(
      symbolCircles.filter((circle) => !circle.fill),
      symbolName,
    ).toHaveLength(0)
    expect(junctionDots, symbolName).toHaveLength(1)

    const referenceText = diodePair.primitives.find(
      (primitive): primitive is TextPrimitive =>
        primitive.type === "text" && primitive.text === "{REF}",
    )
    const valueText = diodePair.primitives.find(
      (primitive): primitive is TextPrimitive =>
        primitive.type === "text" && primitive.text === "{VAL}",
    )
    expect(referenceText?.y, symbolName).toBeGreaterThan(valueText?.y ?? 0)
    expect(referenceText?.anchor, symbolName).toBe(
      orientation === "up" || orientation === "down"
        ? "middle_left"
        : "middle_bottom",
    )
    expect(valueText?.anchor, symbolName).toBe(
      orientation === "up" || orientation === "down"
        ? "middle_left"
        : "middle_top",
    )
    if (orientation === "up" || orientation === "down") {
      expect(referenceText?.x, symbolName).toBeCloseTo(valueText?.x ?? 0)
    }

    for (const terminal of [anode, cathode, junction]) {
      expect(
        symbolPaths.some(
          (path) =>
            path.points.length === 2 &&
            path.points.some(
              (point) =>
                terminal !== undefined &&
                Math.hypot(point.x - terminal.x, point.y - terminal.y) <
                  SYMBOL_ENDPOINT_TOLERANCE,
            ),
        ),
        symbolName + " straight terminal lead",
      ).toBe(true)
    }
  }
})

test("left-facing Schottky pair keeps the common terminal below", () => {
  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.dual_series_schottky_diode_right,
    leftFacingSymbol: symbols.dual_series_schottky_diode_left,
  })
})
