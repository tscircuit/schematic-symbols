import { rotateSymbol } from "drawing/rotateSymbol"
import pnp_bipolar_transistor_horz from "./pnp_bipolar_transistor_horz"
import svgJson from "assets/generated/pnp_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const rotatedSymbol = rotateSymbol(pnp_bipolar_transistor_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")

const ref = texts.find((t) => t.text === "{REF}")!

ref.anchor = "middle_left"
export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .changeTextAnchor("{VAL}", "middle_right")
  .labelPort("left1", ["3"])
  .labelPort("bottom1", ["2"])
  .labelPort("top1", ["1"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
