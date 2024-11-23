import groundHorz from "./ground_horz"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

export default modifySymbol(groundHorz).rotateRightFacingSymbol("down").build()
