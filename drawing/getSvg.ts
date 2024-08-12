import { pathToSvgD } from "./pathToSvgD"
import { mapColor } from "./mapColor"
import type { NinePointAnchor, TextPrimitive } from "./types"

function createTextElement(primitive: TextPrimitive): {
  text: string
  anchor: string
} {
  const { x, y, text, fontSize = 0.1, anchor } = primitive
  let textAnchor: string
  let dx: number = 0
  let dy: number = 0

  const capHeight = fontSize * 0.75

  switch (anchor) {
    case "top_left":
      textAnchor = "start"
      dy = fontSize
      break
    case "top_right":
      textAnchor = "end"
      dy = fontSize
      break
    case "bottom_left":
      textAnchor = "start"
      break
    case "bottom_right":
      textAnchor = "end"
      break
    case "center":
      textAnchor = "middle"
      dy = fontSize / 2
      break
    case "middle_top":
      textAnchor = "middle"
      dy = capHeight
      break
    case "middle_bottom":
      textAnchor = "middle"
      break
    case "middle_left":
      textAnchor = "start"
      dy = capHeight / 2
      break
    case "middle_right":
      textAnchor = "end"
      dy = capHeight / 2
      break
  }

  return {
    text: `<text x="${x}" y="${y}" dx="${dx}" dy="${dy}" text-anchor="${textAnchor}" style="font: ${fontSize ?? 0.1}px monospace; fill: ${mapColor("primary")}">${text}</text>`,
    anchor: `<rect x="${x - 0.025 / 2}" y="${y - 0.025 / 2}" width="0.025" height="0.025" fill="blue" />`,
  }
}

export function getSvg(
  symbol: Symbol,
  options: { width?: number; height?: number; debug?: boolean } = {},
): string {
  const { debug = false } = options
  const { primitives, size } = symbol
  const svgElements = primitives.map((primitive) => {
    switch (primitive.type) {
      case "path":
        return `<path d="${pathToSvgD(primitive.points)}" fill="${primitive.fill ? mapColor(primitive.color) : "none"}" stroke="${mapColor(primitive.color)}" stroke-width="0.02" />`
      case "text":
        const textElements = createTextElement(primitive)
        return textElements.text + (debug ? textElements.anchor : "")
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
