import { svgPathToPoints } from "drawing/svgPathToPoints"
import { getBoundsOfSvgJson } from "drawing/getBoundsOfSvgJson"
import { type PathPrimitive } from "../drawing"
import { path } from "drawing/path"
import { text } from "drawing/text"
import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/symbols-svg-json/varistor.json"

const bounds = getBoundsOfSvgJson(svgJson.svg as any)

export default defineSymbol({
  primitives: [
    ...svgJson.svg.children
      .filter((child) => child.type === "element" && child.name === "path")
      .map((child) =>
        path({
          points: svgPathToPoints(child.attributes.d!),
          color: "primary",
          type: "path",
        } as PathPrimitive),
      ),
  ],
  ports: [
    {
      ...svgJson.refblocks.left1,
      labels: ["1", "-"],
    },
    {
      ...svgJson.refblocks.right1,
      labels: ["2", "+"],
    },
  ],
  size: { width: bounds.width, height: bounds.height }, //{ width: 1, height: 0.24 },
  center: { x: bounds.centerX, y: bounds.centerY },
})
