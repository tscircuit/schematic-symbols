import { rotate, applyToPoint } from "transformation-matrix"
import type { SchSymbol, Primitive, Point, Port } from "./types"

export const rotateSymbol = (
  symbol: SchSymbol,
  overrides?: Partial<SchSymbol>,
): SchSymbol => {
  const transform = rotate(Math.PI / 2, symbol.center.x, symbol.center.y)

  const { primitives, center, size, ports } = symbol

  const rotatedPrimitives = primitives.map((primitive): Primitive => {
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
