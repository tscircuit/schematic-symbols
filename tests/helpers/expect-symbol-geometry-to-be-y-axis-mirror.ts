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
}: {
  rightFacingSymbol: SchSymbol
  leftFacingSymbol: SchSymbol
}): void => {
  const mirroredSymbol = flipSymbolOverYAxis(rightFacingSymbol)

  expect(leftFacingSymbol.primitives).toEqual(mirroredSymbol.primitives)
  expect(leftFacingSymbol.center).toEqual(mirroredSymbol.center)
  expect(leftFacingSymbol.size).toEqual(mirroredSymbol.size)
  expect(leftFacingSymbol.ports.map(withoutNumericLabels)).toEqual(
    mirroredSymbol.ports.map(withoutNumericLabels),
  )
}
