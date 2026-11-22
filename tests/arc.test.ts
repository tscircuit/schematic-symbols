import { expect, test } from "bun:test"
import { approximateArc } from "../drawing/arc"
import { svgPathToPoints } from "../drawing/svgPathToPoints"

test.each([0, 1])(
  "circular arcs obey large-arc and sweep flags (%s)",
  (large) => {
    for (const sweep of [0, 1]) {
      const interior = approximateArc(1, 0, 1, 1, large, sweep, 0, 1)
      const center = large === sweep ? 1 : 0
      for (const point of interior) {
        expect(Math.hypot(point.x - center, point.y - center)).toBeCloseTo(
          1,
          10,
        )
      }
      const points = [{ x: 1, y: 0 }, ...interior, { x: 0, y: 1 }]
      let length = 0
      for (let i = 1; i < points.length; i++) {
        length += Math.hypot(
          points[i].x - points[i - 1].x,
          points[i].y - points[i - 1].y,
        )
      }
      expect(length).toBeCloseTo(large ? (3 * Math.PI) / 2 : Math.PI / 2, 2)
    }
  },
)

test("ellipse axis rotation rotates every sampled point", () => {
  const angle = Math.PI / 6
  const rotate = ({ x, y }: { x: number; y: number }) => ({
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle),
  })
  const start = rotate({ x: 2, y: 0 })
  const end = rotate({ x: 0, y: 1 })
  const actual = approximateArc(start.x, start.y, 2, 1, 0, 1, end.x, end.y, 30)
  const expected = approximateArc(2, 0, 2, 1, 0, 1, 0, 1).map(rotate)
  actual.forEach((point, i) => {
    expect(point.x).toBeCloseTo(expected[i].x, 10)
    expect(point.y).toBeCloseTo(expected[i].y, 10)
  })
})

test("undersized and negative radii follow SVG correction rules", () => {
  const corrected = approximateArc(0, 0, 1, 1, 0, 1, 4, 0)
  expect(corrected).toEqual(approximateArc(0, 0, -2, -2, 0, 1, 4, 0))
  corrected.forEach((point) => {
    expect(Math.hypot(point.x - 2, point.y)).toBeCloseTo(2, 10)
  })
})

test("degenerate arcs have no interior samples", () => {
  expect(approximateArc(0, 0, 0, 2, 0, 1, 3, 4)).toEqual([])
  expect(approximateArc(0, 0, 2, 0, 0, 1, 3, 4)).toEqual([])
  expect(approximateArc(3, 4, 2, 2, 1, 1, 3, 4)).toEqual([])
})

test("path conversion preserves relative arc endpoints and axis rotation", () => {
  const relative = svgPathToPoints("M10 20 a2 1 30 0 1 2 3")
  const absolute = svgPathToPoints("M10 20 A2 1 30 0 1 12 23")
  expect(relative).toEqual(absolute)
  expect(relative.at(-1)).toEqual({ x: 12, y: 23 })
  expect(relative).not.toEqual(svgPathToPoints("M10 20 A2 1 0 0 1 12 23"))
})
