import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/ground.json"
import { Primitive } from "drawing/types"
import groundHorz from "./ground_horz"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(groundHorz).rotateRightFacingSymbol("down").build()
