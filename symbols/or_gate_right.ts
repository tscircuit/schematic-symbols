import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import svgJson from "assets/generated/or_gate.json"

const orGate = modifySymbol(svgJson)
  .labelPort("left1", ["2", "in2", "input2", "b"])
  .labelPort("left2", ["1", "in1", "input1", "a"])
  .labelPort("right1", ["3", "out", "output", "y"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("right")
  .build()

export default renumberSymbolPortsCounterClockwise({
  symbol: orGate,
  firstPortAlias: "a",
})
