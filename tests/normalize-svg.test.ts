import { expect, it } from "bun:test"
import { getBoundsOfSvgJson, svgPathToPoints } from "../drawing/svg"
import svgJson from "../assets/symbols-svg-json/testshape.json"
import { applyGroupTransformsToChildren } from "../scripts/lib/applyGroupTransformsToChildren"

it("applies group transforms to children", () => {
  const bounds1 = getBoundsOfSvgJson(svgJson as any)
  const result = applyGroupTransformsToChildren(svgJson)
  const bounds2 = getBoundsOfSvgJson(result as any)
  expect(bounds2.centerX).toBeCloseTo(bounds1.centerX + 0.45366488)
})
