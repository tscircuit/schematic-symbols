import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/relay.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("right")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .labelPort("left2", ["3"])
  .labelPort("top1", ["4"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
