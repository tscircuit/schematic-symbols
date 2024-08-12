import type { INode } from "svgson"

export const findInnerText = (node: INode): string => {
  if (node.type === "text") {
    return node.value
  } else if (node.children) {
    return node.children.map(findInnerText).join("")
  }

  return ""
}
