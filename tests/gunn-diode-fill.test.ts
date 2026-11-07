import { expect, test } from "bun:test"
import gunn_diode from "../assets/generated/gunn_diode.json"
import { getSvg } from "../drawing/getSvg"
import gunn_diode_horz from "../symbols/gunn_diode_horz"
import gunn_diode_vert from "../symbols/gunn_diode_vert"

test("Gunn diode filled triangle paths are closed and start/end at identical coordinates (#418)", () => {
  const leftTriangle = gunn_diode.paths["path11-0-9"]
  const rightTriangle = gunn_diode.paths["path11-0-9-5"]

  for (const triangle of [leftTriangle, rightTriangle]) {
    expect(triangle.fill).toBe(true)
    expect(triangle.closed).toBe(true)
    const firstPoint = triangle.points[0]!
    const lastPoint = triangle.points[triangle.points.length - 1]!
    expect(firstPoint).toEqual(lastPoint)
  }
})

test("Gunn diode horizontal and vertical symbols render both triangles as closed filled SVG paths", () => {
  for (const symbol of [gunn_diode_horz, gunn_diode_vert]) {
    const svg = getSvg(symbol)
    const filledPaths = svg.match(/<path d="[^"]*Z" fill="black"/g) ?? []
    expect(filledPaths).toHaveLength(2)
  }
})
