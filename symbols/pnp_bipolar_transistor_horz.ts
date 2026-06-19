import svgJson from "assets/generated/pnp_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .changeTextAnchor("{VAL}", "middle_right")
  .labelPort("left1", ["3", "base"])
  .labelPort("top1", ["2", "collector"])
  .labelPort("bottom1", ["1", "emitter"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
