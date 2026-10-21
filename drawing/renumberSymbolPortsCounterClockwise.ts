import type { Port, SchSymbol } from "./types"

interface PortWithAngle {
  angle: number
  portIndex: number
}

const getCounterClockwiseAngle = ({
  port,
  symbol,
}: {
  port: Port
  symbol: SchSymbol
}): number => {
  const angle = Math.atan2(port.y - symbol.center.y, port.x - symbol.center.x)
  return angle < 0 ? angle + 2 * Math.PI : angle
}

export const renumberSymbolPortsCounterClockwise = ({
  symbol,
  firstPortAlias,
}: {
  symbol: SchSymbol
  firstPortAlias: string
}): SchSymbol => {
  const portsByAngle: PortWithAngle[] = symbol.ports
    .map((port, portIndex) => ({
      angle: getCounterClockwiseAngle({ port, symbol }),
      portIndex,
    }))
    .sort(
      (firstPort, secondPort) =>
        firstPort.angle - secondPort.angle ||
        firstPort.portIndex - secondPort.portIndex,
    )
  const firstPortPosition = portsByAngle.findIndex(({ portIndex }) =>
    symbol.ports[portIndex]?.labels.includes(firstPortAlias),
  )

  if (firstPortPosition < 0) {
    throw new Error(`Missing first port alias: ${firstPortAlias}`)
  }

  const portsInNumberOrder = [
    ...portsByAngle.slice(firstPortPosition),
    ...portsByAngle.slice(0, firstPortPosition),
  ]
  const pinNumberByPortIndex: number[] = []

  portsInNumberOrder.forEach(({ portIndex }, numberIndex) => {
    pinNumberByPortIndex[portIndex] = numberIndex + 1
  })

  return {
    ...symbol,
    ports: symbol.ports.map((port, portIndex) => ({
      ...port,
      labels: [
        String(pinNumberByPortIndex[portIndex]),
        ...port.labels.filter((portLabel) => !/^\d+$/.test(portLabel)),
      ],
    })),
  }
}
