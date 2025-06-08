import svgJson from "assets/generated/potentiometer2.json"
import { defineSymbol } from "drawing/defineSymbol"

const { paths, texts, bounds, refblocks } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    { ...texts.bottom1, x: 0, y: -0.35, anchor: "middle_top" },
    { ...texts.top1, x: 0, y: 0.35, anchor: "middle_bottom" },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width + 0.05, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
