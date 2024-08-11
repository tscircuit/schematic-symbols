import type { INode } from "svgson"
import { parseSVG, makeAbsolute } from "svg-path-parser"

export function getBoundsOfSvgJson(svgJson: INode): {
  minX: number
  maxX: number
  minY: number
  maxY: number
  width: number
  height: number
  centerX: number
  centerY: number
} {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  function processNode(node: INode) {
    if (node.name === "path" && node.attributes.d) {
      const points = svgPathToPoints(node.attributes.d)

      for (const point of points) {
        minX = Math.min(minX, point.x)
        maxX = Math.max(maxX, point.x)
        minY = Math.min(minY, point.y)
        maxY = Math.max(maxY, point.y)
      }
    }

    if (node.children) {
      node.children.forEach(processNode)
    }
  }

  processNode(svgJson)

  const width = maxX - minX
  const height = maxY - minY
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2

  return { minX, maxX, minY, maxY, width, height, centerX, centerY }
}

export function svgPathToPoints(d: string): Array<{ x: number; y: number }> {
  const parsedPath = parseSVG(d)
  const absolutePath = makeAbsolute(parsedPath)

  const points: Array<{ x: number; y: number }> = []

  for (const command of absolutePath) {
    switch (command.code) {
      case "M":
      case "L":
      case "H":
      case "V":
        points.push({ x: command.x, y: command.y })
        break
      case "C":
        points.push(
          { x: command.x1, y: command.y1 },
          { x: command.x2, y: command.y2 },
          { x: command.x, y: command.y },
        )
        break
      case "S":
      case "Q":
        points.push(
          { x: command.x0, y: command.y0 },
          { x: command.x, y: command.y },
        )
        break
      case "T":
      case "A":
        points.push({ x: command.x, y: command.y })
        break
      case "Z":
        // Close path - no action needed
        break
    }
  }

  return points
}
