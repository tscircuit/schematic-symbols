import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/text_paths_sample.json"
import { Primitive, TextPrimitive } from "drawing/types"
import { isPathPrimitive } from "drawing/typeguards"

const { paths, bounds, circles } = svgJson

const modifiedPaths = Object.entries(paths).map(([key, path]) => {
  if (isPathPrimitive(path)) {
    if (path.label === "text") {
      return { ...path, closed: true, strokeWidth: 0.0079, fill: false }
    }
    return path
  }
})

export default defineSymbol({
  primitives: [
    ...modifiedPaths,
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: 0,
      y: -0.3594553499999995,
      anchor: "middle_bottom",
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: 0.35,
      anchor: "middle_top",
    },
  ] as Primitive[],
  ports: [],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
