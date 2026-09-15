import { expect, test } from "bun:test"
import { parseSync } from "svgson"
import { getSvg } from "../drawing/getSvg"
import capacitor from "../symbols/capacitor_right"
import resistor from "../symbols/resistor_sm_right"

test.each([
  {
    name: "width-only",
    options: { width: 300 },
    expectedWidth: 300,
    expectedHeight: 325,
  },
  {
    name: "height-only",
    options: { height: 150 },
    expectedWidth: 138.46153846153845,
    expectedHeight: 150,
  },
])(
  "keeps $name options reusable across symbols with different proportions",
  async ({ name, options, expectedWidth, expectedHeight }) => {
    const requestedOptions = { ...options }
    getSvg(resistor, options)
    const svg = getSvg(capacitor, options)
    const { attributes } = parseSync(svg)

    expect(Number(attributes.width)).toBeCloseTo(expectedWidth)
    expect(Number(attributes.height)).toBeCloseTo(expectedHeight)
    expect(options).toEqual(requestedOptions)
    await expect(svg).toMatchSvgSnapshot(import.meta.path, `get-svg-${name}`)
  },
)

test("derives dimensions for each symbol when reusing empty options", () => {
  const options = {}
  getSvg(resistor, options)
  const { attributes } = parseSync(getSvg(capacitor, options))

  expect(Number(attributes.width)).toBeCloseTo(0.72)
  expect(Number(attributes.height)).toBeCloseTo(0.78)
  expect(options).toEqual({})
})
