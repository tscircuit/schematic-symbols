import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import { setRefValTextLayout } from "../drawing/setRefValTextLayout"
import svgJson from "assets/generated/or_gate.json"

const rotatedOrGate = modifySymbol(svgJson)
  .labelPort("left1", ["2", "in2", "input2", "b"])
  .labelPort("left2", ["1", "in1", "input1", "a"])
  .labelPort("right1", ["3", "out", "output", "y"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("up")
  .build()

const orGateWithTextLayout = setRefValTextLayout({
  symbol: rotatedOrGate,
  reference: { x: 0.56, y: 0.12, anchor: "middle_left" },
  value: { x: 0.56, y: -0.12, anchor: "middle_left" },
  size: { width: 1.6, height: 1.2 },
})

export default renumberSymbolPortsCounterClockwise({
  symbol: orGateWithTextLayout,
  firstPortAlias: "a",
})
