import { rotateSymbol } from "drawing/rotateSymbol"
import svgJson from "assets/generated/npn_bipolar_transistor.json"
import npn_bipolar_transistor_horz from "./npn_bipolar_transistor_horz"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const rotatedSymbol = rotateSymbol(npn_bipolar_transistor_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")

const ref = texts.find((t) => t.text === "{REF}")!

ref.anchor = "middle_left"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("down")
  .changeTextAnchor("{VAL}", "middle_right")
  .labelPort("left1", ["3"])
  .labelPort("top1", ["2"])
  .labelPort("bottom1", ["1"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
