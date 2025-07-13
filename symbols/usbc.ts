import svgJson from "assets/generated/usbc.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(svgJson)
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
