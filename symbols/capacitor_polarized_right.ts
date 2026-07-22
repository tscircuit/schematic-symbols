import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/capacitor_polarized.json"

const symbol = modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["2", "neg"])
  .labelPort("right1", ["1", "pos"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()

export default {
  ...symbol,
  size: { width: 0.6, height: 0.65 },
}
