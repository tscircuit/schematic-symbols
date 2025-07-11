import svgJson from "../assets/generated/pnp_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("right")
  .labelPort("top1", ["1"])
  .labelPort("bottom1", ["2"])
  .labelPort("left1", ["3"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
