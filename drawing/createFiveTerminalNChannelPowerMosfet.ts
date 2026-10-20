import type { PathPrimitive, Point, Port, Primitive, SchSymbol } from "./types"

const GATE_PORT = { x: -0.5, y: 0 }
const DRAIN_PORT = { x: 0.16, y: 0.58 }
const SOURCE_PORT = { x: 0.16, y: -0.58 }

const path = (points: Point[], fill = false): PathPrimitive => ({
  type: "path",
  points,
  color: "primary",
  fill,
})

const createSourcePorts = (): Port[] =>
  ["1", "2", "3"].map((pinNumber) => ({
    ...SOURCE_PORT,
    labels: [pinNumber, `source${pinNumber}`, `s${pinNumber}`, "source"],
  }))

export const createFiveTerminalNChannelPowerMosfet = (): SchSymbol => {
  const primitives: Primitive[] = [
    {
      type: "circle",
      x: 0.06,
      y: 0,
      radius: 0.34,
      color: "primary",
      fill: false,
    },
    path([GATE_PORT, { x: -0.21, y: 0 }]),
    path([
      { x: -0.18, y: -0.24 },
      { x: -0.18, y: 0.24 },
    ]),
    path([
      { x: -0.09, y: 0.14 },
      { x: -0.09, y: 0.25 },
    ]),
    path([
      { x: -0.09, y: -0.055 },
      { x: -0.09, y: 0.055 },
    ]),
    path([
      { x: -0.09, y: -0.25 },
      { x: -0.09, y: -0.14 },
    ]),
    path([{ x: -0.09, y: 0.2 }, { x: 0.16, y: 0.2 }, DRAIN_PORT]),
    path([{ x: -0.09, y: -0.2 }, { x: 0.16, y: -0.2 }, SOURCE_PORT]),
    path([
      { x: 0.16, y: -0.2 },
      { x: 0.16, y: 0 },
      { x: -0.01, y: 0 },
    ]),
    path(
      [
        { x: -0.09, y: 0 },
        { x: -0.01, y: 0.05 },
        { x: -0.01, y: -0.05 },
        { x: -0.09, y: 0 },
      ],
      true,
    ),
    path([
      { x: 0.16, y: -0.2 },
      { x: 0.3, y: -0.2 },
      { x: 0.3, y: -0.07 },
    ]),
    path(
      [
        { x: 0.25, y: -0.07 },
        { x: 0.35, y: -0.07 },
        { x: 0.3, y: 0.035 },
        { x: 0.25, y: -0.07 },
      ],
      true,
    ),
    path([
      { x: 0.245, y: 0.055 },
      { x: 0.355, y: 0.055 },
    ]),
    path([
      { x: 0.3, y: 0.055 },
      { x: 0.3, y: 0.2 },
      { x: 0.16, y: 0.2 },
    ]),
    {
      type: "text",
      text: "{REF}",
      x: 0.48,
      y: 0.16,
      anchor: "middle_left",
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0.48,
      y: -0.16,
      anchor: "middle_left",
    },
  ]

  return {
    primitives,
    ports: [
      { ...GATE_PORT, labels: ["4", "gate", "g"] },
      { ...DRAIN_PORT, labels: ["5", "drain", "d"] },
      ...createSourcePorts(),
    ],
    center: { x: 0, y: 0 },
    size: { width: 1.14, height: 1.16 },
  }
}
