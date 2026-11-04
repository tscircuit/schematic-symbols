import { expect, test } from "bun:test"
import { parseSync } from "svgson"
import { getInnerSvg, getSvg } from "../drawing/getSvg"
import type { SchSymbol } from "../drawing/types"
import { getBoundsOfPrimitives } from "../drawing/utils/getBoundsOfPrimitives"

const makeSymbol = (
  x: number,
  y: number,
  width: number,
  height: number,
): SchSymbol => ({
  center: { x, y },
  size: { width, height },
  ports: [],
  primitives: [{ type: "box", x, y, width, height, anchor: "center" }],
})

test.each([
  { name: "origin", x: 0, y: 0, width: 6, height: 2 },
  { name: "positive center", x: 3, y: 5, width: 4, height: 1 },
  { name: "negative center", x: -3, y: -2, width: 2, height: 5 },
  { name: "fractional center", x: 0.3, y: -0.2, width: 0.4, height: 0.8 },
])(
  "centered box SVG matches primitive bounds: $name",
  ({ x, y, width, height }) => {
    const symbol = makeSymbol(x, y, width, height)
    const bounds = getBoundsOfPrimitives(symbol.primitives)
    const { children } = parseSync(getSvg(symbol))
    const rect = children.find((element) => element.name === "rect")!
    expect(Number(rect.attributes.x)).toBeCloseTo(bounds.minX)
    expect(Number(rect.attributes.y)).toBeCloseTo(-bounds.maxY)
    expect(Number(rect.attributes.width)).toBe(width)
    expect(Number(rect.attributes.height)).toBe(height)
  },
)

test("centered box is contained by its symbol viewBox", () => {
  const { attributes, children } = parseSync(getSvg(makeSymbol(0, 0, 6, 2)))
  const [vx, vy, vw, vh] = attributes.viewBox.split(" ").map(Number)
  const rect = children.find((element) => element.name === "rect")!
  const { x, y, width, height } = rect.attributes
  expect(Number(x)).toBeGreaterThanOrEqual(vx)
  expect(Number(y)).toBeGreaterThanOrEqual(vy)
  expect(Number(x) + Number(width)).toBeLessThanOrEqual(vx + vw)
  expect(Number(y) + Number(height)).toBeLessThanOrEqual(vy + vh)
})

test("rendering a centered box does not mutate the symbol or options", () => {
  const symbol = makeSymbol(3, 5, 4, 1)
  const original = structuredClone(symbol)
  const options = { width: 300, debug: false }
  getSvg(symbol, options)
  expect(symbol).toEqual(original)
  expect(options).toEqual({ width: 300, debug: false })
})

test("non-center box anchors retain their existing rendering", () => {
  const symbol = makeSymbol(3, 5, 4, 1)
  const primitive = symbol.primitives[0]
  if (primitive.type !== "box") throw new Error("Expected box")
  primitive.anchor = "top_left"
  const { children } = parseSync(`<svg>${getInnerSvg(symbol)}</svg>`)
  const rect = children.find((element) => element.name === "rect")!
  expect(Number(rect.attributes.x)).toBe(3)
  expect(Number(rect.attributes.y)).toBe(-5)
})
