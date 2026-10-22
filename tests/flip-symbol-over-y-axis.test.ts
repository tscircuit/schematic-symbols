import { test, expect } from "bun:test"
import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import type { SchSymbol } from "../drawing/types"

test("flipSymbolOverYAxis reflects across center.x and leaves Y coordinates unchanged", () => {
  const symbol: SchSymbol = {
    primitives: [
      {
        type: "path",
        points: [
          { x: 10, y: 5 },
          { x: 14, y: 7 },
        ],
      },
      {
        type: "circle",
        x: 12,
        y: 6,
        radius: 2,
      },
    ],
    ports: [
      {
        x: 8,
        y: 5,
        name: "p1",
      },
    ],
    center: { x: 10, y: 5 },
    size: { width: 10, height: 10 },
  }

  const flipped = flipSymbolOverYAxis(symbol)

  // Reflection across x = 10:
  // x' = -(x - 10) + 10 = 20 - x
  // y' = y
  // Point (10, 5) -> (10, 5)
  // Point (14, 7) -> (6, 7)
  // Circle (12, 6) -> (8, 6)
  // Port (8, 5) -> (12, 5)

  expect(flipped.primitives[0]).toEqual({
    type: "path",
    points: [
      { x: 10, y: 5 },
      { x: 6, y: 7 },
    ],
  })

  expect(flipped.primitives[1]).toEqual({
    type: "circle",
    x: 8,
    y: 6,
    radius: 2,
  })

  expect(flipped.ports[0]).toEqual({
    x: 12,
    y: 5,
    name: "p1",
  })
})
