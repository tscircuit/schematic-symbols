import inductorRight from "../symbols/inductor_right"
import type { PathPrimitive, Point, Port, SchSymbol } from "./types"

const WINDING_CENTER_Y = 0.28
const CORE_HALF_LENGTH = 0.32
const CORE_OFFSET_Y = 0.1
const POLARITY_DOT_X = 0.4
const POLARITY_DOT_Y = 0.42

const inductorPaths = inductorRight.primitives.filter(
  (primitive): primitive is PathPrimitive => primitive.type === "path",
)
const inductorPoints = inductorPaths.flatMap((windingPath) =>
  windingPath.points.map((point) => point),
)

const transformWindingPoint = ({
  point,
  windingCenterY,
  mirrorVertically,
}: {
  point: Point
  windingCenterY: number
  mirrorVertically: boolean
}): Point => ({
  x: point.x - inductorRight.center.x,
  y:
    (point.y - inductorRight.center.y) * (mirrorVertically ? -1 : 1) +
    windingCenterY,
})

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
  const leftPort = inductorPoints.reduce((leftmostPoint, point) =>
    point.x < leftmostPoint.x ? point : leftmostPoint,
  )
  const rightPort = inductorPoints.reduce((rightmostPoint, point) =>
    point.x > rightmostPoint.x ? point : rightmostPoint,
  )

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
        { x: -CORE_HALF_LENGTH, y: CORE_OFFSET_Y },
        { x: CORE_HALF_LENGTH, y: CORE_OFFSET_Y },
      ]),
      path([
        { x: -CORE_HALF_LENGTH, y: -CORE_OFFSET_Y },
        { x: CORE_HALF_LENGTH, y: -CORE_OFFSET_Y },
      ]),
      {
        type: "circle",
        x: POLARITY_DOT_X,
        y: POLARITY_DOT_Y,
        radius: 0.035,
        color: "primary",
        fill: true,
      },
      {
        type: "circle",
        x: POLARITY_DOT_X,
        y: -POLARITY_DOT_Y,
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
        port: rightPort,
        windingCenterY: WINDING_CENTER_Y,
        mirrorVertically: false,
        labels: ["1", "winding1_start"],
      }),
      createWindingPort({
        port: rightPort,
        windingCenterY: -WINDING_CENTER_Y,
        mirrorVertically: true,
        labels: ["2", "winding2_start"],
      }),
      createWindingPort({
        port: leftPort,
        windingCenterY: WINDING_CENTER_Y,
        mirrorVertically: false,
        labels: ["3", "winding1_end"],
      }),
      createWindingPort({
        port: leftPort,
        windingCenterY: -WINDING_CENTER_Y,
        mirrorVertically: true,
        labels: ["4", "winding2_end"],
      }),
    ],
    center: { x: 0, y: 0 },
    size: { width: inductorRight.size.width, height: 1.32 },
  }
}
