import { describe, expect, it } from "bun:test"
import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import type { SchSymbol } from "../drawing/types"

describe("flipSymbolOverYAxis", () => {
  it("reflects off-center symbols horizontally about center.x without vertical displacement", () => {
    const symbol: SchSymbol = {
      center: { x: 2, y: 3 },
      size: { width: 6, height: 9 },
      primitives: [
        {
          type: "box",
          x: 5,
          y: 7,
          width: 2,
          height: 2,
          anchor: "top_left",
        },
      ],
      ports: [
        {
          x: 5,
          y: 7,
          labels: ["1"],
        },
      ],
    }

    const flipped = flipSymbolOverYAxis(symbol)

    // Expected coordinates:
    // x' = 2 * center.x - x = 2 * 2 - 5 = -1
    // y' = y = 7
    expect(flipped.ports[0].x).toBeCloseTo(-1)
    expect(flipped.ports[0].y).toBeCloseTo(7)

    const box = flipped.primitives[0]
    if (box.type === "box") {
      expect(box.x).toBeCloseTo(-1)
      expect(box.y).toBeCloseTo(7)
    }
  })

  it("is an involution: flipping twice restores original coordinates", () => {
    const symbol: SchSymbol = {
      center: { x: 4, y: -2 },
      size: { width: 10, height: 10 },
      primitives: [
        {
          type: "path",
          points: [
            { x: 1, y: 2 },
            { x: 6, y: -3 },
          ],
          color: "black",
        },
      ],
      ports: [{ x: 3, y: 5, labels: ["p1"] }],
    }

    const once = flipSymbolOverYAxis(symbol)
    const twice = flipSymbolOverYAxis(once)

    expect(twice.ports[0].x).toBeCloseTo(3)
    expect(twice.ports[0].y).toBeCloseTo(5)

    const path = twice.primitives[0]
    if (path.type === "path") {
      expect(path.points[0].x).toBeCloseTo(1)
      expect(path.points[0].y).toBeCloseTo(2)
      expect(path.points[1].x).toBeCloseTo(6)
      expect(path.points[1].y).toBeCloseTo(-3)
    }
  })
})
