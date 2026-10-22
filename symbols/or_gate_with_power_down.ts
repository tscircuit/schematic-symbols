import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import svgJson from "assets/generated/or_gate_with_power.json"

const orientedSymbol = modifySymbol(svgJson)
  .labelPort("top1", ["5", "vcc", "power"])
  .labelPort("bottom1", ["3", "gnd", "ground"])
  .labelPort("left1", ["2", "in2", "input2", "b"])
  .labelPort("left2", ["1", "in1", "input1", "a"])
  .labelPort("right1", ["4", "out", "output", "y"])
  .rotateRightFacingSymbol("down")
  .build()

export default setRefValTextLayout({
  symbol: orientedSymbol,
  reference: { x: 0.48, y: 0.2, anchor: "middle_left" },
  displayValue: { x: 0.48, y: -0.2, anchor: "middle_left" },
  size: { width: 1.8, height: 1.4 },
})
