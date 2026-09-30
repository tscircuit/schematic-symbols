import { expect, test } from "bun:test"
import { flipSymbolOverYAxis } from "drawing/rotateSymbol"
import type { SchSymbol } from "drawing/types"

const makeSymbol = (center: { x: number; y: number }): SchSymbol => ({
  center,
  size: { width: 6, height: 9 },
  primitives: [
    {
      type: "path",
      points: [
        { x: 5, y: 7 },
        { x: 1, y: 2 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "text",
      text: "{REF}",
      x: 1,
      y: 4,
      anchor: "middle_left",
    },
    {
      type: "circle",
      x: 3,
      y: 5,
      radius: 0.5,
      fill: false,
      color: "primary",
    },
    {
      type: "box",
      x: 1,
      y: 6,
      width: 2,
      height: 3,
      anchor: "center",
    },
  ],
  ports: [{ x: 5, y: 7, labels: ["1"] }],
})

test("flipSymbolOverYAxis mirrors ports about the vertical line through center", () => {
  const symbol = makeSymbol({ x: 2, y: 3 })
  const [port] = flipSymbolOverYAxis(symbol).ports
  expect(port.x).toBeCloseTo(-1)
  expect(port.y).toBeCloseTo(7)
})

test("flipSymbolOverYAxis leaves points on the mirror axis fixed", () => {
  const symbol = makeSymbol({ x: 2, y: 3 })
  symbol.primitives.push({
    type: "path",
    points: [
      { x: 2, y: 0 },
      { x: 2, y: 9 },
    ],
    color: "primary",
    fill: false,
  })
  const path = flipSymbolOverYAxis(symbol).primitives[4]
  if (path.type !== "path") throw new Error("expected path")
  expect(path.points[0].x).toBeCloseTo(2)
  expect(path.points[1].x).toBeCloseTo(2)
})

test("flipSymbolOverYAxis mirrors geometry primitives about center.x", () => {
  const symbol = makeSymbol({ x: 2, y: 3 })
  const [path, text, circle, box] = flipSymbolOverYAxis(symbol).primitives

  if (path.type !== "path") throw new Error("expected path")
  expect(path.points[0].x).toBeCloseTo(-1)
  expect(path.points[0].y).toBeCloseTo(7)
  expect(path.points[1].x).toBeCloseTo(3)
  expect(path.points[1].y).toBeCloseTo(2)

  if (text.type !== "text") throw new Error("expected text")
  expect(text.x).toBeCloseTo(3)
  expect(text.y).toBeCloseTo(4)
  expect(text.anchor).toBe("middle_right")

  if (circle.type !== "circle") throw new Error("expected circle")
  expect(circle.x).toBeCloseTo(1)
  expect(circle.y).toBeCloseTo(5)

  if (box.type !== "box") throw new Error("expected box")
  expect(box.x).toBeCloseTo(3)
  expect(box.y).toBeCloseTo(6)
})

test("double flipSymbolOverYAxis restores the original symbol", () => {
  const symbol = makeSymbol({ x: 2, y: 3 })
  const restored = flipSymbolOverYAxis(flipSymbolOverYAxis(symbol))
  const [port] = restored.ports
  expect(port.x).toBeCloseTo(5)
  expect(port.y).toBeCloseTo(7)
  const [path] = restored.primitives
  if (path.type !== "path") throw new Error("expected path")
  expect(path.points[0].x).toBeCloseTo(5)
  expect(path.points[0].y).toBeCloseTo(7)
})

test("flipSymbolOverYAxis keeps y coordinates unchanged", () => {
  const symbol = makeSymbol({ x: 2, y: 3 })
  const [port] = flipSymbolOverYAxis(symbol).ports
  expect(port.y).toBeCloseTo(7)
})

test("flipSymbolOverYAxis is unchanged for origin-centered symbols", () => {
  const symbol = makeSymbol({ x: 0, y: 0 })
  const [port] = flipSymbolOverYAxis(symbol).ports
  expect(port.x).toBeCloseTo(-5)
  expect(port.y).toBeCloseTo(7)
})

test("flipSymbolOverYAxis works with negative center.x", () => {
  const symbol = makeSymbol({ x: -4, y: 1 })
  const [port] = flipSymbolOverYAxis(symbol).ports
  expect(port.x).toBeCloseTo(-13)
  expect(port.y).toBeCloseTo(7)
})

test("flipSymbolOverYAxis does not mutate the input symbol", () => {
  const symbol = makeSymbol({ x: 2, y: 3 })
  flipSymbolOverYAxis(symbol)
  expect(symbol.ports[0].x).toBe(5)
  expect(symbol.ports[0].y).toBe(7)
})
