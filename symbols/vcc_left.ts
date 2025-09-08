import svgJson from "../assets/generated/vcc.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import { resizeSymbol } from "drawing/resizeSymbol"

const symbol = modifySymbol(svgJson)
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["1"])
  .changeTextAnchor("{REF}", "middle_right")
  .build()

export default resizeSymbol(symbol, { width: 0.23, height: 0.24 })
