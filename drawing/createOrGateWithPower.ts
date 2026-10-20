import type { PathPrimitive, Port, Primitive, SchSymbol } from "./types"

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

export const createOrGateWithPower = (orGate: SchSymbol): SchSymbol => {
  const inputALead = getSignalLead({ symbol: orGate, portAlias: "a" })
  const inputBLead = getSignalLead({ symbol: orGate, portAlias: "b" })
  const outputLead = getSignalLead({ symbol: orGate, portAlias: "y" })
  const updatedPrimitives: Primitive[] = orGate.primitives.map((primitive) => {
    if (primitive === inputALead) {
      return {
        ...inputALead,
        points: [
          { x: -0.7, y: 0.14 },
          { x: -0.255, y: 0.14 },
        ],
      }
    }
    if (primitive === inputBLead) {
      return {
        ...inputBLead,
        points: [
          { x: -0.7, y: -0.14 },
          { x: -0.255, y: -0.14 },
        ],
      }
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
    if (port.labels.includes("a")) return { ...port, x: -0.7, y: 0.14 }
    if (port.labels.includes("b")) return { ...port, x: -0.7, y: -0.14 }
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
