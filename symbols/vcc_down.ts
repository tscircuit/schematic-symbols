import svgJson from "../assets/generated/vcc.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import { resizeSymbol } from "drawing/resizeSymbol"

const symbol = modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .changeTextAnchor("{REF}", "middle_top")
  .build()

export default resizeSymbol(symbol, { width: 0.24, height: 0.23 })
