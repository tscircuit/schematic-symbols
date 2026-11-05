import { test, expect } from "bun:test"
import { flipSymbolOverYAxis } from "../../drawing/rotateSymbol"
import type { SchSymbol } from "../../drawing/types"

const makeSymbol = (center: { x: number; y: number }): SchSymbol =>
  ({
    primitives: [
      {
        type: "path",
        points: [
          { x: center.x - 1, y: 0 },
          { x: center.x + 1, y: 2 },
        ],
      } as any,
    ],
    center,
    ports: [
      { x: center.x - 2, y: 1, pin_number: 1 } as any,
      { x: center.x + 2, y: 1, pin_number: 2 } as any,
    ],
    size: { width: 4, height: 2 },
  }) as unknown as SchSymbol

test("flipSymbolOverYAxis mirrors geometry about the vertical line x = center.x", () => {
  const center = { x: 3, y: 0 }
  const out = flipSymbolOverYAxis(makeSymbol(center))
  const path = out.primitives[0] as any
  expect(path.points[0].x).toBeCloseTo(center.x + 1)
  expect(path.points[1].x).toBeCloseTo(center.x - 1)
  expect(path.points[0].y).toBe(0)
  expect(path.points[1].y).toBe(2)
})

test("flipSymbolOverYAxis mirrors ports horizontally without vertical shift", () => {
  const center = { x: 3, y: 2 }
  const flipped = flipSymbolOverYAxis(makeSymbol(center))
  const xs = flipped.ports
    .map((p: any) => p.x)
    .sort((a: number, b: number) => a - b)
  expect(xs[0]).toBeCloseTo(center.x - 2)
  expect(xs[1]).toBeCloseTo(center.x + 2)
  for (const port of flipped.ports as any[]) {
    expect(port.y).toBe(1)
  }
})

test("flipSymbolOverYAxis on centered symbol (center.x = 0) is unchanged behavior", () => {
  const center = { x: 0, y: 0 }
  const flipped = flipSymbolOverYAxis(makeSymbol(center))
  const path = flipped.primitives[0] as any
  expect(path.points[0].x).toBeCloseTo(1)
  expect(path.points[1].x).toBeCloseTo(-1)
})
