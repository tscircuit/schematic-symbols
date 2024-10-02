import {
  PathPrimitive,
  TextPrimitive,
  CirclePrimitive,
  BoxPrimitive,
  Primitive,
  NinePointAnchor,
  Point,
  SchSymbol,
  Port,
  SvgData,
  Bounds,
} from "./types"

// Basic types
function isPoint(value: any): value is Point {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.x === "number" &&
    typeof value.y === "number"
  )
}

export function isNinePointAnchor(value: any): value is NinePointAnchor {
  return [
    "top_left",
    "top_right",
    "bottom_left",
    "bottom_right",
    "center",
    "middle_top",
    "middle_bottom",
    "middle_left",
    "middle_right",
  ].includes(value)
}

// Primitive types
export function isPathPrimitive(value: any): value is PathPrimitive {
  return (
    typeof value === "object" &&
    value !== null &&
    value.type === "path" &&
    Array.isArray(value.points) &&
    value.points.every(isPoint) &&
    typeof value.color === "string"
  )
}

export function isTextPrimitive(value: any): value is TextPrimitive {
  return (
    typeof value === "object" &&
    value !== null &&
    value.type === "text" &&
    typeof value.text === "string" &&
    typeof value.x === "number" &&
    typeof value.y === "number" &&
    isNinePointAnchor(value.anchor)
  )
}

export function isCirclePrimitive(value: any): value is CirclePrimitive {
  return (
    typeof value === "object" &&
    value !== null &&
    value.type === "circle" &&
    typeof value.x === "number" &&
    typeof value.y === "number" &&
    typeof value.radius === "number" &&
    typeof value.fill === "boolean" &&
    typeof value.color === "string"
  )
}

export function isBoxPrimitive(value: any): value is BoxPrimitive {
  return (
    typeof value === "object" &&
    value !== null &&
    value.type === "box" &&
    typeof value.x === "number" &&
    typeof value.y === "number" &&
    typeof value.width === "number" &&
    typeof value.height === "number" &&
    isNinePointAnchor(value.anchor)
  )
}

export function isPrimitive(value: any): value is Primitive {
  return (
    isPathPrimitive(value) ||
    isTextPrimitive(value) ||
    isCirclePrimitive(value) ||
    isBoxPrimitive(value)
  )
}

// Complex types
export function isPort(value: any): value is Port {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.x === "number" &&
    typeof value.y === "number" &&
    Array.isArray(value.labels) &&
    value.labels.every((label: any) => typeof label === "string")
  )
}

export function isSchSymbol(value: any): value is SchSymbol {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray(value.primitives) &&
    value.primitives.every(isPrimitive) &&
    isPoint(value.center) &&
    Array.isArray(value.ports) &&
    value.ports.every(isPort) &&
    typeof value.size === "object" &&
    value.size !== null &&
    typeof value.size.width === "number" &&
    typeof value.size.height === "number"
  )
}

export function isBounds(value: any): value is Bounds {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.minX === "number" &&
    typeof value.maxX === "number" &&
    typeof value.minY === "number" &&
    typeof value.maxY === "number" &&
    typeof value.width === "number" &&
    typeof value.height === "number" &&
    typeof value.centerX === "number" &&
    typeof value.centerY === "number"
  )
}

export function isSvgData(value: any): value is SvgData {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.paths === "object" &&
    Object.values(value.paths).every(isPathPrimitive) &&
    typeof value.texts === "object" &&
    Object.values(value.texts).every(isTextPrimitive) &&
    typeof value.refblocks === "object" &&
    Object.values(value.refblocks).every(isPoint) &&
    isBounds(value.bounds) &&
    typeof value.circles === "object" &&
    Object.values(value.circles).every(isCirclePrimitive)
  )
}
