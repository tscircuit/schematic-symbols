import { describe, expect, it } from "bun:test"
import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import type { SchSymbol } from "../drawing/types"

describe("flipSymbolOverYAxis", () => {
  it("mirrors ports horizontally around nonzero center.x without altering y coordinates", () => {
    const symbol: SchSymbol = {
      center: { x: 2, y: 3 },
      size: { width: 6, height: 9 },
      primitives: [],
      ports: [{ x: 5, y: 7, labels: ["1"] }],
    }

    const flipped = flipSymbolOverYAxis(symbol)

    // Expected x' = 2 * center.x - x = 2 * 2 - 5 = -1
    // Expected y' = y = 7
    expect(flipped.ports[0].x).toBeCloseTo(-1)
    expect(flipped.ports[0].y).toBeCloseTo(7)
  })

  it("mirrors ports correctly when center.x is negative", () => {
    const symbol: SchSymbol = {
      center: { x: -4, y: 1 },
      size: { width: 10, height: 10 },
      primitives: [],
      ports: [{ x: -1, y: 5, labels: ["portA"] }],
    }

    const flipped = flipSymbolOverYAxis(symbol)

    // Expected x' = 2 * (-4) - (-1) = -8 + 1 = -7
    // Expected y' = 5
    expect(flipped.ports[0].x).toBeCloseTo(-7)
    expect(flipped.ports[0].y).toBeCloseTo(5)
  })

  it("mirrors ports correctly for origin-centered symbols", () => {
    const symbol: SchSymbol = {
      center: { x: 0, y: 0 },
      size: { width: 4, height: 4 },
      primitives: [],
      ports: [
        { x: 3, y: 4, labels: ["p1"] },
        { x: -2, y: -1, labels: ["p2"] },
      ],
    }

    const flipped = flipSymbolOverYAxis(symbol)

    expect(flipped.ports[0].x).toBeCloseTo(-3)
    expect(flipped.ports[0].y).toBeCloseTo(4)
    expect(flipped.ports[1].x).toBeCloseTo(2)
    expect(flipped.ports[1].y).toBeCloseTo(-1)
  })

  it("leaves points on the vertical reflection axis unchanged in x", () => {
    const symbol: SchSymbol = {
      center: { x: 3.5, y: 10 },
      size: { width: 8, height: 8 },
      primitives: [],
      ports: [{ x: 3.5, y: 12, labels: ["onAxis"] }],
    }

    const flipped = flipSymbolOverYAxis(symbol)

    expect(flipped.ports[0].x).toBeCloseTo(3.5)
    expect(flipped.ports[0].y).toBeCloseTo(12)
  })

  it("correctly transforms path primitives", () => {
    const symbol: SchSymbol = {
      center: { x: 1, y: 2 },
      size: { width: 4, height: 4 },
      primitives: [
        {
          type: "path",
          points: [
            { x: 0, y: 1 },
            { x: 2, y: 3 },
          ],
          color: "primary",
        },
      ],
      ports: [],
    }

    const flipped = flipSymbolOverYAxis(symbol)
    const path = flipped.primitives[0]

    expect(path.type).toBe("path")
    if (path.type === "path") {
      // Point 1: x = 0 -> 2*1 - 0 = 2, y = 1
      expect(path.points[0].x).toBeCloseTo(2)
      expect(path.points[0].y).toBeCloseTo(1)
      // Point 2: x = 2 -> 2*1 - 2 = 0, y = 3
      expect(path.points[1].x).toBeCloseTo(0)
      expect(path.points[1].y).toBeCloseTo(3)
    }
  })

  it("correctly transforms text primitives and updates horizontal anchors", () => {
    const symbol: SchSymbol = {
      center: { x: 2, y: 0 },
      size: { width: 5, height: 5 },
      primitives: [
        {
          type: "text",
          text: "R1",
          x: 3,
          y: 4,
          anchor: "top_left",
        },
        {
          type: "text",
          text: "10k",
          x: 1,
          y: -2,
          anchor: "middle_right",
        },
      ],
      ports: [],
    }

    const flipped = flipSymbolOverYAxis(symbol)

    const text1 = flipped.primitives[0]
    expect(text1.type).toBe("text")
    if (text1.type === "text") {
      expect(text1.x).toBeCloseTo(1) // 2 * 2 - 3 = 1
      expect(text1.y).toBeCloseTo(4)
      expect(text1.anchor).toBe("top_right")
    }

    const text2 = flipped.primitives[1]
    expect(text2.type).toBe("text")
    if (text2.type === "text") {
      expect(text2.x).toBeCloseTo(3) // 2 * 2 - 1 = 3
      expect(text2.y).toBeCloseTo(-2)
      expect(text2.anchor).toBe("middle_left")
    }
  })

  it("correctly transforms circle and box primitives", () => {
    const symbol: SchSymbol = {
      center: { x: 5, y: 5 },
      size: { width: 10, height: 10 },
      primitives: [
        {
          type: "circle",
          x: 7,
          y: 6,
          radius: 2,
          fill: false,
          color: "primary",
        },
        {
          type: "box",
          x: 4,
          y: 8,
          width: 2,
          height: 2,
          anchor: "top_left",
        },
      ],
      ports: [],
    }

    const flipped = flipSymbolOverYAxis(symbol)

    const circle = flipped.primitives[0]
    expect(circle.type).toBe("circle")
    if (circle.type === "circle") {
      expect(circle.x).toBeCloseTo(3) // 2 * 5 - 7 = 3
      expect(circle.y).toBeCloseTo(6)
      expect(circle.radius).toBe(2)
    }

    const box = flipped.primitives[1]
    expect(box.type).toBe("box")
    if (box.type === "box") {
      expect(box.x).toBeCloseTo(6) // 2 * 5 - 4 = 6
      expect(box.y).toBeCloseTo(8)
    }
  })

  it("satisfies the involution (double reflection) identity", () => {
    const symbol: SchSymbol = {
      center: { x: 3, y: -2 },
      size: { width: 10, height: 12 },
      primitives: [
        {
          type: "path",
          points: [
            { x: 1, y: 4 },
            { x: 7, y: -5 },
          ],
          color: "primary",
        },
        {
          type: "circle",
          x: 2,
          y: 3,
          radius: 1,
          fill: true,
          color: "primary",
        },
        {
          type: "text",
          text: "LABEL",
          x: 5,
          y: 2,
          anchor: "bottom_left",
        },
      ],
      ports: [
        { x: 0, y: 1, labels: ["p1"] },
        { x: 8, y: -3, labels: ["p2"] },
      ],
    }

    const doubleFlipped = flipSymbolOverYAxis(flipSymbolOverYAxis(symbol))

    expect(doubleFlipped.ports[0].x).toBeCloseTo(symbol.ports[0].x)
    expect(doubleFlipped.ports[0].y).toBeCloseTo(symbol.ports[0].y)
    expect(doubleFlipped.ports[1].x).toBeCloseTo(symbol.ports[1].x)
    expect(doubleFlipped.ports[1].y).toBeCloseTo(symbol.ports[1].y)

    const path = doubleFlipped.primitives[0]
    if (path.type === "path") {
      expect(path.points[0].x).toBeCloseTo(1)
      expect(path.points[0].y).toBeCloseTo(4)
      expect(path.points[1].x).toBeCloseTo(7)
      expect(path.points[1].y).toBeCloseTo(-5)
    }

    const circle = doubleFlipped.primitives[1]
    if (circle.type === "circle") {
      expect(circle.x).toBeCloseTo(2)
      expect(circle.y).toBeCloseTo(3)
    }

    const text = doubleFlipped.primitives[2]
    if (text.type === "text") {
      expect(text.x).toBeCloseTo(5)
      expect(text.y).toBeCloseTo(2)
      expect(text.anchor).toBe("bottom_left")
    }
  })

  it("applies overrides when provided", () => {
    const symbol: SchSymbol = {
      center: { x: 1, y: 1 },
      size: { width: 2, height: 2 },
      primitives: [],
      ports: [],
    }

    const flipped = flipSymbolOverYAxis(symbol, {
      center: { x: 10, y: 10 },
    })

    expect(flipped.center).toEqual({ x: 10, y: 10 })
  })

  it("does not mutate the input symbol", () => {
    const symbol: SchSymbol = {
      center: { x: 2, y: 3 },
      size: { width: 4, height: 4 },
      primitives: [
        {
          type: "path",
          points: [{ x: 1, y: 1 }],
          color: "primary",
        },
      ],
      ports: [{ x: 0, y: 0, labels: ["p"] }],
    }

    flipSymbolOverYAxis(symbol)

    expect(symbol.ports[0].x).toBe(0)
    expect(symbol.ports[0].y).toBe(0)
    const path = symbol.primitives[0]
    if (path.type === "path") {
      expect(path.points[0].x).toBe(1)
      expect(path.points[0].y).toBe(1)
    }
  })
})
