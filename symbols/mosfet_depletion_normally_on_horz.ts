import svgJson from "assets/generated/mosfet_depletion_normally_on.json"
import { defineSymbol } from "drawing/defineSymbol"

const { paths, texts, bounds, refblocks } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    { ...texts.right1, anchor: "middle_left" },
    { ...texts.right2, anchor: "middle_left" },
  ] as any,
  ports: [
    { ...refblocks.top1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.bottom1, labels: ["2"] }, // TODO add more "standard" labels
    { ...refblocks.left1, labels: ["3"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width + 0.4, height: bounds.height },
  center: { x: bounds.centerX + 0.2, y: bounds.centerY },
})
