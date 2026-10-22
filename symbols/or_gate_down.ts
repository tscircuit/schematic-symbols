import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import svgJson from "assets/generated/or_gate.json"

const orientedSymbol = modifySymbol(svgJson)
  .labelPort("left1", ["2", "in2", "input2", "b"])
  .labelPort("left2", ["1", "in1", "input1", "a"])
  .labelPort("right1", ["3", "out", "output", "y"])
  .rotateRightFacingSymbol("down")
  .build()

export default setRefValTextLayout({
  symbol: orientedSymbol,
  reference: { x: 0.45, y: 0.12, anchor: "middle_left" },
  displayValue: { x: 0.45, y: -0.12, anchor: "middle_left" },
  size: { width: 1.45, height: 1.2 },
})
