import { expect, it } from "bun:test"
import { translate } from "transformation-matrix"
import {
  applyGroupTransformsToChildren,
  transformPath,
} from "../scripts/lib/applyGroupTransformsToChildren"
import { getBoundsOfSvgJson } from "../scripts/lib/getBoundsOfSvgJson"
import boxResistorSvgJson from "./assets/boxresistor-untransformed.json"
import testShapeSvgJson from "./assets/testshape-untransformed.json"

it("applies group transforms to children", () => {
  const bounds1 = getBoundsOfSvgJson(testShapeSvgJson as any)
  const result = applyGroupTransformsToChildren(testShapeSvgJson)
  const bounds2 = getBoundsOfSvgJson(result as any)
  expect(bounds2.centerX).not.toEqual(bounds1.centerX)
})

it("should transform V properly", () => {
  const transformed = transformPath("M1,2 V3", translate(1, 2))
  expect(transformed).toEqual("M2,4 L2,5")
})

it("should load V path directives properly", () => {
  const result = applyGroupTransformsToChildren(boxResistorSvgJson as any)
  expect(result.children[1].attributes.d).toEqual(
    "M27.93486560000001,105.11920759999998 L30.580699600000003,105.11920759999998",
  )
})
