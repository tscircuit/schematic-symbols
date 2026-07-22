import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/capacitor_polarized.json"

const symbol = modifySymbol(svgJson)
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["2", "neg"])
  .labelPort("right1", ["1", "pos"])
  .changeTextAnchor("{REF}", "bottom_left", { x: 0.115, y: 0.2 })
  .changeTextAnchor("{VAL}", "top_left", { x: 0.115, y: -0.2 })
  .build()

export default {
  ...symbol,
  size: { width: 0.9, height: 0.6 },
}
