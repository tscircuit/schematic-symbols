import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { getBoundsOfPrimitives } from "../drawing/utils/getBoundsOfPrimitives"
import svgJson from "assets/generated/speaker.json"

const symbol = modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["2", "neg"])
  .labelPort("left2", ["1", "pos"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()

const bounds = getBoundsOfPrimitives(symbol.primitives)

export default {
  ...symbol,
  center: {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2,
  },
}
