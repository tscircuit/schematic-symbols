import { expect } from "bun:test"
import { flipSymbolOverYAxis } from "../../drawing/rotateSymbol"
import type { Port, SchSymbol } from "../../drawing/types"

const withoutNumericLabels = (port: Port): Port => ({
  ...port,
  labels: port.labels.filter((portLabel) => !/^\d+$/.test(portLabel)),
})

export const expectSymbolGeometryToBeYAxisMirror = ({
  rightFacingSymbol,
  leftFacingSymbol,
  ignoreTextLayout = false,
}: {
  rightFacingSymbol: SchSymbol
  leftFacingSymbol: SchSymbol
  ignoreTextLayout?: boolean
}): void => {
  const mirroredSymbol = flipSymbolOverYAxis(rightFacingSymbol)
  const getComparedPrimitives = (symbol: SchSymbol) =>
    ignoreTextLayout
      ? symbol.primitives.filter((primitive) => primitive.type !== "text")
      : symbol.primitives

  expect(getComparedPrimitives(leftFacingSymbol)).toEqual(
    getComparedPrimitives(mirroredSymbol),
  )
  expect(leftFacingSymbol.center).toEqual(mirroredSymbol.center)
  expect(leftFacingSymbol.size).toEqual(mirroredSymbol.size)
  expect(leftFacingSymbol.ports.map(withoutNumericLabels)).toEqual(
    mirroredSymbol.ports.map(withoutNumericLabels),
  )
}
