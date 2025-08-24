import type { SchSymbol } from "./types"

export function resizeSymbol(
  symbol: SchSymbol,
  newSize: { width?: number; height?: number },
): SchSymbol {
  const { width: oldWidth, height: oldHeight } = symbol.size
  let scaleX = 1,
    scaleY = 1

  if (newSize.width !== undefined && newSize.height !== undefined) {
    scaleX = newSize.width / oldWidth
    scaleY = newSize.height / oldHeight
  } else if (newSize.width !== undefined) {
    scaleX = scaleY = newSize.width / oldWidth
  } else if (newSize.height !== undefined) {
    scaleX = scaleY = newSize.height / oldHeight
  }

  const resizedPrimitives = symbol.primitives.map((primitive) => {
    switch (primitive.type) {
      case "path":
        return {
          ...primitive,
          points: primitive.points.map((p) => ({
            x: p.x * scaleX,
            y: p.y * scaleY,
          })),
        }
      case "text":
        return {
          ...primitive,
          x: primitive.x * scaleX,
          y: primitive.y * scaleY,
          fontSize: primitive.fontSize
            ? primitive.fontSize * scaleX
            : undefined,
        }
      case "circle":
        return {
          ...primitive,
          x: primitive.x * scaleX,
          y: primitive.y * scaleY,
          radius: primitive.radius * scaleX,
        }
      case "box":
        return {
          ...primitive,
          x: primitive.x * scaleX,
          y: primitive.y * scaleY,
          width: primitive.width * scaleX,
          height: primitive.height * scaleY,
        }
      default:
        return primitive
    }
  })

  return {
    ...symbol,
    primitives: resizedPrimitives,
    center: {
      x: symbol.center.x * scaleX,
      y: symbol.center.y * scaleY,
    },
    ports: symbol.ports.map((port) => ({
      ...port,
      x: port.x * scaleX,
      y: port.y * scaleY,
    })),
    size: {
      width: oldWidth * scaleX,
      height: oldHeight * scaleY,
    },
  }
}
