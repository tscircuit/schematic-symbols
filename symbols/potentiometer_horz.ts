import svgJson from "assets/generated/potentiometer.json"
import { defineSymbol } from "drawing/defineSymbol"

const { paths, texts, bounds, refblocks } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    { ...texts.bottom1, y: 0.35, anchor: "middle_top" },
    { ...texts.right1, anchor: "middle_left" },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width + 0.05, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
