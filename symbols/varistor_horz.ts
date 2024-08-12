import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/symbols-svg-json/varistor.json"

const { paths, texts, bounds, refblocks } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    { ...texts.top1, anchor: "middle_left" },
    { ...texts.bottom1, anchor: "middle_right" },
  ] as any,
  ports: [
    {
      ...refblocks.left1,
      labels: ["1", "-"],
    },
    {
      ...refblocks.right1,
      labels: ["2", "+"],
    },
  ],
  size: { width: bounds.width, height: bounds.height }, //{ width: 1, height: 0.24 },
  center: { x: bounds.centerX, y: bounds.centerY },
})
