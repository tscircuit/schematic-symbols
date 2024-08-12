export function resizeSymbol(
  symbol: Symbol,
  newSize: { width?: number; height?: number },
): Symbol {
  const { width: oldWidth, height: oldHeight } = symbol.size
  let scaleX = 1,
    scaleY = 1

  if (newSize.width && newSize.height) {
    scaleX = newSize.width / oldWidth
    scaleY = newSize.height / oldHeight
  } else if (newSize.width) {
    scaleX = scaleY = newSize.width / oldWidth
  } else if (newSize.height) {
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
      case "circle":
        return {
          ...primitive,
          x: primitive.x * scaleX,
          y: primitive.y * scaleY,
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
