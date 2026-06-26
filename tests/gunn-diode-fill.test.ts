import { test, expect } from "bun:test"
import gunn_diode from "../assets/generated/gunn_diode.json"
import { getSvg } from "../drawing/getSvg"
import { pathToSvgD } from "../drawing/pathToSvgD"
import gunn_diode_horz from "../symbols/gunn_diode_horz"

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

test("Gunn diode should render both triangle regions as filled paths", () => {
  const svg = getSvg(gunn_diode_horz)
  const triangleIds = ["path11-0-9", "path11-0-9-5"] as const

  for (const triangleId of triangleIds) {
    const triangle = gunn_diode.paths[triangleId]
    const trianglePath = pathToSvgD(triangle.points, {
      closed: triangle.closed,
      yUpPositive: true,
    })

    expect(svg).toContain(`<path d="${trianglePath}" fill="black"`)
  }
})
