import { expect, it } from "bun:test"
import { getBoundsOfSvgJson, svgPathToPoints } from "../drawing/svg"
import svgJson from "../assets/symbols-svg-json/testshape.json"
import { applyGroupTransformsToChildren } from "../scripts/lib/applyGroupTransformsToChildren"

it("applies group transforms to children", () => {
  const result = applyGroupTransformsToChildren(svgJson)
  console.log(result.children[0])
})
