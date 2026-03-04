import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/varactor_diode.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left", { x: 0.1, y: 0.23 })
  .changeTextAnchor("{VAL}", "middle_left", { x: 0.65, y: -0.23 })
  .build()
