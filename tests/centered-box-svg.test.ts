import { expect, test, describe } from "bun:test"
import { getSvg } from "../drawing/getSvg"
import type { SchSymbol } from "../drawing/types"

const makeSymbol = (primitives: any[]): SchSymbol =>
  ({
    source: {
      source_component_id: "src0",
      name: "test",
      are_parts_interactive: false,
    } as any,
    ports: [],
    primitives,
    size: { width: 6, height: 2 },
    center: { x: 0, y: 0 },
  }) as unknown as SchSymbol

describe("getSvg — centered box primitives (issue #486)", () => {
  const boxAtOrigin = {
    type: "box" as const,
    x: 0,
    y: 0,
    width: 6,
    height: 2,
    anchor: "center",
  }

  test("6x2 box centered at (0,0) extends symmetrically, not clipped", () => {
    const svg = getSvg(makeSymbol([boxAtOrigin]))
    const match = svg.match(/<rect x="([^"]+)" y="([^"]+)"/)
    expect(match).not.toBeNull()
    const x = Number(match![1])
    const y = Number(match![2])
    expect(x).toBe(-3) // 0 - 6/2
    expect(y).toBe(-1) // -0 - 2/2
  })

  test("positive center", () => {
    const svg = getSvg(
      makeSymbol([{ ...boxAtOrigin, x: 4, y: 3 }]),
    )
    const match = svg.match(/<rect x="([^"]+)" y="([^"]+)"/)
    expect(Number(match![1])).toBe(1) // 4 - 3
    expect(Number(match![2])).toBe(-4) // -3 - 1
  })

  test("negative center", () => {
    const svg = getSvg(
      makeSymbol([{ ...boxAtOrigin, x: -4, y: -3 }]),
    )
    const match = svg.match(/<rect x="([^"]+)" y="([^"]+)"/)
    expect(Number(match![1])).toBe(-7)
    expect(Number(match![2])).toBe(2)
  })

  test("fractional centers", () => {
    const svg = getSvg(
      makeSymbol([{ ...boxAtOrigin, x: 1.5, y: 0.75 }]),
    )
    const match = svg.match(/<rect x="([^"]+)" y="([^"]+)"/)
    expect(Number(match![1])).toBe(-1.5)
    expect(Number(match![2])).toBe(-1.75)
  })

  test("non-center anchor retains existing rendering", () => {
    const svg = getSvg(
      makeSymbol([{ ...boxAtOrigin, anchor: "top_left" }]),
    )
    const match = svg.match(/<rect x="([^"]+)" y="([^"]+)"/)
    expect(Number(match![1])).toBe(0)
    expect(Number(match![2])).toBe(0) // makeYUpPositive(0)
  })

  test("non-center anchor with nonzero y keeps y-up conversion", () => {
    const svg = getSvg(
      makeSymbol([{ ...boxAtOrigin, anchor: "top_left", y: 5 }]),
    )
    const match = svg.match(/<rect x="([^"]+)" y="([^"]+)"/)
    expect(Number(match![2])).toBe(-5)
  })

  test("input primitive is not mutated", () => {
    const prim = { ...boxAtOrigin }
    getSvg(makeSymbol([prim]))
    expect(prim.x).toBe(0)
    expect(prim.y).toBe(0)
    expect(prim.anchor).toBe("center")
  })
})
