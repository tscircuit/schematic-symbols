import { getBoundsOfSvgJson, svgPathToPoints } from "drawing/svg"
import { path, text, defineSymbol } from "../drawing"
import svgJson from "assets/symbols-svg-json/boxresistor.json"

const bounds = getBoundsOfSvgJson(svgJson as any)

export const boxresistor2 = defineSymbol({
  primitives: [
    ...svgJson.children
      .filter((child) => child.type === "element" && child.name === "path")
      .map((child) =>
        path({
          points: svgPathToPoints(child.attributes.d!),
          color: "primary",
        }),
      ),
  ],
  ports: [],
  size: bounds, //{ width: 1, height: 0.24 },
  center: { x: bounds.centerX, y: bounds.centerY },
})

console.log(boxresistor2)
