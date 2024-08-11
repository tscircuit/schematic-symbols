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
