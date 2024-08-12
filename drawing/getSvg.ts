import { pathToSvgD } from "./pathToSvgD"
import { mapColor } from "./mapColor"

export function getSvg(
  symbol: Symbol,
  options: { width?: number; height?: number } = {},
): string {
  const { primitives, size } = symbol
  const svgElements = primitives.map((primitive) => {
    switch (primitive.type) {
      case "path":
        return `<path d="${pathToSvgD(primitive.points)}" fill="${primitive.fill ? mapColor(primitive.color) : "none"}" stroke="${mapColor(primitive.color)}" stroke-width="0.02" />`
      case "text":
        const { x, y, text, fontSize } = primitive
        return `<text x="${primitive.x}" style="font: ${primitive.fontSize ?? 0.1}px black mono; fill: black" y="${primitive.y}" text-anchor="${"center"}" fill="${mapColor("primary")}">${primitive.text}</text>`
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
