import { expect, test } from "bun:test"
import { approximateBezier } from "../drawing/cubicBezierCurveArc"

test("cubic sampling includes both exact endpoints", () => {
  const start = { x: 0, y: 0 }
  const end = { x: 3, y: 0 }
  const points = approximateBezier(start, { x: 1, y: 3 }, { x: 2, y: 3 }, end)
  expect(points).toHaveLength(31)
  expect(points[0]).toEqual(start)
  expect(points.at(-1)).toEqual(end)
  expect(points[15]).toEqual({ x: 1.5, y: 2.25 })
})

test("a degenerate cubic remains exactly on its sole point", () => {
  const point = { x: 0, y: 0 }
  expect(approximateBezier(point, point, point, point)).toEqual(
    Array.from({ length: 31 }, () => point),
  )
})
