import inductorRight from "../symbols/inductor_right"
import type { PathPrimitive, Point, Port, SchSymbol } from "./types"

const inductorPaths = inductorRight.primitives.filter(
  (primitive): primitive is PathPrimitive => primitive.type === "path",
)
const inductorPoints = inductorPaths.flatMap((windingPath) =>
  windingPath.points.map((point) => point),
)
const TERMINAL_X = Math.max(
  ...inductorRight.ports.map((port) => Math.abs(port.x)),
)
const WINDING_CENTER_Y = TERMINAL_X / 2
const leftWindingX = Math.min(...inductorPoints.map((point) => point.x))
const rightWindingX = Math.max(...inductorPoints.map((point) => point.x))

const transformWindingPoint = ({
  point,
  windingCenterY,
  mirrorVertically,
}: {
  point: Point
  windingCenterY: number
  mirrorVertically: boolean
}): Point => {
  const isLeftTerminal = point.x === leftWindingX
  const isRightTerminal = point.x === rightWindingX
  return {
    x: isLeftTerminal
      ? -TERMINAL_X
      : isRightTerminal
        ? TERMINAL_X
        : point.x - inductorRight.center.x,
    y:
      isLeftTerminal || isRightTerminal
        ? windingCenterY
        : (point.y - inductorRight.center.y) * (mirrorVertically ? -1 : 1) +
          windingCenterY,
  }
}

const createWindingPaths = ({
  windingCenterY,
  mirrorVertically,
}: {
  windingCenterY: number
  mirrorVertically: boolean
}): PathPrimitive[] =>
  inductorPaths.map((windingPath) => ({
    ...windingPath,
    points: windingPath.points.map((point) =>
      transformWindingPoint({ point, windingCenterY, mirrorVertically }),
    ),
  }))

const createWindingPort = ({
  port,
  windingCenterY,
  mirrorVertically,
  labels,
}: {
  port: Point
  windingCenterY: number
  mirrorVertically: boolean
  labels: string[]
}): Port => ({
  ...transformWindingPoint({ point: port, windingCenterY, mirrorVertically }),
  labels,
})

export const createCoupledInductorRight = (): SchSymbol => {
  const upperWinding = createWindingPaths({
    windingCenterY: WINDING_CENTER_Y,
    mirrorVertically: false,
  })
  const lowerWinding = createWindingPaths({
    windingCenterY: -WINDING_CENTER_Y,
    mirrorVertically: true,
  })
  const path = (points: Point[]): PathPrimitive => ({
    type: "path",
    points,
    color: "primary",
    fill: false,
  })

  return {
    primitives: [
      ...upperWinding,
      ...lowerWinding,
      path([
        { x: -0.32, y: 0.1 },
        { x: 0.32, y: 0.1 },
      ]),
      path([
        { x: -0.32, y: -0.1 },
        { x: 0.32, y: -0.1 },
      ]),
      {
        type: "circle",
        x: 0.4,
        y: 0.42,
        radius: 0.035,
        color: "primary",
        fill: true,
      },
      {
        type: "circle",
        x: 0.4,
        y: -0.42,
        radius: 0.035,
        color: "primary",
        fill: true,
      },
      {
        type: "text",
        text: "{REF}",
        x: 0,
        y: 0.66,
        anchor: "middle_bottom",
      },
      {
        type: "text",
        text: "{VAL}",
        x: 0,
        y: -0.66,
        anchor: "middle_top",
      },
    ],
    ports: [
      createWindingPort({
        port: { x: TERMINAL_X, y: inductorRight.center.y },
        windingCenterY: WINDING_CENTER_Y,
        mirrorVertically: false,
        labels: ["1", "winding1_start"],
      }),
      createWindingPort({
        port: { x: TERMINAL_X, y: inductorRight.center.y },
        windingCenterY: -WINDING_CENTER_Y,
        mirrorVertically: true,
        labels: ["2", "winding2_start"],
      }),
      createWindingPort({
        port: { x: -TERMINAL_X, y: inductorRight.center.y },
        windingCenterY: WINDING_CENTER_Y,
        mirrorVertically: false,
        labels: ["3", "winding1_end"],
      }),
      createWindingPort({
        port: { x: -TERMINAL_X, y: inductorRight.center.y },
        windingCenterY: -WINDING_CENTER_Y,
        mirrorVertically: true,
        labels: ["4", "winding2_end"],
      }),
    ],
    center: { x: 0, y: 0 },
    size: { width: inductorRight.size.width, height: 1.32 },
  }
}
