import type { PathPrimitive, Point, Port, Primitive, SchSymbol } from "./types"

const POINT_TOLERANCE = 0.000001
const SOURCE_TERMINAL_X_OFFSETS = [-0.15, 0, 0.15]
const SOURCE_TERMINAL_Y = -0.8

const pointsMatch = (firstPoint: Point, secondPoint: Point): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  POINT_TOLERANCE

const pathTouchesPort = (path: PathPrimitive, port: Port): boolean =>
  path.points.some((point) => pointsMatch(point, port))

const createSourceFanout = (sourceJunction: Point): PathPrimitive[] => {
  const sourceTerminalXs = SOURCE_TERMINAL_X_OFFSETS.map(
    (sourceOffset) => sourceJunction.x + sourceOffset,
  )
  const path = (points: Point[]): PathPrimitive => ({
    type: "path",
    points,
    color: "primary",
    fill: false,
  })

  return [
    path([
      { x: sourceTerminalXs[0], y: sourceJunction.y },
      { x: sourceTerminalXs[2], y: sourceJunction.y },
    ]),
    ...sourceTerminalXs.map((sourceX) =>
      path([
        { x: sourceX, y: sourceJunction.y },
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

  const updatedPrimitives: Primitive[] = baseSymbol.primitives.map(
    (primitive) => {
      if (primitive.type !== "text") return { ...primitive }
      if (primitive.text === "{REF}") {
        return { ...primitive, x: 0.08, y: 0.66, anchor: "middle_bottom" }
      }
      if (primitive.text === "{VAL}") {
        return { ...primitive, x: 0.08, y: -0.92, anchor: "middle_top" }
      }
      return { ...primitive }
    },
  )

  const retainedPorts = baseSymbol.ports
    .filter((port) => port !== sourcePort)
    .map((port): Port => {
      if (port.labels.includes("gate")) {
        return { ...port, labels: ["4", "gate", "g"] }
      }
      return { ...port, labels: ["5", "drain", "d"] }
    })

  const sourcePorts: Port[] = SOURCE_TERMINAL_X_OFFSETS.map(
    (sourceOffset, sourceIndex) => ({
      x: sourcePort.x + sourceOffset,
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
    primitives: [...updatedPrimitives, ...createSourceFanout(sourcePort)],
    ports: [...retainedPorts, ...sourcePorts],
    size: { width: 1.1, height: 1.8 },
  }
}
