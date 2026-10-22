import svgJson from "assets/generated/zener_diode.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol({
  ...svgJson,
  texts: {
    ref: { type: "text", text: "{REF}", x: 0.15, y: -0.24 },
    val: { type: "text", text: "{VAL}", x: -0.15, y: -0.24 },
  },
})
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["1", "pos", "anode"])
  .labelPort("right1", ["2", "neg", "cathode"])
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()
