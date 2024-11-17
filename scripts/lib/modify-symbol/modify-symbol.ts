import { NinePointAnchor } from "drawing/types"
import { rotateRightFacingSymbol } from "drawing/rotateSymbol"

interface ModifySymbolBuilder {
  changeTextAnchor(
    text: "{REF}" | "{VAL}" | string,
    newAnchor: NinePointAnchor,
  ): ModifySymbolBuilder
  rotateRightFacingSymbol(
    newOrientation: "up" | "down" | "left" | "right",
  ): ModifySymbolBuilder
  build(): Symbol
}

export const modifySymbol = (symbol: Symbol): ModifySymbolBuilder => {}
