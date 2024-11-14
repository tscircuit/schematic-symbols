import { rotate, applyToPoint, transform, scale } from "transformation-matrix"
import type {
  SchSymbol,
  Primitive,
  Point,
  Port,
  NinePointAnchor,
} from "./types"

// Update rotateAnchor to handle all anchor rotations based on orientation
const rotateAnchor = (
  anchor: NinePointAnchor,
  orientation: "up" | "down" | "left" | "right" = "right",
): NinePointAnchor => {
  switch (orientation) {
    case "up":
      switch (anchor) {
        case "middle_top":
          return "middle_left"
        case "middle_bottom":
          return "middle_right"
        case "middle_left":
          return "middle_bottom"
        case "middle_right":
          return "middle_top"
      }
      break
    case "down":
      switch (anchor) {
        case "middle_top":
          return "middle_right"
        case "middle_bottom":
          return "middle_left"
        case "middle_left":
          return "middle_top"
        case "middle_right":
          return "middle_bottom"
      }
      break
    case "left":
      switch (anchor) {
        case "middle_top":
          return "middle_bottom"
        case "middle_bottom":
          return "middle_top"
        case "middle_left":
          return "middle_right"
        case "middle_right":
          return "middle_left"
      }
      break
    case "right":
      return anchor // No change if orientation is "right"
  }
  return anchor
}

export const flipSymbolOverXAxis = (
  symbol: SchSymbol,
  overrides?: Partial<SchSymbol>,
): SchSymbol => {
  const { primitives, center, ports, size } = symbol
  const transformMatrix = transform({
    a: 1,
    b: 0,
    c: 0,
    d: -1,
    e: 0,
    f: 2 * center.y,
  })

  const flippedPrimitives = primitives.map((primitive): Primitive => {
    primitive = { ...primitive }
    switch (primitive.type) {
      case "path":
        return {
          ...primitive,
          points: primitive.points.map(
            (point) => applyToPoint(transformMatrix, point) as Point,
          ),
        }
      case "text":
        const flippedPoint = applyToPoint(transformMatrix, {
          x: primitive.x,
          y: primitive.y,
        }) as Point

        // Flip text anchors vertically
        const anchorMap: Record<NinePointAnchor, NinePointAnchor> = {
          top_left: "bottom_left",
          top_right: "bottom_right",
          bottom_left: "top_left",
          bottom_right: "top_right",
          center: "center",
          middle_top: "middle_bottom",
          middle_bottom: "middle_top",
          middle_left: "middle_left",
          middle_right: "middle_right",
        }

        return {
          ...primitive,
          x: flippedPoint.x,
          y: flippedPoint.y,
          anchor: anchorMap[primitive.anchor],
        }
      case "circle":
      case "box":
        const flippedCenter = applyToPoint(transformMatrix, {
          x: primitive.x,
          y: primitive.y,
        }) as Point
        return {
          ...primitive,
          x: flippedCenter.x,
          y: flippedCenter.y,
        }
    }
  })

  const flippedPorts = ports.map(
    (port): Port => ({
      ...port,
      ...(applyToPoint(transformMatrix, port) as Point),
    }),
  )

  return {
    primitives: flippedPrimitives,
    center,
    ports: flippedPorts,
    size,
    ...overrides,
  }
}

export const flipSymbolOverYAxis = (
  symbol: SchSymbol,
  overrides?: Partial<SchSymbol>,
): SchSymbol => {
  const { primitives, center, ports, size } = symbol
  const transformMatrix = transform({
    a: -1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 2 * center.x,
  })

  const flippedPrimitives = primitives.map((primitive): Primitive => {
    primitive = { ...primitive }
    switch (primitive.type) {
      case "path":
        return {
          ...primitive,
          points: primitive.points.map(
            (point) => applyToPoint(transformMatrix, point) as Point,
          ),
        }
      case "text":
        const flippedPoint = applyToPoint(transformMatrix, {
          x: primitive.x,
          y: primitive.y,
        }) as Point

        // Flip text anchors horizontally
        const anchorMap: Record<NinePointAnchor, NinePointAnchor> = {
          top_left: "top_right",
          top_right: "top_left",
          bottom_left: "bottom_right",
          bottom_right: "bottom_left",
          center: "center",
          middle_top: "middle_top",
          middle_bottom: "middle_bottom",
          middle_left: "middle_right",
          middle_right: "middle_left",
        }

        return {
          ...primitive,
          x: flippedPoint.x,
          y: flippedPoint.y,
          anchor: anchorMap[primitive.anchor],
        }
      case "circle":
      case "box":
        const flippedCenter = applyToPoint(transformMatrix, {
          x: primitive.x,
          y: primitive.y,
        }) as Point
        return {
          ...primitive,
          x: flippedCenter.x,
          y: flippedCenter.y,
        }
    }
  })

  const flippedPorts = ports.map(
    (port): Port => ({
      ...port,
      ...(applyToPoint(transformMatrix, port) as Point),
    }),
  )

  return {
    primitives: flippedPrimitives,
    center,
    ports: flippedPorts,
    size,
    ...overrides,
  }
}

export const rotateSymbol = (
  symbol: SchSymbol,
  orientation?: "up" | "down" | "left" | "right",
  overrides?: Partial<SchSymbol>,
): SchSymbol => {
  // Assuming the default orientation is "right"
  const angleMap = {
    up: -Math.PI / 2,
    right: 0,
    down: Math.PI / 2,
    left: -Math.PI,
  }

  const transform = rotate(
    orientation ? angleMap[orientation] : Math.PI / 2,
    symbol.center.x,
    symbol.center.y,
  )

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

        primitive.anchor = rotateAnchor(
          primitive.anchor,
          orientation ?? "right",
        )

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
    size: {
      width:
        orientation === "up" || orientation === "down"
          ? size.width
          : size.height,
      height:
        orientation === "up" || orientation === "down"
          ? size.height
          : size.width,
    },
    ...overrides,
  }
}
