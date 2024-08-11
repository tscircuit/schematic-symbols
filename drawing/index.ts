export interface Point {
  x: number
  y: number
}

export interface Port {
  x: number
  y: number
  labels: string[]
}

export interface PathPrimitive {
  type: "path"
  fill?: boolean
  points: Point[]
  color: string
}

export interface TextPrimitive {
  type: "text"
  text: string
  x: number
  y: number
  anchor: string
}

export interface CirclePrimitive {
  type: "circle"
  x: number
  y: number
  radius: number
}

export interface BoxPrimitive {
  type: "box"
  x: number
  y: number
  width: number
  height: number
  anchor: string
}

export type Primitive =
  | PathPrimitive
  | TextPrimitive
  | CirclePrimitive
  | BoxPrimitive

export interface Symbol {
  primitives: Primitive[]
  center: Point
  ports: Port[]
  size: {
    width: number
    height: number
  }
}

export function path(options: Omit<PathPrimitive, "type">): PathPrimitive {
  return { type: "path", ...options }
}

export function text(
  text: string,
  options: Omit<TextPrimitive, "type" | "text">,
): TextPrimitive {
  return { type: "text", text, ...options }
}

export function circle(
  options: Omit<CirclePrimitive, "type">,
): CirclePrimitive {
  return { type: "circle", ...options }
}

export function box(options: Omit<BoxPrimitive, "type">): BoxPrimitive {
  return { type: "box", ...options }
}

const arrow = (
  start: Point,
  end: Point,
  color: string = "black",
  headSize: number = 10,
): Primitive[] => {
  // Calculate the angle and length of the arrow
  const dx = end.x - start.x
  const dy = end.y - start.y
  const angle = Math.atan2(dy, dx)
  const length = Math.sqrt(dx * dx + dy * dy)

  // Calculate the points for the arrow head
  const headAngle = Math.PI / 6 // 30 degrees
  const headPoint1 = {
    x: end.x - headSize * Math.cos(angle - headAngle),
    y: end.y - headSize * Math.sin(angle - headAngle),
  }
  const headPoint2 = {
    x: end.x - headSize * Math.cos(angle + headAngle),
    y: end.y - headSize * Math.sin(angle + headAngle),
  }

  return [
    // Arrow body
    path({
      points: [start, end],
      color: color,
    }),
    // Arrow head
    path({
      points: [headPoint1, end, headPoint2],
      color: color,
      fill: true,
    }),
  ]
}

export function defineSymbol(symbol: Symbol): Symbol {
  return symbol
}

export const mapColor = (color: string) => {
  switch (color) {
    case "primary":
      return "black"
    case "secondary":
      return "gray"
    default:
      return color
  }
}

export function getSvg(
  symbol: Symbol,
  options: { width?: number; height?: number } = {},
): string {
  const { primitives, size } = symbol
  const svgElements = primitives.map((primitive) => {
    switch (primitive.type) {
      case "path":
        return `<path d="${pathToSvgD(primitive.points)}" fill="${
          primitive.fill ? mapColor(primitive.color) : "none"
        }" stroke="${mapColor(primitive.color)}" stroke-width="0.02" />`
      case "text":
        return `<text x="${primitive.x}" y="${primitive.y}" text-anchor="${
          primitive.anchor
        }" fill="${mapColor("primary")}">${primitive.text}</text>`
      case "circle":
        return `<circle cx="${primitive.x}" cy="${primitive.y}" r="${primitive.radius}" fill="${mapColor("primary")}" />`
      case "box":
        return `<rect x="${primitive.x}" y="${primitive.y}" width="${primitive.width}" height="${primitive.height}" fill="${mapColor("primary")}" />`
      default:
        return ""
    }
  })

  // Use the center and the size to calculate the viewBox
  const bufferMultiple = 1.1
  const w = size.width * bufferMultiple
  const h = size.height * bufferMultiple
  const viewBox = {
    x: symbol.center.x - w / 2,
    y: symbol.center.y - h / 2,
    width: w,
    height: h,
  }

  if (options.width && !options.height) {
    options.height = options.width! * (viewBox.height / viewBox.width)
  } else if (!options.width && options.height) {
    options.width = options.height! * (viewBox.width / viewBox.height)
  } else if (!options.width && !options.height) {
    options.width = viewBox.width
    options.height = viewBox.height
  }

  return `<svg width="${options.width}" height="${options.height}" viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}" xmlns="http://www.w3.org/2000/svg">
    ${svgElements.join("\n    ")}
  </svg>`
}

function pathToSvgD(points: Point[]): string {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ")
}

export function resize(
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
