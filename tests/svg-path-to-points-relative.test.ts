import { expect, test } from "bun:test"
import { svgPathToPoints } from "../drawing/svgPathToPoints"

test("svgPathToPoints resolves relative m/l/h/v against the current point", () => {
  const points = svgPathToPoints("M 10 10 l 5 5 h 5 v 5")
  expect(points).toEqual([
    { x: 10, y: 10 },
    { x: 15, y: 15 },
    { x: 20, y: 15 },
    { x: 20, y: 20 },
  ])
})

test("svgPathToPoints resolves a relative m after a previous subpath", () => {
  const points = svgPathToPoints("M 10 10 L 20 20 m 5 5")
  expect(points).toEqual([
    { x: 10, y: 10 },
    { x: 20, y: 20 },
    { x: 25, y: 25 },
  ])
})

test("svgPathToPoints resolves relative q control and end points", () => {
  const points = svgPathToPoints("M 10 10 q 5 5 10 0")
  expect(points).toEqual([
    { x: 10, y: 10 },
    { x: 15, y: 15 },
    { x: 20, y: 10 },
  ])
})

test("svgPathToPoints resolves relative c control and end points", () => {
  const points = svgPathToPoints("M 10 10 c 5 0 10 5 15 10")
  // Approximation runs from (10,10) toward (25,20); every point must stay
  // inside that bounding box and finish at the absolute end point.
  expect(points.length).toBeGreaterThan(2)
  for (const p of points) {
    expect(p.x).toBeGreaterThanOrEqual(10)
    expect(p.x).toBeLessThanOrEqual(25.001)
    expect(p.y).toBeGreaterThanOrEqual(10)
    expect(p.y).toBeLessThanOrEqual(20.001)
  }
  expect(points[points.length - 1]).toEqual({ x: 25, y: 20 })
})

test("svgPathToPoints resolves a relative a end point", () => {
  const points = svgPathToPoints("M 5 5 a 5 5 0 0 1 10 0")
  expect(points[points.length - 1]).toEqual({ x: 15, y: 5 })
})
