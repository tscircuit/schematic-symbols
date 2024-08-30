import type { INode } from "svgson"
import { svgPathToPoints } from "./svgPathToPoints"

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
