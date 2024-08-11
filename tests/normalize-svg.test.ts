import { expect, it } from "bun:test"
import { getBoundsOfSvgJson, svgPathToPoints } from "../drawing/svg"
import testShapeSvgJson from "./assets/testshape-untransformed.json"
import boxResistorSvgJson from "./assets/boxresistor-untransformed.json"
import {
  applyGroupTransformsToChildren,
  transformPath,
} from "../scripts/lib/applyGroupTransformsToChildren"
import { identity, translate } from "transformation-matrix"

it("applies group transforms to children", () => {
  const bounds1 = getBoundsOfSvgJson(testShapeSvgJson as any)
  const result = applyGroupTransformsToChildren(testShapeSvgJson)
  const bounds2 = getBoundsOfSvgJson(result as any)
  // TODO
  // expect(bounds2.centerX).not.toEqual(bounds1.centerX)
})

it("should transform V paths properly", () => {
  const transformed = transformPath("M0,0 V1", translate(1, 2))
  expect(transformed).toEqual("M1,2 V3")
})

// it("should load V path directives properly", () => {
//   const result = applyGroupTransformsToChildren(boxResistorSvgJson as any)
//   expect(result.children[1].attributes.d).toEqual(
//     "M19.997366600000007,105.11920759999998 V",
//   )
// })
