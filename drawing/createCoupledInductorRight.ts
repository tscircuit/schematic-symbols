import type { PathPrimitive, Point, SchSymbol } from "./types"

const TERMINAL_X = 0.5
const WINDING_START_X = -0.36
const WINDING_END_X = 0.36
const WINDING_CENTER_Y = 0.18
const WINDING_DEPTH = 0.09
const WINDING_LOBE_COUNT = 4
const ARC_SEGMENT_COUNT = 16

const path = (points: Point[]): PathPrimitive => ({
  type: "path",
  points,
  color: "primary",
  fill: false,
})

const createWindingPoints = ({
  centerY,
  bulgeDirection,
}: {
  centerY: number
  bulgeDirection: 1 | -1
}): Point[] => {
  const windingWidth = WINDING_END_X - WINDING_START_X
  const lobeWidth = windingWidth / WINDING_LOBE_COUNT
  const windingPoints: Point[] = [
    { x: -TERMINAL_X, y: centerY },
    { x: WINDING_START_X, y: centerY },
  ]

  for (let lobeIndex = 0; lobeIndex < WINDING_LOBE_COUNT; lobeIndex++) {
    for (
      let segmentIndex = 1;
      segmentIndex <= ARC_SEGMENT_COUNT;
      segmentIndex++
    ) {
      const lobeProgress = segmentIndex / ARC_SEGMENT_COUNT
      windingPoints.push({
        x: WINDING_START_X + (lobeIndex + lobeProgress) * lobeWidth,
        y:
          centerY +
          bulgeDirection * Math.sin(Math.PI * lobeProgress) * WINDING_DEPTH,
      })
    }
  }

  windingPoints.push({ x: TERMINAL_X, y: centerY })
  return windingPoints
}

export const createCoupledInductorRight = (): SchSymbol => ({
  primitives: [
    path(
      createWindingPoints({
        centerY: WINDING_CENTER_Y,
        bulgeDirection: 1,
      }),
    ),
    path(
      createWindingPoints({
        centerY: -WINDING_CENTER_Y,
        bulgeDirection: -1,
      }),
    ),
    path([
      { x: -0.3, y: 0.035 },
      { x: 0.3, y: 0.035 },
    ]),
    path([
      { x: -0.3, y: -0.035 },
      { x: 0.3, y: -0.035 },
    ]),
    {
      type: "circle",
      x: 0.4,
      y: 0.28,
      radius: 0.03,
      color: "primary",
      fill: true,
    },
    {
      type: "circle",
      x: 0.4,
      y: -0.28,
      radius: 0.03,
      color: "primary",
      fill: true,
    },
    {
      type: "text",
      text: "{REF}",
      x: 0,
      y: 0.48,
      anchor: "middle_bottom",
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: -0.48,
      anchor: "middle_top",
    },
  ],
  ports: [
    {
      x: TERMINAL_X,
      y: WINDING_CENTER_Y,
      labels: ["1", "winding1_start"],
    },
    {
      x: TERMINAL_X,
      y: -WINDING_CENTER_Y,
      labels: ["2", "winding2_start"],
    },
    {
      x: -TERMINAL_X,
      y: WINDING_CENTER_Y,
      labels: ["3", "winding1_end"],
    },
    {
      x: -TERMINAL_X,
      y: -WINDING_CENTER_Y,
      labels: ["4", "winding2_end"],
    },
  ],
  center: { x: 0, y: 0 },
  size: { width: 1.1, height: 0.96 },
})
