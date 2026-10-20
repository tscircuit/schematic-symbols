import type { PathPrimitive, Point, Port, Primitive, SchSymbol } from "./types"

const POINT_TOLERANCE = 0.000001

const pointsMatch = (firstPoint: Point, secondPoint: Point): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  POINT_TOLERANCE

const pathTouchesPort = (path: PathPrimitive, port: Port): boolean =>
  path.points.some((point) => pointsMatch(point, port))

const createSourceFanout = (bodyConnection: Point): PathPrimitive[] => {
  const forkY = -0.32
  const terminalY = -0.65
  const sourceXs = [0.05, 0.31, 0.57]
  const path = (points: Point[]): PathPrimitive => ({
    type: "path",
    points,
    color: "primary",
    fill: false,
  })

  return [
    path([bodyConnection, { x: bodyConnection.x, y: forkY }]),
    path([
      { x: sourceXs[0], y: forkY },
      { x: sourceXs[2], y: forkY },
    ]),
    ...sourceXs.map((sourceX) =>
      path([
        { x: sourceX, y: forkY },
        { x: sourceX, y: terminalY },
      ]),
    ),
  ]
}

export const createFiveTerminalNChannelPowerMosfet = (
  baseSymbol: SchSymbol,
): SchSymbol => {
  const sourcePort = baseSymbol.ports.find((port) =>
    port.labels.includes("source"),
  )
  if (!sourcePort) throw new Error("MOSFET source port not found")

  const sourceLead = baseSymbol.primitives.find(
    (primitive): primitive is PathPrimitive =>
      primitive.type === "path" && pathTouchesPort(primitive, sourcePort),
  )
  if (!sourceLead) throw new Error("MOSFET source lead not found")

  const bodyConnection = sourceLead.points.find(
    (point) => !pointsMatch(point, sourcePort),
  )
  if (!bodyConnection) throw new Error("MOSFET body connection not found")

  const updatedPrimitives: Primitive[] = baseSymbol.primitives
    .filter((primitive) => primitive !== sourceLead)
    .map((primitive) => {
      if (primitive.type !== "text") return { ...primitive }
      if (primitive.text === "{REF}") {
        return { ...primitive, x: 0.08, y: 0.66, anchor: "middle_bottom" }
      }
      if (primitive.text === "{VAL}") {
        return { ...primitive, x: 0.08, y: -0.76, anchor: "middle_top" }
      }
      return { ...primitive }
    })

  const retainedPorts = baseSymbol.ports
    .filter((port) => port !== sourcePort)
    .map((port): Port => {
      if (port.labels.includes("gate")) {
        return { ...port, labels: ["4", "gate", "g"] }
      }
      return { ...port, labels: ["5", "drain", "d"] }
    })

  const sourcePorts: Port[] = [0.05, 0.31, 0.57].map(
    (sourceX, sourceIndex) => ({
      x: sourceX,
      y: -0.65,
      labels: [
        String(sourceIndex + 1),
        `source${sourceIndex + 1}`,
        `s${sourceIndex + 1}`,
        "source",
      ],
    }),
  )

  return {
    ...baseSymbol,
    primitives: [...updatedPrimitives, ...createSourceFanout(bodyConnection)],
    ports: [...retainedPorts, ...sourcePorts],
    size: { width: 1.1, height: 1.6 },
  }
}
