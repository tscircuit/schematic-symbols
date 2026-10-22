import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import svgJson from "assets/generated/schottky_diode_3_pin.json"

const orientedSymbol = modifySymbol(svgJson)
  .labelPort("left1", ["2", "anode2", "a2", "anode", "a"])
  .labelPort("left2", ["1", "anode1", "a1", "anode", "a"])
  .labelPort("right1", ["3", "cathode", "k"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("up")
  .build()

export default setRefValTextLayout({
  symbol: orientedSymbol,
  reference: { x: 0.4, y: 0.12, anchor: "middle_left" },
  displayValue: { x: 0.4, y: -0.12, anchor: "middle_left" },
  size: { width: 1.4, height: 1.4 },
})
