import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

test("a bidirectional TVS has two opposed junctions and two non-polarized terminals", () => {
  for (const direction of ["right", "up", "left", "down"] as const) {
    const name = `bidirectional_tvs_diode_${direction}` as const
    const symbol = symbols[name]
    expect(symbol, name).toBeDefined()
    expect(
      symbol.ports.map((port) => port.labels),
      name,
    ).toEqual([["1"], ["2"]])

    const axis = direction === "right" || direction === "left" ? "x" : "y"
    const [first, second] = symbol.ports
    expect(Math.abs(second[axis] - first[axis]), name).toBeCloseTo(1)
    expect(Math.sign(second[axis] - first[axis]), name).toBe(
      direction === "right" || direction === "up" ? 1 : -1,
    )

    // The triangle tips face each other across the internal cathode connection.
    const triangles = symbol.primitives
      .filter((part) => part.type === "path")
      .filter(
        (part) =>
          part.points.length === 4 &&
          part.points[0].x === part.points[3].x &&
          part.points[0].y === part.points[3].y,
      )
    expect(triangles, name).toHaveLength(2)
    const [firstTip, secondTip] = triangles.map(
      (outline) => outline.points[1][axis] - outline.points[0][axis],
    )
    expect(firstTip * secondTip, name).toBeLessThan(0)
  }
})
