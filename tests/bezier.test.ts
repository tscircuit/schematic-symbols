import { expect, test } from "bun:test"
import { approximateBezier } from "../drawing/cubicBezierCurveArc"

test("cubic sampling includes both exact endpoints", () => {
  const start = { x: 10, y: 20 }
  const end = { x: 13, y: 20 }
  const points = approximateBezier(
    start,
    { x: 10, y: 23 },
    { x: 13, y: 23 },
    end,
  )
  expect(points).toHaveLength(31)
  expect(points[0]).toEqual(start)
  expect(points.at(-1)).toEqual(end)
  expect(points[15]).toEqual({ x: 11.5, y: 22.25 })
})

test("a degenerate cubic remains exactly on its sole point", () => {
  const point = { x: 0, y: 0 }
  expect(approximateBezier(point, point, point, point)).toEqual(
    Array.from({ length: 31 }, () => point),
  )
})
