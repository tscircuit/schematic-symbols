import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

const POINT_TOLERANCE = 0.000001

const pointsMatch = (
  firstPoint: { x: number; y: number },
  secondPoint: { x: number; y: number },
): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  POINT_TOLERANCE

const expectPortToTouchArtwork = ({
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
    `${portAlias} touches diode artwork`,
  ).toBe(true)
}

test("dual-anode Schottky diode preserves one junction and both anode leads", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = `dual_anode_schottky_diode_${orientation}` as const
    const diode = symbols[symbolName]
    const anode1 = diode.ports.find((port) => port.labels.includes("anode1"))
    const anode2 = diode.ports.find((port) => port.labels.includes("anode2"))
    const cathode = diode.ports.find((port) => port.labels.includes("cathode"))

    expect(anode1?.labels, symbolName).toContain("1")
    expect(anode2?.labels, symbolName).toContain("2")
    expect(cathode?.labels, symbolName).toContain("3")
    expect(
      diode.primitives.filter(
        (primitive) =>
          primitive.type === "path" &&
          primitive.points.length === 4 &&
          pointsMatch(primitive.points[0]!, primitive.points[3]!),
      ),
      `${symbolName} contains one closed diode body`,
    ).toHaveLength(1)
    expectPortToTouchArtwork({ symbol: diode, portAlias: "anode1" })
    expectPortToTouchArtwork({ symbol: diode, portAlias: "anode2" })
    expectPortToTouchArtwork({ symbol: diode, portAlias: "cathode" })
  }

  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.dual_anode_schottky_diode_right,
    leftFacingSymbol: symbols.dual_anode_schottky_diode_left,
  })
})
