import {
  fromDefinition,
  compose,
  applyToPoint,
  toString,
  type Matrix,
  fromTransformAttribute,
  identity,
} from "transformation-matrix"
import type { INode } from "svgson"
import { parseSVG, makeAbsolute, type LineToCommand } from "svg-path-parser"
import { serializeSvgPathCommands } from "./serializeSvgPathCommands"

export function applyGroupTransformsToChildren(group: INode) {
  if (!group.attributes.transform) {
    return group // No transformation to apply
  }

  const groupTransform = parseTransform(group.attributes.transform)

  group.children = group.children
    .map((child) => {
      const transform = compose(
        groupTransform,
        parseTransform(child.attributes.transform),
      )
      delete child.attributes.transform

      if (child.name === "rect") {
        // convert to path, it's easier to transform via rotations
        return null
        child = convertRectToPath(child)
      }
      if (child.name === "path") {
        child.attributes.d = transformPath(child.attributes.d, transform)
      } else if (child.name === "text") {
        return null // TODO
      } else if (child.name === "circle") {
        let { cx, cy, r } = child.attributes as any
        cx = parseFloat(cx)
        cy = parseFloat(cy)
        r = parseFloat(r)

        const { x, y } = applyToPoint(transform, { x: cx, y: cy })
        r = r * groupTransform.a

        child.attributes.cx = x.toString()
        child.attributes.cy = y.toString()
        child.attributes.r = r.toString()
      } else {
        return null
      }

      return child
    })
    .filter((c: INode | null): INode => c as INode)

  // Remove the transform from the group since it's now applied to children
  delete group.attributes.transform

  return group
}

function parseTransform(transform: string): Matrix {
  if (!transform) return identity()
  return compose(fromDefinition(fromTransformAttribute(transform)))
}

export function transformPath(pathData: string, matrix: Matrix): string {
  let parsedPath = parseSVG(pathData)

  parsedPath = makeAbsolute(parsedPath)

  // convert V and H commands to L commands so that rotations can be applied
  parsedPath = parsedPath.map((command) => {
    const { x0, y0 } = command as any
    if (command.code === "V") {
      return { code: "L", x: x0, y: command.y } as LineToCommand
    } else if (command.code === "H") {
      return { code: "L", x: command.x, y: y0 } as LineToCommand
    }
    return command
  })

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

export function convertRectToPath(child: INode): INode {
  const { x, y, width, height } = child.attributes as any
  return null
}
