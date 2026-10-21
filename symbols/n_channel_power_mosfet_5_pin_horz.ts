import { getSizeForCenteredTerminalBox } from "../drawing/getSizeForCenteredTerminalBox"
import { renumberSymbolPortsCounterClockwise } from "../drawing/renumberSymbolPortsCounterClockwise"
import type {
  PathPrimitive,
  Point,
  Port,
  Primitive,
  SchSymbol,
} from "../drawing/types"
import nChannelEnhancementMosfet from "./n_channel_e_mosfet_transistor_horz"

const POINT_TOLERANCE = 0.000001

const pointsMatch = (firstPoint: Point, secondPoint: Point): boolean =>
  Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y) <
  POINT_TOLERANCE

const baseTerminalPorts = nChannelEnhancementMosfet.ports

const isBaseTerminalLead = (primitive: Primitive): boolean =>
  primitive.type === "path" &&
  primitive.points.some((point) =>
    baseTerminalPorts.some((port) => pointsMatch(point, port)),
  )

const GATE_PORT = { x: -0.29, y: -0.1 }
const DRAIN_PORT = { x: 0.31, y: 0.5 }
const SOURCE_PORTS = [
  { x: 0.16, y: -0.55 },
  { x: 0.31, y: -0.55 },
  { x: 0.46, y: -0.55 },
] as const
const SOURCE_PORT_LABELS = [
  ["2", "source_left", "source"],
  ["3", "source_center", "source"],
  ["4", "source_right", "source"],
] as const
const SOURCE_BUS_Y = -0.32

const terminalLeadPaths: PathPrimitive[] = [
  {
    type: "path",
    points: [GATE_PORT, { x: 0.05, y: -0.11 }],
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [DRAIN_PORT, { x: 0.31, y: 0.11 }],
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [
      { x: SOURCE_PORTS[0].x, y: SOURCE_BUS_Y },
      { x: SOURCE_PORTS[2].x, y: SOURCE_BUS_Y },
    ],
    color: "primary",
    fill: false,
  },
  ...SOURCE_PORTS.map<PathPrimitive>((sourceTerminal) => ({
    type: "path",
    points: [sourceTerminal, { x: sourceTerminal.x, y: SOURCE_BUS_Y }],
    color: "primary",
    fill: false,
  })),
  {
    type: "path",
    points: [
      { x: SOURCE_PORTS[1].x, y: SOURCE_BUS_Y },
      { x: 0.31, y: -0.01 },
    ],
    color: "primary",
    fill: false,
  },
]

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

const sourcePorts: Port[] = SOURCE_PORTS.map((sourceTerminal, index) => ({
  ...sourceTerminal,
  labels: [...SOURCE_PORT_LABELS[index]],
}))

const ports: Port[] = [
  { ...GATE_PORT, labels: ["1", "gate", "g"] },
  { ...DRAIN_PORT, labels: ["5", "drain", "d"] },
  ...sourcePorts,
]

const fiveTerminalPowerMosfet: SchSymbol = {
  ...nChannelEnhancementMosfet,
  primitives: [
    ...nChannelEnhancementMosfet.primitives.filter(
      (primitive) => !isBaseTerminalLead(primitive),
    ),
    ...terminalLeadPaths,
    ...bodyDiodePaths,
  ],
  ports,
  size: getSizeForCenteredTerminalBox(nChannelEnhancementMosfet.center, ports),
}

export default renumberSymbolPortsCounterClockwise({
  symbol: fiveTerminalPowerMosfet,
  firstPortAlias: "gate",
})
