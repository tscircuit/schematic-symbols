import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import svgJson from "assets/generated/n_channel_power_mosfet_5_pin.json"

const generatedSymbol = modifySymbol(svgJson)
  .labelPort("top1", ["5", "drain", "d"])
  .labelPort("bottom1", ["2", "source_left", "source"])
  .labelPort("bottom2", ["3", "source_center", "source"])
  .labelPort("bottom3", ["4", "source_right", "source"])
  .labelPort("left1", ["1", "gate", "g"])
  .rotateRightFacingSymbol("right")
  .build()

const symbolWithTextLayout = setRefValTextLayout({
  symbol: generatedSymbol,
  reference: { x: -0.08, y: 0.385, anchor: "middle_right" },
  displayValue: { x: -0.08, y: -0.395, anchor: "middle_right" },
  size: { width: 1.2, height: 1.05 },
})

export default symbolWithTextLayout
