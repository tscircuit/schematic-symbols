import { expect } from "bun:test"
import { flipSymbolOverYAxis } from "../../drawing/rotateSymbol"
import type { SchSymbol } from "../../drawing/types"

export const expectSymbolToBeYAxisMirror = ({
  rightFacingSymbol,
  leftFacingSymbol,
}: {
  rightFacingSymbol: SchSymbol
  leftFacingSymbol: SchSymbol
}): void => {
  expect(leftFacingSymbol).toEqual(flipSymbolOverYAxis(rightFacingSymbol))
}
