import { describe, expect, test } from "bun:test"
import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import type { SchSymbol } from "../drawing/types"

describe("flipSymbolOverYAxis", () => {
  test("reflects off-center symbol ports horizontally around center.x without vertical shift", () => {
    const symbol: SchSymbol = {
      center: { x: 2, y: 3 },
      size: { width: 6, height: 9 },
      primitives: [],
      ports: [{ x: 5, y: 7, labels: ["1"] }],
    }

    const flipped = flipSymbolOverYAxis(symbol)

    // Expected: x' = 2 * center.x - x = 2 * 2 - 5 = -1, y' = y = 7
    expect(flipped.ports[0].x).toBe(-1)
    expect(flipped.ports[0].y).toBe(7)
    expect(flipped.center).toEqual({ x: 2, y: 3 })
    expect(flipped.size).toEqual({ width: 6, height: 9 })
  })

  test("points on the vertical mirror line x = center.x stay fixed", () => {
    const symbol: SchSymbol = {
      center: { x: 4, y: 10 },
      size: { width: 10, height: 10 },
      primitives: [
        {
          type: "path",
          points: [
            { x: 4, y: 2 },
            { x: 4, y: 8 },
          ],
        },
      ],
      ports: [{ x: 4, y: 5, labels: ["mid"] }],
    }

    const flipped = flipSymbolOverYAxis(symbol)
    expect(flipped.ports[0].x).toBe(4)
    expect(flipped.ports[0].y).toBe(5)

    const path = flipped.primitives[0]
    if (path.type === "path") {
      expect(path.points[0]).toEqual({ x: 4, y: 2 })
      expect(path.points[1]).toEqual({ x: 4, y: 8 })
    }
  })

  test("reflects path, circle, box, and text primitives with horizontal anchor swap", () => {
    const symbol: SchSymbol = {
      center: { x: 10, y: 5 },
      size: { width: 20, height: 10 },
      primitives: [
        {
          type: "circle",
          x: 12,
          y: 7,
          radius: 1,
        },
        {
          type: "box",
          x: 8,
          y: 4,
          width: 2,
          height: 2,
        },
        {
          type: "text",
          text: "R1",
          x: 15,
          y: 9,
          anchor: "top_left",
          fontSize: 1,
        },
      ],
      ports: [],
    }

    const flipped = flipSymbolOverYAxis(symbol)

    // Circle center: x' = 2 * 10 - 12 = 8, y' = 7
    const circle = flipped.primitives[0]
    if (circle.type === "circle") {
      expect(circle.x).toBe(8)
      expect(circle.y).toBe(7)
    }

    // Box center: x' = 2 * 10 - 8 = 12, y' = 4
    const box = flipped.primitives[1]
    if (box.type === "box") {
      expect(box.x).toBe(12)
      expect(box.y).toBe(4)
    }

    // Text: x' = 2 * 10 - 15 = 5, y' = 9, anchor top_left -> top_right
    const text = flipped.primitives[2]
    if (text.type === "text") {
      expect(text.x).toBe(5)
      expect(text.y).toBe(9)
      expect(text.anchor).toBe("top_right")
    }
  })

  test("applying flipSymbolOverYAxis twice restores the original symbol (involution)", () => {
    const symbol: SchSymbol = {
      center: { x: -3.5, y: 4.2 },
      size: { width: 12, height: 8 },
      primitives: [
        {
          type: "path",
          points: [
            { x: -1, y: 2 },
            { x: 3, y: 6 },
          ],
        },
        {
          type: "text",
          text: "IN",
          x: -5,
          y: 4.2,
          anchor: "bottom_left",
          fontSize: 0.8,
        },
      ],
      ports: [
        { x: -7, y: 3, labels: ["p1"] },
        { x: 0, y: 5, labels: ["p2"] },
      ],
    }

    const doubleFlipped = flipSymbolOverYAxis(flipSymbolOverYAxis(symbol))

    expect(doubleFlipped.ports[0].x).toBeCloseTo(symbol.ports[0].x)
    expect(doubleFlipped.ports[0].y).toBeCloseTo(symbol.ports[0].y)
    expect(doubleFlipped.ports[1].x).toBeCloseTo(symbol.ports[1].x)
    expect(doubleFlipped.ports[1].y).toBeCloseTo(symbol.ports[1].y)

    const text = doubleFlipped.primitives[1]
    if (text.type === "text") {
      expect(text.x).toBeCloseTo(-5)
      expect(text.y).toBeCloseTo(4.2)
      expect(text.anchor).toBe("bottom_left")
    }
  })
})
