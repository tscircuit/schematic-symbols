import { isPrimitive } from "drawing/typeguards"
import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "../assets/generated/capacitor.json"

export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("right")
  .labelPort("left1", ["2", "neg"])
  .labelPort("right1", ["1", "pos"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
