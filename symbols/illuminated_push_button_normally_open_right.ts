import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/illuminated_push_button_normally_open.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_right", { x: -0.87, y: 0.2 })
  .changeTextAnchor("{VAL}", "middle_right", { x: -0.1, y: -0.2 })
  .build()
