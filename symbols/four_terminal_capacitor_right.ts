import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import svgJson from "assets/generated/four_terminal_capacitor.json"

const generatedSymbol = modifySymbol(svgJson)
  .labelPort("left1", ["2", "plate1_terminal2"])
  .labelPort("left2", ["1", "plate1_terminal1"])
  .labelPort("right1", ["3", "plate2_terminal2"])
  .labelPort("right2", ["4", "plate2_terminal1"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("right")
  .build()

const symbolWithTextLayout = setRefValTextLayout({
  symbol: generatedSymbol,
  reference: { x: 0, y: 0.56, anchor: "middle_bottom" },
  displayValue: { x: 0, y: -0.56, anchor: "middle_top" },
  size: { width: 1.4, height: 1.2 },
})

export default symbolWithTextLayout
