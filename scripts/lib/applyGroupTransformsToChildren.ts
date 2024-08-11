import {
  fromDefinition,
  compose,
  applyToPoint,
  toString,
  type Matrix,
  fromTransformAttribute,
} from "transformation-matrix"
import type { INode } from "svgson"
import { parseSVG, makeAbsolute } from "svg-path-parser"
import { serializeSvgPathCommands } from "./serializeSvgPathCommands"

export function applyGroupTransformsToChildren(group: INode) {
  if (!group.attributes.transform) {
    return group // No transformation to apply
  }

  const transformMatrix = parseTransform(group.attributes.transform)

  group.children = group.children.map((child) => {
    if (child.name === "path") {
      child.attributes.d = transformPath(child.attributes.d, transformMatrix)
    } else if (child.name === "text") {
      const x = parseFloat(child.attributes.x) || 0
      const y = parseFloat(child.attributes.y) || 0
      const { x: newX, y: newY } = applyToPoint(transformMatrix, { x, y })
      child.attributes.x = newX.toString()
      child.attributes.y = newY.toString()

      // If the text has a transform, compose it with the group transform
      if (child.attributes.transform) {
        const childTransform = parseTransform(child.attributes.transform)
        const composedTransform = compose(childTransform, transformMatrix)
        child.attributes.transform = toString(composedTransform)
      } else {
        child.attributes.transform = toString(transformMatrix)
      }
    }
    return child
  })

  // Remove the transform from the group since it's now applied to children
  delete group.attributes.transform

  return group
}

function parseTransform(transform: string): Matrix {
  return compose(fromDefinition(fromTransformAttribute(transform)))
}

export function transformPath(pathData: string, matrix: Matrix): string {
  const parsedPath = parseSVG(pathData)
  makeAbsolute(parsedPath)

  const transformedPath = parsedPath.map((command) => {
    if ("x" in command && "y" in command) {
      const { x, y } = applyToPoint(matrix, { x: command.x, y: command.y })
      command.x = x
      command.y = y
    }
    if ("x1" in command && "y1" in command) {
      const { x, y } = applyToPoint(matrix, { x: command.x1, y: command.y1 })
      command.x1 = x
      command.y1 = y
    }
    if ("x2" in command && "y2" in command) {
      const { x, y } = applyToPoint(matrix, { x: command.x2, y: command.y2 })
      command.x2 = x
      command.y2 = y
    }
    return command
  })

  return serializeSvgPathCommands(transformedPath)
}
