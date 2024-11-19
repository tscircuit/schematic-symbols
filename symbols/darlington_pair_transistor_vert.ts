import { rotateSymbol } from "drawing/rotateSymbol"
import darlington_pair_transistor_horz from "./darlington_pair_transistor_horz"
import svgJson from "assets/generated/darlington_pair_transistor.json"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

console.log(svgJson)
export default modifySymbol(svgJson)
.rotateRightFacingSymbol("down")
.changeTextAnchor("{REF}", "middle_right")
.changeTextAnchor("{VAL}", "middle_left")
.build()
