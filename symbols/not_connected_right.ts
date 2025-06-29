import svgJson from "assets/generated/not_connected.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, bounds, refblocks } = svgJson

export default modifySymbol({
  primitives: [...Object.values(paths)],
  ports: [{ ...refblocks.left1, labels: ["1"] }],
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("right")
  .labelPort("left1", ["1"])
  .build()
