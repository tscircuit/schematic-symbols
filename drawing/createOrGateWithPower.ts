import type { PathPrimitive, Port, Primitive, SchSymbol } from "./types"

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
  const updatedPrimitives: Primitive[] = orGate.primitives.map((primitive) => {
    if (primitive.type !== "text") return { ...primitive }
    if (primitive.text === "{REF}") {
      return { ...primitive, x: 0.72, y: 0.18, anchor: "middle_left" }
    }
    if (primitive.text === "{VAL}") {
      return { ...primitive, x: 0.72, y: -0.18, anchor: "middle_left" }
    }
    return { ...primitive }
  })
  const updatedPorts: Port[] = orGate.ports.map((port) => {
    if (port.labels.includes("y")) {
      return { ...port, labels: ["4", "out", "output", "y"] }
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
    size: { width: 1.8, height: 1.4 },
  }
}
