import {
  fromDefinition,
  compose,
  translate,
  rotateDEG,
  applyToPoint,
  toString,
  type Matrix,
  fromString,
  fromTransformAttribute,
} from "transformation-matrix"
import type { INode } from "svgson"

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

function transformPath(pathData: string, matrix: Matrix) {
  const pathCommands = pathData.match(/[a-zA-Z][^a-zA-Z]*/g) ?? []
  return pathCommands
    .map((command) => {
      const type = command[0]
      const coords = command
        .slice(1)
        .trim()
        .split(/[\s,]+/)
        .map(parseFloat)

      const typeUpper = type.toUpperCase()
      if ("MLHVCSQTA".includes(typeUpper)) {
        if (coords.length === 1) {
          if (typeUpper === "V") {
            coords[0] = coords[0] * matrix.a + coords[1] * matrix.c + matrix.e
          } else if (typeUpper === "H") {
            coords[0] = coords[0] * matrix.a + coords[1] * matrix.b + matrix.f
          } else {
            throw new Error(
              `Invalid path command for single coordinate: ${type}, given: ${coords}`,
            )
          }
        } else if (coords.length % 2 !== 0) {
          for (let i = 0; i < coords.length; i += 2) {
            const { x, y } = applyToPoint(matrix, {
              x: coords[i],
              y: coords[i + 1],
            })
            coords[i] = x
            coords[i + 1] = y
          }
        }
      }

      return type + coords.join(" ")
    })
    .join(" ")
}
