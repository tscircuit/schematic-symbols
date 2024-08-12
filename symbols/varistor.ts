import { svgPathToPoints } from "drawing/svgPathToPoints"
import { getBoundsOfSvgJson } from "drawing/getBoundsOfSvgJson"
import { type PathPrimitive } from "../drawing"
import { path } from "drawing/path"
import { text } from "drawing/text"
import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/symbols-svg-json/varistor.json"

const bounds = getBoundsOfSvgJson(svgJson as any)

export const varistor = defineSymbol({
  primitives: [
    ...svgJson.children
      .filter((child) => child.type === "element" && child.name === "path")
      .map((child) =>
        path({
          points: svgPathToPoints(child.attributes.d!),
          color: "primary",
          type: "path",
        } as PathPrimitive),
      ),
  ],
  ports: [],
  size: { width: bounds.width, height: bounds.height }, //{ width: 1, height: 0.24 },
  center: { x: bounds.centerX, y: bounds.centerY },
})
