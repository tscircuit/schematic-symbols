import groundHorz from "./ground_horz"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

export default modifySymbol(groundHorz).rotateRightFacingSymbol("down").build()
