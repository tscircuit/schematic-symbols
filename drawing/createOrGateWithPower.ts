import type { PathPrimitive, Point, Port, Primitive, SchSymbol } from "./types"

const POINT_TOLERANCE = 0.000001

const pointsMatch = (firstPoint: Point, secondPoint: Point): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  POINT_TOLERANCE

const getSignalLead = ({
  symbol,
  portAlias,
}: {
  symbol: SchSymbol
  portAlias: string
}): PathPrimitive => {
  const signalPort = symbol.ports.find((port) =>
    port.labels.includes(portAlias),
  )
  const signalLead = symbol.primitives.find(
    (primitive): primitive is PathPrimitive =>
      primitive.type === "path" &&
      primitive.points.some(
        (point) =>
          signalPort !== undefined &&
          Math.hypot(point.x - signalPort.x, point.y - signalPort.y) < 0.000001,
      ),
  )
  if (!signalLead) throw new Error(`OR gate ${portAlias} lead not found`)
  return signalLead
}

const createPowerLead = ({
  startY,
  endY,
}: {
  startY: number
  endY: number
}): PathPrimitive => ({
  type: "path",
  points: [
    { x: 0, y: startY },
    { x: 0, y: endY },
  ],
  color: "primary",
  fill: false,
})

const moveLeadPort = ({
  lead,
  currentPort,
  targetPort,
}: {
  lead: PathPrimitive
  currentPort: Port
  targetPort: Point
}): PathPrimitive => ({
  ...lead,
  points: lead.points.map((point) =>
    pointsMatch(point, currentPort) ? targetPort : point,
  ),
})

export const createOrGateWithPower = (orGate: SchSymbol): SchSymbol => {
  const inputAPort = orGate.ports.find((port) => port.labels.includes("a"))
  if (!inputAPort) throw new Error("OR gate a port not found")
  const inputBPort = orGate.ports.find((port) => port.labels.includes("b"))
  if (!inputBPort) throw new Error("OR gate b port not found")
  const inputALead = getSignalLead({ symbol: orGate, portAlias: "a" })
  const inputBLead = getSignalLead({ symbol: orGate, portAlias: "b" })
  const outputLead = getSignalLead({ symbol: orGate, portAlias: "y" })
  const inputATarget = { x: -0.7, y: 0.14 }
  const inputBTarget = { x: -0.7, y: -0.14 }
  const updatedPrimitives: Primitive[] = orGate.primitives.map((primitive) => {
    if (primitive === inputALead) {
      return moveLeadPort({
        lead: inputALead,
        currentPort: inputAPort,
        targetPort: inputATarget,
      })
    }
    if (primitive === inputBLead) {
      return moveLeadPort({
        lead: inputBLead,
        currentPort: inputBPort,
        targetPort: inputBTarget,
      })
    }
    if (primitive === outputLead) {
      return {
        ...outputLead,
        points: [
          { x: 0.55, y: 0.01 },
          { x: 0.6, y: 0 },
          { x: 0.98, y: 0 },
        ],
      }
    }
    if (primitive.type !== "text") return { ...primitive }
    if (primitive.text === "{REF}") {
      return { ...primitive, x: -0.45, y: 0.78, anchor: "middle_bottom" }
    }
    if (primitive.text === "{VAL}") {
      return { ...primitive, x: -0.45, y: -0.78, anchor: "middle_top" }
    }
    return { ...primitive }
  })
  const updatedPorts: Port[] = orGate.ports.map((port) => {
    if (port.labels.includes("a")) return { ...port, ...inputATarget }
    if (port.labels.includes("b")) return { ...port, ...inputBTarget }
    if (port.labels.includes("y")) {
      return {
        ...port,
        x: 0.98,
        y: 0,
        labels: ["4", "out", "output", "y"],
      }
    }
    return { ...port, labels: [...port.labels] }
  })

  return {
    ...orGate,
    primitives: [
      ...updatedPrimitives,
      createPowerLead({ startY: 0.34, endY: 0.7 }),
      createPowerLead({ startY: -0.32, endY: -0.7 }),
    ],
    ports: [
      ...updatedPorts,
      { x: 0, y: -0.7, labels: ["3", "gnd", "ground"] },
      { x: 0, y: 0.7, labels: ["5", "vcc", "power"] },
    ],
    size: { width: 2.1, height: 1.8 },
  }
}
