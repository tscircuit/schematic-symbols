import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/ground.json"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

const adjustedPort1Position = {
  right1: { x: 5, y: 10 },
  right2: { x: 4, y: 7 },
}

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: 0.3,
      y: -0.45,
      anchor: "middle_bottom",
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0.3,
      y: 0.45,
      anchor: "middle_top",
    },
  ] as Primitive[],
  ports: [
    { ...refblocks.right1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right2, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX + 0.5, y: bounds.centerY + 0.1 },
})
