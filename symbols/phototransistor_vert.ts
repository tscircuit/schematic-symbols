import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/phototransistor.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .labelPort("top1", ["1", "collector"])
  .labelPort("bottom1", ["2", "emitter"])
  .changeTextAnchor("C", "middle_left")
  .changeTextAnchor("E", "middle_left")
  .build()
