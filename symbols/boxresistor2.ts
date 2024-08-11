import { getBoundsOfSvgJson, svgPathToPoints } from "drawing/svg"
import { path, text, defineSymbol, type PathPrimitive } from "../drawing"
import svgJson from "assets/symbols-svg-json/boxresistor.json"

const bounds = getBoundsOfSvgJson(svgJson as any)

console.log(bounds)

export const boxresistor2 = defineSymbol({
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
