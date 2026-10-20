import type { PathPrimitive, Port, Primitive, SchSymbol } from "./types"

const SOURCE_PIN_OFFSETS = [-0.15, 0, 0.15]

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

  const updatedPrimitives: Primitive[] = baseSymbol.primitives.map(
    (primitive) => {
      if (primitive.type !== "text") return { ...primitive }
      if (primitive.text === "{REF}") {
        return { ...primitive, x: 0.08, y: 0.66, anchor: "middle_bottom" }
      }
      if (primitive.text === "{VAL}") {
        return { ...primitive, x: 0.08, y: -0.66, anchor: "middle_top" }
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

  const sourcePorts: Port[] = SOURCE_PIN_OFFSETS.map(
    (sourcePinOffset, sourcePinIndex) => ({
      x: sourcePort.x + sourcePinOffset,
      y: sourcePort.y,
      labels: [
        String(sourcePinIndex + 1),
        `source${sourcePinIndex + 1}`,
        `s${sourcePinIndex + 1}`,
        "source",
      ],
    }),
  )
  const groupedSourceTerminal: PathPrimitive = {
    type: "path",
    points: [sourcePorts[0]!, sourcePorts[2]!],
    color: "primary",
    fill: false,
  }

  return {
    ...baseSymbol,
    primitives: [...updatedPrimitives, groupedSourceTerminal],
    ports: [...retainedPorts, ...sourcePorts],
    size: baseSymbol.size,
  }
}
