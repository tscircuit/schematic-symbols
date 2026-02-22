import svgJson from "../assets/generated/pnp_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .labelPort("top1", ["1", "collector"])
  .labelPort("bottom1", ["2", "emitter"])
  .labelPort("left1", ["3", "base"])
  .build()
