import type { PathPrimitive, Point, Port, Primitive, SchSymbol } from "./types"

const POINT_TOLERANCE = 0.000001
const GATE_TERMINAL = { x: -0.1, y: -0.1 }
const DRAIN_TERMINAL = { x: 0.3, y: 0.3 }
const SOURCE_TERMINAL_XS = [0.2, 0.3, 0.4]
const SOURCE_TERMINAL_Y = -0.4

const pointsMatch = (firstPoint: Point, secondPoint: Point): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  POINT_TOLERANCE

const pathTouchesPort = (path: PathPrimitive, port: Port): boolean =>
  path.points.some((point) => pointsMatch(point, port))

const movePathTerminal = ({
  path,
  currentPort,
  targetPoint,
}: {
  path: PathPrimitive
  currentPort: Port
  targetPoint: Point
}): PathPrimitive => ({
  ...path,
  points: path.points.map((point) =>
    pointsMatch(point, currentPort) ? targetPoint : point,
  ),
})

const createSourceFanout = (bodyConnection: Point): PathPrimitive[] => {
  const forkY = -0.28
  const path = (points: Point[]): PathPrimitive => ({
    type: "path",
    points,
    color: "primary",
    fill: false,
  })

  return [
    path([bodyConnection, { x: bodyConnection.x, y: forkY }]),
    path([
      { x: SOURCE_TERMINAL_XS[0], y: forkY },
      { x: SOURCE_TERMINAL_XS[2], y: forkY },
    ]),
    ...SOURCE_TERMINAL_XS.map((sourceX) =>
      path([
        { x: sourceX, y: forkY },
        { x: sourceX, y: SOURCE_TERMINAL_Y },
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
  const gatePort = baseSymbol.ports.find((port) => port.labels.includes("gate"))
  if (!gatePort) throw new Error("MOSFET gate port not found")
  const drainPort = baseSymbol.ports.find((port) =>
    port.labels.includes("drain"),
  )
  if (!drainPort) throw new Error("MOSFET drain port not found")

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
      if (primitive.type === "path" && pathTouchesPort(primitive, gatePort)) {
        return movePathTerminal({
          path: primitive,
          currentPort: gatePort,
          targetPoint: GATE_TERMINAL,
        })
      }
      if (primitive.type === "path" && pathTouchesPort(primitive, drainPort)) {
        return movePathTerminal({
          path: primitive,
          currentPort: drainPort,
          targetPoint: DRAIN_TERMINAL,
        })
      }
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
        return { ...GATE_TERMINAL, labels: ["4", "gate", "g"] }
      }
      return { ...DRAIN_TERMINAL, labels: ["5", "drain", "d"] }
    })

  const sourcePorts: Port[] = SOURCE_TERMINAL_XS.map(
    (sourceX, sourceIndex) => ({
      x: sourceX,
      y: SOURCE_TERMINAL_Y,
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
