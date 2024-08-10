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

export function defineSymbol(symbol: Symbol): Symbol {
  return symbol
}
