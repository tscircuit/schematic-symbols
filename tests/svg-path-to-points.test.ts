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
