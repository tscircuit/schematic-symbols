import svgJson from "assets/generated/capacitor.json"
import { defineSymbol } from "drawing/defineSymbol"

const { paths, bounds, refblocks, texts } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    { ...texts.top1, anchor: "middle_bottom" },
    { ...texts.bottom1, anchor: "middle_top" },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.right1, labels: ["2"] },
  ],
  size: { width: bounds.width, height: bounds.height }, //{ width: 1, height: 0.24 },
  center: { x: bounds.centerX, y: bounds.centerY },
})
