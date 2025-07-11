import svgJson from "assets/generated/pnp_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .changeTextAnchor("{VAL}", "middle_left")
  .labelPort("left1", ["2"])
  .labelPort("top1", ["1"])
  .labelPort("bottom1", ["3"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()
