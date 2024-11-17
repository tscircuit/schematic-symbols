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
  let minX = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY

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

    if (
      node.name === "circle" &&
      node.attributes.cx &&
      node.attributes.cy &&
      node.attributes.r
    ) {
      const cx = Number.parseFloat(node.attributes.cx)
      const cy = Number.parseFloat(node.attributes.cy)
      const r = Number.parseFloat(node.attributes.r)

      minX = Math.min(minX, cx - r)
      maxX = Math.max(maxX, cx + r)
      minY = Math.min(minY, cy - r)
      maxY = Math.max(maxY, cy + r)
    }

    if (
      node.name === "rect" &&
      node.attributes.x &&
      node.attributes.y &&
      node.attributes.width &&
      node.attributes.height
    ) {
      const x = Number.parseFloat(node.attributes.x)
      const y = Number.parseFloat(node.attributes.y)
      const width = Number.parseFloat(node.attributes.width)
      const height = Number.parseFloat(node.attributes.height)

      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x + width)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y + height)
    }

    if (node.name === "text" && node.attributes.x && node.attributes.y) {
      const x = Number.parseFloat(node.attributes.x)
      const y = Number.parseFloat(node.attributes.y)

      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
    }

    if (node.children) {
      node.children.forEach(processNode)
    }
  }

  processNode(svgJson)

  const width = Math.abs(maxX - minX)
  const height = Math.abs(maxY - minY)
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2

  return { minX, maxX, minY, maxY, width, height, centerX, centerY }
}
