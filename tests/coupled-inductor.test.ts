import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectPortsNumberedCounterClockwise } from "./helpers/expect-ports-numbered-counter-clockwise"
import { expectReferenceAboveValue } from "./helpers/expect-reference-above-value"
import { expectSymbolGeometryToBeYAxisMirror } from "./helpers/expect-symbol-geometry-to-be-y-axis-mirror"

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

    for (const terminalAlias of [
      "winding1_start",
      "winding1_end",
      "winding2_end",
      "winding2_start",
    ] as const) {
      const port = coupledInductor.ports.find((candidate) =>
        candidate.labels.includes(terminalAlias),
      )
      expect(port, `${symbolName} ${terminalAlias}`).toBeDefined()
    }
    expect(
      coupledInductor.ports.find((port) =>
        port.labels.includes("winding1_start"),
      )?.labels,
      symbolName,
    ).toContain("1")
    expectPortsNumberedCounterClockwise({
      symbol: coupledInductor,
      symbolName,
    })
    expectReferenceAboveValue({ symbol: coupledInductor, symbolName })

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

  expectSymbolGeometryToBeYAxisMirror({
    rightFacingSymbol: symbols.coupled_inductor_right,
    leftFacingSymbol: symbols.coupled_inductor_left,
  })
})

test("vertical coupled-inductor labels are readable beside the body", () => {
  for (const orientation of ["up", "down"] as const) {
    const coupledInductor = symbols[`coupled_inductor_${orientation}`]
    const reference = coupledInductor.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "{REF}",
    )
    const value = coupledInductor.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "{VAL}",
    )

    expect(reference).toMatchObject({
      anchor: "middle_left",
      x: 0.5,
      y: 0.12,
    })
    expect(value).toMatchObject({
      anchor: "middle_left",
      x: 0.5,
      y: -0.12,
    })
  }
})
