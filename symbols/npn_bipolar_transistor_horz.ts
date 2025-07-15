import svgJson from "assets/generated/npn_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .changeTextAnchor("{VAL}", "middle_left")
  .labelPort("left1", ["3"])
  .labelPort("top1", ["2"])
  .labelPort("bottom1", ["1"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()
