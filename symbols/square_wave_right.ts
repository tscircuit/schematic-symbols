import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/square_wave.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("right")
  .labelPort("left1", ["1", "pos"])
  .labelPort("right1", ["2", "neg"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
