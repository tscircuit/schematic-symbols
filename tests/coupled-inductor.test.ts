import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

const pointsMatch = (
  firstPoint: { x: number; y: number },
  secondPoint: { x: number; y: number },
): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  0.000001

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

    const windingPaths = coupledInductor.primitives.filter(
      (primitive) => primitive.type === "path",
    )
    expect(windingPaths, symbolName).toHaveLength(4)
    expect(
      windingPaths.filter((windingPath) => windingPath.points.length === 67),
      `${symbolName} preserves two smooth four-lobe windings`,
    ).toHaveLength(2)
    if (orientation === "right") {
      const windingLobePoints = windingPaths
        .filter((windingPath) => windingPath.points.length === 67)
        .flatMap((windingPath) => windingPath.points)
      expect(
        windingLobePoints.some((point) => point.y > 0 && point.y < 0.1),
        `${symbolName} curves its upper winding toward the core`,
      ).toBe(true)
      expect(
        windingLobePoints.some((point) => point.y < 0 && point.y > -0.1),
        `${symbolName} curves its lower winding toward the core`,
      ).toBe(true)
    }
    expect(
      coupledInductor.primitives.filter(
        (primitive) => primitive.type === "circle" && primitive.fill,
      ),
      symbolName,
    ).toHaveLength(2)

    for (const port of coupledInductor.ports) {
      expect(
        windingPaths.some((windingPath) =>
          windingPath.points.some((point) => pointsMatch(point, port)),
        ),
        `${symbolName} connects terminal ${port.labels[0]}`,
      ).toBe(true)
    }
  }

  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.coupled_inductor_right,
    leftFacingSymbol: symbols.coupled_inductor_left,
  })
})
