import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"
import svgJson from "assets/generated/gunn_diode.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .changeTextAnchor("{VAL}", "middle_right")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
