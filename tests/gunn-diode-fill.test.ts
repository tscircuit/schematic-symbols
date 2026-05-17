import { test, expect } from "bun:test"
import gunn_diode from "../assets/generated/gunn_diode.json"

test("Gunn diode triangles should have fill: true", () => {
  // The two triangle paths that form the filled regions
  const leftTriangle = gunn_diode.paths["path11-0-9"]
  const rightTriangle = gunn_diode.paths["path11-0-9-5"]

  // Verify both triangles exist
  expect(leftTriangle).toBeDefined()
  expect(rightTriangle).toBeDefined()

  // Verify fill is true (fixes issue #418)
  expect(leftTriangle.fill).toBe(true)
  expect(rightTriangle.fill).toBe(true)
})

test("Gunn diode left triangle path should be properly closed", () => {
  const leftTriangle = gunn_diode.paths["path11-0-9"]
  const points = leftTriangle.points

  // A properly closed polygon has the first and last points equal
  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]

  expect(firstPoint.x).toBe(lastPoint.x)
  expect(firstPoint.y).toBe(lastPoint.y)
})
