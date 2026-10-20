import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

const pointsMatch = (
  firstPoint: { x: number; y: number },
  secondPoint: { x: number; y: number },
): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  0.000001

const expectPortToTouchPath = ({
  symbol,
  portAlias,
}: {
  symbol: (typeof symbols)[keyof typeof symbols]
  portAlias: string
}) => {
  const port = symbol.ports.find((candidate) =>
    candidate.labels.includes(portAlias),
  )
  expect(port).toBeDefined()
  if (!port) return
  expect(
    symbol.primitives.some(
      (primitive) =>
        primitive.type === "path" &&
        primitive.points.some((point) => pointsMatch(point, port)),
    ),
    `${portAlias} touches diode geometry`,
  ).toBe(true)
}

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
    expectPortToTouchPath({ symbol: diodePair, portAlias: "anode1" })
    expectPortToTouchPath({ symbol: diodePair, portAlias: "anode2" })
    expectPortToTouchPath({
      symbol: diodePair,
      portAlias: "common_cathode",
    })
  }

  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.dual_common_cathode_schottky_diode_right,
    leftFacingSymbol: symbols.dual_common_cathode_schottky_diode_left,
  })
})
