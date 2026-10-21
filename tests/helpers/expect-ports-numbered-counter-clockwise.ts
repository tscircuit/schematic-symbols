import { expect } from "bun:test"
import type { SchSymbol } from "../../drawing/types"

const FULL_TURN = 2 * Math.PI

const getPortAngle = ({
  symbol,
  portIndex,
}: {
  symbol: SchSymbol
  portIndex: number
}): number => {
  const port = symbol.ports[portIndex]
  if (!port) throw new Error(`Missing port at index ${portIndex}`)
  const angle = Math.atan2(port.y - symbol.center.y, port.x - symbol.center.x)
  return angle < 0 ? angle + FULL_TURN : angle
}

export const expectPortsNumberedCounterClockwise = ({
  symbol,
  symbolName,
}: {
  symbol: SchSymbol
  symbolName: string
}) => {
  const portIndexByPinNumber: number[] = []

  symbol.ports.forEach((port, portIndex) => {
    const pinNumber = Number(port.labels[0])
    expect(Number.isInteger(pinNumber), `${symbolName} numeric pin`).toBe(true)
    portIndexByPinNumber[pinNumber - 1] = portIndex
  })

  expect(portIndexByPinNumber, `${symbolName} sequential pins`).toHaveLength(
    symbol.ports.length,
  )

  const angles = portIndexByPinNumber.map((portIndex) =>
    getPortAngle({ symbol, portIndex }),
  )
  let totalCounterClockwiseTurn = 0

  for (let pinIndex = 0; pinIndex < angles.length; pinIndex++) {
    const currentAngle = angles[pinIndex]
    const nextAngle = angles[(pinIndex + 1) % angles.length]
    if (currentAngle === undefined || nextAngle === undefined) continue
    const counterClockwiseTurn =
      (nextAngle - currentAngle + FULL_TURN) % FULL_TURN
    expect(
      counterClockwiseTurn,
      `${symbolName} pin ${pinIndex + 1} counter-clockwise spacing`,
    ).toBeGreaterThan(0)
    totalCounterClockwiseTurn += counterClockwiseTurn
  }

  expect(
    totalCounterClockwiseTurn,
    `${symbolName} one perimeter turn`,
  ).toBeCloseTo(FULL_TURN, 6)
}
