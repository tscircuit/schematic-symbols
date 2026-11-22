import { expect, test } from "bun:test"
import { svgPathToPoints } from "../drawing/svgPathToPoints"

test("relative lines use the previous endpoint and preserve the other axis", () => {
  expect(svgPathToPoints("M10 20 l2 3 h4 v-5 m1 2 l-1 -2")).toEqual([
    { x: 10, y: 20 },
    { x: 12, y: 23 },
    { x: 16, y: 23 },
    { x: 16, y: 18 },
    { x: 17, y: 20 },
    { x: 16, y: 18 },
  ])
})

test("expands repeated arguments and adjacent or exponent-form numbers", () => {
  expect(svgPathToPoints("M1e1-2 3 4 L5 6 7 8 H9 10 V11 12")).toEqual([
    { x: 10, y: -2 },
    { x: 3, y: 4 },
    { x: 5, y: 6 },
    { x: 7, y: 8 },
    { x: 9, y: 8 },
    { x: 10, y: 8 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ])
})

test("relative cubic curves match their absolute form at a nonzero origin", () => {
  expect(svgPathToPoints("M10 20 c0 3 3 3 3 0")).toEqual(
    svgPathToPoints("M10 20 C10 23 13 23 13 20"),
  )
})

test("empty paths have no points", () => {
  expect(svgPathToPoints("")).toEqual([])
})

test("smooth cubic curves reflect the previous cubic control", () => {
  expect(svgPathToPoints("M0 0 C1 2 2 2 3 0 S5 -2 6 0 s2 2 3 0")).toEqual(
    svgPathToPoints("M0 0 C1 2 2 2 3 0 C4 -2 5 -2 6 0 C7 2 8 2 9 0"),
  )
})

test("smooth cubic control resets after lines, moves, and quadratics", () => {
  for (const separator of ["L4 0", "M4 0", "Q3 1 4 0"]) {
    const prefix = `M0 0 C1 2 2 2 3 0 ${separator}`
    expect(svgPathToPoints(`${prefix} S5 2 6 0`)).toEqual(
      svgPathToPoints(`${prefix} C4 0 5 2 6 0`),
    )
  }
})

test("quadratic curves follow the curve instead of drawing through the control", () => {
  const points = svgPathToPoints("M0 0 Q3 6 6 0")
  expect(points.length).toBeGreaterThan(20)
  const middle = points.find((point) => Math.abs(point.x - 3) < 1e-9)!
  expect(middle.y).toBeCloseTo(3)
  expect(Math.max(...points.map((point) => point.y))).toBeCloseTo(3)
  expect(svgPathToPoints("M10 20 q3 6 6 0")).toEqual(
    svgPathToPoints("M10 20 Q13 26 16 20"),
  )
})
