import { rotate, applyToPoint } from "transformation-matrix"
import type {
  SchSymbol,
  Primitive,
  Point,
  Port,
  NinePointAnchor,
} from "./types"

const rotateAnchor = (anchor: NinePointAnchor): NinePointAnchor => {
  switch (anchor) {
    case "middle_top":
      return "middle_right"
    case "middle_bottom":
      return "middle_left"
  }
}

export const rotateSymbol = (
  symbol: SchSymbol,
  overrides?: Partial<SchSymbol>,
): SchSymbol => {
  const transform = rotate(Math.PI / 2, symbol.center.x, symbol.center.y)

  const { primitives, center, size, ports } = symbol

  const rotatedPrimitives = primitives.map((primitive): Primitive => {
    primitive = { ...primitive }
    switch (primitive.type) {
      case "path":
        return {
          ...primitive,
          points: primitive.points.map(
            (point) => applyToPoint(transform, point) as Point,
          ),
        }
      case "text":
        const rotatedPoint = applyToPoint(transform, {
          x: primitive.x,
          y: primitive.y,
        }) as Point

        primitive.anchor = rotateAnchor(primitive.anchor)

        return {
          ...primitive,
          x: rotatedPoint.x,
          y: rotatedPoint.y,
        }
      case "circle":
        const rotatedCenter = applyToPoint(transform, {
          x: primitive.x,
          y: primitive.y,
        }) as Point
        return {
          ...primitive,
          x: rotatedCenter.x,
          y: rotatedCenter.y,
        }
      case "box":
        const rotatedCorner = applyToPoint(transform, {
          x: primitive.x,
          y: primitive.y,
        }) as Point
        return {
          ...primitive,
          x: rotatedCorner.x,
          y: rotatedCorner.y,
          width: primitive.height,
          height: primitive.width,
        }
    }
  })

  const rotatedPorts = ports.map(
    (port): Port => ({
      ...port,
      ...(applyToPoint(transform, port) as Point),
    }),
  )

  return {
    primitives: rotatedPrimitives,
    center,
    ports: rotatedPorts,
    // TODO recompute size using overrides
    size: {
      width: size.height,
      height: size.width,
    },
    ...overrides,
  }
}
