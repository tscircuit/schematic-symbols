import svgJson from "assets/generated/pnp_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .changeTextAnchor("{VAL}", "middle_left")
  .labelPort("left1", ["3", "base"])
  .labelPort("top1", ["1", "collector"])
  .labelPort("bottom1", ["2", "emitter"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()
