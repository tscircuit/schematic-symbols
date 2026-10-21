import type { PathPrimitive, Port, SchSymbol } from "../drawing/types"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import schottkyDiodeRight from "./schottky_diode_right"

const UPPER_ANODE_PORT = { x: -0.68, y: 0.19 }
const LOWER_ANODE_PORT = { x: -0.68, y: -0.11 }
const ANODE_JUNCTION_X = -0.52

const packageLeadPaths: PathPrimitive[] = [
  {
    type: "path",
    points: [UPPER_ANODE_PORT, { x: ANODE_JUNCTION_X, y: 0.19 }],
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [LOWER_ANODE_PORT, { x: ANODE_JUNCTION_X, y: -0.11 }],
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [
      { x: ANODE_JUNCTION_X, y: -0.11 },
      { x: ANODE_JUNCTION_X, y: 0.19 },
    ],
    color: "primary",
    fill: false,
  },
]

const cathodePort = schottkyDiodeRight.ports.find((port) =>
  port.labels.includes("neg"),
)

if (!cathodePort) {
  throw new Error("The base Schottky symbol must expose a cathode port")
}

const packagePorts: Port[] = [
  { ...UPPER_ANODE_PORT, labels: ["1", "anode1", "a1", "anode", "a"] },
  { ...LOWER_ANODE_PORT, labels: ["2", "anode2", "a2", "anode", "a"] },
  { ...cathodePort, labels: ["3", "cathode", "k"] },
]

const schottkyDiode3PinRight: SchSymbol = {
  ...schottkyDiodeRight,
  primitives: [...schottkyDiodeRight.primitives, ...packageLeadPaths],
  ports: packagePorts,
  size: { width: 1.36, height: 0.54 },
}

export default renumberSymbolPortsCounterClockwise({
  symbol: schottkyDiode3PinRight,
  firstPortAlias: "anode1",
})
