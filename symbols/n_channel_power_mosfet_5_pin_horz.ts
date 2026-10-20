import type { PathPrimitive, Port, SchSymbol } from "../drawing/types"
import nChannelEnhancementMosfet from "./n_channel_e_mosfet_transistor_horz"

const getRequiredPort = (symbol: SchSymbol, portLabel: string): Port => {
  const port = symbol.ports.find((candidate) =>
    candidate.labels.includes(portLabel),
  )
  if (!port) {
    throw new Error(`The base N-channel MOSFET must expose a ${portLabel} port`)
  }
  return port
}

const gatePort = getRequiredPort(nChannelEnhancementMosfet, "gate")
const drainPort = getRequiredPort(nChannelEnhancementMosfet, "drain")
const sourcePort = getRequiredPort(nChannelEnhancementMosfet, "source")

const bodyDiodePaths: PathPrimitive[] = [
  {
    type: "path",
    points: [
      { x: 0.31, y: -0.1 },
      { x: 0.38, y: -0.1 },
      { x: 0.38, y: -0.04 },
    ],
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [
      { x: 0.34, y: -0.04 },
      { x: 0.42, y: -0.04 },
      { x: 0.38, y: 0.04 },
      { x: 0.34, y: -0.04 },
    ],
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [
      { x: 0.335, y: 0.06 },
      { x: 0.425, y: 0.06 },
    ],
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [
      { x: 0.38, y: 0.06 },
      { x: 0.38, y: 0.11 },
      { x: 0.3, y: 0.11 },
    ],
    color: "primary",
    fill: false,
  },
]

const sourcePorts: Port[] = ["1", "2", "3"].map((pinNumber) => ({
  ...sourcePort,
  labels: [pinNumber, `source${pinNumber}`, `s${pinNumber}`, "source"],
}))

const fiveTerminalPowerMosfet: SchSymbol = {
  ...nChannelEnhancementMosfet,
  primitives: [...nChannelEnhancementMosfet.primitives, ...bodyDiodePaths],
  ports: [
    { ...gatePort, labels: ["4", "gate", "g"] },
    { ...drainPort, labels: ["5", "drain", "d"] },
    ...sourcePorts,
  ],
}

export default fiveTerminalPowerMosfet
