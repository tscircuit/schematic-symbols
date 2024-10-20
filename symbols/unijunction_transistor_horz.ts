import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/unijunction_transistor.json"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_left" },
    { ...texts.bottom1, anchor: "middle_right" },
  ] as any,
  ports: [
    { ...refblocks.top1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.bottom1, labels: ["2"] }, // TODO add more "standard" labels
    { ...refblocks.left1, labels: ["3"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
